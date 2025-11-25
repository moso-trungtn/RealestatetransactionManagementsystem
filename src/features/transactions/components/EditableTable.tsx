import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Trash2 } from 'lucide-react';

export interface EditableTableColumn {
  key: string;
  label: string;
  width?: string; // e.g., '1fr', '120px', 'auto'
  type?: 'text' | 'number' | 'currency';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: (row: any) => boolean;
  format?: (value: any, row: any) => string;
  parse?: (value: string) => any;
}

interface EditableTableProps {
  columns: EditableTableColumn[];
  rows: any[];
  onUpdateRow: (id: string, field: string, value: any) => void;
  onDeleteRow: (id: string) => void;
  isBlankRow?: (row: any) => boolean;
  formatCurrency?: (value: number) => string;
  parseCurrency?: (value: string) => number;
  showDeleteButton?: boolean;
}

export function EditableTable({
  columns,
  rows,
  onUpdateRow,
  onDeleteRow,
  isBlankRow = (row) => !Object.values(row).some(v => v && v !== 0),
  formatCurrency,
  parseCurrency,
  showDeleteButton = true
}: EditableTableProps) {
  
  const defaultFormatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const defaultParseCurrency = (value: string): number => {
    const cleaned = value.replace(/[$,\s]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const currencyFormatter = formatCurrency || defaultFormatCurrency;
  const currencyParser = parseCurrency || defaultParseCurrency;

  // Calculate grid template columns
  const gridCols = columns.map(col => col.width || '1fr').join(' ') + (showDeleteButton ? ' auto' : '');

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div 
        className="grid gap-4 px-4 pb-3 text-sm text-gray-600 border-b"
        style={{ gridTemplateColumns: gridCols }}
      >
        {columns.map((col) => (
          <div key={col.key}>{col.label}</div>
        ))}
        {showDeleteButton && <div></div>}
      </div>

      {/* Table Rows */}
      <div className="space-y-3">
        {rows.map((row) => {
          const isBlank = isBlankRow(row);
          return (
            <div 
              key={row.id} 
              className={`grid gap-4 items-center ${isBlank ? 'opacity-60' : ''}`}
              style={{ gridTemplateColumns: gridCols }}
            >
              {columns.map((col) => {
                const isDisabled = col.disabled ? col.disabled(row) : isBlank;
                const value = row[col.key];

                // Determine input type and value formatting
                let inputType = 'text';
                let displayValue = value;
                let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = e.target.value;
                  onUpdateRow(row.id, col.key, newValue);
                };

                if (col.type === 'number') {
                  inputType = 'number';
                  displayValue = value || '';
                  handleChange = (e) => {
                    onUpdateRow(row.id, col.key, Number(e.target.value));
                  };
                } else if (col.type === 'currency') {
                  inputType = 'text';
                  displayValue = isBlank ? '' : (col.format ? col.format(value, row) : currencyFormatter(value));
                  handleChange = (e) => {
                    const parsed = col.parse ? col.parse(e.target.value) : currencyParser(e.target.value);
                    onUpdateRow(row.id, col.key, parsed);
                  };
                } else if (col.format) {
                  displayValue = col.format(value, row);
                }

                // Determine placeholder
                let placeholder = col.placeholder || '';
                if (isBlank && col.key === columns[0].key) {
                  placeholder = placeholder || 'Add a new entry...';
                }

                return (
                  <div key={col.key}>
                    <Input
                      type={inputType}
                      value={displayValue}
                      onChange={handleChange}
                      placeholder={placeholder}
                      min={col.min}
                      max={col.max}
                      step={col.step}
                      className="h-12 border-gray-200"
                      disabled={isDisabled}
                    />
                  </div>
                );
              })}

              {/* Delete Button */}
              {showDeleteButton && (
                <div className="flex justify-center">
                  {!isBlank && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteRow(row.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 h-12 w-12"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
