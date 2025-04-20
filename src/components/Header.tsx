
import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="flex items-center justify-center mb-2">
        <Shield className="h-8 w-8 mr-2 text-primary" />
        <h1 className="text-4xl font-bold gradient-text">PawsProtect</h1>
      </div>
      <p className="text-muted-foreground max-w-md mx-auto">
        A comprehensive platform for animal welfare, rescue, adoption, and community engagement
      </p>
    </header>
  );
};

export default Header;
