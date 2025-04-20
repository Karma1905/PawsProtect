
import React, { useState } from 'react';
import Header from '@/components/Header';
import AdoptionGallery from '@/components/AdoptionGallery';
import AdoptionFilters, { FilterValues } from '@/components/AdoptionFilters';

const AdoptPage = () => {
  const [filters, setFilters] = useState<FilterValues>({
    animalType: 'all',
    ageRange: [0, 15],
    sizes: {
      small: false,
      medium: false,
      large: false,
      xlarge: false
    },
    specialNeeds: {
      medical: false,
      behavioral: false,
      senior: false
    }
  });

  return (
    <div className="min-h-screen py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <Header />
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-6">Find Your Forever Friend</h2>
        <p className="text-muted-foreground mb-8">
          Browse animals available for adoption. Each animal has been rescued and is 
          now looking for a loving home.
        </p>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <AdoptionFilters filters={filters} setFilters={setFilters} />
          </div>
          <div className="lg:w-3/4">
            <AdoptionGallery filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptPage;
