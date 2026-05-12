"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { supabase } from "@/src/lib/supabase";

export default function AccountPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const userEmail = session.user.email ?? "";
      const userName = session.user.user_metadata?.name ?? "";

      setEmail(userEmail);
      setName(userName);
      setIsAdmin(session.user.user_metadata?.role === "admin");      
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Header />

        <section className="container-editorial py-20">
          <p className="text-[14px] text-black/60">Carregando conta...</p>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial py-16">
        <div className="max-w-[760px]">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Minha conta
          </p>

          <h1 className="mt-4 text-4xl tracking-[-0.05em] md:text-6xl">
            {name ? `Bem-vinda, ${name}` : "Bem-vinda"}
          </h1>

          <p className="mt-6 text-[15px] leading-8 text-black/65">
            Você está conectada na sua conta The Lucky Club.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="border border-black/10 p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
                E-mail
              </p>

              <p className="mt-3 break-all text-[16px]">{email}</p>

              {name && (
                <>
                  <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-black/40">
                    Nome
                  </p>

                  <p className="mt-3 text-[16px]">{name}</p>
                </>
              )}

              <button
                onClick={handleLogout}
                className="mt-10 border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9]"
              >
                Sair
              </button>
            </div>

            <div className="border border-black/10 p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
                Área da conta
              </p>

              <p className="mt-4 text-[15px] leading-7 text-black/65">
                Em breve, você poderá acompanhar pedidos, salvar peças favoritas
                e gerenciar suas informações.
              </p>

              {isAdmin && (
                <div className="mt-8 border-t border-black/10 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
                    Administração
                  </p>

                  <p className="mt-4 text-[14px] leading-7 text-black/60">
                    Acesso liberado para gerenciar os produtos da coleção.
                  </p>

                  <Link
                    href="/admin"
                    className="mt-6 inline-block border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9]"
                  >
                    Editar produtos
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}