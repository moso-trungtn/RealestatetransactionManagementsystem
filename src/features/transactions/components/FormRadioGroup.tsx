import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Label } from "@/components/label";

export interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function FormRadioGroup({
  label,
  options,
  value,
  onChange,
  disabled = false,
  className = ''
}: FormRadioGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Label>{label}</Label>
      <RadioGroup value={value} onValueChange={onChange} disabled={disabled}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
