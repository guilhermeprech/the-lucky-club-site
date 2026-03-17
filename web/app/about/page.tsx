"use client";

import Footer from "@/components/Footer";
import { getCartCount } from "@/src/lib/cart";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();
    window.addEventListener("focus", updateCartCount);

    return () => {
      window.removeEventListener("focus", updateCartCount);
    };
  }, []);

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
            <a href="/collection">Search</a>
            <a href="#" className="hidden md:block">
              Login
            </a>
            <a href="/bag">Bag ({cartCount})</a>
          </nav>
        </div>
      </header>

      <section className="border-b border-black/10 py-20">
        <div className="container-editorial grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              About
            </p>

            <h1 className="mt-4 max-w-[420px] text-4xl leading-[1] tracking-[-0.05em] md:text-6xl">
              A quieter way to discover luxury.
            </h1>
          </div>

          <div className="max-w-[720px] text-[15px] leading-8 text-black/66">
            <p>
              The Lucky Club is a curated destination for luxury second hand
              pieces selected with attention to elegance, individuality and
              lasting relevance.
            </p>

            <p className="mt-6">
              More than a store, it is a refined perspective on personal style
              — where rarity, authenticity and timelessness matter more than
              excess.
            </p>

            <p className="mt-6">
              Each piece is chosen to feel current, personal and quietly
              distinctive, creating a collection shaped by taste, restraint and
              longevity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-editorial grid gap-10 md:grid-cols-3">
          <div className="border border-black/10 p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Curation
            </p>
            <p className="mt-4 text-[15px] leading-8 text-black/66">
              A selective edit of pieces with character, beauty and lasting
              relevance.
            </p>
          </div>

          <div className="border border-black/10 p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Elegance
            </p>
            <p className="mt-4 text-[15px] leading-8 text-black/66">
              Clothing and accessories chosen for refinement, ease and a timeless
              sense of style.
            </p>
          </div>

          <div className="border border-black/10 p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Individuality
            </p>
            <p className="mt-4 text-[15px] leading-8 text-black/66">
              Pieces that feel personal and rare — meant to be discovered, not
              mass repeated.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}