"use client";
import { CartProvider } from "react-use-cart";
import { ReactNode } from "react";

export default function ClientCartProvider({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
