"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { addToCart } from "@/src/lib/cart";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  imageUrl?: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductDetailPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

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
      imageUrl: product.imageUrl || "",
    });

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  if (loading) {
    return (
      <main className="bg-[var(--background)] text-[var(--foreground)]">
        <div className="container-editorial py-10 md:py-16">
          <p>Carregando peça...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="bg-[var(--background)] text-[var(--foreground)]">
        <div className="container-editorial py-10 md:py-16">
          <p>Peça não encontrada.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial grid gap-4 py-3 md:grid-cols-[0.95fr_0.85fr] md:items-center md:gap-12 md:py-10">
        <div className="relative h-[280px] overflow-hidden bg-[#e8e3d8] md:h-[620px]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              unoptimized
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="max-w-[500px] md:self-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
            {product.brand}
          </p>

          <h1 className="mt-2 text-2xl tracking-[-0.04em] md:mt-3 md:text-5xl md:leading-[0.95]">
            {product.name}
          </h1>

          <p className="mt-3 text-xl text-black/80 md:mt-5 md:text-[28px]">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <p className="mt-5 text-[12px] uppercase tracking-[0.25em] text-black/45 md:mt-6">
            Condição
          </p>
          <p className="mt-2 text-[15px] text-black/70">{product.condition}</p>

          <p className="mt-6 text-[12px] uppercase tracking-[0.25em] text-black/45 md:mt-7">
            Descrição
          </p>
          <p className="mt-2 text-[15px] leading-7 text-black/70 md:leading-8">
            {product.description}
          </p>

          <div className="mt-4 flex flex-col gap-3 md:mt-8 md:flex-row md:items-center md:gap-4">
            <button
              onClick={handleAddToBag}
              className="border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9]"
            >
              Adicionar à sacola
            </button>

            <a
              href="/collection"
              className="py-3 text-center text-[11px] uppercase tracking-[0.28em] text-black/55 md:px-2"
            >
              Voltar para a coleção
            </a>
          </div>
        </div>
      </section>

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 border border-black/10 bg-[var(--background)] px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
            Sacola
          </p>
          <p className="mt-2 text-[14px] text-black/80">
            Peça adicionada com sucesso.
          </p>
        </div>
      )}
    </main>
  );
}