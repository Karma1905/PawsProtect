import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "@/components/CartContext";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCart(); // Get cart items and removeFromCart function from context

  // Calculate the total price of all cart items
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Your Cart</h1>

      {/* Display cart items */}
      {cartItems.length === 0 ? (
        <p className="text-muted-foreground text-lg text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-xl transition-shadow duration-300 rounded-lg bg-gray-800 border border-muted p-4"
            >
              <div className="h-48 overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="mt-4">
                <h3 className="font-semibold text-lg text-primary">{item.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
              </CardHeader>

              <CardContent className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary">${item.price}</span>
                  <Button
                    variant="destructive" // Destructive variant for removal button
                    size="sm"
                    onClick={() => {
                      removeFromCart(item.id);
                      toast({
                        title: "Item Removed",
                        description: `${item.name} has been removed from your cart.`,
                      });
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Total Price and Checkout Button */}
      {cartItems.length > 0 && (
        <div className="mt-8 text-right">
          <h2 className="text-xl font-semibold text-primary">Total Price: ${totalPrice.toFixed(2)}</h2>
          <Button
            variant="outline" // Using outline variant for the checkout button
            size="lg"
            className="mt-4 w-full md:w-auto text-primary border-primary hover:bg-primary hover:text-white"
            onClick={() => console.log("Proceed to Checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
