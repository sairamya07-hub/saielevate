import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSend = async (prompt: string) => {
    const userMsg: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: { prompt },
      });

      if (error) throw error;

      const assistantMsg: Message = {
        role: "assistant",
        content: data.reply ?? "No response received.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Error calling Gemini:", err);
      toast.error("Failed to get response from Gemini");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar onNewChat={handleNewChat} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-4">
              <div className="w-16 h-16 rounded-2xl gradient-gemini flex items-center justify-center mb-6 glow-primary">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                Hello! How can I help you?
              </h2>
              <p className="text-muted-foreground text-sm max-w-md text-center">
                I'm powered by Google's Gemini AI. Ask me anything — from coding questions to creative writing.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="flex gap-4 px-4 py-5 bg-gemini-surface/40">
                  <div className="w-8 h-8 rounded-lg gradient-gemini flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse-glow" />
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow [animation-delay:0.3s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow [animation-delay:0.6s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Index;
