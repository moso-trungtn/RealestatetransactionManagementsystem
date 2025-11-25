import { Switch } from "@/components/switch";
import { Label } from "@/components/label";

interface FormSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function FormSwitch({
  id,
  label,
  checked,
  onChange,
  description,
  disabled = false,
  className = ''
}: FormSwitchProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
