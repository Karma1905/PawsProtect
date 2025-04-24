import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/components/CartContext'; 

const ShopPage: React.FC = () => {
  const { addToCart } = useCart(); // 

  const products = [
    {
      id: 1,
      name: "Premium Pet Food",
      price: 999,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
      description: "High-quality nutrition for your pets"
    },
    {
      id: 2,
      name: "Pet Bed Deluxe",
      price: 4999,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80",
      description: "Comfortable and cozy bed for your furry friend"
    },
    {
      id: 3,
      name: "Interactive Toy Set",
      price: 1999,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
      description: "Keep your pet entertained and active"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pet Shop</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Quality products for your beloved pets. From food to toys, we've got everything your pet needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl">{product.name}</h3>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {product.rating}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">₹{product.price}</span>
              <Button onClick={() => addToCart(product)}> 
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
