import { useState } from 'react';
import { Activity, Bed, Users, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { hospitals, type Hospital } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Hospitals = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const { toast } = useToast();

  const handleAutoAllocate = () => {
    toast({
      title: '🤖 AI Resource Allocation Running',
      description: 'Analyzing hospital capacity and patient distribution...',
    });
    
    setTimeout(() => {
      toast({
        title: '✅ Resources Allocated',
        description: 'Recommended 15 doctors to Sion Hospital, 8 beds freed at Cooper Hospital.',
      });
    }, 2000);
  };

  const chartData = hospitals.map(h => ({
    name: h.name.replace(' Hospital', ''),
    available: h.bedsAvailable,
    occupied: h.totalBeds - h.bedsAvailable,
    doctors: h.doctorsOnDuty,
  }));

  const getAlertBadge = (level: Hospital['alertLevel']) => {
    const variants = {
      low: 'success',
      moderate: 'warning',
      high: 'destructive',
    } as const;
    return <Badge variant={variants[level]}>{level.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hospital Command Center</h1>
          <p className="text-muted-foreground mt-1">
            Real-time resource monitoring and allocation
          </p>
        </div>
        <Button onClick={handleAutoAllocate} size="lg" className="gradient-primary shadow-glow">
          <Activity className="mr-2 h-5 w-5" />
          Auto-Allocate Resources
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
            <Bed className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hospitals.reduce((acc, h) => acc + h.bedsAvailable, 0)} / {hospitals.reduce((acc, h) => acc + h.totalBeds, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Available / Total</p>
            <Progress 
              value={(hospitals.reduce((acc, h) => acc + h.bedsAvailable, 0) / hospitals.reduce((acc, h) => acc + h.totalBeds, 0)) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doctors On Duty</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hospitals.reduce((acc, h) => acc + h.doctorsOnDuty, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all hospitals</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Alert Hospitals</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hospitals.filter(h => h.alertLevel === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Hospital Table */}
      <Card className="gradient-card shadow-elevated">
        <CardHeader>
          <CardTitle>Hospital Status</CardTitle>
          <CardDescription>Real-time capacity and staffing overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Beds Available</TableHead>
                  <TableHead>Doctors</TableHead>
                  <TableHead>Alert Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospitals.map((hospital) => (
                  <TableRow key={hospital.id} className="animate-slide-up">
                    <TableCell className="font-medium">{hospital.name}</TableCell>
                    <TableCell>{hospital.ward}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {hospital.bedsAvailable}/{hospital.totalBeds}
                        </span>
                        <Progress 
                          value={(hospital.bedsAvailable / hospital.totalBeds) * 100} 
                          className="w-16"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{hospital.doctorsOnDuty}</TableCell>
                    <TableCell>{getAlertBadge(hospital.alertLevel)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedHospital(hospital)}
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card shadow-elevated">
          <CardHeader>
            <CardTitle>Bed Availability</CardTitle>
            <CardDescription>Comparison across hospitals</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="available" fill="hsl(var(--success))" name="Available" />
                <Bar dataKey="occupied" fill="hsl(var(--muted))" name="Occupied" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-elevated">
          <CardHeader>
            <CardTitle>Doctor Deployment</CardTitle>
            <CardDescription>Current staffing levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="doctors" fill="hsl(var(--secondary))" name="Doctors on Duty" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-2xl m-4 shadow-elevated">
            <CardHeader>
              <CardTitle>{selectedHospital.name}</CardTitle>
              <CardDescription>Detailed Information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ward</p>
                  <p className="text-lg font-medium">{selectedHospital.ward}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alert Level</p>
                  {getAlertBadge(selectedHospital.alertLevel)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Beds</p>
                  <p className="text-lg font-medium">{selectedHospital.totalBeds}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Beds</p>
                  <p className="text-lg font-medium text-success">{selectedHospital.bedsAvailable}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Doctors on Duty</p>
                  <p className="text-lg font-medium">{selectedHospital.doctorsOnDuty}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                  <p className="text-lg font-medium">
                    {Math.round(((selectedHospital.totalBeds - selectedHospital.bedsAvailable) / selectedHospital.totalBeds) * 100)}%
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedHospital(null)}>
                  Close
                </Button>
                <Button className="gradient-primary">Request Resources</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Hospitals;
