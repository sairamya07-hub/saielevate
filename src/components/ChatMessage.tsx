import { Sparkles, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 px-4 py-5 ${isUser ? "" : "bg-gemini-surface/40"}`}>
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isUser ? "bg-secondary" : "gradient-gemini"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-secondary-foreground" />
        ) : (
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground mb-1 font-display">
          {isUser ? "You" : "Gemini"}
        </p>
        <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
