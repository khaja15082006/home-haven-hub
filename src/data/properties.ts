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

const images = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80",
];

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
