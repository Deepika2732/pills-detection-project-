import { Pill, Github, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero shadow-glow">
                <Pill className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">PillDetect</span>
                <p className="text-xs text-muted-foreground">AI-Powered Pill Identification</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              An innovative deep learning-based pill detection system with intelligent 
              medicinal drug identification capabilities. Built with MobileNet architecture 
              and Python Flask framework.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#upload" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Detection
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Technology Stack</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Python</li>
              <li className="text-sm text-muted-foreground">MobileNet</li>
              <li className="text-sm text-muted-foreground">Flask</li>
              <li className="text-sm text-muted-foreground">TensorFlow</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 PillDetect. IEEE Final Year Project.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
