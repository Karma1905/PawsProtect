
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MessageSquare, Heart, UserPlus, Clock, Check } from 'lucide-react';
import React, { useState } from 'react';

const CommunityPage: React.FC = () => {
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const [eventAttendees, setEventAttendees] = useState({
    1: 45,
    2: 28,
    3: 32
  });

  const handleJoinEvent = (eventId: number) => {
    const isJoined = joinedEvents.includes(eventId);
    
    if (isJoined) {
      // If already joined, remove from joined events and decrease attendee count
      setJoinedEvents(prev => prev.filter(id => id !== eventId));
      setEventAttendees(current => ({
        ...current,
        [eventId]: current[eventId] - 1
      }));
    } else {
      // If not joined, add to joined events and increase attendee count
      setJoinedEvents(prev => [...prev, eventId]);
      setEventAttendees(current => ({
        ...current,
        [eventId]: current[eventId] + 1
      }));
    }
  };
  
  // Sample community events data
  const events = [
    {
      id: 1,
      title: "Pet Adoption Drive",
      date: "May 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Central Park",
      description: "Join us for a day of pet adoptions, featuring dogs and cats from local shelters.",
      //attendees: 45,
      image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Dog Training Workshop",
      date: "May 22, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center",
      description: "Learn effective training techniques from professional dog trainers.",
      //attendees: 28,
      image: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Pet First Aid Course",
      date: "June 5, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Animal Welfare Society",
      description: "Essential first aid skills for pet owners. Certificate provided upon completion.",
      //attendees: 32,
      image: "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Sample forum discussions data
  const discussions = [
    {
      id: 1,
      title: "Best food options for senior dogs",
      author: "DogLover123",
      replies: 24,
      lastActive: "2 hours ago",
      tags: ["nutrition", "senior pets", "dogs"]
    },
    {
      id: 2,
      title: "How to introduce a new cat to your home",
      author: "CatWhisperer",
      replies: 18,
      lastActive: "5 hours ago",
      tags: ["cats", "pet behavior", "new pets"]
    },
    {
      id: 3,
      title: "Looking for recommendations on local vets",
      author: "PetParent",
      replies: 31,
      lastActive: "1 day ago",
      tags: ["veterinary", "local", "recommendations"]
    },
    {
      id: 4,
      title: "Tips for fostering rescue animals",
      author: "RescueHero",
      replies: 15,
      lastActive: "2 days ago",
      tags: ["fostering", "rescue", "animal welfare"]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Animal Welfare Community</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow animal lovers, participate in events, and join discussions about animal welfare.
        </p>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            View All Events
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <CardHeader>
                <h3 className="font-bold text-xl">{event.title}</h3>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                
                <p className="text-muted-foreground">{event.description}</p>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {/* <span>{event.attendees} attending</span> */}
                  <span>{eventAttendees[event.id]} attending</span>
                </div>
              </CardContent>
              
              <CardFooter className="border-t bg-muted/20 p-4">
                <Button 
                  className={`w-full ${joinedEvents.includes(event.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-primary'}`}
                  onClick={() => handleJoinEvent(event.id)}
                >
                  {joinedEvents.includes(event.id) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Event Joined
                    </>
                  ) : (
                    'Join Event'
                  )}
                </Button> 
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Community Forum</h2>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start New Discussion
          </Button>
        </div>

        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg hover:text-primary cursor-pointer">
                    {discussion.title}
                  </h3>
                  <Badge variant="outline">{discussion.replies} replies</Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3 mb-4">
                  {discussion.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>By: {discussion.author}</span>
                  <span>Last activity: {discussion.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline">
            Load More Discussions
          </Button>
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Connect with fellow animal lovers, share your experiences, and make a difference in animal welfare.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary">
            <UserPlus className="h-4 w-4 mr-2" />
            Become a Member
          </Button>
          <Button size="lg" variant="outline">
            <Heart className="h-4 w-4 mr-2" />
            Support Our Cause
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
