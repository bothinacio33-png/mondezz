import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Mondez — Documento "Produto" (v2 — Lâmina de Vendas)
 * Cole este ficheiro em /schemas/product.ts no seu Sanity Studio
 * e exporte-o em /schemas/index.ts (schemaTypes array).
 */
export const product = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  groups: [
    { name: "main", title: "Principal", default: true },
    { name: "media", title: "Mídia" },
    { name: "details", title: "Detalhes" },
    { name: "manufacturing", title: "Fabricação" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nome do Produto",
      type: "string",
      group: "main",
      validation: (R) => R.required().min(2).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "main",
      options: { source: "name", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Sofás", value: "sofas" },
          { title: "Mesas", value: "mesas" },
          { title: "Cadeiras & Poltronas", value: "cadeiras" },
          { title: "Camas & Quartos", value: "camas" },
          { title: "Estantes & Buffets", value: "estantes" },
          { title: "Iluminação", value: "iluminacao" },
          { title: "Decoração", value: "decoracao" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "sku",
      title: "SKU",
      description: "Código interno único (ex: MND-SOF-001).",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "price",
      title: "Preço (R$)",
      type: "number",
      group: "main",
      validation: (R) => R.min(0),
    }),
    defineField({
      name: "promotionalPrice",
      title: "Preço promocional (R$)",
      description: "Opcional. Se preenchido, será exibido como preço atual e o original riscado.",
      type: "number",
      group: "main",
      validation: (R) => R.min(0),
    }),
    defineField({
      name: "installmentCount",
      title: "Nº de parcelas sem juros",
      description: "Padrão: 10x. Deixe vazio para esconder o parcelamento.",
      type: "number",
      group: "main",
      initialValue: 10,
      validation: (R) => R.min(1).max(24),
    }),
    defineField({
      name: "pixDiscount",
      title: "Desconto Pix (%)",
      description: "Padrão: 10. Deixe 0 para esconder o badge Pix.",
      type: "number",
      group: "main",
      initialValue: 10,
      validation: (R) => R.min(0).max(50),
    }),
    defineField({
      name: "description",
      title: "Descrição (corpo aberto, com imagens e GIFs)",
      type: "array",
      group: "main",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Subtítulo", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo (SEO)",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "caption",
              title: "Legenda (opcional)",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeria de imagens",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo (SEO)",
              type: "string",
              validation: (R) =>
                R.required().error("Descreva a imagem para acessibilidade e SEO."),
            }),
          ],
        }),
      ],
      validation: (R) => R.min(1).error("Adicione ao menos 1 imagem."),
    }),
    defineField({
      name: "videoUrl",
      title: "URL do vídeo",
      description: "YouTube, Vimeo ou MP4 direto. Opcional.",
      type: "url",
      group: "media",
    }),
    // ---- Especificações técnicas (Tabela de Autor) ----
    defineField({
      name: "weight",
      title: "Peso (kg)",
      type: "number",
      group: "details",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensões",
      description: "Ex: 220 × 95 × 78 cm (L × P × A).",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "isAssembled",
      title: "Vai montado?",
      type: "boolean",
      group: "details",
      initialValue: false,
      description: "Se desmarcado, exibirá 'Requer montagem'.",
    }),
    defineField({
      name: "packageCount",
      title: "Qtd. de embalagens",
      type: "number",
      group: "details",
      initialValue: 1,
    }),
    defineField({
      name: "warranty",
      title: "Garantia",
      type: "string",
      group: "details",
      initialValue: "365 dias contra defeitos de fabricação",
    }),
    defineField({
      name: "materials",
      title: "Materiais",
      type: "string",
      description: "Ex: Eucalipto Reflorestado, Linho Belga, Latão Escovado.",
      group: "details",
    }),
    defineField({
      name: "woodFinishes",
      title: "Tons de madeira / Acabamentos",
      description: "Amostras visuais de acabamento. Se vazio, exibe 3 padrão (Mel, Ébano, Nogueira).",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "finish",
          fields: [
            defineField({
              name: "label",
              title: "Nome do tom",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "swatch",
              title: "Amostra (imagem)",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "hex",
              title: "Cor HEX (fallback se sem imagem)",
              type: "string",
              description: "Ex: #8B5A2B",
            }),
          ],
          preview: { select: { title: "label", subtitle: "hex", media: "swatch" } },
        }),
      ],
      validation: (R) => R.max(8),
    }),
    defineField({
      name: "specifications",
      title: "Especificações adicionais (chave/valor)",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            defineField({ name: "key", title: "Atributo", type: "string", validation: (R) => R.required() }),
            defineField({ name: "value", title: "Valor", type: "string", validation: (R) => R.required() }),
          ],
          preview: { select: { title: "key", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "shippingInfo",
      title: "Informações de frete",
      type: "text",
      rows: 3,
      group: "details",
    }),
    defineField({
      name: "pdfUrl",
      title: "Ficha técnica (PDF)",
      description: "URL pública do PDF da ficha técnica.",
      type: "url",
      group: "details",
    }),
    // ---- Faixa de Benefícios ----
    defineField({
      name: "benefits",
      title: "Faixa de benefícios (cards verdes)",
      description: "Cards curtos com vantagens da peça (Vai montado, Frete, Garantia...).",
      type: "array",
      group: "main",
      of: [
        defineArrayMember({
          type: "object",
          name: "benefit",
          fields: [
            defineField({ name: "title", title: "Título", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Descrição curta", type: "string" }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: {
                list: [
                  { title: "Check (verde)", value: "check" },
                  { title: "Caminhão", value: "truck" },
                  { title: "Escudo", value: "shield" },
                  { title: "Folha", value: "leaf" },
                  { title: "Estrela", value: "star" },
                  { title: "Coração", value: "heart" },
                  { title: "Régua", value: "ruler" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (R) => R.max(8),
    }),
    // ---- Material Features (cards material) ----
    defineField({
      name: "materialFeatures",
      title: "Características de Materiais (cards)",
      description: "Cards curtos com destaques de materiais (Madeira maciça, Acabamento PU...).",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "materialFeature",
          fields: [
            defineField({ name: "title", title: "Título", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Descrição", type: "text", rows: 2, validation: (R) => R.required() }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (R) => R.max(8),
    }),
    // ---- Avaliações ----
    defineField({
      name: "ratingAverage",
      title: "Nota média (0-5)",
      type: "number",
      group: "details",
      initialValue: 5,
      validation: (R) => R.min(0).max(5),
    }),
    defineField({
      name: "ratingCount",
      title: "Total de avaliações",
      type: "number",
      group: "details",
      initialValue: 0,
    }),
    defineField({
      name: "ratingDistribution",
      title: "Distribuição de estrelas (5 a 1)",
      description: "Quantidade de votos para cada nota: [5★, 4★, 3★, 2★, 1★].",
      type: "object",
      group: "details",
      fields: [
        defineField({ name: "five", title: "5 estrelas", type: "number", initialValue: 0 }),
        defineField({ name: "four", title: "4 estrelas", type: "number", initialValue: 0 }),
        defineField({ name: "three", title: "3 estrelas", type: "number", initialValue: 0 }),
        defineField({ name: "two", title: "2 estrelas", type: "number", initialValue: 0 }),
        defineField({ name: "one", title: "1 estrela", type: "number", initialValue: 0 }),
      ],
    }),
    defineField({
      name: "reviews",
      title: "Avaliações de clientes",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "review",
          fields: [
            defineField({ name: "author", title: "Nome", type: "string", validation: (R) => R.required() }),
            defineField({ name: "location", title: "Cidade / UF", type: "string" }),
            defineField({ name: "rating", title: "Nota (1-5)", type: "number", validation: (R) => R.min(1).max(5) }),
            defineField({ name: "title", title: "Título curto", type: "string" }),
            defineField({ name: "comment", title: "Comentário", type: "text", rows: 3, validation: (R) => R.required() }),
            defineField({ name: "date", title: "Data", type: "date" }),
          ],
          preview: { select: { title: "author", subtitle: "comment" } },
        }),
      ],
    }),
    // ---- Etapas de Fabricação ----
    defineField({
      name: "manufacturingSteps",
      title: "Etapas de fabricação",
      description: "Deixe vazio para usar as 5 etapas padrão Mondez.",
      type: "array",
      group: "manufacturing",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", title: "Título", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Descrição curta", type: "text", rows: 2, validation: (R) => R.required() }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: {
                list: [
                  { title: "Régua / Projeto", value: "ruler" },
                  { title: "Estrutura / Madeira", value: "frame" },
                  { title: "Estofamento", value: "armchair" },
                  { title: "Personalização", value: "palette" },
                  { title: "Controle final", value: "check" },
                  { title: "Caminhão / Entrega", value: "truck" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (R) => R.max(8),
    }),
    defineField({
      name: "relatedProducts",
      title: "Produtos relacionados",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
      validation: (R) => R.max(8),
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      description: "Se vazio, usa o nome do produto.",
      type: "string",
      group: "seo",
      validation: (R) => R.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Descrição SEO",
      description: "Se vazio, usa a descrição padrão.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (R) => R.max(170),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "gallery.0" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `R$ ${Number(subtitle).toLocaleString("pt-BR")}` : "Sem preço",
        media,
      };
    },
  },
});
