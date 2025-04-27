"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { db } from "@/lib/firebase"; // your firebase config import
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AdoptionFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract petName from query params
  const urlParams = new URLSearchParams(location.search);
  const petNameFromUrl = urlParams.get("petName");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petName: petNameFromUrl || "", // Set petName from URL or leave empty
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!id || !formData.petName) {
        throw new Error("Missing pet information.");
      }

      console.log("Submitting adoption request:", formData); // Log formData to verify it's correct

      // Firestore submit logic
      await addDoc(collection(db, "adoptionRequests"), {
        animalId: id,
        animalName: formData.petName, // Use the petName from formData
        adopterName: formData.name,
        adopterEmail: formData.email,
        adopterPhone: formData.phone,
        status: "Pending", // You can later update this to "Approved" or "Rejected"
        requestedAt: serverTimestamp(), // Adds a timestamp
      });

      toast.success("Adoption request submitted successfully!");
      
      // Navigate back to the adoption page after submission
      navigate("/adopt");

    } catch (error: any) {
      console.error(error);
      setError(error.message || "Failed to submit adoption request. Please try again.");
      toast.error(error.message || "Failed to submit adoption request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Adoption Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>} {/* Display error message */}

            {/* Pet Name Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="petName">Pet Name</Label>
              <Input
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Name Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
