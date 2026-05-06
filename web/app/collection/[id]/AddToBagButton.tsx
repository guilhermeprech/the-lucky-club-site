"use client";

import { useState } from "react";
import { addToCart } from "@/src/lib/cart";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl?: string;
};

export default function AddToBagButton({ product }: { product: Product }) {
  const [showToast, setShowToast] = useState(false);

  const handleAddToBag = () => {
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

  return (
    <>
      <button
        onClick={handleAddToBag}
        className="border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9]"
      >
        Adicionar à sacola
      </button>

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
    </>
  );
}