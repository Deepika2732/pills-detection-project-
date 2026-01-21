import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImageIcon, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetectionResult {
  pillName: string;
  confidence: number;
  manufacturer: string;
  dosage: string;
  description: string;
  warnings: string[];
}

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

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
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      simulateAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call - this will be replaced with actual backend call
    setTimeout(() => {
      setResult({
        pillName: "Aspirin 500mg",
        confidence: 97.8,
        manufacturer: "Bayer Healthcare",
        dosage: "500mg per tablet",
        description: "Aspirin is used to reduce fever and relieve mild to moderate pain from conditions such as muscle aches, toothaches, common cold, and headaches.",
        warnings: [
          "Do not use if allergic to aspirin",
          "Consult doctor if pregnant",
          "Keep out of reach of children"
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const clearUpload = () => {
    setUploadedImage(null);
    setResult(null);
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
                    <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow">
                      <Upload className="w-10 h-10 text-primary-foreground" />
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
                        <p className="text-foreground font-medium">Analyzing image...</p>
                        <p className="text-sm text-muted-foreground">Using MobileNet model</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
