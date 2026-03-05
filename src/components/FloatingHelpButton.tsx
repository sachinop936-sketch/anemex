import { MessageCircle } from 'lucide-react';

const FloatingHelpButton = () => {
  return (
    <a 
      href="https://t.me/SUNITA_OKK"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full gradient-primary button-shadow transition-transform duration-300 hover:scale-105 active:scale-95 px-4 py-3"
      aria-label="Support Chat"
    >
      <MessageCircle className="h-5 w-5 text-primary-foreground" />
      <span className="text-sm font-medium text-primary-foreground">Support Chat</span>
    </a>
  );
};

export default FloatingHelpButton;
