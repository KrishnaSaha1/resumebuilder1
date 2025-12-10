import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="relative group">
        <input
          type={type}
          id={inputId}
          className={cn(
            "block px-4 pb-2.5 pt-6 w-full text-sm text-slate-100 bg-navy-900/50 border-2 border-slate-700 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-gold-400 peer transition-all duration-300 backdrop-blur-sm hover:border-slate-600",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-gold-400"
        >
          {label}
        </label>
        {error && (
          <span className="absolute -bottom-5 left-0 text-xs text-red-400 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
