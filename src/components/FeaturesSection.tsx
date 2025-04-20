
import React from 'react';
import { AlertCircle, Heart, CalendarCheck, Users } from 'lucide-react';

const features = [
  {
    icon: AlertCircle,
    title: "Real-time Reporting",
    description: "Report stray or injured animals with photo uploads and location tagging for quick response."
  },
  {
    icon: Heart,
    title: "Adoption Network",
    description: "Browse animals available for adoption or foster care, and track your application status."
  },
  {
    icon: CalendarCheck,
    title: "Veterinary Services",
    description: "Book appointments with nearby veterinarians and maintain digital health records."
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Participate in forums, donate to causes, and receive alerts about animals in your area."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Our Core Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
