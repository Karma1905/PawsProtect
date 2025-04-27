import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserManagement from '@/pages/UserManagment';
import ReportTable from '@/pages/ReportTable';
import PetsManagement from '@/pages/PetsManagment';
import Appointments from '@/pages/Appointments';
import AdoptionRequestTable from '@/pages/AdoptionRequestTable'; // import the new component
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ReportInfo, UserInfo } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [reports, setReports] = useState<ReportInfo[]>([]);
  const [adoptionRequestsCount, setAdoptionRequestsCount] = useState<number>(0); // New state to store the adoption request count

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const userList: UserInfo[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as UserInfo[];
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch reports data
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsCollection = collection(db, 'reports');
        const q = query(reportsCollection, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        const reportsData: ReportInfo[] = [];
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          const report = {
            id: doc.id,
            animalType: data.animalType,
            condition: data.condition,
            description: data.description,
            location: data.location,
            photo: data.photo,
            timestamp: data.timestamp,
            user: {
              name: '',
              email: data.user.email,
              phone: '',
            },
          };

          const userQuery = query(
            collection(db, 'users'),
            where('email', '==', data.user.email)
          );
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            report.user.name = userData.name || 'Unknown';
            report.user.phone = userData.phone || 'Unknown';
          }

          reportsData.push(report);
        }

        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  // Fetch adoption requests count
  useEffect(() => {
    const fetchAdoptionRequestsCount = async () => {
      try {
        const adoptionRequestsCollection = collection(db, 'adoptionRequests');
        const querySnapshot = await getDocs(adoptionRequestsCollection);
        setAdoptionRequestsCount(querySnapshot.size); // Set the count of adoption requests
      } catch (error) {
        console.error('Error fetching adoption requests count:', error);
      }
    };

    fetchAdoptionRequestsCount();
  }, []);

  return (
    <div className="container py-6 mx-auto">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pets">Pets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="adoptionRequests">Adoption Requests</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
  <div className="flex gap-4">
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{users.length}</div>
        <p className="text-xs text-muted-foreground">+4.6% from last month</p>
      </CardContent>
    </Card>

    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Pets for Adoption</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">324</div>
        <p className="text-xs text-muted-foreground">+12% from last month</p>
      </CardContent>
    </Card>

    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{reports.length}</div>
        <p className="text-xs text-muted-foreground">-3% from last month</p>
      </CardContent>
    </Card>

    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Successful Adoptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">87</div>
        <p className="text-xs text-muted-foreground">+8.2% from last month</p>
      </CardContent>
    </Card>

    {/* New Adoption Requests Card */}
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Adoption Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{adoptionRequestsCount}</div>
        <p className="text-xs text-muted-foreground">+5.4% from last month</p>
      </CardContent>
    </Card>
  </div>
</TabsContent>


        {/* Users Tab */}
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        {/* Pets Tab */}
        <TabsContent value="pets">
          <PetsManagement />
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <ReportTable />
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <Appointments />
        </TabsContent>

        {/* Adoption Requests Tab */}
        <TabsContent value="adoptionRequests">
          <AdoptionRequestTable /> {/* Display Adoption Requests */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
