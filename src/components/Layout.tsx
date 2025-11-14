import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, BarChart3, AlertTriangle, Users, Menu, X, Moon, Sun, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AIAssistant from './AIAssistant';
import logo from '@/assets/logo.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: darkMode ? '☀️ Light mode enabled' : '🌙 Dark mode enabled',
      description: 'Theme preference updated',
    });
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Hospital Command', href: '/hospitals', icon: Users },
    { name: 'Outbreak Forecaster', href: '/forecaster', icon: BarChart3 },
    { name: 'Public Advisories', href: '/advisories', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="M-Pulse - Mumbai Health Command System" 
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  M-Pulse
                </span>
                <span className="text-xs text-muted-foreground">Mumbai Health Command</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className={isActive ? 'gradient-primary' : ''}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Real-time clock */}
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-sm font-medium text-foreground">
                {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </span>
              <span className="text-xs text-muted-foreground">IST</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAI(!showAI)}
              className="relative"
            >
              <MessageSquare className="h-4 w-4" />
              {showAI && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-secondary animate-pulse" />
              )}
            </Button>

            <Button variant="outline" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Admin
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-fade-in">
            <nav className="container py-4 flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={`w-full justify-start ${isActive ? 'gradient-primary' : ''}`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container py-6">{children}</main>

      {/* AI Assistant Sidebar */}
      {showAI && (
        <div className="fixed right-0 top-16 bottom-0 w-full md:w-96 z-40 animate-fade-in">
          <AIAssistant onClose={() => setShowAI(false)} />
        </div>
      )}
    </div>
  );
};

export default Layout;
