import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import AddToBagButton from "./AddToBagButton";

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

async function getProduct(id: string): Promise<Product | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/api/Product/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="bg-[var(--background)] text-[var(--foreground)]">
        <Header />

        <div className="container-editorial py-10 md:py-16">
          <p>Peça não encontrada.</p>

          <Link
            href="/collection"
            prefetch
            className="mt-6 inline-block text-[11px] uppercase tracking-[0.28em] text-black/55"
          >
            Voltar para a coleção
          </Link>
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
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
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

          <p className="mt-2 text-[15px] text-black/70">
            {product.condition}
          </p>

          <p className="mt-6 text-[12px] uppercase tracking-[0.25em] text-black/45 md:mt-7">
            Descrição
          </p>

          <p className="mt-2 text-[15px] leading-7 text-black/70 md:leading-8">
            {product.description}
          </p>

          <div className="mt-4 flex flex-col gap-3 md:mt-8 md:flex-row md:items-center md:gap-4">
            <AddToBagButton product={product} />

            <Link
              href="/collection"
              prefetch
              className="py-3 text-center text-[11px] uppercase tracking-[0.28em] text-black/55 md:px-2"
            >
              Voltar para a coleção
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}