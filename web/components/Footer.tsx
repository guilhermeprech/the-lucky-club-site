export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-20">
      <div className="container-editorial py-16 grid gap-10 md:grid-cols-3 text-[13px]">

        {/* Marca */}
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            The Lucky Club
          </h3>

          <p className="mt-4 leading-7 text-black/60 max-w-[260px]">
            Seleção curada de peças de luxo second hand, escolhidas com atenção
            à elegância, autenticidade e atemporalidade.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Navegação
          </h3>

          <ul className="mt-4 space-y-2 text-black/70">
            <li>
              <a href="/collection" className="hover:underline">
                Coleção
              </a>
            </li>
            <li>
              <a href="/#new-in" className="hover:underline">
                Novidades
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Sobre
              </a>
            </li>
            <li>
              <a href="/desapegue" className="hover:underline">
                Desapegue
              </a>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
            Contato
          </h3>

          <ul className="mt-4 space-y-2 text-black/70">
            <li>
              <a href="https://www.instagram.com/luckyfindsclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="luckyfindsclub@gmail.com" className="hover:underline">
                Email
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5554999484343?text=Olá,%20tenho%20interesse%20em%20uma%20peça%20do%20The%20Lucky%20Club"
                target="_blank"
                className="hover:underline"
              >
                WhatsApp
              </a>
            </li>
            <li>Caxias do Sul, RS</li>
          </ul>
        </div>
      </div>

      {/* Desenvolvedor */}
      <div className="border-t border-black/10 py-6 text-center text-[11px] text-black/50">
        Website developed by{" "}
        <a
          href="https://guilhermerech.com.br"
          target="_blank"
          className="underline hover:text-black"
        >
          Guilherme Pasquali Rech
        </a>
      </div>
    </footer>
  );
}