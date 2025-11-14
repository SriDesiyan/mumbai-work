import { useState } from 'react';
import { AlertTriangle, Send, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { publicAdvisories } from '@/lib/mockData';

type Language = 'en' | 'hi' | 'mr';

const Advisories = () => {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const { toast } = useToast();

  const sendAlert = (advisoryId: string) => {
    toast({
      title: '📱 Public Alert Sent',
      description: 'SMS and app notifications triggered to affected wards',
    });
  };

  const getSeverityColor = (severity: 'low' | 'moderate' | 'high') => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'moderate': return 'warning';
      default: return 'default';
    }
  };

  const languageNames: Record<Language, string> = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Public Advisory System</h1>
          <p className="text-muted-foreground mt-1">
            Real-time health alerts for Mumbai citizens
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
              <Button
                key={lang}
                variant={selectedLang === lang ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedLang(lang);
                  toast({
                    title: '🌐 Language Changed',
                    description: `Advisory messages now in ${languageNames[lang]}`,
                  });
                }}
                className={selectedLang === lang ? 'gradient-primary' : ''}
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Advisories */}
      <div className="space-y-4">
        {publicAdvisories.map((advisory) => (
          <Card
            key={advisory.id}
            className="gradient-card shadow-elevated border-l-4 animate-slide-up"
            style={{
              borderLeftColor: 
                advisory.severity === 'high' ? 'hsl(var(--destructive))' :
                advisory.severity === 'moderate' ? 'hsl(var(--warning))' :
                'hsl(var(--success))'
            }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle 
                      className={`h-5 w-5 ${
                        advisory.severity === 'high' ? 'text-destructive' :
                        advisory.severity === 'moderate' ? 'text-warning' :
                        'text-muted-foreground'
                      }`}
                    />
                    <CardTitle className="text-xl">{advisory.title}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getSeverityColor(advisory.severity)}>
                      {advisory.severity.toUpperCase()}
                    </Badge>
                    {advisory.wards.map((ward) => (
                      <Badge key={ward} variant="outline">
                        {ward}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => sendAlert(advisory.id)}
                  size="sm"
                  className="gradient-primary shadow-glow"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Alert
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium mb-2">Message ({languageNames[selectedLang]}):</p>
                  <p className="text-base leading-relaxed">
                    {advisory.translations[selectedLang]}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Active since: {new Date().toLocaleDateString('en-IN')}</span>
                  <span>Affected Population: ~{Math.floor(Math.random() * 500000 + 100000).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advisory Guidelines */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle>Advisory Guidelines</CardTitle>
          <CardDescription>How to stay safe and when to seek medical attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 text-destructive">⚠️ High Risk Situations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Fever with body ache after rainfall exposure</li>
                <li>• Difficulty breathing during poor AQI days</li>
                <li>• Injuries in crowded festival areas</li>
                <li>• Contact with contaminated water sources</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 text-warning">🔶 Preventive Measures</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Avoid wading through stagnant water</li>
                <li>• Use N95 masks on high AQI days</li>
                <li>• Maintain hygiene at public gatherings</li>
                <li>• Stay hydrated and avoid peak sun hours</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 text-success">✅ When to Seek Medical Help</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Persistent fever for more than 2 days</li>
                <li>• Severe breathing difficulties</li>
                <li>• Unusual rashes or skin infections</li>
                <li>• Dehydration or severe weakness</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 text-primary">📞 Emergency Contacts</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Emergency: 108 (Ambulance)</li>
                <li>• BMC Health: 1916</li>
                <li>• Control Room: 022-22694725</li>
                <li>• WhatsApp: +91-XXXX-XXXXXX</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Stats */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle>Advisory Reach Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-primary">2.4M</p>
              <p className="text-sm text-muted-foreground mt-1">SMS Sent</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-secondary">1.8M</p>
              <p className="text-sm text-muted-foreground mt-1">App Notifications</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-accent">24</p>
              <p className="text-sm text-muted-foreground mt-1">Wards Covered</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-3xl font-bold text-success">98%</p>
              <p className="text-sm text-muted-foreground mt-1">Delivery Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Advisories;
