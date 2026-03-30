"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DesapeguePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photoLinks, setPhotoLinks] = useState("");

  const whatsappNumber = "5554999484343";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      `Olá! Tenho uma peça para desapegar com a The Lucky Club.%0A%0A` +
      `Nome: ${name}%0A` +
      `Telefone: ${phone}%0A` +
      `Marca: ${brand}%0A` +
      `Modelo / Peça: ${model}%0A` +
      `Condição: ${condition}%0A` +
      `Valor pretendido: ${price}%0A` +
      `Descrição: ${description}%0A` +
      `Links das fotos: ${photoLinks}%0A%0A` +
      `Vou enviar as imagens da peça em seguida.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial py-16">
        <div className="mb-12 max-w-[760px]">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Desapegue
          </p>

          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            Venda sua peça para a The Lucky Club
          </h1>

          <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-black/65">
            Preencha as informações da sua peça e envie sua proposta. Após abrir
            o WhatsApp, você poderá anexar as fotos para avaliação.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-black/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Nome
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Telefone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Marca
                </label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Modelo / peça
                </label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Condição
                </label>
                <input
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                  placeholder="Ex: Excelente, muito bom, bom..."
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Valor pretendido
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="Ex: R$ 1.500,00"
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  className="w-full resize-none border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Links das fotos
                </label>
                <textarea
                  value={photoLinks}
                  onChange={(e) => setPhotoLinks(e.target.value)}
                  rows={3}
                  placeholder="Cole aqui links das fotos, se tiver. Você também poderá enviar as imagens direto no WhatsApp."
                  className="w-full resize-none border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <button
                type="submit"
                className="border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9]"
              >
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>

          <div className="border border-black/10 p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Como funciona
            </p>

            <div className="mt-6 space-y-6 text-[15px] leading-8 text-black/65">
              <p>
                Envie as informações da sua peça para avaliação da curadoria da
                The Lucky Club.
              </p>

              <p>
                Após abrir o WhatsApp, anexe as fotos do item para facilitar a
                análise.
              </p>

              <p>
                Se a peça estiver alinhada com a curadoria da loja, a equipe
                entrará em contato para dar sequência ao processo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}