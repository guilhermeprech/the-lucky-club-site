"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "@/app/components/Header";
import {
  CartItem,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/src/lib/cart";
import { formatPrice } from "@/src/lib/format";

export default function BagPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const refreshCart = () => {
      setItems(getCart());
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
    setItems(getCart());
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;

    updateQuantity(id, quantity);
    setItems(getCart());
  };

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <div className="container-editorial py-10 md:py-16">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Sacola
          </p>
          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            Sua seleção
          </h1>
        </div>

        {items.length === 0 ? (
          <div>
            <p className="text-[14px] text-black/60">
              Sua sacola está vazia.
            </p>

            <Link
              href="/collection"
              className="mt-6 inline-block border border-black px-6 py-3 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
            >
              Ver coleção
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-black/10 pb-6"
                >
                  <div className="relative h-[120px] w-[90px] shrink-0 overflow-hidden bg-[#e8e3d8] md:h-[180px] md:w-[140px]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.28em] text-black/36 md:text-[10px]">
                        {item.brand}
                      </p>

                      <h2 className="mt-2 text-[15px] leading-snug md:text-[16px]">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-[14px] text-black/60">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 md:gap-4">
                      <div className="flex items-center border border-black/10">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-[13px] text-black/60 disabled:text-black/20"
                          aria-label="Diminuir quantidade"
                        >
                          −
                        </button>

                        <span className="min-w-[24px] text-center text-[13px]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-[13px] text-black/60"
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-[11px] uppercase tracking-[0.2em] text-black/50 md:ml-4 md:text-[12px]"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit border border-black/10 p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                Resumo
              </p>

              <div className="mt-6 flex items-center justify-between text-[15px]">
                <span>Total</span>
                <span>
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-8 block w-full border border-black px-6 py-4 text-center text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
              >
                Finalizar pedido
              </Link>

              <Link
                href="/collection"
                className="mt-4 inline-block text-[10px] uppercase tracking-[0.28em] text-black/55"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
