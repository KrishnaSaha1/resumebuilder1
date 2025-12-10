import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Briefcase, GraduationCap, Award, User, Globe } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(2, "Location is required"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  jobtitle: z.string().min(2, "Target Job Title is required"),
  "professional summary": z.string().min(50, "Summary should be at least 50 characters"),
  "work experience": z.string().min(50, "Please detail your work experience"),
  education: z.string().min(10, "Education details are required"),
  skills: z.string().min(10, "Please list your core competencies"),
  projects: z.string().optional(),
  certification: z.string().optional(),
  language: z.string().optional(),
  achievements: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

interface ResumeFormProps {
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
}

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
  <div className="flex items-start gap-4 mb-8 border-b border-white/5 pb-6">
    <div className="p-3 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 shadow-lg">
      <Icon className="text-gold-400 w-6 h-6" />
    </div>
    <div>
      <h3 className="text-2xl font-semibold text-white tracking-tight">{title}</h3>
      {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
    </div>
  </div>
);

export const ResumeForm = ({ onSubmit, isSubmitting }: ResumeFormProps) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Smart Ad Logic adapted for React with UX Feedback
  const smartAdGenerate = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isWaiting || isSubmitting) return;

    console.log("💰 Adsterra earning clicked!");

    // 1. Validate the form first
    const isFormValid = await trigger();
    if (!isFormValid) {
      const firstError = document.querySelector('.text-red-400');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // =========================================================================
    // ⬇️ LOCATION 1: The logic to open the Adsterra link in a new tab
    // =========================================================================
    window.open("https://www.effectivegatecpm.com/h13w1krm1?key=a30e9ebd91d824f4a28ba9d32b7872fe", "_blank");

    // 3. Set waiting state and start countdown
    setIsWaiting(true);

    // 4. Wait 7 seconds, then submit
    setTimeout(() => {
        setIsWaiting(false);
        handleSubmit(onSubmit)();
    }, 7000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4 md:px-6 relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-400/20 to-transparent pointer-events-none" />
      
      <form className="space-y-16 relative z-10">
        
        {/* Personal Info Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="glass-card glass-card-hover p-8 md:p-10 rounded-3xl"
        >
          <SectionHeader 
            icon={User} 
            title="Executive Profile" 
            subtitle="Your personal brand foundation"
          />
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <Input label="Full Name" {...register("name")} error={errors.name?.message} />
            </div>
            <Input label="Email Address" type="email" {...register("email")} error={errors.email?.message} />
            <Input label="Phone Number" {...register("phone")} error={errors.phone?.message} />
            <Input label="Location (City, State)" {...register("location")} error={errors.location?.message} />
            <Input label="Target Job Title" {...register("jobtitle")} error={errors.jobtitle?.message} />
            <Input label="LinkedIn URL" {...register("linkedin")} error={errors.linkedin?.message} />
            <Input label="Portfolio / Website" {...register("portfolio")} error={errors.portfolio?.message} />
          </motion.div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="glass-card glass-card-hover p-8 md:p-10 rounded-3xl"
        >
          <SectionHeader 
            icon={Award} 
            title="Professional Summary" 
            subtitle="Highlight your leadership philosophy and impact"
          />
          <motion.div variants={itemVariants}>
            <Textarea 
              label="Executive Summary (4-6 lines)" 
              {...register("professional summary")} 
              error={errors["professional summary"]?.message}
              className="min-h-[180px] text-lg leading-relaxed"
            />
          </motion.div>
        </motion.div>

        {/* Experience */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="glass-card glass-card-hover p-8 md:p-10 rounded-3xl"
        >
          <SectionHeader 
            icon={Briefcase} 
            title="Professional Experience" 
            subtitle="Quantify your achievements and career progression"
          />
          <motion.div variants={itemVariants}>
            <Textarea 
              label="Work History" 
              {...register("work experience")} 
              error={errors["work experience"]?.message}
              className="min-h-[350px] font-mono text-sm"
            />
            <div className="flex justify-end mt-3">
              <span className="text-xs text-gold-400/80 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
                Tip: Use markdown for bolding key metrics
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Education & Skills */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="glass-card glass-card-hover p-8 md:p-10 rounded-3xl"
        >
          <SectionHeader 
            icon={GraduationCap} 
            title="Credentials & Competencies" 
            subtitle="Academic background and core strengths"
          />
          <motion.div variants={itemVariants} className="space-y-8">
            <Textarea 
              label="Education (Degrees, Universities, Years)" 
              {...register("education")} 
              error={errors.education?.message}
            />
            <Textarea 
              label="Core Skills (Leadership, Technical, Strategic)" 
              {...register("skills")} 
              error={errors.skills?.message}
            />
          </motion.div>
        </motion.div>

        {/* Additional Sections */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="glass-card glass-card-hover p-8 md:p-10 rounded-3xl"
        >
          <SectionHeader 
            icon={Globe} 
            title="Additional Information" 
            subtitle="Projects, languages, and accolades"
          />
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8">
            <Textarea label="Key Projects" {...register("projects")} />
            <Textarea label="Certifications & Licenses" {...register("certification")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Textarea label="Languages" {...register("language")} />
              <Textarea label="Awards & Achievements" {...register("achievements")} />
            </div>
          </motion.div>
        </motion.div>

        <div className="flex justify-center pt-12 pb-32">
          {isSubmitting ? (
             <div className="text-gold-400 animate-pulse text-xl font-medium flex items-center gap-3">
               <div className="w-5 h-5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
               Processing...
             </div>
          ) : (
            // =========================================================================
            // ⬇️ LOCATION 2: The Button that triggers the ad and submission
            // =========================================================================
            <a 
              href="https://www.effectivegatecpm.com/vysggtzgs?key=50cf6d27e1edfe98531983926d2b63fd" 
              className={`adsterra-btn ${isWaiting ? 'opacity-90 cursor-wait scale-105' : ''}`}
              onClick={smartAdGenerate}
            >
              {isWaiting ? "⏳ Finalizing Resume..." : "🚀 FREE ATS Resume in 30s"}
            </a>
          )}
        </div>
      </form>
    </div>
  );
};
