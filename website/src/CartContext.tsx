import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: string | null;
  setAppliedCoupon: (code: string | null) => void;
  discount: number;
  setDiscount: (amount: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // ✅ LOAD FROM LOCALSTORAGE ON MOUNT
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('eka_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem('eka_coupon') || null;
    } catch {
      return null;
    }
  });

  const [discount, setDiscount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('eka_discount');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // ✅ SAVE CART TO LOCALSTORAGE
  useEffect(() => {
    try {
      localStorage.setItem('eka_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Cart save failed:', e);
    }
  }, [cart]);

  // ✅ SAVE COUPON TO LOCALSTORAGE
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('eka_coupon', appliedCoupon);
      } else {
        localStorage.removeItem('eka_coupon');
      }
    } catch (e) {
      console.error('Coupon save failed:', e);
    }
  }, [appliedCoupon]);

  // ✅ SAVE DISCOUNT TO LOCALSTORAGE
  useEffect(() => {
    try {
      localStorage.setItem('eka_discount', discount.toString());
    } catch (e) {
      console.error('Discount save failed:', e);
    }
  }, [discount]);

  const addToCart: CartContextType["addToCart"] = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart: CartContextType["removeFromCart"] = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity: CartContextType["updateQuantity"] = useCallback((id, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscount(0);
    // ✅ CLEAR LOCALSTORAGE TOO
    localStorage.removeItem('eka_cart');
    localStorage.removeItem('eka_coupon');
    localStorage.removeItem('eka_discount');
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        setAppliedCoupon,
        discount,
        setDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
