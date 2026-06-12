import { Button } from "@/components/ui/button";
import { FlaskConical, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-cyber.jpg";
import { REPORTS_URL } from "@/lib/config";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToReportWizard = () => {
    navigate(REPORTS_URL);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden mt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <FlaskConical className="w-8 h-8 text-primary-foreground" />
          </div>

          {/* Tagline */}
          <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-primary-foreground/70 mb-4 animate-in fade-in duration-700">
            Universidad Nacional de Costa Rica
          </p>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            LabCIBE-UNA
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-primary-foreground/85 mt-3">
              Investigación e innovación en ciberseguridad
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Somos el Laboratorio de Investigación, Desarrollo e Innovación en
            Ciberseguridad de la Universidad Nacional. Impulsamos proyectos
            académicos y servicios para fortalecer la seguridad digital de la
            comunidad costarricense.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-full shadow-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={scrollToAbout}
            >
              Conocer el laboratorio
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground/60 text-lg px-8 py-6 rounded-full transition-all duration-300"
              onClick={goToReportWizard}
            >
              <Shield className="w-5 h-5 mr-2" />
              Reportar un fraude
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-[-1px] left-0 right-0">
        <svg
          className="w-full h-auto block"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
