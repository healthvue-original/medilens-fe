import React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorText, ...props }, ref) => {
    const inputName = props.name;
    return (
      <div className="flex flex-col gap-1">
        <input
          id={`${inputName}-id`}
          aria-invalid={!!errorText}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          aria-describedby={`${inputName}-error`}
          ref={ref}
          {...props}
        />
        <p id={`${inputName}-error`} className="text-red-700 text-xs italic">
          {errorText}
        </p>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
