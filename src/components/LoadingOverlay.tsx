import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  isOpen: boolean;
}

export const LoadingOverlay = ({ isOpen }: LoadingOverlayProps) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Analyzing Career Profile...",
    "Structuring Executive Narrative...",
    "Optimizing for ATS Systems...",
    "Applying Typographic Hierarchy...",
    "Finalizing Gold Standard Design..."
  ];

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setStep((prev) => (prev + 1) % steps.length);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950/95 backdrop-blur-xl">
      <div className="relative mb-12">
        {/* Spinning Gold Loader */}
        <div className="w-32 h-32 border-4 border-navy-800 rounded-full" />
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-gold-400 rounded-full animate-spin" />
        <div className="absolute top-2 left-2 w-28 h-28 border-r-4 border-gold-600/50 rounded-full animate-spin-slow" />
        
        {/* Center Logo/Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-4xl">✨</span>
        </div>
      </div>

      <div className="h-24 text-center px-4">
        <h2 className="text-2xl font-light text-white mb-4">Crafting Your Premium Resume</h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-gold-400 font-mono text-lg tracking-widest uppercase"
          >
            {steps[step]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
