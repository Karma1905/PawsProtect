// src/pages/AdoptionRequestTable.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdoptionRequest {
  id: string;
  animalId: string;
  adopterName: string;
  adopterEmail: string;
  adopterPhone: string;
  status: string;
  requestedAt: any;
  animalName: string; // New field to store animal name
}

const AdoptionRequestTable: React.FC = () => {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const requestsCollection = collection(db, 'adoptionRequests');
        const q = query(requestsCollection, orderBy('requestedAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const requestsData: AdoptionRequest[] = [];
        querySnapshot.forEach((docSnap) => {
          const requestData = docSnap.data();
          requestsData.push({
            id: docSnap.id,
            animalId: requestData.animalId,
            adopterName: requestData.adopterName,
            adopterEmail: requestData.adopterEmail,
            adopterPhone: requestData.adopterPhone,
            status: requestData.status,
            requestedAt: requestData.requestedAt,
            animalName: requestData.animalName || 'Unknown Animal', // Directly use the animalName from the request data
          });
        });

        setAdoptionRequests(requestsData);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };

    fetchAdoptionRequests();
  }, []);

  return (
    <div className="grid gap-4">
      {adoptionRequests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle>{request.adopterName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Animal Name:</strong> {request.animalName}</p>
            <p><strong>Email:</strong> {request.adopterEmail}</p>
            <p><strong>Phone:</strong> {request.adopterPhone}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Requested At:</strong> {new Date(request.requestedAt.seconds * 1000).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdoptionRequestTable;
