"use client";

import { useEffect, useMemo, useState } from "react";
import { getCartCount } from "@/src/lib/cart";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
};

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

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

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term)
      );
    });
  }, [products, search]);

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

      <section className="container-editorial py-16">
        <div className="mb-12">
          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            Collection
          </h1>

          <p className="mt-6 max-w-[520px] text-[15px] leading-8 text-black/65">
            A refined selection of luxury second hand pieces chosen for their
            timelessness, quality and individuality.
          </p>
        </div>

        <div className="mb-12 max-w-[460px]">
          <label
            htmlFor="collection-search"
            className="mb-3 block text-[10px] uppercase tracking-[0.32em] text-black/40"
          >
            Search
          </label>

          <input
            id="collection-search"
            type="text"
            placeholder="Search by brand or piece"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-black/10 bg-transparent px-4 py-3 text-[14px] outline-none placeholder:text-black/35 focus:border-black/30"
          />
        </div>

        {loading ? (
          <p className="text-[14px] text-black/60">Carregando peças...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-[14px] text-black/60">
            Nenhuma peça encontrada.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <a
                key={product.id}
                href={`/collection/${product.id}`}
                className="block"
              >
                <div className="aspect-[3/4] bg-[#e8e3d8]" />

                <div className="pt-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-black/36">
                    {product.brand}
                  </p>

                  <h3 className="mt-2 text-[15px]">{product.name}</h3>

                  <p className="mt-2 text-[13px] text-black/56">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <p className="mt-2 text-[12px] text-black/45">
                    {product.condition}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}