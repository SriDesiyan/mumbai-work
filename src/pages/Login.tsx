import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (email && password) {
        toast({
          title: '✅ Login Successful',
          description: 'Welcome to M-Pulse Admin Panel',
        });
        navigate('/');
      } else {
        toast({
          title: '❌ Login Failed',
          description: 'Please enter valid credentials',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast({
      title: '📧 Password Reset',
      description: 'Check your email for reset instructions',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Activity className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            M-Pulse
          </h1>
          <p className="text-sm text-muted-foreground">Mumbai Health Command System</p>
        </div>

        {/* Login Card */}
        <Card className="gradient-card shadow-elevated border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Access the health command dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@mpulse.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary shadow-glow"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="gradient-card shadow-elevated border-border/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center mb-3">
              Demo Credentials (for testing):
            </p>
            <div className="space-y-1 text-sm font-mono text-center">
              <p>Email: <span className="text-primary">admin@mpulse.gov.in</span></p>
              <p>Password: <span className="text-primary">demo123</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Secured by Government of Maharashtra
        </p>
      </div>
    </div>
  );
};

export default Login;
