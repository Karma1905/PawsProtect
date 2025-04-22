
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
          Help Animals in Need, Find Forever Homes
        </h2>
        <p className="text-muted-foreground text-lg">
          Report distressed animals, find adoption opportunities, connect with veterinarians, 
          and join a community of animal lovers making a difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">
            <Link to="/report">Report Animal in Distress</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/adopt">Adopt a Pet</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 rounded-lg overflow-hidden shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80" 
          alt="Rescue cat" 
          className="w-full h-auto object-cover" 
        />
      </div>
    </section>
  );
};

export default HeroSection;
