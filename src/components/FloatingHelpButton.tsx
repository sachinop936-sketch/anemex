import { MessageCircle } from 'lucide-react';

const FloatingHelpButton = () => {
  return (
    <button 
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full gradient-primary button-shadow transition-transform duration-300 hover:scale-110 active:scale-95"
      aria-label="Help"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground" />
    </button>
  );
};

export default FloatingHelpButton;
