import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Mondez Catálogo Sanity project
export const SANITY_PROJECT_ID = "1gsugl54";
export const SANITY_DATASET = "production";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}

// ---------- Types ----------
export interface SanityImage {
  _key?: string;
  _type?: string;
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number };
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  [k: string]: unknown;
}

export interface Specification {
  _key?: string;
  key: string;
  value: string;
}

export interface ManufacturingStep {
  _key?: string;
  title: string;
  description: string;
  icon?: "ruler" | "frame" | "armchair" | "palette" | "check" | "truck";
}

export interface WoodFinish {
  _key?: string;
  label: string;
  swatch?: SanityImage;
  hex?: string;
}

export interface RelatedProductRef {
  _id: string;
  name: string;
  slug: { current: string };
  price?: number;
  promotionalPrice?: number;
  mainImage?: SanityImage;
}

export interface Benefit {
  _key?: string;
  title: string;
  description?: string;
  icon?: "check" | "truck" | "shield" | "leaf" | "star" | "heart" | "ruler";
}

export interface MaterialFeature {
  _key?: string;
  title: string;
  description: string;
}

export interface Review {
  _key?: string;
  author: string;
  location?: string;
  rating?: number;
  title?: string;
  comment: string;
  date?: string;
}

export interface RatingDistribution {
  five?: number;
  four?: number;
  three?: number;
  two?: number;
  one?: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  category?: string;
  sku?: string;
  price?: number;
  promotionalPrice?: number;
  installmentCount?: number;
  pixDiscount?: number;
  description?: PortableTextBlock[];
  gallery?: SanityImage[];
  videoUrl?: string;
  weight?: number;
  dimensions?: string;
  isAssembled?: boolean;
  packageCount?: number;
  warranty?: string;
  materials?: string;
  woodFinishes?: WoodFinish[];
  specifications?: Specification[];
  shippingInfo?: string;
  pdfUrl?: string;
  benefits?: Benefit[];
  materialFeatures?: MaterialFeature[];
  manufacturingSteps?: ManufacturingStep[];
  ratingAverage?: number;
  ratingCount?: number;
  ratingDistribution?: RatingDistribution;
  reviews?: Review[];
  relatedProducts?: RelatedProductRef[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CatalogProduct {
  _id: string;
  name: string;
  slug: { current: string };
  category?: string;
  price?: number;
  promotionalPrice?: number;
  mainImage?: SanityImage;
  secondaryImage?: SanityImage;
}

// ---------- Queries ----------
export const PRODUCT_BY_SLUG_QUERY = /* groq */ `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  category,
  sku,
  price,
  promotionalPrice,
  installmentCount,
  pixDiscount,
  description,
  gallery[]{ _key, _type, asset, alt, hotspot },
  videoUrl,
  weight,
  dimensions,
  isAssembled,
  packageCount,
  warranty,
  materials,
  woodFinishes[]{ _key, label, swatch, hex },
  specifications[]{ _key, key, value },
  shippingInfo,
  pdfUrl,
  benefits[]{ _key, title, description, icon },
  materialFeatures[]{ _key, title, description },
  manufacturingSteps[]{ _key, title, description, icon },
  ratingAverage,
  ratingCount,
  ratingDistribution,
  reviews[]{ _key, author, location, rating, title, comment, date },
  seoTitle,
  seoDescription,
  "relatedProducts": relatedProducts[]->{
    _id,
    name,
    slug,
    price,
    promotionalPrice,
    "mainImage": gallery[0]{ asset, alt }
  }
}
`;

export const CATALOG_QUERY = /* groq */ `
*[_type == "product" && defined(slug.current)] | order(_createdAt desc){
  _id,
  name,
  slug,
  category,
  price,
  promotionalPrice,
  "mainImage": gallery[0]{ asset, alt },
  "secondaryImage": gallery[1]{ asset, alt }
}
`;
