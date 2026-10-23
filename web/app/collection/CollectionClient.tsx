"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice } from "@/src/lib/format";
import type { Product } from "@/src/lib/products";

export default function CollectionClient({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter((category): category is string => Boolean(category));

    return ["Todos", ...Array.from(new Set(uniqueCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <>
      <div className="mb-12 grid gap-6 md:grid-cols-[460px_1fr] md:items-end">
        <div>
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

        <div className="flex flex-wrap gap-2 md:justify-end">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`border px-4 py-2 text-[10px] uppercase tracking-[0.24em] transition ${
                selectedCategory === category
                  ? "border-black bg-black text-[#f3f1e9]"
                  : "border-black/10 text-black/55 hover:border-black/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
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
                {product.thumbnailUrl ? (
                  <Image
                    src={product.thumbnailUrl}
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
                  {formatPrice(product.price)}
                </p>

                <p className="mt-2 text-[12px] text-black/45">
                  {product.condition}
                </p>

                {product.category && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-black/35">
                    {product.category}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
