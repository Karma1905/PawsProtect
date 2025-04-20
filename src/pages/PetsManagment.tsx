// src/components/PetsManagement.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PetsManagement: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Pets for Adoption</CardTitle>
      <CardDescription>Manage pets available for adoption</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">324</div>
      <p className="text-xs text-muted-foreground">+12% from last month</p>
    </CardContent>
  </Card>
);

export default PetsManagement;
