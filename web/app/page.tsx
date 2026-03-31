"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  createdAt: string;
  imageUrl?: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Product`
        );

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
      <Header />

      <section className="border-b border-black/10">
        <div className="container-editorial py-6 md:py-8">
          <a href="/collection" className="mx-auto block max-w-[1050px]">
            {/* HERO MOBILE */}
            <div className="relative aspect-[9/14] w-full overflow-hidden bg-[#d8d2c8] md:hidden">
              <Image
                src="/images/hero-mobile1.jpg"
                alt="Imagem principal The Lucky Club"
                fill
                priority
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* HERO DESKTOP */}
            <div className="relative hidden aspect-[24/15] w-full overflow-hidden bg-[#d8d2c8] md:block">
              <Image
                src="/images/hero-desk.jpg"
                alt="Imagem principal The Lucky Club"
                fill
                priority
                className="object-cover"
              />
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
                Novidades
              </p>
              <h2 className="mt-4 text-3xl tracking-[-0.05em] md:text-5xl">
                Últimas peças
              </h2>
            </div>

            <a
              href="/collection"
              className="hidden text-[10px] uppercase tracking-[0.32em] text-black/55 md:block"
            >
              Ver coleção completa
            </a>
          </div>

          {loading ? (
            <p className="text-[14px] text-black/60">Carregando peças...</p>
          ) : featuredProducts.length === 0 ? (
            <p className="text-[14px] text-black/60">
              Ainda não há peças cadastradas.
            </p>
          ) : (
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-5 snap-x snap-mandatory">
                {featuredProducts.map((product) => (
                  <a
                    key={product.id}
                    href={`/collection/${product.id}`}
                    className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start md:min-w-[320px] md:max-w-[320px]"
                  >
                    <article>
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e3d8]">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition hover:scale-[1.03]"
                          />
                        ) : null}
                      </div>

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
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}