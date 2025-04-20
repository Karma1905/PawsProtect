import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, Upload, AlertTriangle, User, Mail, Phone, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Firebase imports
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ReportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    animalType: '',
    condition: '',
    location: '',
    description: '',
    photo: null,
  });

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login or register to submit a report");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'reports'), {
        animalType: formData.animalType,
        condition: formData.condition,
        location: formData.location,
        description: formData.description,
        photo: null, // Optional photo field (not implemented yet)
        timestamp: Timestamp.now(),
        user: {
          name: authData.name || '',
          email: authData.email || '',
          phone: authData.phone || '',
        },
      });

      toast.success("Report submitted successfully! Nearby organizations have been notified.");

      setFormData({
        animalType: '',
        condition: '',
        location: '',
        description: '',
        photo: null,
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authData.email || !authData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsSubmitting(false);
      toast.success("Login successful! You can now submit a report.");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authData.email || !authData.password || !authData.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsSubmitting(false);
      toast.success("Registration successful! You can now submit a report.");
    }, 1000);
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
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={authData.email}
                    onChange={handleAuthInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={authData.password}
                    onChange={handleAuthInputChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name" className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Full Name
                  </Label>
                  <Input
                    id="reg-name"
                    name="name"
                    placeholder="Your full name"
                    value={authData.name}
                    onChange={handleAuthInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={authData.email}
                    onChange={handleAuthInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone (Optional)
                  </Label>
                  <Input
                    id="reg-phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={authData.phone}
                    onChange={handleAuthInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    Password
                  </Label>
                  <Input
                    id="reg-password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={authData.password}
                    onChange={handleAuthInputChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Create Account"}
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
          Welcome, {authData.name || authData.email}! Thank you for reporting an animal in distress.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="animalType">Animal Type</Label>
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
              <Label htmlFor="condition">Condition</Label>
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
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter address or use current location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
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
              Photo (Optional)
            </Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to upload a photo
              </p>
            </div>
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
