import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  getItemCount: () => number;
  clearCart: () => void;
}

const CART_STORAGE_KEY = 'buzzcart_items';

const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Unique key for cart item: id + size combo
const cartKey = (id: string, size?: string) => `${id}__${size || ''}`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id && i.size === size);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === id && i.size === size ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => !(i.id === id && i.size === size));
    });
  };

  const updateQuantity = (id: string, quantity: number, size?: string) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity: Math.min(10, quantity) } : i))
      );
    }
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, getItemCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
