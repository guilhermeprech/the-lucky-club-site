import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-20">
      <div className="container-editorial py-16 grid gap-10 md:grid-cols-3 text-[13px]">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            The Lucky Club
          </h3>

          <p className="mt-4 leading-7 text-black/60 max-w-[260px]">
            Seleção curada de peças de luxo second hand, escolhidas com atenção
            à elegância, autenticidade e atemporalidade.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Navegação
          </h3>

          <ul className="mt-4 space-y-2 text-black/70">
            <li>
              <Link href="/collection" className="hover:underline">
                Coleção
              </Link>
            </li>
            <li>
              <Link href="/#new-in" className="hover:underline">
                Novidades
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/desapegue" className="hover:underline">
                Desapegue
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Projeto demonstrativo
          </h3>

          <p className="mt-4 leading-7 text-black/60 max-w-[260px]">
            Este site é uma versão de portfólio. Nenhuma venda, pedido ou
            pagamento real é realizado.
          </p>
        </div>
      </div>

      <div className="border-t border-black/10 mt-10">
        <div className="container-editorial py-5 flex flex-col md:flex-row md:items-center md:justify-between text-[11px] text-black/50">
          <span>
            © {new Date().getFullYear()} The Lucky Club. Todos os direitos reservados.
          </span>

          <a
            href="https://g9code.com.br"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition"
          >
            Projeto desenvolvido por G9 CODE — Soluções digitais.
          </a>
        </div>
      </div>
    </footer>
  );
}
