'use client';

import React, { useState } from 'react';
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
import {
  AlertTriangle,
  Camera,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { db, storage, auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ReportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const [formData, setFormData] = useState({
    animalType: '',
    condition: '',
    location: '',
    description: '',
    photo: null as File | null,
  });

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, authData.email, authData.password);
      setIsAuthenticated(true);
      toast.success("Login successful! You can now submit a report.");
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      setIsAuthenticated(true);
      toast.success("Registration successful! You can now submit a report.");
    } catch (error: any) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthData({
      email: '',
      password: '',
      name: '',
      phone: '',
    });
    toast.info("You have been logged out");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login or register to submit a report");
      return;
    }

    setIsSubmitting(true);
    let photoURL = null;

    try {
      if (formData.photo) {
        const imageRef = ref(storage, `report_photos/${Date.now()}_${formData.photo.name}`);
        const snapshot = await uploadBytes(imageRef, formData.photo);
        photoURL = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'reports'), {
        animalType: formData.animalType,
        condition: formData.condition,
        location: formData.location,
        description: formData.description,
        photo: photoURL,
        timestamp: Timestamp.now(),
        user: {
          name: authData.name || '',
          email: authData.email || '',
          phone: authData.phone || '',
        },
      });

      toast.success("Report submitted successfully!");
      setFormData({
        animalType: '',
        condition: '',
        location: '',
        description: '',
        photo: null,
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center text-primary">Authentication Required</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Label>Email</Label>
                <Input type="email" name="email" value={authData.email} onChange={handleAuthInputChange} />
                <Label>Password</Label>
                <Input type="password" name="password" value={authData.password} onChange={handleAuthInputChange} />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <Label>Name</Label>
                <Input name="name" value={authData.name} onChange={handleAuthInputChange} />
                <Label>Email</Label>
                <Input type="email" name="email" value={authData.email} onChange={handleAuthInputChange} />
                <Label>Phone</Label>
                <Input name="phone" value={authData.phone} onChange={handleAuthInputChange} />
                <Label>Password</Label>
                <Input type="password" name="password" value={authData.password} onChange={handleAuthInputChange} />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Animal Distress Report
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Welcome, {authData.name || authData.email}!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Animal Type</Label>
              <Select value={formData.animalType} onValueChange={(value) => handleSelectChange('animalType', value)}>
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
              <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
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
            <Input
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe the animal and situation"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo" className="flex items-center">
              <Camera className="w-4 h-4 mr-1" />
              Upload Photo (Optional)
            </Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.photo && (
              <p className="text-sm text-muted-foreground">Selected: {formData.photo.name}</p>
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
