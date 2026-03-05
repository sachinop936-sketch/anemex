export const sendBookingReminder = (profileName: string, serviceName: string) => {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }

  try {
    new Notification(`Booking Reminder - ${profileName}`, {
      body: `Your ${serviceName} session is ready! Complete your payment now.`,
      icon: '/favicon.ico',
      tag: 'booking-reminder',
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const sendPaymentReminder = (amount: number) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  try {
    new Notification('Complete Your Payment 💳', {
      body: `Your booking of ₹${amount} is pending. Complete now to avoid expiry!`,
      icon: '/favicon.ico',
      tag: 'payment-reminder',
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const scheduleReminder = (callback: () => void, delayMs: number) => {
  return setTimeout(callback, delayMs);
};
