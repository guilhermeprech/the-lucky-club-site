"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const validImages = images.filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(validImages[0] ?? "");

  if (validImages.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center bg-[#e8e3d8] text-[12px] uppercase tracking-[0.22em] text-black/35 md:h-[620px]">
        Sem imagem
      </div>
    );
  }

  if (validImages.length === 1) {
    return (
      <div className="h-[280px] overflow-hidden bg-[#e8e3d8] md:h-[620px]">
        <img
          src={validImages[0]}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-[82px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
        {validImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`h-20 w-16 shrink-0 overflow-hidden border bg-[#e8e3d8] md:h-28 md:w-full ${
              selectedImage === image ? "border-black" : "border-black/10"
            }`}
          >
            <img
              src={image}
              alt={`${productName} imagem ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="order-1 h-[280px] overflow-hidden bg-[#e8e3d8] md:order-2 md:h-[620px]">
        <img
          src={selectedImage}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}