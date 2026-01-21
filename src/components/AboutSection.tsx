import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertTriangle, Pill } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">IEEE 2023 Project</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              About This Project
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              There is a pressing need to develop computerized medication systems that 
              leverage information technology to accurately identify medications and 
              detect potential interactions between them.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This project introduces an innovative deep learning-based pill detection 
              system with intelligent medicinal drug identification capabilities. The 
              system is developed using Python programming language and utilizes the 
              <strong className="text-foreground"> MobileNet architecture </strong> 
              as the underlying model.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-sm">
                  <strong>Python</strong> - Implementation using Python programming language
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-sm">
                  <strong>MobileNet</strong> - Deep learning architecture for image classification
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-sm">
                  <strong>Flask</strong> - Web framework for REST API implementation
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-sm">
                  <strong>HTML, CSS, JS</strong> - Frontend user interface
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="result-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Problem Statement</h3>
                  <p className="text-sm text-muted-foreground">Why this matters</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Medications are very important to all organisms, especially humans. 
                If there is any wrong or misuse of medications, it may lead to death 
                or any kinds of side effects. Therefore, it is important to identify 
                which type of pill or medication we are taking.
              </p>
            </div>

            <div className="result-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Key Challenges</h3>
                  <p className="text-sm text-muted-foreground">Addressing medication safety</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                  Medication identification errors in healthcare settings
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                  Look-alike pills causing confusion
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                  Drug interaction detection requirements
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
