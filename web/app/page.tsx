import Image from "next/image";
import Link from "next/link";
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

export default async function Home() {
  const products = await getProducts();

  const featuredProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="border-b border-black/10">
        <div className="container-editorial py-6 md:py-8">
          <Link href="/collection" className="mx-auto block max-w-[1050px]">
            <div className="relative aspect-[9/14] w-full overflow-hidden bg-[#d8d2c8] md:hidden">
              <Image
                src="/images/hero-mobile1.jpg"
                alt="Imagem principal The Lucky Club"
                fill
                priority
                sizes="100vw"
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative hidden aspect-[24/15] w-full overflow-hidden bg-[#d8d2c8] md:block">
              <Image
                src="/images/hero-desk.jpg"
                alt="Imagem principal The Lucky Club"
                fill
                priority
                sizes="1050px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </Link>
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

            <Link
              href="/collection"
              prefetch
              className="hidden text-[10px] uppercase tracking-[0.32em] text-black/55 md:block"
            >
              Ver coleção completa
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <p className="text-[14px] text-black/60">
              Ainda não há peças cadastradas.
            </p>
          ) : (
            <div className="overflow-x-auto pb-2">
              <div className="flex snap-x snap-mandatory gap-5">
                {featuredProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/collection/${product.id}`}
                    prefetch
                    className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start md:min-w-[320px] md:max-w-[320px]"
                  >
                    <article>
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e3d8]">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 768px) 260px, 320px"
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
                  </Link>
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