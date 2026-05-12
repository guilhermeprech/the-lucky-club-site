"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { supabase } from "@/src/lib/supabase";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("E-mail ou senha inválidos.");
        setLoading(false);
        return;
      }

      router.push("/account");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      setMessage("Não foi possível criar sua conta. Tente novamente.");
      setLoading(false);
      return;
    }

    setMessage("Conta criada com sucesso. Verifique seu e-mail, se necessário, e faça login.");
    setMode("login");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <section className="container-editorial flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-[460px] border border-black/10 p-8">
          <p className="text-[10px] uppercase tracking-[0.34em] text-black/40">
            Conta
          </p>

          <h1 className="mt-4 text-3xl tracking-[-0.05em] md:text-5xl">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </h1>

          <p className="mt-6 text-[15px] leading-7 text-black/65">
            {mode === "login"
              ? "Acesse sua conta para acompanhar sua experiência na The Lucky Club."
              : "Crie sua conta para salvar suas informações e acessar sua área exclusiva."}
          </p>

          <div className="mt-8 grid grid-cols-2 border border-black/10 text-[11px] uppercase tracking-[0.22em]">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
              className={`px-4 py-3 ${
                mode === "login" ? "bg-black text-[#f3f1e9]" : "text-black/55"
              }`}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
              className={`px-4 py-3 ${
                mode === "signup" ? "bg-black text-[#f3f1e9]" : "text-black/55"
              }`}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {mode === "signup" && (
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                  Nome
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                E-mail
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-black/45">
                Senha
              </label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-4 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-black px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-black hover:text-[#f3f1e9] disabled:opacity-60"
            >
              {loading
                ? mode === "login"
                  ? "Entrando..."
                  : "Criando..."
                : mode === "login"
                ? "Entrar"
                : "Criar conta"}
            </button>

            {message && (
              <p
                className={`text-[14px] ${
                  message.includes("sucesso") ? "text-black/60" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}