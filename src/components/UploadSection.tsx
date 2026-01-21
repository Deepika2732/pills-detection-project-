import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImageIcon, X, Loader2, CheckCircle, AlertCircle, History, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import pillsAnalysisImage from "@/assets/pills-analysis.jpg";

interface DetectionResult {
  pillName: string;
  confidence: number;
  manufacturer: string;
  dosage: string;
  description: string;
  warnings: string[];
  aiReasoning?: string;
}

interface RecentDetection {
  id: string;
  pill_name: string;
  confidence: number;
  detected_at: string;
}

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [recentDetections, setRecentDetections] = useState<RecentDetection[]>([]);

  // Fetch recent detections with realtime subscription
  useEffect(() => {
    const fetchRecentDetections = async () => {
      const { data, error } = await supabase
        .from("pill_detections")
        .select("id, pill_name, confidence, detected_at")
        .order("detected_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setRecentDetections(data);
      }
    };

    fetchRecentDetections();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("pill_detections_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "pill_detections",
        },
        (payload) => {
          const newDetection = payload.new as RecentDetection;
          setRecentDetections((prev) => [newDetection, ...prev.slice(0, 4)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setUploadedImage(imageData);
      analyzeWithAI(imageData);
    };
    reader.readAsDataURL(file);
  };

  const analyzeWithAI = async (imageData: string) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      // Extract color/shape description from image for AI analysis
      const imageDescription = "A medicinal pill or capsule that needs to be identified based on its visual characteristics";

      const response = await supabase.functions.invoke("analyze-pill", {
        body: {
          imageDescription,
          imageBase64: imageData.split(",")[1] // Remove data:image prefix
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const data = response.data;
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult({
        pillName: data.pillName,
        confidence: data.confidence,
        manufacturer: data.manufacturer,
        dosage: data.dosage,
        description: data.description,
        warnings: data.warnings,
        aiReasoning: data.aiReasoning,
      });

      toast.success("Pill identified successfully!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze pill. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearUpload = () => {
    setUploadedImage(null);
    setResult(null);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <section id="upload" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Detection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pill Detection System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image of a pill to identify it using our AI-powered detection system. 
            Get instant results with drug information and safety warnings.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className={`upload-zone min-h-[400px] p-8 flex flex-col items-center justify-center ${
                isDragging ? "active" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <AnimatePresence mode="wait">
                {!uploadedImage ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <img 
                        src={pillsAnalysisImage} 
                        alt="Pills for analysis" 
                        className="w-full h-full object-cover rounded-2xl opacity-60"
                      />
                      <div className="absolute inset-0 rounded-2xl gradient-hero opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Upload className="w-10 h-10 text-primary-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Upload Pill Image
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Drag and drop an image here, or click to browse
                    </p>
                    <label htmlFor="file-upload">
                      <Button asChild className="cursor-pointer gradient-hero text-primary-foreground">
                        <span>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Browse Files
                        </span>
                      </Button>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <p className="text-xs text-muted-foreground mt-4">
                      Supports: JPG, PNG, WEBP (Max 10MB)
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full"
                  >
                    <button
                      onClick={clearUpload}
                      className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={uploadedImage}
                      alt="Uploaded pill"
                      className="w-full h-64 object-contain rounded-xl bg-card"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-foreground font-medium">Analyzing with AI...</p>
                        <p className="text-sm text-muted-foreground">Processing image data</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Recent Detections */}
            {recentDetections.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-card border border-border/50"
              >
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" />
                  Recent Detections (Live)
                </h4>
                <div className="space-y-2">
                  {recentDetections.map((detection) => (
                    <div
                      key={detection.id}
                      className="flex items-center justify-between text-sm p-2 rounded-lg bg-secondary/50"
                    >
                      <span className="text-foreground font-medium">{detection.pill_name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-success">{detection.confidence}%</span>
                        <span className="text-muted-foreground text-xs">{formatTime(detection.detected_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="result-card min-h-[400px]">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Detection Results
              </h3>

              <AnimatePresence mode="wait">
                {!result && !isAnalyzing && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-80 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Upload a pill image to see detection results
                    </p>
                  </motion.div>
                )}

                {isAnalyzing && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                        <div className="h-6 bg-muted rounded w-full" />
                      </div>
                    ))}
                  </motion.div>
                )}

                {result && !isAnalyzing && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Identified Pill</p>
                        <p className="text-xl font-bold text-foreground">{result.pillName}</p>
                      </div>
                      <div className="pill-badge pill-badge-success">
                        {result.confidence}% Match
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-xs text-muted-foreground mb-1">Manufacturer</p>
                        <p className="text-sm font-medium text-foreground">{result.manufacturer}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <p className="text-xs text-muted-foreground mb-1">Dosage</p>
                        <p className="text-sm font-medium text-foreground">{result.dosage}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Description</p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {result.description}
                      </p>
                    </div>

                    {result.aiReasoning && (
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-xs text-primary font-medium mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Analysis
                        </p>
                        <p className="text-sm text-foreground">{result.aiReasoning}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-warning" />
                        Warnings
                      </p>
                      <ul className="space-y-1">
                        {result.warnings.map((warning, index) => (
                          <li
                            key={index}
                            className="text-sm text-foreground flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
