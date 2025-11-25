import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Plus, Trash2 } from 'lucide-react';

export interface DynamicField {
  id: string;
  value: string;
}

interface DynamicFieldListProps {
  label: string;
  fields: DynamicField[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
  placeholder?: string;
  addButtonText?: string;
  minFields?: number;
  maxFields?: number;
  className?: string;
}

export function DynamicFieldList({
  label,
  fields,
  onAdd,
  onRemove,
  onUpdate,
  placeholder = 'Enter value',
  addButtonText = 'Add Field',
  minFields = 1,
  maxFields,
  className = ''
}: DynamicFieldListProps) {
  const canAdd = !maxFields || fields.length < maxFields;
  const canRemove = fields.length > minFields;

  return (
    <div className={`space-y-3 ${className}`}>
      <Label>{label}</Label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Input
              value={field.value}
              onChange={(e) => onUpdate(field.id, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
            />
            {canRemove && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(field.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      {canAdd && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {addButtonText}
        </Button>
      )}
    </div>
  );
}
