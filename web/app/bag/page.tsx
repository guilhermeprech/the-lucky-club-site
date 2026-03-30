"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import {
  CartItem,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/src/lib/cart";

export default function BagPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  const whatsappNumber = "5554999484343";

  useEffect(() => {
    const refreshCart = () => {
      const cart = getCart();
      setItems(cart);
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
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;

    updateQuantity(id, quantity);
    const updatedCart = getCart();
    setItems(updatedCart);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const itemsText = items
      .map(
        (item) =>
          `• ${item.brand} ${item.name} — Qtd: ${item.quantity} — ${(
            item.price * item.quantity
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`
      )
      .join("%0A");

    const message =
      `Olá! Gostaria de finalizar meu pedido na The Lucky Club.%0A%0A` +
      `Itens:%0A${itemsText}%0A%0A` +
      `Total: ${total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
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

            <a
              href="/collection"
              className="mt-6 inline-block border border-black px-6 py-3 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
            >
              Ver coleção
            </a>
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
                        unoptimized
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
                        {item.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 md:gap-4">
                      {/* <button
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
                      </button> */}

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
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-8 w-full border border-black px-6 py-4 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
              >
                Finalizar pedido
              </button>

              <a
                href="/collection"
                className="mt-4 inline-block text-[10px] uppercase tracking-[0.28em] text-black/55"
              >
                Continuar comprando
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}