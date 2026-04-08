import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Properties", to: "/properties" },
      { label: "Featured Homes", to: "/properties" },
      { label: "Cities", to: "/properties" },
      { label: "Pricing", to: "/properties" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/contact" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/contact" },
      { label: "Press Kit", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/contact" },
      { label: "FAQs", to: "/contact" },
      { label: "Privacy Policy", to: "/contact" },
      { label: "Terms of Service", to: "/contact" },
    ],
  },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="gradient-dark mt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-primary-foreground">StayFinder</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              Discover your perfect home away from home. Premium properties across 45+ cities in India, curated for comfort and luxury.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <button
                  key={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/10 text-primary-foreground/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-primary-foreground">{group.title}</h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group flex items-center gap-1 text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-12 flex flex-wrap gap-6 border-t border-primary-foreground/10 pt-8">
          <a href="mailto:hello@stayfinder.in" className="flex items-center gap-2 text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground">
            <Mail className="h-4 w-4" /> hello@stayfinder.in
          </a>
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground">
            <Phone className="h-4 w-4" /> +91 98765 43210
          </a>
          <span className="flex items-center gap-2 text-sm text-primary-foreground/50">
            <MapPin className="h-4 w-4" /> Chennai, India
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} StayFinder. All rights reserved. Built with ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
