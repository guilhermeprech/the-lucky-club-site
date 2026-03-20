"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { addToCart } from "@/src/lib/cart";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductDetailPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Product/${resolvedParams.id}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar produto");
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  const handleAddToBag = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
    });

    alert("Peça adicionada à sacola");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="container-editorial py-16">
          <p>Carregando peça...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="container-editorial py-16">
          <p>Peça não encontrada.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="aspect-[4/5] bg-[#e8e3d8]" />

        <div className="max-w-[520px]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
            {product.brand}
          </p>

          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            {product.name}
          </h1>

          <p className="mt-6 text-2xl text-black/80">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <p className="mt-6 text-[12px] uppercase tracking-[0.25em] text-black/45">
            Condição
          </p>
          <p className="mt-2 text-[15px] text-black/70">{product.condition}</p>

          <p className="mt-8 text-[12px] uppercase tracking-[0.25em] text-black/45">
            Descrição
          </p>
          <p className="mt-2 text-[15px] leading-8 text-black/70">
            {product.description}
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={handleAddToBag}
              className="border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9]"
            >
              Adicionar à sacola
            </button>

            <a
              href="/collection"
              className="px-2 py-3 text-[11px] uppercase tracking-[0.28em] text-black/55"
            >
              Voltar para a coleção
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}