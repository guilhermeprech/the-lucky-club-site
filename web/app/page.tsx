"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import { getCartCount } from "@/src/lib/cart";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  createdAt: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Product`);

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const featuredProducts = useMemo(() => {
    return [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  }, [products]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-black/10">
        <div className="container-editorial flex items-center justify-between py-5 text-[11px] uppercase tracking-[0.28em]">
          <nav className="hidden items-center gap-6 md:flex">
            <a href="/collection">Collection</a>
            <a href="#new-in">New In</a>
            <a href="/about">About</a>
          </nav>

          <a href="/" className="text-center tracking-[0.42em]">
            The Lucky Club
          </a>

          <nav className="flex items-center gap-6">
            <a href="/collection">Shop</a>
            <a href="#" className="hidden md:block">
              Search
            </a>
            <a href="/bag">Bag ({cartCount})</a>
          </nav>
        </div>
      </header>

      {/* HERO COM GIF */}
      <section className="border-b border-black/10">
        <div className="container-editorial py-6 md:py-8">
          <a href="/collection" className="mx-auto block max-w-[1050px]">
            <div className="relative aspect-[16/8] w-full overflow-hidden bg-[#d8d2c8]">
              
              {/* GIF */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/images/hero.mp4" type="video/mp4" />
              </video>

              {/* overlay leve pra dar contraste */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </a>
        </div>
      </section>

      <section id="new-in" className="py-16">
        <div className="container-editorial">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                New In
              </p>
              <h2 className="mt-4 text-3xl tracking-[-0.05em] md:text-5xl">
                Latest arrivals
              </h2>
            </div>

            <a
              href="/collection"
              className="hidden text-[10px] uppercase tracking-[0.32em] text-black/55 md:block"
            >
              View full collection
            </a>
          </div>

          {loading ? (
            <p className="text-[14px] text-black/60">Carregando produtos...</p>
          ) : featuredProducts.length === 0 ? (
            <p className="text-[14px] text-black/60">
              Ainda não há produtos cadastrados.
            </p>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <a
                  key={product.id}
                  href={`/collection/${product.id}`}
                  className="block"
                >
                  <article>
                    <div className="aspect-[3/4] overflow-hidden bg-[#e8e3d8] transition hover:opacity-90" />

                    <div className="pt-4">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-black/36">
                        {product.brand}
                      </p>

                      <h3 className="mt-2 text-[14px]">{product.name}</h3>

                      <p className="mt-2 text-[13px] text-black/56">
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}