
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Twitter, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
};

const TeamPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  
  const toggleExpand = (id: number) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Arnav Das",
      role: "Team Leader",
      bio: "Arnav Das 10 years of veterinary expertise to our team. He specializes in emergency care and rehabilitation of injured animals.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
      social: {
        linkedin: "#",
        email: "drmichael@pawsprotect.com"
      }
    },
    {
      id: 2,
      name: "Kuntal Pandya",
      role: "Team Member",
      bio: "Kuntal has been passionate about animal welfare for over 15 years. She founded PawsProtect to make a lasting impact on animal lives.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "sarah@pawsprotect.com"
      }
    },
    
    {
      id: 3,
      name: "Ayush Patel",
      role: "Team Member",
      bio: "Ayush leads our animal rescue operations, coordinating teams and resources to respond quickly to animals in distress.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "david@pawsprotect.com"
      }
    },
    {
      id: 4,
      name: "Deepak Sharma",
      role: "Team Member",
      bio: "Deepak develops and manages our educational programs, community events, and partnerships with local organizations.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "james@pawsprotect.com"
      }
    },
  ];

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Our Team</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the dedicated professionals working tirelessly to protect and care for animals in need.
          Our team combines expertise, compassion, and commitment to animal welfare.
        </p>
        
        <div className="max-w-md mx-auto mt-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredMembers.map((member) => (
          <motion.div 
            key={member.id}
            variants={itemVariants}
            whileHover="hover"
          >
            <Card className="overflow-hidden h-full border-transparent bg-gradient-to-b from-card to-card/90 hover:border-primary/20 transition-all">
              <div className="aspect-square overflow-hidden bg-muted">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl text-primary/90">{member.name}</h3>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                
                <div className="relative">
                  <p className={`text-muted-foreground text-sm ${expandedMember === member.id ? '' : 'line-clamp-3'}`}>
                    {member.bio}
                  </p>
                  {member.bio.length > 100 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-1 h-6 p-0 text-primary/80 hover:text-primary"
                      onClick={() => toggleExpand(member.id)}
                    >
                      {expandedMember === member.id ? (
                        <><ChevronUp className="h-4 w-4 mr-1" /> Read less</>
                      ) : (
                        <><ChevronDown className="h-4 w-4 mr-1" /> Read more</>
                      )}
                    </Button>
                  )}
                </div>
                
                <div className="flex space-x-3 mt-4">
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.email && (
                    <a 
                      href={`mailto:${member.social.email}`} 
                      className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-2xl text-center shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 gradient-text">Join Our Team</h2>
        <p className="mb-6 max-w-2xl mx-auto text-foreground/80">
          Passionate about animal welfare? We're always looking for dedicated people to join our mission. 
          Check out our current openings or contact us to learn more about volunteer opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors shadow-md hover:shadow-lg">
            View Open Positions
          </Button>
          <Button variant="outline" className="border-primary/20 bg-background hover:bg-accent/10 text-foreground transition-colors shadow-md hover:shadow-lg">
            Volunteer With Us
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamPage;
