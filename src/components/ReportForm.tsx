'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Camera } from "lucide-react";
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

declare global {
  interface Window {
    google: typeof google;
  }
}

const ReportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    animalType: '',
    condition: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast.error("You must be logged in to submit a report.");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setPhotoURL(URL.createObjectURL(selectedFile));
    }
  };

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setFormData((prev) => ({ ...prev, location: locationString }));
        toast.success("Location detected successfully!");
      },
      (error) => {
        console.error(error);
        toast.error("Failed to detect location.");
      }
    );
  };

  const uploadImage = async () => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', `report_${user.uid}_${Date.now()}`);

      const response = await fetch('/api/imagekit-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a report.");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await uploadImage();
      }

      await addDoc(collection(db, 'reports'), {
        ...formData,
        photo: imageUrl,
        timestamp: Timestamp.now(),
        user: {
          email: user.email,
          uid: user.uid,
        },
        status: 'pending',
      });

      toast.success("Report submitted successfully!");
      setFormData({
        animalType: '',
        condition: '',
        location: '',
        description: '',
      });
      setPhotoURL(null);
      setFile(null);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Animal Distress Report
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">Welcome, {user.email}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Animal Type</Label>
              <Select
                value={formData.animalType}
                onValueChange={(value) => handleSelectChange('animalType', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select animal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Condition</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => handleSelectChange('condition', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="injured">Injured</SelectItem>
                  <SelectItem value="abandoned">Abandoned</SelectItem>
                  <SelectItem value="trapped">Trapped</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="flex gap-2">
              <Input
                name="location"
                placeholder="Enter location or use Detect"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              <Button type="button" variant="outline" onClick={detectCurrentLocation}>
                Detect
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe the animal's condition and situation in detail"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Camera className="w-4 h-4 mr-1" />
              Upload Photo (Optional)
            </Label>
            <div className="flex flex-col items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Camera className="w-6 h-6 mb-2 text-gray-500" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG (Max. 5MB)</p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {photoURL && (
              <div className="mt-4">
                <img
                  src={photoURL}
                  alt="Uploaded preview"
                  className="rounded-md max-h-40 object-cover border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoURL(null);
                    setFile(null);
                  }}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Emergency Report"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
