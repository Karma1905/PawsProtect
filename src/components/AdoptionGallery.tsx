
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Info } from 'lucide-react';
import { toast } from "sonner";
import { FilterValues } from './AdoptionFilters';


const animals = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
    size: "Large",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    specialNeeds: false
  },
  {
    id: "2",
    name: "Whiskers",
    type: "Cat",
    breed: "Siamese",
    age: 2,
    size: "Medium",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?auto=format&fit=crop&w=800&q=80",
    specialNeeds: false
  },
  {
    id: "3",
    name: "Max",
    type: "Dog",
    breed: "German Shepherd",
    age: 5,
    size: "Large",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80",
    specialNeeds: false
  },
  {
    id: "4",
    name: "Luna",
    type: "Cat",
    breed: "Maine Coon",
    age: 1,
    size: "Large",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
    specialNeeds: false
  },
  {
    id: "5",
    name: "Rocky",
    type: "Dog",
    breed: "Pit Bull Mix",
    age: 4,
    size: "Medium",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=800&q=80",
    specialNeeds: true
  },
  {
    id: "6",
    name: "Oliver",
    type: "Cat",
    breed: "Tabby",
    age: 7,
    size: "Medium",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
    specialNeeds: true
  },
  {
    id: "7",
    name: "Bella",
    type: "Dog",
    breed: "Labrador",
    age: 2,
    size: "Large",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1579740737320-c71a310ef9fc?auto=format&fit=crop&w=800&q=80",
    specialNeeds: false
  },
  {
    id: "8",
    name: "Mittens",
    type: "Cat",
    breed: "Domestic Shorthair",
    age: 3,
    size: "Small",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    specialNeeds: false
  }
];

interface AdoptionGalleryProps {
  filters: FilterValues;
}

const AdoptionGallery: React.FC<AdoptionGalleryProps> = ({ filters }) => {
  const [filteredAnimals, setFilteredAnimals] = useState(animals);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Apply filters when they change
  useEffect(() => {
    let result = animals;
    
    // Filter by animal type
    if (filters.animalType !== 'all') {
      result = result.filter(animal => animal.type.toLowerCase() === filters.animalType);
    }
    
    // Filter by age range
    result = result.filter(animal => 
      animal.age >= filters.ageRange[0] && animal.age <= filters.ageRange[1]
    );
    
    // Filter by size
    const selectedSizes = Object.entries(filters.sizes)
      .filter(([_, isSelected]) => isSelected)
      .map(([size]) => size.toLowerCase());
    
    if (selectedSizes.length > 0) {
      result = result.filter(animal => 
        selectedSizes.includes(animal.size.toLowerCase())
      );
    }
    
    // Filter by special needs
    const needsSpecialCare = Object.values(filters.specialNeeds).some(value => value);
    if (needsSpecialCare) {
      result = result.filter(animal => animal.specialNeeds);
    }
    
    setFilteredAnimals(result);
  }, [filters]);

  const toggleFavorite = (id: string, name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
      toast.info(`${name} removed from favorites`);
    } else {
      setFavorites([...favorites, id]);
      toast.success(`${name} added to favorites`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {filteredAnimals.length} {filteredAnimals.length === 1 ? 'Pet' : 'Pets'} Available
        </h3>
      </div>
      
      {filteredAnimals.length === 0 ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No pets match your filters</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters to see more pets.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <Link to={`/adopt/${animal.id}`} key={animal.id}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={animal.image} 
                    alt={animal.name} 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm ${
                      favorites.includes(animal.id) ? 'text-rose-500' : ''
                    }`}
                    onClick={(e) => toggleFavorite(animal.id, animal.name, e)}
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(animal.id) ? 'fill-rose-500' : ''}`} />
                  </Button>
                </div>
                
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{animal.name}</h3>
                      <p className="text-muted-foreground text-sm">{animal.breed}</p>
                    </div>
                    <Badge variant={animal.type === 'Dog' ? 'default' : 'secondary'}>
                      {animal.type}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{animal.age} {animal.age === 1 ? 'year' : 'years'}</Badge>
                    <Badge variant="outline">{animal.gender}</Badge>
                    <Badge variant="outline">{animal.size}</Badge>
                    {animal.specialNeeds && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        Special Needs
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-3">
                  <Button variant="ghost" className="w-full" asChild>
                    <div className="flex items-center justify-center">
                      <Info className="h-4 w-4 mr-2" />
                      View Details
                    </div>
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdoptionGallery;
