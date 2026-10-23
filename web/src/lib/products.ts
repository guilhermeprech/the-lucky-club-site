import productsData from "@/src/data/products.json";

export type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  createdAt: string;
  imageUrl: string;
  images: string[];
  thumbnailUrl: string;
};

const products: Product[] = productsData;

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | null {
  return products.find((product) => product.id === id) ?? null;
}

export function getLatestProducts(limit: number): Product[] {
  return products.slice(0, limit);
}
