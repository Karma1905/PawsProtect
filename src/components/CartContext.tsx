import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase'; // Your Firebase config
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { toast } from "@/components/ui/use-toast";


const CartContext = createContext<any>(null);
export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const userCartRef = user ? doc(db, 'carts', user.uid) : null;

  // Load cart items from Firestore when user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (userCartRef) {
        const docSnap = await getDoc(userCartRef);
        if (docSnap.exists()) {
          setCartItems(docSnap.data().items || []);
        } else {
          await setDoc(userCartRef, { items: [] });
        }
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (item: any) => {
    if (!userCartRef) return;
  
    setCartItems(prev => [...prev, item]);
    await updateDoc(userCartRef, {
      items: arrayUnion(item),
    });
  
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const removeFromCart = async (itemId: string) => {
    if (!userCartRef) return;
  
    const removedItem = cartItems.find(item => item.id === itemId);
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  
    await setDoc(userCartRef, {
      items: updatedCart,
    });
  
    toast({
      title: "Item Removed",
      description: `${removedItem?.name} has been removed from your cart.`,
    });
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
