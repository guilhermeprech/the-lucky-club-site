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
              Curated luxury second hand pieces selected with attention to
              elegance, individuality and timeless relevance.
            </p>
          </div>
  
          {/* Navegação */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
              Navigation
            </h3>
  
            <ul className="mt-4 space-y-2 text-black/70">
              <li>
                <a href="/collection" className="hover:underline">
                  Collection
                </a>
              </li>
              <li>
                <a href="#new-in" className="hover:underline">
                  New In
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </div>
  
          {/* Contato */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-black/50">
              Contact
            </h3>
  
            <ul className="mt-4 space-y-2 text-black/70">
              <li>Instagram</li>
              <li>Email</li>
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