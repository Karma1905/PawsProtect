
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { cn } from '@/lib/utils';

interface RandomButtonProps {
  onClick: () => void;
  isGenerating: boolean;
}

const RandomButton: React.FC<RandomButtonProps> = ({ onClick, isGenerating }) => {
  return (
    <Button 
      onClick={onClick}
      disabled={isGenerating}
      size="lg"
      className={cn(
        "bg-gradient-to-r from-chat-medium to-chat-dark hover:opacity-90 transition-all rounded-full px-8 py-6 h-auto",
        isGenerating && "animate-pulse-slow"
      )}
    >
      <Sparkles className="mr-2 h-5 w-5" />
      {isGenerating ? "Generating..." : "Random Conversation Starter"}
    </Button>
  );
};

export default RandomButton;
