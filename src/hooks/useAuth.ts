// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase"; // Import firebase auth module
import { onAuthStateChanged } from "firebase/auth";

// Custom hook to access the current authenticated user
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user
    });

    return () => unsubscribe();
  }, []);

  return { user };
};