import { Slider } from "@/components/slider";
import { Label } from "@/components/label";

interface FormSliderProps {
  id: string;
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormSlider({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  disabled = false,
  className = ''
}: FormSliderProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {showValue && (
          <span className="text-sm text-gray-500">{value[0]}</span>
        )}
      </div>
      <Slider
        id={id}
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
    </div>
  );
}
