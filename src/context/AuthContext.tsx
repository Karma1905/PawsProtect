// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export type UserRole = 'public' | 'vet' | 'ngo' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setUser(userData);
        } else {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'No Name',
            email: firebaseUser.email || '',
            role: 'public',
            profileImage: firebaseUser.photoURL || '',
          });
        }

        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      return true;
    } catch {
      toast.error("Login failed. Please check your credentials.");
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: avatar,
      });

      const userData: User = {
        id: firebaseUser.uid,
        name,
        email,
        role,
        profileImage: avatar,
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      setUser(userData);
      setIsAuthenticated(true);
      toast.success(`Welcome to PawsProtect, ${name}!`);
      return true;
    } catch {
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        toast.info("You have been logged out.");
      })
      .catch(() => {
        toast.error("Error logging out. Please try again.");
      });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
