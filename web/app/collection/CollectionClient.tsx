"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  imageUrl?: string;
};

export default function CollectionClient({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");

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
    <>
      <div className="mb-12 max-w-[460px]">
        <label
          htmlFor="collection-search"
          className="mb-3 block text-[10px] uppercase tracking-[0.32em] text-black/40"
        >
          Buscar
        </label>

        <input
          id="collection-search"
          type="text"
          placeholder="Buscar por marca ou peça"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-black/10 bg-transparent px-4 py-3 text-[14px] outline-none placeholder:text-black/35 focus:border-black/30"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-[14px] text-black/60">Nenhuma peça encontrada.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/collection/${product.id}`}
              className="block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e3d8]">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-300 hover:scale-[1.02]"
                  />
                ) : null}
              </div>

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
            </Link>
          ))}
        </div>
      )}
    </>
  );
}