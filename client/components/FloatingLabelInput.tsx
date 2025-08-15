import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export default function FloatingLabelInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        id={id}
        type={type}
        placeholder={isFloating ? placeholder : ""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={`h-14 rounded-xl border-2 pt-6 pb-2 px-4 transition-all duration-200 ${
          isFocused
            ? "border-primary ring-2 ring-primary/20"
            : hasValue
              ? "border-green-300"
              : "border-gray-200 hover:border-gray-300"
        }`}
      />
      <Label
        htmlFor={id}
        className={`absolute left-4 text-gray-500 pointer-events-none transition-all duration-200 ${
          isFloating
            ? "top-2 text-xs font-medium text-primary"
            : "top-1/2 -translate-y-1/2 text-base"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {/* Success indicator */}
      {hasValue && !isFocused && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
