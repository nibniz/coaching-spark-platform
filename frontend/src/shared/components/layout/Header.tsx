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

interface HeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  showAuthButtons?: boolean;
  showUserMenu?: boolean;
  title?: string;
}

export const Header = ({ 
  showBackButton = false, 
  backTo, 
  showAuthButtons = true, 
  showUserMenu = false,
  title
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && backTo && (
              <Link to={backTo} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
            )}
            
            <Link to={ROUTES.HOME} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MentorMatch</span>
            </Link>

            {title && (
              <span className="text-lg font-medium text-muted-foreground">{title}</span>
            )}
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            {showAuthButtons && !user && (
              <>
                <Link to={ROUTES.MENTORS}>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Find Mentors
                  </Button>
                </Link>
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
                <Link to={ROUTES.MENTORS}>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Find Mentors
                  </Button>
                </Link>
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
          <div className="md:hidden border-t bg-white">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {showAuthButtons && !user && (
                <>
                  <Link to={ROUTES.MENTORS} className="block text-foreground hover:text-primary transition-colors">
                    Find Mentors
                  </Link>
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
                  <Link to={ROUTES.MENTORS} className="block text-foreground hover:text-primary transition-colors">
                    Find Mentors
                  </Link>
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