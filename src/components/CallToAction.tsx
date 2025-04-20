
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-primary/5 rounded-2xl my-12">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join our community of animal lovers and help create a better world for animals in need.
          Report, adopt, volunteer, or donate - every action counts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">
            <Link to="/register">Join Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/donate">Make a Donation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
