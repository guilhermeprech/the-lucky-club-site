"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="border-b border-black/10 py-10 md:py-20">
        <div className="container-editorial grid items-center gap-12 md:grid-cols-2">
          <div className="order-1">
            <div className="aspect-[4/5] w-full overflow-hidden bg-[#e8e3d8]">
              <img
                src="/images/about.jpg"
                alt="Sobre The Lucky Club"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="order-2">
            <h1 className="mt-4 max-w-[420px] text-4xl leading-[1] tracking-[-0.05em] md:text-6xl">
              Welcome to the club!
            </h1>

            <div className="mt-8 max-w-[720px] text-[15px] leading-8 text-black/66">
              <p>
              A Lucky Club é uma curadoria de peças de luxo e semi-luxo escolhidas com olhar atento, autenticidade e intenção. Mais do que revender, buscamos dar continuidade a histórias que conectam pessoas a itens que carregam estilo, qualidade e significado.
              </p>

              <p className="mt-6">
              Cada peça é selecionada de forma criteriosa, priorizando design atemporal, bom estado e marcas que traduzem uma estética refinada e contemporânea.
              </p>

              <p className="mt-6">
              Acreditamos em uma moda mais consciente, onde consumir melhor é mais importante do que consumir mais.
              Um novo olhar sobre o que já existe, com propósito, personalidade e valor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20">
        <div className="container-editorial grid gap-6 md:gap-12 md:grid-cols-3">
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
              Peças que parecem pessoais e raras — feitas para serem
              descobertas, não repetidas em massa.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}