import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2, Pause } from "lucide-react";
import { convertTextToSpeechViettel, type ViettelTTSOptions } from "@/services/viettel-tts.service";
import { toast } from "sonner";
import { ViettelTTSSettings } from "./viettel-tts-settings";

interface ViettelTTSButtonProps {
  text: string;
  options?: ViettelTTSOptions;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showSettings?: boolean;
}

export const ViettelTTSButton = ({ 
  text, 
  options, 
  className,
  variant = "outline",
  size = "sm",
  showSettings = true,
}: ViettelTTSButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ttsOptions, setTtsOptions] = useState<ViettelTTSOptions>(
    options || { voice: "hn-quynhanh", speed: 1.0, format: "mp3", without_filter: false }
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioBlobRef = useRef<string | null>(null);

  // Cleanup khi settings thay đổi
  useEffect(() => {
    // Dừng audio cũ khi settings thay đổi
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (audioBlobRef.current) {
      URL.revokeObjectURL(audioBlobRef.current);
      audioBlobRef.current = null;
    }
    audioRef.current = null;
  }, [ttsOptions.voice, ttsOptions.speed, ttsOptions.format, ttsOptions.without_filter]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioBlobRef.current) {
        URL.revokeObjectURL(audioBlobRef.current);
      }
    };
  }, []);

  const handlePlay = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current && !audioRef.current.ended) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);

    try {
      toast.info("Đang xử lý âm thanh...");
      
      const audioBlob = await convertTextToSpeechViettel(text, ttsOptions);
      
      // Tạo URL từ blob
      const audioUrl = URL.createObjectURL(audioBlob);
      audioBlobRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        toast.error("Lỗi khi phát âm thanh");
        setIsPlaying(false);
        setIsLoading(false);
      };

      audio.oncanplaythrough = () => {
        toast.success("Đang phát âm thanh");
        setIsLoading(false);
      };

      await audio.play();
      setIsPlaying(true);
    } catch (error: any) {
      toast.error(error.message || "Không thể chuyển đổi văn bản thành giọng nói");
      console.error("Viettel TTS Error:", error);
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={variant}
        size={size}
        onClick={handlePlay}
        disabled={isLoading}
        className={className}
        title={isPlaying ? "Tạm dừng" : "Đọc bài viết"}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        <span className="ml-2">
          {isLoading ? "Đang xử lý..." : isPlaying ? "Tạm dừng" : "Đọc bài"}
        </span>
      </Button>
      
      {isPlaying && (
        <Button
          variant="ghost"
          size={size}
          onClick={handleStop}
          title="Dừng"
        >
          <VolumeX className="h-4 w-4" />
        </Button>
      )}
      
      {showSettings && (
        <ViettelTTSSettings 
          options={ttsOptions} 
          onChange={(newOptions) => {
            setTtsOptions(newOptions);
            toast.info("Đã cập nhật cài đặt. Nhấn 'Đọc bài' để áp dụng.");
          }}
        />
      )}
    </div>
  );
};
