import { Pill, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero shadow-glow">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">PillDetect</span>
              <span className="text-xs text-muted-foreground">AI-Powered Identification</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Home
            </a>
            <a href="#upload" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Detection
            </a>
            <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              About
            </a>
            <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Features
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="gradient-hero text-primary-foreground hover:opacity-90 shadow-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-3">
              <a href="#home" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                Home
              </a>
              <a href="#upload" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                Detection
              </a>
              <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                About
              </a>
              <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                Features
              </a>
              <Button className="gradient-hero text-primary-foreground mt-2 w-full">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
