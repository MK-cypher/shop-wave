"use client";
import {useSearchParams} from "next/navigation";
import {createContext, useState, useContext, useEffect, ReactNode, Suspense} from "react";
import {CartItem} from "./types";

interface CartContextType {
  cart: CartItem[];
  totalPrice: number;
  addItemToCart: (item: CartItem, qty?: number) => void;
  removeItemFromCart: (itemId: string, price: number, quantity: number) => void;
  clearCart: () => void;
  increaseQty: (itemId: string) => void;
  decreaseQty: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const search = useSearchParams();

  const clearCart = () => {
    localStorage.setItem("cart", "[]");
    setCart([]);
  };

  useEffect(() => {
    const success = search.get("payment");
    if (success == "success") {
      clearCart();
    }
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
      const savedCart = JSON.parse(cartStorage);
      if (savedCart) {
        setCart(savedCart);
        const total = savedCart.reduce((sum: any, item: any) => sum + Number(item.price), 0);
        setTotalPrice(total);
      }
    } else {
      localStorage.setItem("cart", "[]");
    }
  }, []);
  useEffect(() => {
    const total = cart.reduce((sum: any, item: any) => sum + Number(item.price) * item.quantity, 0);
    setTotalPrice(total);
    if (cart.length >= 1) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addItemToCart = (item: CartItem, qty = 1) => {
    const itemExist = cart.find((obj) => obj.id === item.id);
    if (!itemExist) {
      const cartStorage = localStorage.getItem("cart");
      item.quantity = qty;
      if (cartStorage) {
        const savedCart = JSON.parse(cartStorage);
        if (savedCart.length < 1) {
          localStorage.setItem("cart", JSON.stringify([item]));
        }
      }
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  const increaseQty = (itemId: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id == itemId && item.quantity < item.max_quantity) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
  };
  const decreaseQty = (itemId: string) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id == itemId && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else if (item.id == itemId && item.quantity <= 1) {
            removeItemFromCart(itemId, item.price, item.quantity);
            return null;
          } else {
            return item;
          }
        })
        .filter((obj) => obj !== null)
    );
  };

  const setQty = (itemId: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id == itemId && qty <= item.max_quantity) {
          return {
            ...item,
            quantity: qty,
          };
        }

        return item;
      })
    );
  };

  const removeItemFromCart = (itemId: string, price: number, quantity: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setTotalPrice(totalPrice - Number(price) * quantity);
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
      const savedCart = JSON.parse(cartStorage);
      if (savedCart.length == 1) {
        localStorage.removeItem("cart");
      }
    }
  };

  return (
    <Suspense>
      <CartContext.Provider
        value={{
          cart,
          totalPrice,
          setQty,
          increaseQty,
          decreaseQty,
          addItemToCart,
          removeItemFromCart,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </Suspense>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
