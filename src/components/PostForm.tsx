import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
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
import { Image as ImageIcon } from "lucide-react";
import { db, storage } from "../lib/firebase"; // import firebase config
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface PostFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ isOpen, onOpenChange, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    // let imageUrl = '';
    // if (image) {
    //   const storageRef = ref(storage, `posts/${Date.now()}-${image.name}`);
    //   await uploadBytes(storageRef, image);
    //   imageUrl = await getDownloadURL(storageRef);
    // }

    // Save post data to Firestore
    try {
      await addDoc(collection(db, "posts"), {
        title,
        date,
        address,
        // imageUrl,
        createdAt: new Date(),
      });
      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDate('');
    setAddress('');
    setImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>

          <div>
            <label htmlFor="event-title" className="block mb-1 text-sm font-medium">
              Title
            </label>
            <Input
              id="event-title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={70}
            />
          </div>

          <div>
            <label htmlFor="event-date" className="block mb-1 text-sm font-medium">
              Date
            </label>
            <Input
              id="event-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="event-address" className="block mb-1 text-sm font-medium">
              Address
            </label>
            <Input
              id="event-address"
              placeholder="Enter event address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="event-image" className="block mb-1 text-sm font-medium">Image (optional)</label>
            <div className="flex items-center gap-3">
              <label htmlFor="event-image" className="inline-flex items-center cursor-pointer">
                <Input
                  id="event-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="flex items-center px-3 py-1.5 bg-muted hover:bg-accent text-sm rounded shadow-sm">
                  <ImageIcon className="w-5 h-5 mr-1" />
                  {image ? "Change Image" : "Add Image"}
                </span>
              </label>
              {image && (
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
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;
