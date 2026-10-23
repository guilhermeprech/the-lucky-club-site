"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "@/app/components/Header";
import { CartItem, clearCart, getCart } from "@/src/lib/cart";
import { formatPrice } from "@/src/lib/format";

const PAYMENT_METHODS = ["Pix", "Cartão de crédito", "Boleto"];

type SimulatedOrder = {
  items: CartItem[];
  total: number;
  paymentMethod: string;
};

function getTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [order, setOrder] = useState<SimulatedOrder | null>(null);

  useEffect(() => {
    const loadCart = () => {
      setItems(getCart());
      setLoaded(true);
    };

    loadCart();
  }, []);

  const total = useMemo(() => getTotal(items), [items]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;

    setOrder({ items, total, paymentMethod });
    clearCart();
    setItems([]);
    e.currentTarget.reset();
    window.scrollTo({ top: 0 });
  };

  if (order) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Header />

        <section className="container-editorial py-14 md:py-20">
          <div className="mx-auto max-w-[620px] text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="mt-8 text-4xl tracking-[-0.05em] md:text-6xl">
              Compra concluída!
            </h1>

            <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-8 text-black/65">
              Esta é uma demonstração de um projeto de e-commerce desenvolvido
              pela G9 CODE. Nenhum pedido ou pagamento real foi realizado.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[620px] border border-black/10 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Resumo da compra simulada
            </p>

            <ul className="mt-6 divide-y divide-black/10">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-[72px] w-[54px] shrink-0 overflow-hidden bg-[#e8e3d8]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-black/36">
                      {item.brand}
                    </p>
                    <p className="mt-1 truncate text-[14px]">{item.name}</p>
                    <p className="mt-1 text-[12px] text-black/45">
                      Qtd: {item.quantity}
                    </p>
                  </div>

                  <p className="text-[14px] text-black/70">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-5 text-[15px]">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>

            <p className="mt-3 text-[12px] text-black/45">
              Forma de pagamento simulada: {order.paymentMethod}
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/collection"
              className="inline-block border border-black px-8 py-4 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
            >
              Voltar para a coleção
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <div className="container-editorial py-10 md:py-16">
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Checkout
          </p>
          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            Finalizar compra
          </h1>
        </div>

        {!loaded ? null : items.length === 0 ? (
          <div>
            <p className="text-[14px] text-black/60">Sua sacola está vazia.</p>

            <Link
              href="/collection"
              className="mt-6 inline-block border border-black px-6 py-3 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
            >
              Ver coleção
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="space-y-10">
              <div className="border border-black/10 p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                  Dados de entrega
                </p>

                <p className="mt-4 text-[13px] leading-6 text-black/55">
                  Campos opcionais. Use apenas informações fictícias — nada é
                  enviado ou armazenado.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {[
                    { id: "name", label: "Nome", placeholder: "Cliente Demonstração" },
                    { id: "city", label: "Cidade", placeholder: "Cidade Exemplo" },
                    { id: "address", label: "Endereço", placeholder: "Rua Exemplo, 123" },
                    { id: "zip", label: "CEP", placeholder: "00000-000" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={`checkout-${field.id}`}
                        className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45"
                      >
                        {field.label}
                      </label>
                      <input
                        id={`checkout-${field.id}`}
                        placeholder={field.placeholder}
                        className="w-full border border-black/10 bg-transparent px-4 py-3 text-[14px] outline-none placeholder:text-black/30 focus:border-black/30"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <fieldset className="border border-black/10 p-6 md:p-8">
                <legend className="sr-only">Forma de pagamento</legend>
                <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                  Forma de pagamento
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method}
                      className={`cursor-pointer border px-4 py-3 text-center text-[10px] uppercase tracking-[0.24em] transition ${
                        paymentMethod === method
                          ? "border-black bg-black text-[#f3f1e9]"
                          : "border-black/10 text-black/55 hover:border-black/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="sr-only"
                      />
                      {method}
                    </label>
                  ))}
                </div>

                <p className="mt-4 text-[12px] text-black/45">
                  Pagamento simulado. Nenhuma cobrança é realizada.
                </p>
              </fieldset>
            </div>

            <div className="h-fit border border-black/10 p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                Resumo
              </p>

              <ul className="mt-4 divide-y divide-black/10">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-4 py-4 text-[14px]"
                  >
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.28em] text-black/36">
                        {item.brand}
                      </p>
                      <p className="mt-1">{item.name}</p>
                      <p className="mt-1 text-[12px] text-black/45">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 text-black/70">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-5 text-[15px]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                type="submit"
                className="mt-8 w-full border border-black px-6 py-4 text-[10px] uppercase tracking-[0.32em] transition hover:bg-black hover:text-[#f3f1e9]"
              >
                Finalizar compra
              </button>

              <Link
                href="/bag"
                className="mt-4 inline-block text-[10px] uppercase tracking-[0.28em] text-black/55"
              >
                Voltar para a sacola
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
