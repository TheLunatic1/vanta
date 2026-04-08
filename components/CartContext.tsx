/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CartContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  productID: string;
  title: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productID: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find(item => item.productID === product.productID);
      if (existing) {
        return prev.map(item =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          productID: product.productID,
          title: product.title,
          price: product.salePrice || product.price,
          salePrice: product.salePrice,
          quantity: 1,
          image: product.images?.[0] || ''
        }];
      }
    });
  };

  const removeFromCart = (productID: string) => {
    setCart(prev => prev.filter(item => item.productID !== productID));
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};