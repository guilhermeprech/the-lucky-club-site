"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
  imageUrl: string;
};

type ProductForm = {
  name: string;
  brand: string;
  description: string;
  price: string;
  condition: string;
  imageUrl: string;
};

const emptyForm: ProductForm = {
  name: "",
  brand: "",
  description: "",
  price: "",
  condition: "",
  imageUrl: "",
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const apiBase = `${process.env.NEXT_PUBLIC_API_URL}/api/Product`;

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiBase, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setMessage("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setMessage("");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "the-lucky-club");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmuvpzk74/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao enviar imagem");
      }

      const result = await res.json();

      setForm((prev) => ({
        ...prev,
        imageUrl: result.secure_url,
      }));
    } catch (error) {
      console.error("Erro ao subir imagem:", error);
      setMessage("Erro ao enviar imagem.");
    } finally {
      setUploading(false);
    }
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
      imageUrl: product.imageUrl || "",
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir esta peça?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${apiBase}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir produto");
      }

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
      const payload = {
        name: form.name,
        brand: form.brand,
        description: form.description,
        price: Number(form.price),
        condition: form.condition,
        imageUrl: form.imageUrl,
      };

      const response = await fetch(
        editingId ? `${apiBase}/${editingId}` : apiBase,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            editingId ? { id: editingId, ...payload } : payload
          ),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao salvar produto");
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
                  Imagem
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                  className="w-full border border-black/10 px-4 py-3"
                />

                {uploading && (
                  <p className="mt-2 text-[12px] text-black/50">
                    Enviando imagem...
                  </p>
                )}
              </div>

              {form.imageUrl && (
                <div className="border border-black/10 p-3">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-black/40">
                    Preview
                  </p>

                  <div className="aspect-[3/4] overflow-hidden bg-[#e8e3d8]">
                    <img
                      src={form.imageUrl}
                      alt="Preview da peça"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                      }}
                    />
                  </div>
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
                            <h2 className="mt-2 text-[18px]">{product.name}</h2>
                            <p className="mt-2 text-[14px] text-black/60">
                              {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                            <p className="mt-2 text-[13px] text-black/50">
                              {product.condition}
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