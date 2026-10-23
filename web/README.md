# 🐎 The Lucky Club — versão demonstrativa

> E-commerce de moda second hand premium, mantido como projeto de portfólio da G9 CODE.

🌐 https://the-lucky-club-site.vercel.app

**Este site é uma demonstração.** Nenhuma venda, pedido, pagamento ou mensagem real é realizado.

---

## 🚀 Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Hospedagem estática na Vercel (sem banco de dados, sem serviços pagos)

---

## 🧠 Funcionalidades

- 🛍️ Catálogo com busca e filtro por categoria
- 🧾 Páginas de produto com galeria de imagens
- 👜 Sacola com quantidades, remoção e total (localStorage)
- ✅ Checkout simulado com tela de confirmação — sem cobrança nem envio de dados
- 🚫 Versão de portfólio não indexada (`noindex`), mas compartilhável

---

## 🗂️ Dados

- Catálogo: `src/data/products.json` (tipos e acesso em `src/lib/products.ts`), exportado do Supabase original.
- Imagens: `public/images/products/{id}-{n}.webp` e miniaturas `{id}-{n}-thumb.webp`.

---

## ⚙️ Rodando localmente

```bash
npm install
npm run dev
```

Variável opcional: `NEXT_PUBLIC_SITE_URL` (padrão: `https://the-lucky-club-site.vercel.app`).

---

## 👨‍💻 Autor

Guilherme Rech — G9 CODE

🌐 https://guilhermerech.com.br
💼 https://www.linkedin.com/in/guilherme-pasquali-rech-446a92355
