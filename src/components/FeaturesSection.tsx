import { motion } from "framer-motion";
import { Brain, Zap, Shield, Database, Eye, Code } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "MobileNet Architecture",
    description: "Powered by state-of-the-art MobileNet deep learning model for accurate pill classification and identification.",
  },
  {
    icon: Zap,
    title: "Real-time Detection",
    description: "Lightning-fast analysis with results in under 2 seconds. Upload and get instant identification.",
  },
  {
    icon: Eye,
    title: "Image Recognition",
    description: "Advanced computer vision algorithms detect pill shape, color, imprint codes, and size for precise matching.",
  },
  {
    icon: Database,
    title: "Extensive Database",
    description: "Access to over 1000+ medication records with detailed drug information, dosages, and manufacturer data.",
  },
  {
    icon: Shield,
    title: "Safety Warnings",
    description: "Comprehensive drug interaction warnings and safety information to prevent medication errors.",
  },
  {
    icon: Code,
    title: "Flask Backend",
    description: "Robust Python Flask framework with REST API for seamless integration with healthcare systems.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our pill detection system leverages cutting-edge machine learning 
            technology to provide accurate and reliable medication identification.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="result-card group"
            >
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
