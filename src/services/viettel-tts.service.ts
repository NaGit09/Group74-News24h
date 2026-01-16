import axios from "axios";

export interface ViettelTTSOptions {
  voice?: 
    | "hn-quynhanh"    // Nữ miền Bắc
    | "hcm-diemmy"     // Nữ miền Nam
    | "hue-maingoc"    // Nữ miền Trung
    | "hn-phuongtrang" // Nữ miền Bắc
    | "hn-thaochi"     // Nữ miền Bắc
    | "hn-thanhha"     // Nữ miền Bắc
    | "hcm-phuongly"   // Nữ miền Nam
    | "hcm-thuydung"   // Nữ miền Nam
    | "hn-thanhtung"   // Nam miền Bắc
    | "hue-baoquoc"    // Nam miền Trung
    | "hcm-minhquan"   // Nam miền Nam
    | "hn-thanhphuong" // Nữ miền Bắc
    | "hn-namkhanh"    // Nam miền Bắc
    | "hn-leyen"       // Nữ miền Nam
    | "hn-tienquan"    // Nam miền Bắc
    | "hcm-thuyduyen"; // Nữ miền Nam
  speed?: number; // 0.8 - 1.2
  format?: "wav" | "mp3"; // wav = 2, mp3 = 3
  without_filter?: boolean;
}

export const convertTextToSpeechViettel = async (
  text: string,
  options: ViettelTTSOptions = {}
): Promise<Blob> => {
  const token = import.meta.env.VITE_VIETTEL_AI_TOKEN;
  
  if (!token) {
    throw new Error("Viettel AI token không được cấu hình");
  }

  // Làm sạch text
  let cleanText = text
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Giới hạn độ dài: Viettel AI hỗ trợ text dài hơn FPT
  const maxLength = 5000;
  if (cleanText.length > maxLength) {
    // Cắt ở câu gần nhất
    cleanText = cleanText.substring(0, maxLength);
    const lastPeriod = Math.max(
      cleanText.lastIndexOf('.'),
      cleanText.lastIndexOf('!'),
      cleanText.lastIndexOf('?')
    );
    if (lastPeriod > 500) {
      cleanText = cleanText.substring(0, lastPeriod + 1);
    }
  }

  if (cleanText.length < 3) {
    throw new Error("Văn bản phải có ít nhất 3 ký tự");
  }

  console.log("Converting text to speech (Viettel):", { 
    originalLength: text.length,
    cleanLength: cleanText.length,
    textPreview: cleanText.substring(0, 100) + "...", 
    options 
  });

  try {
    const response = await axios.post(
      "https://viettelai.vn/tts/speech_synthesis",
      {
        text: cleanText,
        voice: options.voice || "hn-quynhanh",
        speed: options.speed || 1.0,
        tts_return_option: options.format === "wav" ? 2 : 3,
        token: token,
        without_filter: options.without_filter ?? false,
      },
      {
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
        responseType: "blob", // Quan trọng: nhận file audio dạng blob
      }
    );

    console.log("Viettel TTS Response:", {
      status: response.status,
      contentType: response.headers["content-type"],
      size: response.data.size,
    });

    return response.data;
  } catch (err: any) {
    console.error("Viettel TTS error:", err.response?.data || err.message);
    
    // Nếu response là JSON (lỗi), parse nó
    if (err.response?.data instanceof Blob) {
      const text = await err.response.data.text();
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.vi_message || errorData.en_message || "Không thể chuyển đổi văn bản thành giọng nói");
      } catch {
        throw new Error("Không thể chuyển đổi văn bản thành giọng nói");
      }
    }
    
    throw new Error(err.message || "Không thể chuyển đổi văn bản thành giọng nói");
  }
};
