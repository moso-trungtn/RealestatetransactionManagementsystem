import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { Checkbox } from "@/components/checkbox";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { toast } from 'sonner';

export interface SelectableTableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface SelectableTableProps {
  columns: SelectableTableColumn[];
  data: any[];
  selectedRows: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  rowIdKey?: string;
  showClearButton?: boolean;
  className?: string;
}

export function SelectableTable({
  columns,
  data,
  selectedRows,
  onSelectionChange,
  rowIdKey = 'id',
  showClearButton = true,
  className = ''
}: SelectableTableProps) {
  const toggleRow = (id: string) => {
    const newSelection = selectedRows.includes(id)
      ? selectedRows.filter(rowId => rowId !== id)
      : [...selectedRows, id];
    onSelectionChange(newSelection);
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map(row => row[rowIdKey]));
    }
  };

  const clearSelection = () => {
    onSelectionChange([]);
    toast.success('Selection cleared');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === data.length && data.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row[rowIdKey]}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row[rowIdKey])}
                    onCheckedChange={() => toggleRow(row[rowIdKey])}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedRows.length > 0 && showClearButton && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{selectedRows.length} row(s) selected</Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSelection}
          >
            Clear Selection
          </Button>
        </div>
      )}
    </div>
  );
}
