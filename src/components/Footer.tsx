
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Heart, Github, Mail } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`
      ${isDark 
        ? 'bg-gray-900 text-white/90 border-t border-white/10' 
        : 'bg-primary-foreground border-t border-gray-200'}
      mt-auto w-full`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Heart className={`h-6 w-6 ${isDark ? 'text-white/80' : 'text-primary'} mr-2`} />
              <span className="font-bold text-xl">PawsProtect</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
              Dedicated to the welfare and protection of animals in need.
              Together we can make a difference.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { path: '/', label: 'Home' },
                { path: '/report', label: 'Report Animal' },
                { path: '/adopt', label: 'Adopt' },
                { path: '/veterinary', label: 'Veterinary Services' },
                { path: '/team', label: 'Our Team' }
                { path: '/shop', label: 'Shop' }
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link 
                    to={path} 
                    className={`
                      ${isDark 
                        ? 'text-white/60 hover:text-white/90' 
                        : 'text-muted-foreground hover:text-primary'} 
                      transition-colors`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className={`flex items-center ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@pawsprotect.com</span>
              </li>
              <li className={isDark ? 'text-white/60' : 'text-muted-foreground'}>
                <span>123 Animal Care Street</span>
              </li>
              <li className={isDark ? 'text-white/60' : 'text-muted-foreground'}>
                <span>Pet City, PC 12345</span>
              </li>
              <li className={isDark ? 'text-white/60' : 'text-muted-foreground'}>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Github].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  aria-label={Icon.name} 
                  className={`
                    ${isDark 
                      ? 'text-white/60 hover:text-white/90' 
                      : 'text-muted-foreground hover:text-primary'} 
                    transition-colors`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`
          border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center
          ${isDark ? 'border-white/10' : 'border-gray-200'}`}
        >
          <p className={`text-sm ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
            &copy; {new Date().getFullYear()} PawsProtect. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy, index) => (
              <Link 
                key={index} 
                to="#" 
                className={`
                  text-xs 
                  ${isDark 
                    ? 'text-white/60 hover:text-white/90' 
                    : 'text-muted-foreground hover:text-primary'} 
                  transition-colors`}
              >
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
