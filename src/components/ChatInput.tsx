import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="max-w-3xl mx-auto flex items-end gap-3 bg-muted rounded-xl px-4 py-3 border border-border focus-within:border-primary/50 focus-within:glow-primary transition-all">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gemini..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground font-body min-h-[24px] max-h-[120px]"
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          size="icon"
          className="shrink-0 w-9 h-9 rounded-lg gradient-gemini hover:opacity-90 disabled:opacity-30 transition-opacity"
        >
          <Send className="w-4 h-4 text-primary-foreground" />
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Gemini can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default ChatInput;
