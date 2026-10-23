import Link from "next/link";
import Header from "@/app/components/Header";
import { formatPrice } from "@/src/lib/format";
import { getProductById, getProducts } from "@/src/lib/products";
import AddToBagButton from "./AddToBagButton";
import ProductGallery from "./ProductGallery";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return getProducts().map((product) => ({ id: String(product.id) }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(Number(id));

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
        <ProductGallery images={product.images} productName={product.name} />

        <div className="max-w-[500px] md:self-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
            {product.brand}
          </p>

          <h1 className="mt-2 text-2xl tracking-[-0.04em] md:mt-3 md:text-5xl md:leading-[0.95]">
            {product.name}
          </h1>

          <p className="mt-3 text-xl text-black/80 md:mt-5 md:text-[28px]">
            {formatPrice(product.price)}
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
