import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
    
    const variants = {
      primary: "bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-[1.02]",
      outline: "border-2 border-gold-400/50 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400",
      ghost: "text-slate-300 hover:text-white hover:bg-white/5",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {variant === 'primary' && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
            )}
          </>
        )}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
