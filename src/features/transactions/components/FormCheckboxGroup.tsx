import { Checkbox } from "@/components/checkbox";
import { Label } from "@/components/label";
import { Badge } from "@/components/badge";

export interface CheckboxOption {
  id: string;
  label: string;
}

interface FormCheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  showBadges?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormCheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  showBadges = true,
  disabled = false,
  className = ''
}: FormCheckboxGroupProps) {
  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Label>{label}</Label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedValues.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
              disabled={disabled}
            />
            <Label htmlFor={option.id} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {showBadges && selectedValues.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {selectedValues.map((value) => {
            const option = options.find(opt => opt.id === value);
            return option ? (
              <Badge key={value} variant="secondary">
                {option.label}
              </Badge>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
