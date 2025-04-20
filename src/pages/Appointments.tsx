import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { format } from 'date-fns';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Appointment {
  id: string;
  clinicName: string;
  date: { seconds: number; nanoseconds: number };
  timeSlot: string;
  petName: string;
  petType?: string;
  reason: string;
  name?: string;
  email?: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'appointments'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[];

        // Assuming userName and userEmail are directly stored in the appointment document
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Card className="bg-black text-white">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage upcoming veterinary or adoption appointments</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments scheduled yet.</p>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="border border-muted rounded-md p-4">
                  {appt.name && <p><strong>User:</strong> {appt.name}</p>}
                  {appt.email && <p><strong>Email:</strong> {appt.email}</p>}
                  <p><strong>Clinic:</strong> {appt.clinicName}</p>
                  <p><strong>Date:</strong> {format(new Date(appt.date.seconds * 1000), 'PPP')}</p>
                  <p><strong>Time:</strong> {appt.timeSlot}</p>
                  <p><strong>Pet:</strong> {appt.petName} {appt.petType && `(${appt.petType})`}</p>
                  <p><strong>Reason:</strong> {appt.reason}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default Appointments;
