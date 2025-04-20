
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FilterX } from 'lucide-react';

export type FilterValues = {
  animalType: string;
  ageRange: [number, number];
  sizes: {
    small: boolean;
    medium: boolean;
    large: boolean;
    xlarge: boolean;
  };
  specialNeeds: {
    medical: boolean;
    behavioral: boolean;
    senior: boolean;
  };
}

interface AdoptionFiltersProps {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
}

const AdoptionFilters: React.FC<AdoptionFiltersProps> = ({ filters, setFilters }) => {
  
  const handleTypeChange = (value: string) => {
    setFilters({ ...filters, animalType: value });
  };

  const handleAgeRangeChange = (value: number[]) => {
    setFilters({ ...filters, ageRange: [value[0], value[1]] });
  };

  const handleSizeChange = (key: keyof FilterValues['sizes'], checked: boolean) => {
    setFilters({
      ...filters,
      sizes: {
        ...filters.sizes,
        [key]: checked
      }
    });
  };

  const handleSpecialNeedsChange = (key: keyof FilterValues['specialNeeds'], checked: boolean) => {
    setFilters({
      ...filters,
      specialNeeds: {
        ...filters.specialNeeds,
        [key]: checked
      }
    });
  };

  const clearFilters = () => {
    setFilters({
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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Animals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="animalType">Animal Type</Label>
          <Select value={filters.animalType} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All animals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All animals</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="cat">Cats</SelectItem>
              <SelectItem value="bird">Birds</SelectItem>
              <SelectItem value="other">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Age Range</Label>
          <Slider 
            value={filters.ageRange} 
            min={0} 
            max={15} 
            step={1} 
            onValueChange={handleAgeRangeChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{filters.ageRange[0]} years</span>
            <span>{filters.ageRange[1]} years</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Size</Label>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="small" 
                checked={filters.sizes.small}
                onCheckedChange={(checked) => handleSizeChange('small', checked === true)}
              />
              <label htmlFor="small" className="text-sm">Small</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="medium" 
                checked={filters.sizes.medium}
                onCheckedChange={(checked) => handleSizeChange('medium', checked === true)}
              />
              <label htmlFor="medium" className="text-sm">Medium</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="large" 
                checked={filters.sizes.large}
                onCheckedChange={(checked) => handleSizeChange('large', checked === true)}
              />
              <label htmlFor="large" className="text-sm">Large</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="xlarge" 
                checked={filters.sizes.xlarge}
                onCheckedChange={(checked) => handleSizeChange('xlarge', checked === true)}
              />
              <label htmlFor="xlarge" className="text-sm">X-Large</label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Special Needs</Label>
          <div className="grid grid-cols-1 gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="medical-needs" 
                checked={filters.specialNeeds.medical}
                onCheckedChange={(checked) => handleSpecialNeedsChange('medical', checked === true)}
              />
              <label htmlFor="medical-needs" className="text-sm">Medical Needs</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="behavioral-needs" 
                checked={filters.specialNeeds.behavioral}
                onCheckedChange={(checked) => handleSpecialNeedsChange('behavioral', checked === true)}
              />
              <label htmlFor="behavioral-needs" className="text-sm">Behavioral Needs</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="senior" 
                checked={filters.specialNeeds.senior}
                onCheckedChange={(checked) => handleSpecialNeedsChange('senior', checked === true)}
              />
              <label htmlFor="senior" className="text-sm">Senior</label>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={clearFilters}
        >
          <FilterX className="h-4 w-4" />
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdoptionFilters;
