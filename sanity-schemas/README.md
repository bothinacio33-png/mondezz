# Schemas Sanity — Mondez

Estes ficheiros são para o **Sanity Studio** (não fazem parte do bundle do site).

## Como conectar ao seu Sanity Studio

1. No seu Sanity Studio (pasta separada), copie `product.ts` para `schemas/product.ts`.
2. Em `schemas/index.ts` exporte:
   ```ts
   import { product } from "./product";
   export const schemaTypes = [product];
   ```
3. Verifique `sanity.config.ts`:
   ```ts
   schema: { types: schemaTypes }
   ```
4. Rode `sanity dev` e crie produtos no Studio.

## Configurações já aplicadas pelo Lovable
- **Project ID**: `1gsugl54`
- **Dataset**: `production` (público)
- **CORS**: `https://*.lovable.app` e `https://*.lovableproject.com` adicionados.
- Para produção com domínio próprio, adicione o domínio em `sanity.io/manage` → API → CORS origins.

## Testar rapidamente
Crie um produto no Studio com slug `cadeira-eames` → acesse `/produto/cadeira-eames` no site.
