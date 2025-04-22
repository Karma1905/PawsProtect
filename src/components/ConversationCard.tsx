
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ConversationStarter } from '@/data/conversationStarters';
import { cn } from '@/lib/utils';

interface ConversationCardProps {
  starter: ConversationStarter;
  isActive: boolean;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ starter, isActive }) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(starter.text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
      duration: 1500,
    });
  };

  return (
    <Card className={cn(
      "relative border-2 transition-all duration-300 h-full",
      isActive 
        ? "border-chat-medium shadow-lg scale-100" 
        : "border-transparent shadow hover:shadow-md scale-98 hover:scale-100"
    )}>
      <CardContent className="p-6 flex flex-col h-full">
        <p className="text-lg flex-grow">{starter.text}</p>
        <div className="flex justify-end mt-4">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={copyToClipboard}
            className="rounded-full h-8 w-8"
          >
            <Copy size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;
