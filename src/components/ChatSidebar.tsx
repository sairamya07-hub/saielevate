import { Plus, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  onNewChat: () => void;
}

const ChatSidebar = ({ onNewChat }: ChatSidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg gradient-gemini flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <h1 className="font-display text-lg font-semibold text-foreground tracking-tight">
          Elevate AI
        </h1>
      </div>

      {/* New Chat Button */}
      <div className="px-3 mb-4">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2 bg-secondary hover:bg-accent text-secondary-foreground border border-border"
          variant="outline"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Chat History Placeholder */}
      <div className="flex-1 px-3 overflow-y-auto">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
          Recent
        </p>
        <div className="space-y-1">
          {["What is quantum computing?", "Explain React hooks", "Write a poem"].map(
            (title, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors truncate"
              >
                <MessageSquare className="w-3.5 h-3.5 inline mr-2 opacity-50" />
                {title}
              </button>
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
