import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      return;
    }

    setPermission(Notification.permission);

    // Show prompt after 3 seconds if permission not yet granted/denied
    const hasSeenPrompt = localStorage.getItem('notification-prompt-seen');
    if (Notification.permission === 'default' && !hasSeenPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        // Show a welcome notification
        new Notification('QuickCall Services 🔔', {
          body: 'You will now receive booking reminders!',
          icon: '/favicon.ico',
        });
      }
      
      localStorage.setItem('notification-prompt-seen', 'true');
      setShowPrompt(false);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setShowPrompt(false);
    }
  };

  const dismissPrompt = () => {
    localStorage.setItem('notification-prompt-seen', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt || permission !== 'default') {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 animate-slide-up">
      <div className="rounded-2xl bg-card border border-border/50 card-shadow p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary">
            <Bell className="h-5 w-5 text-primary-foreground" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Enable Notifications
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get instant booking reminders and special offers!
            </p>
            
            <div className="flex gap-2">
              <Button 
                variant="gradient" 
                size="sm" 
                onClick={requestPermission}
                className="flex-1"
              >
                Allow
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={dismissPrompt}
                className="px-3"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPrompt;
