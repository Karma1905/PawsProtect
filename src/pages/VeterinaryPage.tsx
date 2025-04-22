"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin, Phone, AlertCircle } from 'lucide-react';
import { format, addDays, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const availableSlots = {
  1: {
    slots: [
      { date: new Date(), times: ["9:00 AM", "11:30 AM", "2:00 PM"] },
      { date: addDays(new Date(), 1), times: ["10:00 AM", "1:00 PM", "4:30 PM"] },
      { date: addDays(new Date(), 2), times: ["8:30 AM", "3:00 PM"] },
      { date: addDays(new Date(), 3), times: ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"] },
    ]
  },
  2: {
    slots: [
      { date: new Date(), times: ["8:00 AM", "10:30 AM", "3:00 PM", "5:30 PM"] },
      { date: addDays(new Date(), 1), times: ["9:30 AM", "11:00 AM", "2:30 PM"] },
      { date: addDays(new Date(), 2), times: ["8:00 AM", "10:00 AM", "1:30 PM", "4:00 PM"] },
    ]
  },
  3: {
    slots: [
      { date: new Date(), times: ["7:30 AM", "9:00 AM", "12:00 PM", "2:30 PM", "5:00 PM"] },
      { date: addDays(new Date(), 1), times: ["8:00 AM", "10:30 AM", "1:00 PM", "4:30 PM"] },
      { date: addDays(new Date(), 2), times: ["9:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"] },
      { date: addDays(new Date(), 3), times: ["7:30 AM", "10:00 AM", "12:30 PM", "3:00 PM"] },
    ]
  }
};

const VeterinaryPage: React.FC = () => {
  const clinics = [
    {
      id: 1,
      name: "PawsHealth Veterinary Clinic",
      address: "123 Animal Care Ave, Pet City",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
      services: ["General Check-ups", "Vaccinations", "Surgery", "Emergency Care"],
      image: "https://images.unsplash.com/photo-1584297159464-34337dcf7841?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Furry Friends Animal Hospital",
      address: "456 Pet Wellness Blvd, Animal Town",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Sat: 7AM-8PM, Sun: 9AM-5PM",
      services: ["Dental Care", "X-rays", "Laboratory", "Pharmacy"],
      image: "https://images.unsplash.com/photo-1516900557549-41557d405adf?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Healthy Paws Veterinary Center",
      address: "789 Animal Rescue Road, Pawsville",
      phone: "+1 (555) 456-7890",
      hours: "24/7 Emergency Services",
      services: ["Critical Care", "Rehabilitation", "Specialty Surgery", "Boarding"],
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<(typeof clinics)[0] | null>(null);
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [reason, setReason] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [noSlotsAvailable, setNoSlotsAvailable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleBookAppointment = (clinic: (typeof clinics)[0]) => {
    setSelectedClinic(clinic);
    setIsAppointmentDialogOpen(true);
    setDate(undefined);
    setTimeSlot("");
    setPetName("");
    setPetType("");
    setReason("");
    setName("");
    setEmail("");
    setAvailableTimeSlots([]);
    setNoSlotsAvailable(false);
  };

  const getAvailableSlotsForDate = (selectedDate: Date, clinicId: number) => {
    const clinicSlots = availableSlots[clinicId as keyof typeof availableSlots]?.slots || [];
    const matchingDateSlot = clinicSlots.find(slot => isSameDay(slot.date, selectedDate));

    if (matchingDateSlot) {
      setAvailableTimeSlots(matchingDateSlot.times);
      setNoSlotsAvailable(matchingDateSlot.times.length === 0);
    } else {
      setAvailableTimeSlots([]);
      setNoSlotsAvailable(true);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setTimeSlot("");

    if (selectedDate && selectedClinic) {
      getAvailableSlotsForDate(selectedDate, selectedClinic.id);
    }
  };

  const handleSubmitAppointment = async () => {
    if (!date || !timeSlot || !petName || !reason || !selectedClinic || !name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        name,
        email,
        clinicId: selectedClinic.id,
        clinicName: selectedClinic.name,
        date: Timestamp.fromDate(date),
        timeSlot,
        petName,
        petType,
        reason,
        createdAt: Timestamp.now()
      });

      toast.success(`Appointment scheduled at ${selectedClinic.name} on ${format(date, "PPP")} at ${timeSlot}`);
      setIsAppointmentDialogOpen(false);

      setName("");
      setEmail("");
      setDate(undefined);
      setTimeSlot("");
      setPetName("");
      setPetType("");
      setReason("");
      setAvailableTimeSlots([]);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Something went wrong while booking the appointment.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Veterinary Services</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find trusted veterinary care for your pets. Our network of veterinary clinics provides quality healthcare services for all animals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {clinics.map((clinic) => (
          <Card key={clinic.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>

            <CardHeader>
              <h3 className="font-bold text-xl text-primary">{clinic.name}</h3>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{clinic.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{clinic.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{clinic.hours}</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Services:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {clinic.services.map((service, idx) => (
                    <li key={idx} className="transition-colors duration-200 hover:text-primary">{service}</li>
                  ))}
                </ul>
              </div>
            </CardContent>

            <CardFooter className="border-t bg-muted/20 p-4">
              <div className="w-full flex gap-2">
                <Button asChild variant="outline" className="flex-1 hover:bg-primary/10">
                  <a href={`tel:${clinic.phone.replace(/\D/g, '')}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => handleBookAppointment(clinic)}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[500px] pointer-events-auto">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>
              {selectedClinic && `Schedule a visit to ${selectedClinic.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {date && (
              <div className="grid gap-2">
                <Label htmlFor="time">Available Time Slots</Label>
                {noSlotsAvailable ? (
                  <div className="flex items-center text-destructive">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>No available slots for this date</span>
                  </div>
                ) : availableTimeSlots.length > 0 ? (
                  <RadioGroup value={timeSlot} onValueChange={setTimeSlot}>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((slot) => (
                        <div key={slot} className="flex items-center space-x-2">
                          <RadioGroupItem value={slot} id={`slot-${slot}`} />
                          <Label htmlFor={`slot-${slot}`}>{slot}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="text-muted-foreground">Please select a date to view available slots</div>
                )}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="pet-name">Pet Name</Label>
              <Input id="pet-name" value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="Enter your pet's name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="pet-type">Pet Type (optional)</Label>
              <Input id="pet-type" value={petType} onChange={(e) => setPetType(e.target.value)} placeholder="Dog, Cat, Bird, etc." />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Check-up, vaccination, etc." />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAppointmentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitAppointment} disabled={!date || !timeSlot || !petName || !reason || !name || !email || noSlotsAvailable}>
              Schedule Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VeterinaryPage;