import { useState } from 'react';
import { TrendingUp, Download, Play, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { generateOutbreakPredictions, generateCivicData } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Forecaster = () => {
  const [predictions, setPredictions] = useState(generateOutbreakPredictions());
  const [loading, setLoading] = useState(false);
  const civicData = generateCivicData();
  const { toast } = useToast();

  const runForecast = () => {
    setLoading(true);
    toast({
      title: '🤖 AI Forecasting Running',
      description: 'Analyzing weather patterns, civic data, and historical trends...',
    });

    setTimeout(() => {
      const newPredictions = generateOutbreakPredictions();
      setPredictions(newPredictions);
      setLoading(false);
      toast({
        title: '✅ Forecast Complete',
        description: `7-day prediction generated with ${civicData.confidence}% confidence`,
      });
    }, 3000);
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      civicData,
      predictions,
      confidence: civicData.confidence,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `m-pulse-forecast-${Date.now()}.json`;
    a.click();

    toast({
      title: '📥 Report Downloaded',
      description: 'Forecast data exported successfully',
    });
  };

  const chartData = predictions.map(p => ({
    date: new Date(p.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    cases: p.cases,
    confidence: p.confidence,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Outbreak Forecaster</h1>
          <p className="text-muted-foreground mt-1">
            Predictive analytics for disease surveillance
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportReport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={runForecast} disabled={loading} className="gradient-primary shadow-glow">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Run Forecast
          </Button>
        </div>
      </div>

      {/* Current Conditions */}
      <Card className="gradient-card shadow-elevated border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Current Risk Assessment
          </CardTitle>
          <CardDescription>Based on real-time civic and environmental data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Rainfall Index</span>
                  <span className="text-sm text-muted-foreground">{civicData.rainfall} mm</span>
                </div>
                <Progress value={(civicData.rainfall / 150) * 100} />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Air Quality Index</span>
                  <span className="text-sm text-muted-foreground">{civicData.aqi}</span>
                </div>
                <Progress value={(civicData.aqi / 300) * 100} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Event Density</span>
                  <Badge variant="outline">{civicData.eventDensity}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Predicted Outbreak</p>
                <p className="text-lg font-semibold">{civicData.predictedOutbreak}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                <Badge 
                  variant={civicData.riskLevel === 'high' ? 'destructive' : civicData.riskLevel === 'moderate' ? 'warning' : 'success'}
                  className="text-lg px-3 py-1"
                >
                  {civicData.riskLevel.toUpperCase()}
                </Badge>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <Progress value={civicData.confidence} className="flex-1" />
                  <span className="text-lg font-semibold">{civicData.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast Chart */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle>7-Day Case Projection</CardTitle>
          <CardDescription>Predicted daily case count by disease category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cases" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Predicted Cases"
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                name="Confidence %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Predictions */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle>Detailed Daily Predictions</CardTitle>
          <CardDescription>AI-generated outbreak forecast for the next week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-1">
                  <p className="font-medium">{new Date(prediction.date).toLocaleDateString('en-IN', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</p>
                  <p className="text-sm text-muted-foreground">{prediction.disease}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{prediction.cases} cases</p>
                    <p className="text-sm text-muted-foreground">{prediction.confidence}% confidence</p>
                  </div>
                  <Progress value={prediction.confidence} className="w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Methodology */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle>Forecasting Methodology</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            M-Pulse uses advanced machine learning algorithms to analyze:
          </p>
          <ul className="text-muted-foreground space-y-1 mt-2">
            <li><strong>Weather patterns:</strong> Rainfall, temperature, and humidity correlate with vector-borne diseases</li>
            <li><strong>Air quality:</strong> AQI levels predict respiratory illness surges</li>
            <li><strong>Event density:</strong> Public gatherings increase trauma and infectious disease transmission</li>
            <li><strong>Historical trends:</strong> Seasonal patterns and past outbreak data inform predictions</li>
            <li><strong>Hospital capacity:</strong> Real-time resource availability shapes allocation recommendations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forecaster;
