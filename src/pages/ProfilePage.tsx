
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, Heart, Calendar, AlertTriangle, User, Shield } from 'lucide-react';

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return <Badge className="bg-purple-500">Administrator</Badge>;
    case 'vet':
      return <Badge className="bg-blue-500">Veterinarian</Badge>;
    case 'ngo':
      return <Badge className="bg-green-500">NGO / Shelter</Badge>;
    default:
      return <Badge>General Public</Badge>;
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'admin':
      return Shield;
    case 'vet':
      return Calendar;
    case 'ngo':
      return AlertTriangle;
    default:
      return User;
  }
};

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const RoleIcon = getRoleIcon(user.role);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="container py-10 mx-auto max-w-4xl">
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={user.profileImage} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription className="flex justify-center mt-1">
              {getRoleBadge(user.role)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="mt-1">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Account type</h3>
                <div className="flex items-center mt-1 gap-1">
                  <RoleIcon className="h-4 w-4" />
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>
              <Separator />
              <div className="pt-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Manage your {user.role === 'public' ? 'activities' : user.role === 'vet' ? 'appointments' : user.role === 'ngo' ? 'rescue activities' : 'admin tasks'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Activities based on role */}
              {user.role === 'public' && (
                <>
                  <Button variant="outline" className="h-24 flex-col">
                    <Heart className="h-6 w-6 mb-2" />
                    <span>My Favorite Pets</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>My Appointments</span>
                  </Button>
                </>
              )}
              
              {user.role === 'vet' && (
                <>
                  <Button variant="outline" className="h-24 flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>Upcoming Appointments</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <User className="h-6 w-6 mb-2" />
                    <span>Patient Records</span>
                  </Button>
                </>
              )}
              
              {user.role === 'ngo' && (
                <>
                  <Button variant="outline" className="h-24 flex-col">
                    <Heart className="h-6 w-6 mb-2" />
                    <span>Pets for Adoption</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <AlertTriangle className="h-6 w-6 mb-2" />
                    <span>Rescue Requests</span>
                  </Button>
                </>
              )}
              
              {user.role === 'admin' && (
                <>
                  <Button variant="outline" className="h-24 flex-col">
                    <User className="h-6 w-6 mb-2" />
                    <span>Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <Shield className="h-6 w-6 mb-2" />
                    <span>System Settings</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
