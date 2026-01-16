import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { ViettelTTSOptions } from "@/services/viettel-tts.service";

interface ViettelTTSSettingsProps {
  options: ViettelTTSOptions;
  onChange: (options: ViettelTTSOptions) => void;
}

const voices = [
  { value: "hn-quynhanh", label: "Quỳnh Anh (Nữ - Miền Bắc)" },
  { value: "hcm-diemmy", label: "Diễm My (Nữ - Miền Nam)" },
  { value: "hue-maingoc", label: "Mai Ngọc (Nữ - Miền Trung)" },
  { value: "hn-phuongtrang", label: "Phương Trang (Nữ - Miền Bắc)" },
  { value: "hn-thaochi", label: "Thảo Chi (Nữ - Miền Bắc)" },
  { value: "hn-thanhha", label: "Thanh Hà (Nữ - Miền Bắc)" },
  { value: "hcm-phuongly", label: "Phương Ly (Nữ - Miền Nam)" },
  { value: "hcm-thuydung", label: "Thùy Dung (Nữ - Miền Nam)" },
  { value: "hn-thanhtung", label: "Thanh Tùng (Nam - Miền Bắc)" },
  { value: "hue-baoquoc", label: "Bảo Quốc (Nam - Miền Trung)" },
  { value: "hcm-minhquan", label: "Minh Quân (Nam - Miền Nam)" },
  { value: "hn-thanhphuong", label: "Thanh Phương (Nữ - Miền Bắc)" },
  { value: "hn-namkhanh", label: "Nam Khánh (Nam - Miền Bắc)" },
  { value: "hn-leyen", label: "Lê Yến (Nữ - Miền Nam)" },
  { value: "hn-tienquan", label: "Tiến Quân (Nam - Miền Bắc)" },
  { value: "hcm-thuyduyen", label: "Thùy Duyên (Nữ - Miền Nam)" },
];

export const ViettelTTSSettings = ({
  options,
  onChange,
}: ViettelTTSSettingsProps) => {
  const handleVoiceChange = (voice: string) => {
    onChange({ ...options, voice: voice as ViettelTTSOptions["voice"] });
  };

  const handleSpeedChange = (value: number[]) => {
    onChange({ ...options, speed: value[0] });
  };

  const handleFormatChange = (format: string) => {
    onChange({ ...options, format: format as "mp3" | "wav" });
  };

  const handleFilterChange = (checked: boolean) => {
    onChange({ ...options, without_filter: !checked });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" title="Cài đặt giọng đọc">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Cài đặt giọng đọc</h4>
            <p className="text-sm text-muted-foreground">
              Tùy chỉnh giọng đọc và tốc độ
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice">Giọng đọc</Label>
            <Select
              value={options.voice || "hn-quynhanh"}
              onValueChange={handleVoiceChange}
            >
              <SelectTrigger id="voice">
                <SelectValue placeholder="Chọn giọng đọc" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.value} value={voice.value}>
                    {voice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="speed">
              Tốc độ: {options.speed?.toFixed(1) || "1.0"}x
            </Label>
            <Slider
              id="speed"
              min={0.8}
              max={1.2}
              step={0.1}
              value={[options.speed || 1.0]}
              onValueChange={handleSpeedChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Chậm (0.8x)</span>
              <span>Bình thường (1.0x)</span>
              <span>Nhanh (1.2x)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Định dạng</Label>
            <Select
              value={options.format || "mp3"}
              onValueChange={handleFormatChange}
            >
              <SelectTrigger id="format">
                <SelectValue placeholder="Chọn định dạng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp3">MP3 (Nhỏ gọn)</SelectItem>
                <SelectItem value="wav">WAV (Chất lượng cao)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="filter"
              checked={!options.without_filter}
              onChange={(e) => handleFilterChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="filter" className="text-sm font-normal">
              Sử dụng filter (chất lượng cao hơn, chậm hơn)
            </Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
