import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPillsImage from "@/assets/hero-pills.jpg";

const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroPillsImage} 
          alt="Medical pills background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Deep Learning</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Detection and{" "}
              <span className="text-gradient">Identification</span>
              {" "}of Pills Using ML
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              An innovative deep learning-based pill detection system with intelligent 
              medicinal drug identification capabilities. Powered by advanced AI models 
              for accurate real-time recognition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-hero text-primary-foreground hover:opacity-90 shadow-glow group"
                onClick={scrollToUpload}
              >
                Start Detection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 hover:bg-primary/5"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">98.5%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">1000+</p>
                <p className="text-sm text-muted-foreground">Pills in Database</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">&lt;2s</p>
                <p className="text-sm text-muted-foreground">Detection Time</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Card */}
              <div className="absolute inset-0 rounded-3xl gradient-hero opacity-20 blur-2xl" />
              <div className="relative h-full rounded-3xl bg-card border border-border/50 shadow-elevated overflow-hidden p-8">
                {/* Decorative Pills */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-primary/20 animate-float" />
                <div className="absolute bottom-12 left-8 w-12 h-12 rounded-full bg-accent/20 animate-float" style={{ animationDelay: "-2s" }} />
                <div className="absolute top-1/3 right-12 w-8 h-8 rounded-full bg-success/20 animate-float" style={{ animationDelay: "-4s" }} />

                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-32 h-32 rounded-full gradient-hero flex items-center justify-center shadow-glow animate-pulse-slow">
                    <Shield className="w-16 h-16 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">AI-Powered Analysis</h3>
                    <p className="text-muted-foreground mt-2">
                      Upload pill images for instant identification
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10">
                      <Zap className="h-4 w-4 text-success" />
                      <span className="text-sm text-success font-medium">Real-time</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary font-medium">Deep Learning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
