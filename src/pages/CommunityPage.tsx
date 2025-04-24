// src/pages/CommunityPage.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Your UI button component
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"; // UI card components
import { Badge } from "@/components/ui/badge"; // Badge UI component
import { Calendar, Users, MessageSquare, Check } from "lucide-react"; // Icons for UI
import PostForm from "../components/PostForm"; // Post form for adding events
import DiscussionForm from "../components/DiscussionForm"; // Discussion form for creating discussions
import { useToast } from "@/hooks/use-toast"; // Toast notifications for success/error
import { db } from "../lib/firebase"; // Firebase configuration
import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Firestore methods
import { useAuth } from "@/hooks/useAuth"; // Custom hook to get the authenticated user

const CommunityPage: React.FC = () => {
  const { user } = useAuth(); // Get the current authenticated user
  const { toast } = useToast(); // Toast for notifications
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [showPostForm, setShowPostForm] = useState(false); // State to control post form visibility
  const [showDiscussionForm, setShowDiscussionForm] = useState(false); // State to control discussion form visibility
  const [discussions, setDiscussions] = useState<any[]>([]); // State for fetched discussions
  const [events, setEvents] = useState<any[]>([]); // State for fetched events
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]); // Track joined events by user
  const [eventAttendees, setEventAttendees] = useState<any>({}); // Track attendees for each event

  // Fetch user role (admin/user) from Firestore
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid)); // Get user data
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData?.role === "admin"); // Set isAdmin based on user role
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          toast({
            title: "Error",
            description: "Unable to fetch user role.",
            variant: "destructive",
          });
        }
      }
    };
    fetchUserRole();
  }, [user, toast]);

  // Fetch discussions from Firestore
  const fetchDiscussions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "discussions"));
      const discussionsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiscussions(discussionsList); // Update discussions state
    } catch (error) {
      console.error("Error fetching discussions:", error);
      toast({
        title: "Error",
        description: "Failed to load discussions. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Fetch posts (events) from Firestore
  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList); // Update events state

      // Initialize event attendees count for each event
      const initialAttendees: any = {};
      eventsList.forEach((event) => {
        initialAttendees[event.id] = eventAttendees[event.id] || 0; // Default to 0 if not already set
      });
      setEventAttendees(initialAttendees);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle user joining or leaving an event
  const handleJoinEvent = (eventId: number) => {
    const isJoined = joinedEvents.includes(eventId);

    if (isJoined) {
      setJoinedEvents((prev) => prev.filter((id) => id !== eventId));
      setEventAttendees((current) => ({
        ...current,
        [eventId]: (current[eventId] || 0) - 1, // Decrease the attendees count
      }));
    } else {
      setJoinedEvents((prev) => [...prev, eventId]);
      setEventAttendees((current) => ({
        ...current,
        [eventId]: (current[eventId] || 0) + 1, // Increase the attendees count
      }));
    }
  };

  // Callback for successful event creation
  const handlePostFormSuccess = () => {
    toast({
      title: "Event Created",
      description: "Your event has been added successfully.",
    });
    setShowPostForm(false);
    fetchEvents(); // Re-fetch events after creating a new one
  };

  // Callback for successful discussion creation
  const handleDiscussionFormSuccess = () => {
    toast({
      title: "Discussion Started",
      description: "Your discussion has been posted.",
    });
    setShowDiscussionForm(false);
  };

  useEffect(() => {
    fetchDiscussions(); // Fetch discussions when the page loads
    fetchEvents(); // Fetch events when the page loads
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Animal Welfare Community</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow animal lovers, participate in events, and join
          discussions about animal welfare.
        </p>
      </div>

      {/* Show the Post Form modal for admins only */}
      {isAdmin && showPostForm && (
        <PostForm
          isOpen={showPostForm}
          onOpenChange={setShowPostForm}
          onSuccess={handlePostFormSuccess}
        />
      )}

      {/* Show the Discussion Form */}
      <DiscussionForm
        isOpen={showDiscussionForm}
        onOpenChange={setShowDiscussionForm}
        onSuccess={handleDiscussionFormSuccess}
      />

      {/* Display upcoming events */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          {/* Admins can see and click the "Add Event" button */}
          {isAdmin && (
            <Button onClick={() => setShowPostForm(true)}>Add Event</Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image || "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=800"}
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
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{eventAttendees[event.id] || 0} attending</span>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-muted/20 p-4">
                <Button
                  className={`w-full ${
                    joinedEvents.includes(event.id)
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-primary"
                  }`}
                  onClick={() => handleJoinEvent(event.id)}
                >
                  {joinedEvents.includes(event.id) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Event Joined
                    </>
                  ) : (
                    "Join Event"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Display community discussions */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Community Forum</h2>
          <Button onClick={() => setShowDiscussionForm(true)}>Start New Discussion</Button>
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
          <Button variant="outline">Load More Discussions</Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
