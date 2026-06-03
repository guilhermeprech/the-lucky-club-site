"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { supabase } from "@/src/lib/supabase";

const CATEGORIES = ["Bolsas", "Calçados", "Acessórios"];

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  imageUrl: string;
  images: string[];
  category: string;
};

type ProductForm = {
  name: string;
  brand: string;
  description: string;
  price: string;
  condition: string;
  imageUrl: string;
  images: string[];
  category: string;
};

const emptyForm: ProductForm = {
  name: "",
  brand: "",
  description: "",
  price: "",
  condition: "",
  imageUrl: "",
  images: [],
  category: "Bolsas",
};

function formatProduct(product: any): Product {
  const images =
    Array.isArray(product.Images) && product.Images.length > 0
      ? product.Images
      : product.ImageUrl
      ? [product.ImageUrl]
      : [];

  return {
    id: product.Id,
    name: product.Name ?? "",
    brand: product.Brand ?? "",
    description: product.Description ?? "",
    price: Number(product.Price ?? 0),
    condition: product.Condition ?? "",
    imageUrl: product.ImageUrl ?? images[0] ?? "",
    images,
    category: product.Category ?? "",
  };
}

export default function AdminPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("Products")
        .select(
          "Id, Name, Brand, Description, Price, Condition, ImageUrl, Images, Category, CreatedAt"
        )
        .order("CreatedAt", { ascending: false });

      if (error) throw error;

      setProducts((data ?? []).map(formatProduct));
    } catch (error) {
      console.error(error);
      setMessage("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const isAdmin = session.user.user_metadata?.role === "admin";

      if (!isAdmin) {
        router.push("/account");
        return;
      }

      fetchProducts();
    };

    checkUser();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "the-lucky-club");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmuvpzk74/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) throw new Error("Erro ao enviar imagem");

    const result = await res.json();
    return result.secure_url as string;
  };

  const handleImagesUpload = async (files: FileList) => {
    setUploading(true);
    setMessage("");

    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map((file) => uploadToCloudinary(file))
      );

      setForm((prev) => {
        const nextImages = [...prev.images, ...uploadedUrls];

        return {
          ...prev,
          images: nextImages,
          imageUrl: nextImages[0] ?? "",
        };
      });
    } catch (error) {
      console.error("Erro ao subir imagens:", error);
      setMessage("Erro ao enviar uma ou mais imagens.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setForm((prev) => {
      const nextImages = prev.images.filter((image) => image !== imageUrl);

      return {
        ...prev,
        images: nextImages,
        imageUrl: nextImages[0] ?? "",
      };
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: String(product.price),
      condition: product.condition,
      imageUrl: product.imageUrl || product.images[0] || "",
      images: product.images.length > 0 ? product.images : product.imageUrl ? [product.imageUrl] : [],
      category: product.category || "Bolsas",
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir esta peça?");
    if (!confirmed) return;

    try {
      const { error } = await supabase.from("Products").delete().eq("Id", id);

      if (error) throw error;

      setProducts((prev) => prev.filter((product) => product.id !== id));
      setMessage("Peça excluída com sucesso.");
      if (editingId === id) resetForm();
    } catch (error) {
      console.error(error);
      setMessage("Erro ao excluir peça.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const mainImage = form.images[0] ?? form.imageUrl ?? "";

      const payload = {
        Name: form.name,
        Brand: form.brand,
        Description: form.description,
        Price: Number(form.price),
        Condition: form.condition,
        ImageUrl: mainImage,
        Images: form.images,
        Category: form.category,
      };

      if (editingId) {
        const { error } = await supabase
          .from("Products")
          .update(payload)
          .eq("Id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("Products").insert({
          ...payload,
          CreatedAt: new Date().toISOString(),
        });

        if (error) throw error;
      }

      await fetchProducts();
      resetForm();

      setMessage(
        editingId
          ? "Peça atualizada com sucesso."
          : "Peça cadastrada com sucesso."
      );
    } catch (error) {
      console.error(error);
      setMessage("Erro ao salvar peça.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial py-16">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Admin
          </p>

          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            Gerenciar peças
          </h1>

          <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-black/65">
            Cadastre, edite e exclua peças da coleção.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-black/10 p-8">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                {editingId ? "Editar peça" : "Nova peça"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Nome
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Marca
                </label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Preço
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Condição
                </label>
                <input
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Categoria
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Imagens
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleImagesUpload(e.target.files);
                    }
                  }}
                  className="w-full border border-black/10 px-4 py-3"
                />

                {uploading && (
                  <p className="mt-2 text-[12px] text-black/50">
                    Enviando imagens...
                  </p>
                )}
              </div>

              {form.images.length > 0 && (
                <div className="border border-black/10 p-3">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-black/40">
                    Preview das imagens
                  </p>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {form.images.map((image) => (
                      <div key={image} className="relative">
                        <div className="aspect-[3/4] overflow-hidden bg-[#e8e3d8]">
                          <img
                            src={image}
                            alt="Preview da peça"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="mt-2 w-full border border-black/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-black/55"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-[12px] text-black/45">
                    A primeira imagem será usada como capa da peça.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9] disabled:opacity-60"
                >
                  {submitting
                    ? "Salvando..."
                    : editingId
                    ? "Atualizar peça"
                    : "Cadastrar peça"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-2 py-3 text-[11px] uppercase tracking-[0.28em] text-black/55"
                  >
                    Cancelar edição
                  </button>
                )}
              </div>

              {message && (
                <p className="pt-2 text-[14px] text-black/60">{message}</p>
              )}
            </form>
          </div>

          <div>
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
                Peças cadastradas
              </p>
            </div>

            {loading ? (
              <p className="text-[14px] text-black/60">Carregando peças...</p>
            ) : products.length === 0 ? (
              <p className="text-[14px] text-black/60">
                Ainda não há peças cadastradas.
              </p>
            ) : (
              <div className="space-y-5">
                {products.map((product) => (
                  <div key={product.id} className="border border-black/10 p-6">
                    <div className="grid gap-5 md:grid-cols-[120px_1fr]">
                      <div className="aspect-[3/4] overflow-hidden bg-[#e8e3d8]">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div>
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.28em] text-black/36">
                              {product.brand}
                            </p>

                            <h2 className="mt-2 text-[18px]">
                              {product.name}
                            </h2>

                            <p className="mt-2 text-[14px] text-black/60">
                              {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>

                            <p className="mt-2 text-[13px] text-black/50">
                              {product.condition}
                            </p>

                            {product.category && (
                              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-black/35">
                                {product.category}
                              </p>
                            )}

                            <p className="mt-2 text-[12px] text-black/40">
                              {product.images.length} imagem(ns)
                            </p>
                          </div>

                          <div className="flex gap-4 text-[11px] uppercase tracking-[0.24em]">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-black/70"
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-black/50"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>

                        <p className="mt-4 text-[14px] leading-7 text-black/60">
                          {product.description}
                        </p>

                        {product.imageUrl && (
                          <p className="mt-3 break-all text-[12px] text-black/35">
                            {product.imageUrl}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}