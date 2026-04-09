const cities = [
  "Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Surat",
  "Coimbatore", "Madurai", "Salem", "Trichy", "Erode",
  "Tirunelveli", "Vellore", "Thoothukudi", "Karur", "Namakkal",
  "Visakhapatnam", "Vijayawada", "Guntur", "Warangal", "Nellore",
  "Tirupati", "Kurnool", "Rajahmundry", "Kadapa", "Anantapur",
  "Mysore", "Mangalore", "Hubli", "Belgaum", "Shimoga",
  "Davanagere", "Ballari", "Udupi", "Hassan", "Bidar",
  "Kochi", "Trivandrum", "Calicut", "Thrissur", "Kannur",
];

const types = ["House", "Villa", "Lodge"] as const;

const houseImages = [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80",
];

const villaImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
];

const lodgeImages = [
  "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
];

const imagesByType: Record<string, string[]> = {
  House: houseImages,
  Villa: villaImages,
  Lodge: lodgeImages,
};

export interface Property {
  id: string;
  title: string;
  city: string;
  type: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

const adjectives = ["Luxury", "Cozy", "Modern", "Elegant", "Spacious", "Premium", "Royal", "Grand", "Charming", "Classic", "Serene", "Beautiful", "Stylish", "Deluxe", "Heritage"];

export const properties: Property[] = cities.flatMap((city) =>
  Array.from({ length: 15 }, (_, i) => ({
    id: `${city}_${i}`,
    title: `${adjectives[i % adjectives.length]} ${types[i % 3]} in ${city}`,
    city,
    type: types[i % 3],
    price: 2000 + i * 350,
    image: images[i % images.length],
    bedrooms: 1 + (i % 4),
    bathrooms: 1 + (i % 3),
    area: 800 + i * 120,
  }))
);

export const allCities = cities;
