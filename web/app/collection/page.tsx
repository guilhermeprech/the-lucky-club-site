import Header from "@/app/components/Header";
import CollectionClient from "./CollectionClient";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  imageUrl?: string;
};

async function getProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/Product`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial py-16">
        <div className="mb-12">
          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            Coleção
          </h1>

          <p className="mt-6 max-w-[520px] text-[15px] leading-8 text-black/65">
            Uma seleção refinada de peças second hand de luxo, escolhidas pela
            sua atemporalidade, qualidade e individualidade.
          </p>
        </div>

        <CollectionClient products={products} />
      </section>
    </main>
  );
}