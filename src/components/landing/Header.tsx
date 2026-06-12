import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import labcibeLogo from "@/assets/LabCIBE-UNA.jpg";
import { REPORTS_URL } from "@/lib/config";

const NAV_ITEMS: { id: string; label: string }[] = [
  { id: "about", label: "Acerca de" },
  { id: "research", label: "Investigación" },
  { id: "projects", label: "Proyectos" },
  { id: "contact", label: "Contacto" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (id: string) => {
    if (!isLandingPage) {
      navigate(`/#${id}`);
      closeMenu();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  const goHome = () => {
    if (!isLandingPage) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeMenu();
  };

  const goToReportWizard = () => {
    closeMenu();
    navigate(REPORTS_URL);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={labcibeLogo}
                alt="LabCIBE-UNA"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-foreground">
                LabCIBE-UNA
              </span>
              <p className="text-xs text-muted-foreground">
                Laboratorio de Ciberseguridad
              </p>
            </div>
            <div className="ml-2 pl-2 sm:ml-4 sm:pl-4 border-l border-border">
              <img
                src="/Logo/UNA_rojo_gris.webp"
                alt="Universidad Nacional"
                className="h-8 sm:h-10 w-auto"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={goHome}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Inicio
            </button>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              onClick={goToReportWizard}
            >
              Reportar fraude
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="md:hidden py-6 border-t border-border animate-in slide-in-from-top-2 duration-200"
            aria-label="Navegación móvil"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={goHome}
                className="text-left py-2 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
              >
                Inicio
              </button>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 px-4 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full"
                onClick={goToReportWizard}
              >
                Reportar fraude
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
