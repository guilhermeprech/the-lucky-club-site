"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartItem,
  getCart,
  getCartCount,
  removeFromCart,
  updateQuantity,
} from "@/src/lib/cart";

export default function BagPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const refreshCart = () => {
      const cart = getCart();
      setItems(cart);
      setCartCount(getCartCount());
    };

    refreshCart();

    window.addEventListener("focus", refreshCart);

    return () => {
      window.removeEventListener("focus", refreshCart);
    };
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const handleRemove = (id: number) => {
    removeFromCart(id);
    const updatedCart = getCart();
    setItems(updatedCart);
    setCartCount(getCartCount());
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;

    updateQuantity(id, quantity);
    const updatedCart = getCart();
    setItems(updatedCart);
    setCartCount(getCartCount());
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-black/10">
        <div className="container-editorial flex items-center justify-between py-5 text-[11px] uppercase tracking-[0.28em]">
          <nav className="hidden items-center gap-6 md:flex">
            <a href="/">Home</a>
            <a href="/collection">Collection</a>
            <a href="/about">About</a>
          </nav>

          <a href="/" className="text-center tracking-[0.42em]">
            The Lucky Club
          </a>

          <nav className="flex items-center gap-6">
            <a href="/collection">Continue shopping</a>
            <a href="/bag">Bag ({cartCount})</a>
          </nav>
        </div>
      </header>

      <div className="container-editorial py-16">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Bag
          </p>
          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            Your selection
          </h1>
        </div>

        {items.length === 0 ? (
          <div>
            <p className="text-[14px] text-black/60">Your bag is empty.</p>

            <a
              href="/collection"
              className="mt-6 inline-block border border-black px-6 py-3 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
            >
              Go to collection
            </a>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-5 border-b border-black/10 pb-6 md:grid-cols-[140px_1fr]"
                >
                  <div className="aspect-[3/4] bg-[#e8e3d8]" />

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-black/36">
                        {item.brand}
                      </p>

                      <h2 className="mt-2 text-[16px]">{item.name}</h2>

                      <p className="mt-2 text-[14px] text-black/60">
                        {item.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="border border-black px-3 py-1"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="border border-black px-3 py-1"
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="ml-4 text-[12px] uppercase tracking-[0.2em] text-black/50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit border border-black/10 p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                Summary
              </p>

              <div className="mt-6 flex items-center justify-between text-[15px]">
                <span>Total</span>
                <span>
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              <button className="mt-8 w-full border border-black px-6 py-4 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]">
                Proceed
              </button>

              <a
                href="/collection"
                className="mt-4 inline-block text-[10px] uppercase tracking-[0.28em] text-black/55"
              >
                Continue shopping
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}