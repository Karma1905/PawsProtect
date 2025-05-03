import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PawPrint, Menu, X, AlertTriangle, Heart, Calendar,
  Users, User, Shield, LogIn, UserPlus, ShoppingBag, ShoppingCart
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/components/CartContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { label: "Report", path: "/report", icon: AlertTriangle },
    { label: "Adopt", path: "/adopt", icon: Heart },
    { label: "Veterinary", path: "/veterinary", icon: Calendar },
    { label: "Community", path: "/community", icon: Users },
    { label: "Shop", path: "/shop", icon: ShoppingBag },
  ];

  const handleLogin = () => navigate("/login");
  const handleSignUp = () => navigate("/signup");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PawPrint className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl text-white">PawsProtect</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                asChild
                className={`flex items-center gap-1 py-2 px-4 rounded-md transition-all ${location.pathname === link.path ? "bg-primary text-white" : "text-white"}`} 
              >
                <Link to={link.path}>
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Authentication buttons or profile */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Avatar dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative p-0.5 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profileImage} alt={user?.name} />
                        <AvatarFallback className="text-white">{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="text-white"> 
                    <DropdownMenuLabel className="text-white">{user?.name}</DropdownMenuLabel> 
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")} className="text-white">
                      <User className="h-5 w-5 mr-2" /> Profile
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <DropdownMenuItem onClick={() => navigate("/admin")} className="text-white"> 
                        <Shield className="h-5 w-5 mr-2" /> Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <LogIn className="h-5 w-5 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart Icon */}
                <Button variant="ghost" className="relative text-white" onClick={() => navigate("/cart")}> 
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-500 text-white text-xs rounded-full text-center">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" onClick={handleLogin} className="text-white"> 
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="bg-primary text-white" onClick={handleSignUp}> 
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated && (
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImage} alt={user?.name} />
                  <AvatarFallback className="text-white">{user?.name?.charAt(0)}</AvatarFallback> 
                </Avatar>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}> 
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                asChild
                className={`w-full text-left py-2 rounded-md text-white ${location.pathname === link.path ? "bg-primary" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to={link.path}>
                  <link.icon className="h-5 w-5 mr-2" />
                  {link.label}
                </Link>
              </Button>
            ))}
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full text-left py-2 text-white" 
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Button>
                {user?.role === 'admin' && (
                  <Button
                    variant="ghost"
                    className="w-full text-left py-2 text-white"
                    onClick={() => {
                      navigate("/admin");
                      setIsMenuOpen(false);
                    }}
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full text-left py-2 text-red-500"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" className="w-full text-white" size="sm" onClick={() => { 
                  handleLogin();
                  setIsMenuOpen(false);
                }}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button className="w-full bg-primary text-white" size="sm" onClick={() => { 
                  handleSignUp();
                  setIsMenuOpen(false);
                }}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;