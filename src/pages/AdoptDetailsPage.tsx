
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ChevronLeft, Heart, Share2, Calendar, MapPin, Info, PawPrint } from "lucide-react";

// Mock data - in a real app, this would come from an API
const animalData = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
    size: "Large",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    description: "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He's great with children and other pets.",
    specialNeeds: false,
    location: "Pet City Shelter",
    status: "Available",
    arrivalDate: "2023-12-15"
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
    description: "Whiskers is a quiet and independent Siamese cat who enjoys lounging in sunny spots. She's litter trained and gets along well with other cats.",
    specialNeeds: false,
    location: "Feline Friends Rescue",
    status: "Available",
    arrivalDate: "2024-01-10"
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
    description: "Max is a loyal and intelligent German Shepherd with previous training. He's protective and would do well in a home with experienced dog owners.",
    specialNeeds: false,
    location: "Second Chance Shelter",
    status: "Available",
    arrivalDate: "2023-11-05"
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
    description: "Luna is a playful and affectionate Maine Coon kitten. She loves interactive toys and being brushed. Her fluffy coat requires regular grooming.",
    specialNeeds: false,
    location: "Happy Paws Rescue",
    status: "Available",
    arrivalDate: "2024-02-20"
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
    description: "Rocky is a sweet and gentle Pit Bull mix who loves cuddles and treats. He's been through basic obedience training and walks well on a leash.",
    specialNeeds: true,
    specialNeedsDetails: "Requires medication for joint pain",
    location: "Rescue Hope Center",
    status: "Available",
    arrivalDate: "2023-09-30"
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
    description: "Oliver is a calm and mature Tabby cat who prefers a quiet home. He enjoys sitting on laps and watching birds from the window.",
    specialNeeds: true,
    specialNeedsDetails: "Senior cat with special diet needs",
    location: "Senior Paws Sanctuary",
    status: "Available",
    arrivalDate: "2023-08-15"
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
    description: "Bella is an energetic Labrador who loves swimming and playing fetch. She's friendly with everyone she meets and would be great for an active family.",
    specialNeeds: false,
    location: "Forever Friends Rescue",
    status: "Available",
    arrivalDate: "2024-01-25"
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
    description: "Mittens is a playful and curious cat who loves exploring and chasing toys. She's very social and gets along well with children.",
    specialNeeds: false,
    location: "Cat Haven Shelter",
    status: "Available",
    arrivalDate: "2023-12-01"
  }
];

const AdoptDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundAnimal = animalData.find(a => a.id === id);
      if (foundAnimal) {
        setAnimal(foundAnimal);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAdoptRequest = () => {
    toast.success(`Adoption request submitted for ${animal?.name}`, {
      description: "Our team will contact you soon to process your request.",
      duration: 5000,
    });
  };

  const handleSaveToFavorites = () => {
    toast.success(`${animal?.name} added to your favorites`, {
      duration: 3000,
    });
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast.info("Share functionality would open here");
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-muted rounded-full mb-4"></div>
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Pet Not Found</h2>
          <p className="text-muted-foreground mb-6">The pet you're looking for doesn't exist or has already been adopted.</p>
          <Button asChild>
            <Link to="/adopt">Back to Adoption Gallery</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-muted"
        onClick={() => navigate('/adopt')}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Adoption Gallery
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="h-[350px] lg:h-[450px] overflow-hidden">
              <img 
                src={animal.image} 
                alt={animal.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-3xl font-bold">{animal.name}</CardTitle>
                  <CardDescription>{animal.breed} • {animal.age} {animal.age === 1 ? 'year' : 'years'} old</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleSaveToFavorites}
                    className="rounded-full hover:bg-rose-100 hover:text-rose-500 hover:border-rose-200"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleShare}
                    className="rounded-full"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  About {animal.name}
                </h3>
                <p className="text-muted-foreground">{animal.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{animal.type}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{animal.gender}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium">{animal.size}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Arrival Date</p>
                  <p className="font-medium">{new Date(animal.arrivalDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Special Needs</p>
                  <p className="font-medium">{animal.specialNeeds ? 'Yes' : 'No'}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{animal.status}</p>
                </div>
              </div>
              
              {animal.specialNeeds && animal.specialNeedsDetails && (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-1">Special Needs Information</h4>
                  <p className="text-yellow-700">{animal.specialNeedsDetails}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Adoption Information</CardTitle>
              <CardDescription>Ready to give {animal.name} a forever home?</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{animal.location}</p>
                  <p className="text-sm text-muted-foreground">Current shelter location</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Available for adoption</p>
                  <p className="text-sm text-muted-foreground">Meet and greet required</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <PawPrint className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Adoption Requirements</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1 space-y-1">
                    <li>Completed application form</li>
                    <li>Valid ID and proof of address</li>
                    <li>Home check for some animals</li>
                    <li>Adoption fee: $125 - $250</li>
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-medium mb-2">What's included?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vaccinations up to date</li>
                  <li>• Spayed/neutered</li>
                  <li>• Microchipped</li>
                  <li>• Initial health check</li>
                  <li>• Basic supplies starter kit</li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex-col gap-2">
              <Button className="w-full" onClick={handleAdoptRequest}>
                Start Adoption Process
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/adopt">View More Pets</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 bg-muted/40 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Avatar className="h-10 w-10 mr-3">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80" alt="Adoption Counselor" />
              </Avatar>
              <div>
                <p className="font-medium">Need help?</p>
                <p className="text-sm text-muted-foreground">Talk to an adoption counselor</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptDetailsPage;
