import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { db } from "../lib/firebase"

interface DiscussionFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const DiscussionForm: React.FC<DiscussionFormProps> = ({
  isOpen,
  onOpenChange,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast(); // for showing toast notifications

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure author is provided before submitting
    if (!author) {
      alert("Please provide your name.");
      return;
    }

    // Format tags as an array
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const discussionData = {
      title,
      tags: tagsArray,
      author,
      description: description || "", // If description is empty, it's treated as an empty string
      replies: 0,
      lastActive: "just now",
      createdAt: new Date().toISOString(), // Storing the current time of creation
    };

    try {
      // Add the new discussion to Firestore
      const docRef = await addDoc(collection(db, "discussions"), discussionData);
      
      // Success toast
      toast({
        title: "Discussion Started",
        description: "Your discussion has been posted.",
      });

      onSuccess(); // triggers success logic (closes form)
      setTitle("");
      setTags("");
      setAuthor("");
      setDescription("");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "There was an error posting your discussion. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Start a New Discussion</DialogTitle>
          </DialogHeader>

          <div>
            <label htmlFor="discussion-title" className="block mb-1 text-sm font-medium">
              Title
            </label>
            <Input
              id="discussion-title"
              placeholder="Discussion topic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="discussion-tags" className="block mb-1 text-sm font-medium">
              Tags (comma-separated)
            </label>
            <Input
              id="discussion-tags"
              placeholder="e.g. dogs, health, training"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="discussion-author" className="block mb-1 text-sm font-medium">
              Your Name 
            </label>
            <Input
              id="discussion-author"
              placeholder="Enter your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="discussion-desc" className="block mb-1 text-sm font-medium">
              Description
            </label>
            <Textarea
              id="discussion-desc"
              placeholder="Start the conversation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Post Discussion</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscussionForm;
