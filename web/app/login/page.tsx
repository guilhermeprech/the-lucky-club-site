"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-[420px] text-center">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Área do cliente
          </p>

          <h1 className="mt-4 text-3xl tracking-[-0.05em] md:text-5xl">
            Em breve
          </h1>

          <p className="mt-6 text-[15px] leading-7 text-black/65">
            Estamos preparando uma experiência exclusiva para você acessar sua conta,
            acompanhar pedidos e salvar suas peças favoritas.
          </p>

          <p className="mt-4 text-[14px] text-black/50">
            Disponível em breve.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}