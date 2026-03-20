"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="border-b border-black/10 py-20">
        <div className="container-editorial grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Sobre
            </p>

            <h1 className="mt-4 max-w-[420px] text-4xl leading-[1] tracking-[-0.05em] md:text-6xl">
              Uma forma mais sutil de descobrir o luxo.
            </h1>
          </div>

          <div className="max-w-[720px] text-[15px] leading-8 text-black/66">
            <p>
              The Lucky Club é um destino de curadoria para peças second hand de
              luxo, selecionadas com atenção à elegância, individualidade e
              relevância duradoura.
            </p>

            <p className="mt-6">
              Mais do que uma loja, é uma visão refinada sobre estilo pessoal —
              onde raridade, autenticidade e atemporalidade importam mais do que
              excessos.
            </p>

            <p className="mt-6">
              Cada peça é escolhida para parecer atual, pessoal e discretamente
              marcante, criando uma coleção guiada por bom gosto, cuidado e
              longevidade.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-editorial grid gap-10 md:grid-cols-3">
          <div className="border border-black/10 p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Curadoria
            </p>
            <p className="mt-4 text-[15px] leading-8 text-black/66">
              Uma seleção criteriosa de peças com personalidade, beleza e
              relevância duradoura.
            </p>
          </div>

          <div className="border border-black/10 p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Elegância
            </p>
            <p className="mt-4 text-[15px] leading-8 text-black/66">
              Roupas e acessórios escolhidos pela sofisticação, leveza e senso
              atemporal de estilo.
            </p>
          </div>

          <div className="border border-black/10 p-8">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
              Individualidade
            </p>
            <p className="mt-4 text-[15px] leading-8 text-black/66">
              Peças que parecem pessoais e raras — feitas para serem descobertas,
              não repetidas em massa.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}