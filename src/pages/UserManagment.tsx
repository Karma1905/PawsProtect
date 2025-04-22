// src/components/UserManagement.tsx
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/index";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase"; // adjust this path based on your Firebase setup
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList: UserInfo[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserInfo[];
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Delete handler
  // const handleDeleteUser = async (userId: string) => {
  //   try {
  //     await deleteDoc(doc(db, "users", userId));
  //     setUsers((prev) => prev.filter((user) => user.id !== userId));
  //     toast.success("User deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     toast.error("Failed to delete user.");
  //   }
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage users and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded shadow bg-dark-800 text-white">
              <img src={user.profileImage} alt={user.name} className="w-16 h-16 rounded-full mb-2" />
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              {/* <Button
                variant="destructive"
                className="mt-2 w-full"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;



// import { useEffect, useState } from "react";
// import { UserInfo } from "@/types/index";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { db } from "@/lib/firebase";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { toast } from "sonner";

// const UserManagement: React.FC = () => {
//   const [users, setUsers] = useState<UserInfo[]>([]);

//   // Fetch users on mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         const userList: UserInfo[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as UserInfo[];
//         setUsers(userList);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Delete handler
//   const handleDeleteUser = async (userId: string) => {
//     try {
//       await deleteDoc(doc(db, "users", userId));
//       setUsers((prev) => prev.filter((user) => user.id !== userId));
//       toast.success("User deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user.");
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>User Management</CardTitle>
//         <CardDescription>Manage users and their permissions</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {users.map((user) => (
//             <div key={user.id} className="p-4 border rounded shadow bg-dark-800 text-white">
//               <img src={user.profileImage} alt={user.name} className="w-16 h-16 rounded-full mb-2" />
//               <p><strong>Name:</strong> {user.name}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Role:</strong> {user.role}</p>

//               {/* Only show delete button if user is NOT an admin */}
//               {user.role !== "admin" && (
//                 <Button
//                   variant="destructive"
//                   className="mt-2 w-full"
//                   onClick={() => handleDeleteUser(user.id)}
//                 >
//                   Delete
//                 </Button>
//               )}
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default UserManagement;
