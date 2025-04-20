export interface ReportInfo {
  id: string;
  animalType: string;
  condition: string;
  description: string;
  location: string;
  photo: string | null;
  timestamp: { seconds: number };
  user: {
    name: string;
    email: string;
    phone: string;
  };
}
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  phone: string;
}