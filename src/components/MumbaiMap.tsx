import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { hospitals } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MumbaiMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSet, setTokenSet] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || !tokenSet || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [72.8777, 19.0760], // Mumbai coordinates
        zoom: 11,
        pitch: 45,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for hospitals
      hospitals.forEach((hospital) => {
        const el = document.createElement('div');
        el.className = 'hospital-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        
        const alertColors = {
          low: '#10b981',
          moderate: '#f59e0b',
          high: '#ef4444'
        };
        el.style.backgroundColor = alertColors[hospital.alertLevel];

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${hospital.name}</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 4px;">${hospital.ward}</p>
            <p style="font-size: 12px;">Beds: ${hospital.bedsAvailable}/${hospital.totalBeds}</p>
            <p style="font-size: 12px;">Doctors: ${hospital.doctorsOnDuty}</p>
            <p style="font-size: 12px; margin-top: 4px;">
              <span style="color: ${alertColors[hospital.alertLevel]}; font-weight: bold;">
                ● ${hospital.alertLevel.toUpperCase()}
              </span>
            </p>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat(hospital.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

      map.current.on('load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      });

    } catch (error) {
      toast({
        title: 'Map Error',
        description: 'Invalid Mapbox token. Please check your token and try again.',
        variant: 'destructive',
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [tokenSet, mapboxToken, toast]);

  const handleSetToken = () => {
    if (mapboxToken.trim()) {
      setTokenSet(true);
      toast({
        title: 'Token Set',
        description: 'Mapbox token configured successfully',
      });
    }
  };

  if (!tokenSet) {
    return (
      <div className="relative w-full h-[500px] rounded-lg border border-border bg-muted flex items-center justify-center">
        <div className="max-w-md p-6 space-y-4">
          <h3 className="text-lg font-semibold text-center">Configure Mapbox</h3>
          <p className="text-sm text-muted-foreground text-center">
            Enter your Mapbox public token to display the interactive Mumbai map with hospital locations.
            Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSetToken} className="gradient-primary">
              Set Token
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-elevated" />
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur p-3 rounded-lg shadow-elevated border border-border">
        <h4 className="text-sm font-semibold mb-1">Hospital Network</h4>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>Low Alert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span>Moderate Alert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span>High Alert</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MumbaiMap;
