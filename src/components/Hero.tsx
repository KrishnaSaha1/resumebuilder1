import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Star, ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Hero = ({ onStart }: { onStart: () => void }) => {
  const [text, setText] = useState("");
  const fullText = "Craft Your Executive Resume in Seconds";
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-950 text-white px-4">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-navy-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.3),transparent_70%)]" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-navy-600/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-400/20 bg-gold-400/5 backdrop-blur-sm">
            <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
            <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">Premium Executive Suite</span>
            <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
          </div>
        </motion.div>

        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-2xl">
              {text}
            </span>
            <span className="animate-pulse text-gold-400 ml-1">|</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Leverage AI-driven precision to articulate your career narrative. 
            <span className="text-slate-200 font-medium"> Tailored for the C-Suite. Optimized for impact.</span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="pt-8 flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-navy-950 transition-all duration-300 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded-full hover:scale-105 shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:shadow-[0_0_70px_rgba(212,175,55,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Building
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="pt-12 flex justify-center gap-8 md:gap-16 text-slate-500"
        >
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>ATS Optimized</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-gold-400" />
            <span>Executive Formats</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
