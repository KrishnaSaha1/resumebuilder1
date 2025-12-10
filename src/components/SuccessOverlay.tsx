import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, RefreshCw, ExternalLink, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { useRef, useState, useEffect } from "react";
import { FeedbackModal } from "./FeedbackModal";

interface SuccessOverlayProps {
  isOpen: boolean;
  resumeHtml: string;
  pdfUrl?: string | null;
  onReset: () => void;
}

export const SuccessOverlay = ({ isOpen, resumeHtml, pdfUrl, onReset }: SuccessOverlayProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

  // Handle responsive scaling for mobile preview
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const resumeWidth = 850; // Standard A4 width in pixels for web
        
        // Calculate scale to fit parent width, maxing out at 1 (100%)
        // Subtracting padding (32px) to ensure it doesn't touch edges
        const newScale = Math.min(1, (parentWidth - 32) / resumeWidth);
        setScale(newScale);
      }
    };

    // Initial calculation
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Advanced Client-side PDF generation with Mobile Fix
  const handleClientDownload = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    
    try {
      // 1. Create a deep clone of the resume element
      const originalElement = resumeRef.current;
      const clone = originalElement.cloneNode(true) as HTMLElement;

      // 2. Create a hidden container attached to the body
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.top = '-10000px'; 
      wrapper.style.left = '-10000px';
      wrapper.style.width = '850px'; 
      wrapper.style.height = 'auto';
      wrapper.style.zIndex = '-1000';
      wrapper.style.overflow = 'visible'; 
      
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 3. Capture the CLONE
      const canvas = await html2canvas(clone, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 850, 
        width: 850, 
        onclone: (clonedDoc) => {
            const element = clonedDoc.body.getElementsByTagName('div')[0];
            if(element) {
                element.style.display = 'block';
            }
        }
      });

      // 4. Generate PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const imgWidth = 210; 
      const pageHeight = 297; 
      
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight; 
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save("Executive_Resume.pdf");

      document.body.removeChild(wrapper);

      // TRIGGER FEEDBACK MODAL AFTER DOWNLOAD
      setTimeout(() => {
        setShowFeedback(true);
      }, 1500);

    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-sm overflow-y-auto"
      >
        <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-8">
          
          {/* Header */}
          <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-10 gap-6 z-10 relative">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold-400/10 rounded-full border border-gold-400/20">
                <CheckCircle2 className="text-gold-400 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Resume Crafted</h2>
                <p className="text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  Ready for executive review
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="ghost" onClick={onReset} className="text-sm px-6">
                <RefreshCw className="w-4 h-4 mr-2" /> Create New
              </Button>
              
              {pdfUrl ? (
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setTimeout(() => setShowFeedback(true), 2000)}
                >
                  <Button className="shadow-lg shadow-gold-400/20">
                    <ExternalLink className="w-4 h-4 mr-2" /> Open PDF
                  </Button>
                </a>
              ) : (
                <Button 
                  onClick={handleClientDownload} 
                  isLoading={isDownloading}
                  className="shadow-lg shadow-gold-400/20"
                >
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </Button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div 
            className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl justify-center items-start relative"
            ref={containerRef}
          >
            
            {/* HTML Preview with Smart Scaling */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 w-full relative group flex justify-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-full bg-gradient-to-b from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl rounded-[2rem] pointer-events-none" />
              
              <div 
                style={{ 
                  width: 850, 
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  marginBottom: -((850 * (1 - scale)) * 1.4) 
                }}
                className="relative transition-transform duration-300 ease-out"
              >
                <div className="relative bg-white shadow-2xl rounded-sm overflow-hidden ring-1 ring-white/10">
                   <div 
                     ref={resumeRef}
                     dangerouslySetInnerHTML={{ __html: resumeHtml }} 
                     className="w-[850px] min-h-[1100px] bg-white text-black p-0 m-0 origin-top"
                   />
                </div>
              </div>
            </motion.div>

            {/* PDF Preview Iframe (if URL provided) */}
            {pdfUrl && (
              <motion.div 
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden xl:block w-[450px] h-[700px] sticky top-8"
              >
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                   <div className="bg-navy-900/80 p-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
                      <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        PDF Preview
                      </span>
                      <a href={pdfUrl} download className="text-gold-400 text-xs hover:text-gold-300 transition-colors uppercase tracking-wider font-medium">
                        Download File
                      </a>
                   </div>
                   <iframe 
                     src={pdfUrl} 
                     className="w-full h-full bg-slate-800" 
                     title="Resume PDF"
                   />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
    </>
  );
};
