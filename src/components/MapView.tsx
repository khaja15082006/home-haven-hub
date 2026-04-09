import { useEffect, useMemo, useRef } from "react";
import { Property } from "@/data/properties";
import { MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// City coordinates for the 45 supported cities
const cityCoords: Record<string, [number, number]> = {
  Chennai: [13.0827, 80.2707],
  Bangalore: [12.9716, 77.5946],
  Hyderabad: [17.385, 78.4867],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.7041, 77.1025],
  Pune: [18.5204, 73.8567],
  Kolkata: [22.5726, 88.3639],
  Ahmedabad: [23.0225, 72.5714],
  Jaipur: [26.9124, 75.7873],
  Surat: [21.1702, 72.8311],
  Coimbatore: [11.0168, 76.9558],
  Madurai: [9.9252, 78.1198],
  Salem: [11.6643, 78.146],
  Trichy: [10.7905, 78.7047],
  Erode: [11.341, 77.7172],
  Tirunelveli: [8.7139, 77.7567],
  Vellore: [12.9165, 79.1325],
  Thoothukudi: [8.7642, 78.1348],
  Karur: [10.9601, 78.0766],
  Namakkal: [11.2189, 78.1674],
  Visakhapatnam: [17.6868, 83.2185],
  Vijayawada: [16.5062, 80.648],
  Guntur: [16.3067, 80.4365],
  Warangal: [17.9784, 79.5941],
  Nellore: [14.4426, 79.9865],
  Tirupati: [13.6288, 79.4192],
  Kurnool: [15.8281, 78.0373],
  Rajahmundry: [17.0005, 81.8040],
  Kadapa: [14.4674, 78.8241],
  Anantapur: [14.6819, 77.6006],
  Mysore: [12.2958, 76.6394],
  Mangalore: [12.9141, 74.856],
  Hubli: [15.3647, 75.124],
  Belgaum: [15.8497, 74.4977],
  Shimoga: [13.9299, 75.568],
  Davanagere: [14.4644, 75.9218],
  Ballari: [15.1394, 76.9214],
  Udupi: [13.3409, 74.7421],
  Hassan: [13.0068, 76.0996],
  Bidar: [17.9104, 77.5199],
  Kochi: [9.9312, 76.2673],
  Trivandrum: [8.5241, 76.9366],
  Calicut: [11.2588, 75.7804],
  Thrissur: [10.527, 76.2144],
  Kannur: [11.8745, 75.3704],
};

interface MapViewProps {
  properties: Property[];
  selectedCity?: string;
}

export default function MapView({ properties, selectedCity }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Group properties by city
  const cityCounts = useMemo(() => {
    const counts: Record<string, { count: number; avgPrice: number; types: Set<string> }> = {};
    properties.forEach((p) => {
      if (!counts[p.city]) counts[p.city] = { count: 0, avgPrice: 0, types: new Set() };
      counts[p.city].count++;
      counts[p.city].avgPrice += p.price;
      counts[p.city].types.add(p.type);
    });
    Object.values(counts).forEach((c) => (c.avgPrice = Math.round(c.avgPrice / c.count)));
    return counts;
  }, [properties]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Dynamically import leaflet
    const loadMap = async () => {
      const L = await import("leaflet");
      
      // Add leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      // Wait for CSS
      await new Promise((r) => setTimeout(r, 100));

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const center = selectedCity && cityCoords[selectedCity]
        ? cityCoords[selectedCity]
        : [20.5937, 78.9629] as [number, number];
      const zoom = selectedCity ? 10 : 5;

      const map = L.map(mapRef.current!, { scrollWheelZoom: false }).setView(center, zoom);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Add markers for each city
      Object.entries(cityCounts).forEach(([city, data]) => {
        const coords = cityCoords[city];
        if (!coords) return;

        const markerIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
            background: linear-gradient(135deg, hsl(217, 91%, 60%), hsl(217, 91%, 45%));
            color: white;
            border-radius: 50%;
            width: ${Math.min(40 + data.count, 56)}px;
            height: ${Math.min(40 + data.count, 56)}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 13px;
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
            border: 3px solid white;
          ">${data.count}</div>`,
          iconSize: [Math.min(40 + data.count, 56), Math.min(40 + data.count, 56)],
          iconAnchor: [Math.min(40 + data.count, 56) / 2, Math.min(40 + data.count, 56) / 2],
        });

        const marker = L.marker(coords, { icon: markerIcon }).addTo(map);
        marker.bindPopup(`
          <div style="min-width: 180px; font-family: system-ui, sans-serif;">
            <h3 style="margin: 0 0 6px; font-size: 16px; font-weight: 700;">${city}</h3>
            <p style="margin: 0 0 4px; color: #6b7280; font-size: 13px;">
              ${data.count} properties available
            </p>
            <p style="margin: 0 0 4px; color: #6b7280; font-size: 13px;">
              Avg. ₹${data.avgPrice.toLocaleString()}/night
            </p>
            <p style="margin: 0; color: #6b7280; font-size: 13px;">
              Types: ${Array.from(data.types).join(", ")}
            </p>
            <a href="/properties?city=${city}" style="
              display: inline-block;
              margin-top: 8px;
              padding: 4px 12px;
              background: hsl(217, 91%, 60%);
              color: white;
              border-radius: 6px;
              text-decoration: none;
              font-size: 12px;
              font-weight: 600;
            ">View Properties →</a>
          </div>
        `);
      });

      // Fix for map tiles not loading fully
      setTimeout(() => map.invalidateSize(), 200);
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [cityCounts, selectedCity]);

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
      <div className="flex items-center gap-2 border-b px-5 py-3">
        <MapPin className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Map View</span>
        <span className="text-xs text-muted-foreground">— {Object.keys(cityCounts).length} cities</span>
      </div>
      <div ref={mapRef} className="h-[400px] w-full lg:h-[500px]" />
    </div>
  );
}
