import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import { 
  Search, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  ArrowLeft 
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";

interface HeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  showAuthButtons?: boolean;
  showUserMenu?: boolean;
  showNavigation?: boolean;
  title?: string;
  logoLink?: string;
}

export const Header = ({ 
  showBackButton = false, 
  backTo, 
  showAuthButtons = true, 
  showUserMenu = false,
  showNavigation = false,
  title,
  logoLink
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && backTo && (
              <Link to={backTo} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
            )}
            
            <Link to={logoLink || ROUTES.HOME} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MentorMatch</span>
            </Link>

            {showNavigation && (
              <nav className="hidden md:flex items-center space-x-8 ml-8">
                <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
                <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/resources" className="text-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </nav>
            )}

            {title && (
              <span className="text-lg font-medium text-muted-foreground">{title}</span>
            )}
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle - Always visible */}
            <ThemeToggle variant="icon-only" />
            
            {showAuthButtons && !user && (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to={ROUTES.SIGNUP_MENTOR}>
                  <Button>Become a Mentor</Button>
                </Link>
              </>
            )}

            {showUserMenu && user && (
              <>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm">{user.avatar}</span>
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Theme Toggle in Mobile Menu */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle variant="compact" />
              </div>
              {showNavigation && (
                <>
                  <Link to="/how-it-works" className="block text-foreground hover:text-primary transition-colors">
                    How It Works
                  </Link>
                  <Link to="/pricing" className="block text-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                  <Link to="/about" className="block text-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                  <Link to="/contact" className="block text-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                  <Link to="/resources" className="block text-foreground hover:text-primary transition-colors">
                    Resources
                  </Link>
                </>
              )}

              {showAuthButtons && !user && (
                <>
                  <Link to={ROUTES.LOGIN} className="block text-foreground hover:text-primary transition-colors">
                    Sign In
                  </Link>
                  <Link to={ROUTES.SIGNUP_MENTOR} className="block">
                    <Button className="w-full">Become a Mentor</Button>
                  </Link>
                </>
              )}

              {showUserMenu && user && (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-sm">{user.avatar}</span>
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Button variant="ghost" className="w-full" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 