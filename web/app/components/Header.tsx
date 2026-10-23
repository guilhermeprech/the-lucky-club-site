"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cartUpdatedEvent, getCartCount } from "@/src/lib/cart";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();

    window.addEventListener("focus", updateCartCount);
    window.addEventListener(cartUpdatedEvent, updateCartCount);

    return () => {
      window.removeEventListener("focus", updateCartCount);
      window.removeEventListener(cartUpdatedEvent, updateCartCount);
    };
  }, []);

  return (
    <header className="border-b border-black/10">
      <div className="container-editorial relative flex items-center justify-between py-4">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="text-xl leading-none md:hidden"
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.28em] md:flex">
          <Link href="/">Início</Link>
          <Link href="/collection">Coleção</Link>
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.42em]"
        >
          <Image
            src="/images/logo-icon-96.png"
            alt="Logo The Lucky Club"
            width={24}
            height={24}
            priority
            className="h-6 w-6 object-contain"
          />
          <span>The Lucky Club</span>
        </Link>

        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.28em]">
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/desapegue">Desapegue</Link>
            <Link href="/bag">Sacola ({cartCount})</Link>
          </div>

          <Link href="/bag" className="relative md:hidden" aria-label="Sacola">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-5 w-5"
            >
              <path
                d="M6.5 8.5h11l-1.1 9.5a1 1 0 0 1-1 .9H8.6a1 1 0 0 1-1-.9L6.5 8.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9V7.5a3 3 0 1 1 6 0V9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 min-w-[18px] rounded-full bg-black px-1.5 py-[1px] text-center text-[10px] leading-4 text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 md:hidden">
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] bg-[var(--background)] p-6 shadow-xl">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.28em] text-black/40">
                Menu
              </span>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl leading-none"
                aria-label="Fechar menu"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-[14px] uppercase tracking-[0.18em] text-black/80">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Início</Link>
              <Link href="/collection" onClick={() => setMobileMenuOpen(false)}>Coleção</Link>
              <Link href="/desapegue" onClick={() => setMobileMenuOpen(false)}>Desapegue</Link>
              <Link href="/bag" onClick={() => setMobileMenuOpen(false)}>Sacola</Link>
            </nav>
          </div>

          <button
            type="button"
            className="absolute inset-0 -z-10 h-full w-full"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
          />
        </div>
      )}
    </header>
  );
}
