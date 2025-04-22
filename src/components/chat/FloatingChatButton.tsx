
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import ChatInterface from "./ChatInterface";
import { cn } from "@/lib/utils";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className={cn(
            "fixed bottom-4 right-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50",
            "bg-gradient-to-br from-chat-light to-chat-dark", 
            "hover:from-chat-medium hover:to-chat-dark",
            "animate-pulse-slow", // Add a subtle pulse animation
            "transform hover:scale-110", // Slight scale on hover
            "text-white", // Ensure text/icon is visible
            "border-4 border-white/20" // Subtle border for more definition
          )}
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0">
        <ChatInterface onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default FloatingChatButton;
