import { useState, useEffect } from 'react';
import { CloudRain, Wind, Calendar, AlertCircle, TrendingUp, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { generateCivicData, type CivicData } from '@/lib/mockData';
import MumbaiMap from '@/components/MumbaiMap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [civicData, setCivicData] = useState<CivicData>(generateCivicData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newData = generateCivicData();
      setCivicData(newData);
      setLastUpdate(new Date());
      setRefreshing(false);
      toast({
        title: '✅ Data Updated',
        description: `Risk level: ${newData.riskLevel.toUpperCase()} | Confidence: ${newData.confidence}%`,
      });
    }, 1500);
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      handleRefresh();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'moderate': return 'warning';
      default: return 'success';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg gradient-hero p-8 shadow-glow">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">
            Mumbai Health Command System
          </h1>
          <p className="text-lg text-primary-foreground/90 mb-6">
            AI-Driven Outbreak Prediction & Resource Management
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/forecaster">
              <Button size="lg" variant="secondary" className="shadow-elevated">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Detailed Forecast
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              {refreshing ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-5 w-5" />
              )}
              Update Data
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card shadow-elevated border-border/50 animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rainfall</CardTitle>
            <CloudRain className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{civicData.rainfall} mm</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
            <Progress value={(civicData.rainfall / 150) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-elevated border-border/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Air Quality Index</CardTitle>
            <Wind className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{civicData.aqi}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {civicData.aqi > 200 ? 'Poor' : civicData.aqi > 150 ? 'Moderate' : 'Good'}
            </p>
            <Progress value={(civicData.aqi / 300) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-elevated border-border/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Event Density</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{civicData.eventDensity}</div>
            <p className="text-xs text-muted-foreground mt-1">Public gatherings</p>
            <Badge variant="outline" className="mt-2">
              {civicData.eventDensity === 'High' ? 'Festival Season' : 'Normal'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-elevated border-border/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risk Forecast</CardTitle>
            <AlertCircle className={`h-4 w-4 text-${getRiskColor(civicData.riskLevel)}`} />
          </CardHeader>
          <CardContent>
            <Badge variant={getRiskColor(civicData.riskLevel)} className="text-lg px-3 py-1">
              {civicData.riskLevel.toUpperCase()}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">{civicData.predictedOutbreak}</p>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={civicData.confidence} className="flex-1" />
              <span className="text-xs font-medium">{civicData.confidence}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <Card className="gradient-card shadow-elevated border-border/50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle>Hospital Network - Live Map</CardTitle>
          <CardDescription>
            Real-time visualization of Mumbai's hospital infrastructure and alert levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MumbaiMap />
        </CardContent>
      </Card>

      {/* Status Bar */}
      <Card className="gradient-card shadow-elevated border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium">System Online</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString('en-IN')}
            </div>
            <Link to="/hospitals">
              <Button variant="outline">View All Hospitals</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
