
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CallToAction />
    </div>
  );
};

export default Index;
