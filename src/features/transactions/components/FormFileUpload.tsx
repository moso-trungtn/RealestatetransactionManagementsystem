import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface FormFileUploadProps {
  id: string;
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormFileUpload({
  id,
  label,
  files,
  onChange,
  accept,
  multiple = true,
  disabled = false,
  className = ''
}: FormFileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      onChange(fileArray);
      toast.success(`${fileArray.length} file(s) uploaded successfully!`);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <Label
            htmlFor={id}
            className="cursor-pointer text-orange-600 hover:text-orange-700"
          >
            Click to upload
          </Label>
          <Input
            id={id}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
          />
          <p className="text-xs text-gray-500 mt-1">
            {accept ? `Accepted formats: ${accept}` : 'All file types accepted'}
          </p>
        </div>
        {files.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            {files.length} file(s) selected
            <ul className="mt-2 space-y-1">
              {files.map((file, index) => (
                <li key={index} className="text-xs text-gray-500">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
