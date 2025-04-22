import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MessageSquare, Heart, UserPlus, Clock, Plus, Image as ImageIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
//import NewDiscussionDialog from '@/components/community/NewDiscussionDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const CommunityPage: React.FC = () => {
  const { toast } = useToast();
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const events = [
    {
      id: 1,
      title: "Pet Adoption Drive",
      date: "May 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Central Park",
      description: "Join us for a day of pet adoptions, featuring dogs and cats from local shelters.",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Dog Training Workshop",
      date: "May 22, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center",
      description: "Learn effective training techniques from professional dog trainers.",
      attendees: 28,
      image: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Pet First Aid Course",
      date: "June 5, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Animal Welfare Society",
      description: "Essential first aid skills for pet owners. Certificate provided upon completion.",
      attendees: 32,
      image: "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?auto=format&fit=crop&w=800&q=80"
    }
  ];

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

  const handleJoinEvent = () => {
    toast({
      title: "Event Joined!",
      description: "You have successfully joined this event.",
    });
  };

  const handleSupportCause = () => {
    toast({
      title: "Thank You!",
      description: "Thank you for supporting our cause.",
    });
  };

  const handleBecomeMember = () => {
    toast({
      title: "Welcome!",
      description: "Thank you for becoming a member.",
    });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostDialogOpen(false);
    setPostTitle('');
    setPostDescription('');
    setPostDate('');
    setPostImage(null);
    setImagePreview(null);
    toast({
      title: "Post created!",
      description: "Your event/service post has been shared with the community.",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPostImage(null);
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto py-8 px-4 relative">
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
                  <span>{event.attendees} attending</span>
                </div>
              </CardContent>
              
              <CardFooter className="border-t bg-muted/20 p-4">
                <Button className="w-full bg-primary" onClick={handleJoinEvent}>
                  Join Event
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Community Forum</h2>
          <div className="flex gap-4">
            <Button onClick={() => setIsNewDiscussionOpen(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Start New Discussion
            </Button>
            <Button onClick={() => setIsPostDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
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
          <Button size="lg" className="bg-primary" onClick={handleBecomeMember}>
            <UserPlus className="h-4 w-4 mr-2" />
            Become a Member
          </Button>
          <Button size="lg" variant="outline" onClick={handleSupportCause}>
            <Heart className="h-4 w-4 mr-2" />
            Support Our Cause
          </Button>
        </div>
      </div>

      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent>
          <form onSubmit={handleCreatePost} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <div>
              <label htmlFor="post-title" className="block mb-1 text-sm font-medium">
                Title
              </label>
              <Input
                id="post-title"
                placeholder="What's the event or service?"
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
                required
                maxLength={70}
              />
            </div>
            <div>
              <label htmlFor="post-desc" className="block mb-1 text-sm font-medium">
                Description
              </label>
              <Textarea
                id="post-desc"
                placeholder="Describe your event or service"
                value={postDescription}
                onChange={e => setPostDescription(e.target.value)}
                rows={4}
                required
                maxLength={300}
              />
            </div>
            <div>
              <label htmlFor="post-date" className="block mb-1 text-sm font-medium">
                Date & Time (optional)
              </label>
              <Input
                id="post-date"
                type="datetime-local"
                value={postDate}
                onChange={e => setPostDate(e.target.value)}
              />
            </div>
            <div>
              <p className="block mb-1 text-sm font-medium">Image (optional)</p>
              <div className="flex items-center gap-3">
                <label htmlFor="post-image" className="inline-flex items-center cursor-pointer">
                  <Input
                    id="post-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="flex items-center px-3 py-1.5 bg-muted hover:bg-accent text-sm rounded shadow-sm">
                    <ImageIcon className="w-5 h-5 mr-1" />
                    {postImage ? "Change Image" : "Add Image"}
                  </span>
                </label>
                {postImage && (
                  <Button type="button" size="sm" variant="outline" onClick={handleRemoveImage}>
                    Remove
                  </Button>
                )}
              </div>
              {imagePreview && (
                <div className="mt-3 flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="w-40 h-40 object-cover rounded border"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewDiscussionOpen} onOpenChange={setIsNewDiscussionOpen} />
    </div>
  );
};

export default CommunityPage;
