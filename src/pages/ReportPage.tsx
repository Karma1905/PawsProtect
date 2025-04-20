import React from 'react';
import Header from '@/components/Header';
import ReportForm from '@/components/ReportForm';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore'; // For testing connection

const ReportPage = () => {
  // Optional: Test Firestore connection when component mounts
  React.useEffect(() => {
    const testFirestoreConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testConnection'));
        console.log('Firestore connection successful');
      } catch (error) {
        console.error('Firestore connection error:', error);
      }
    };
    testFirestoreConnection();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <Header />
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-6">Report an Animal in Distress</h2>
        <p className="text-muted-foreground mb-8">
          Fill out the form below to report a stray or injured animal. Your report 
          will be sent to nearby animal welfare organizations and volunteers.
        </p>
        <ReportForm />
      </div>
    </div>
  );
};

export default ReportPage;