import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ChevronLeft, Heart, Share2, Calendar, MapPin, Info, PawPrint } from "lucide-react";

// Dummy animal data
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
    description: "Whiskers is a quiet and independent Siamese cat who enjoys lounging in sunny spots.",
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
    description: "Max is a loyal and intelligent German Shepherd with previous training.",
    specialNeeds: false,
    location: "Second Chance Shelter",
    status: "Available",
    arrivalDate: "2023-11-05"
  },
];

const AdoptDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = animalData.find((a) => a.id === id);
      setAnimal(found || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSaveToFavorites = () => {
    if (!animal) return;
    toast.success(`${animal.name} added to your favorites!`);
  };

  const handleShare = () => {
    toast.info("Share functionality coming soon!");
  };

  const handleAdoptRequest = () => {
    navigate(`/adopt-form/${animal?.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-muted-foreground">Loading pet details...</p>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Pet Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the pet you're looking for.</p>
        <Button asChild>
          <Link to="/adopt">Back to Adoption Gallery</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 hover:bg-muted"
        onClick={() => navigate('/adopt')}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Adoption Gallery
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Card>
            <div className="h-[300px] lg:h-[450px] overflow-hidden rounded-t-lg">
              <img 
                src={animal.image} 
                alt={animal.name} 
                className="object-cover w-full h-full"
              />
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{animal.name}</CardTitle>
                  <CardDescription>{animal.breed} • {animal.age} {animal.age === 1 ? "year" : "years"} old</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={handleSaveToFavorites}>
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center text-muted-foreground gap-2">
                <PawPrint className="h-5 w-5" />
                <span className="capitalize">{animal.type}</span>
              </div>

              <div className="flex items-center text-muted-foreground gap-2">
                <Info className="h-5 w-5" />
                <span>Status: {animal.status}</span>
              </div>

              <div className="flex items-center text-muted-foreground gap-2">
                <MapPin className="h-5 w-5" />
                <span>Location: {animal.location}</span>
              </div>

              <div className="flex items-center text-muted-foreground gap-2">
                <Calendar className="h-5 w-5" />
                <span>Arrived: {animal.arrivalDate}</span>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold mb-2">About</h4>
                <p>{animal.description}</p>
              </div>

              {animal.specialNeeds && (
                <div>
                  <h4 className="text-lg font-semibold mt-6 mb-2">Special Needs</h4>
                  <p>This pet requires special care and attention.</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button size="lg" onClick={handleAdoptRequest} className="w-full">
                Request to Adopt {animal.name}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="sticky top-20">
          <Card className="p-6">
            <CardTitle className="text-2xl mb-4">Quick Info</CardTitle>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span>Type:</span>
                <span>{animal.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Breed:</span>
                <span>{animal.breed}</span>
              </div>
              <div className="flex justify-between">
                <span>Age:</span>
                <span>{animal.age} {animal.age === 1 ? "year" : "years"}</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span>{animal.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Gender:</span>
                <span>{animal.gender}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span>{animal.status}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdoptDetailsPage;
