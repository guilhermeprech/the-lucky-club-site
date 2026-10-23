"use client";

import { useState } from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function DesapeguePage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setBrand("");
    setModel("");
    setCondition("");
    setPrice("");
    setDescription("");
    setSubmitted(true);
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
            Preencha as informações da sua peça e envie sua proposta para
            avaliação da curadoria.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-black/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Marca
                </label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
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
                  className="w-full resize-none border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>

              <button
                type="submit"
                className="border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9]"
              >
                Enviar proposta
              </button>

              {submitted && (
                <p className="text-[13px] leading-6 text-black/60">
                  Proposta simulada com sucesso. Esta é uma demonstração —
                  nenhuma informação foi enviada ou armazenada.
                </p>
              )}
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
                Nesta versão demonstrativa, o formulário não envia nem armazena
                nenhuma informação.
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
