import Header from "@/app/components/Header";
import CollectionClient from "./CollectionClient";
import { supabase } from "@/src/lib/supabase";

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
  const { data, error } = await supabase
    .from("Products")
    .select("Id, Name, Brand, Description, Price, Condition, ImageUrl")
    .order("CreatedAt", { ascending: false });

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }

  return (data ?? []).map((product) => ({
    id: product.Id,
    name: product.Name ?? "",
    brand: product.Brand ?? "",
    description: product.Description ?? "",
    price: Number(product.Price ?? 0),
    condition: product.Condition ?? "",
    imageUrl: product.ImageUrl ?? "",
  }));
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