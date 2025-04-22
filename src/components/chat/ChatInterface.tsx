
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Chat with us</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-lg max-w-[80%]">
            👋 Hi! How can I help you today?
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
