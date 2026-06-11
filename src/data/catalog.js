import { CATEGORY_DEFAULTS, PRODUCT_DETAILS, DEFAULT_REVIEWS } from "./productDetails";

/* =====================================================================
   AUTO IMPORT — drop images into these folders and they show up.
   Each product also picks up its description/dimensions/reviews from
   ../data/productDetails.js (edit that file to customise any product).
===================================================================== */
const G = {
  crayons:     import.meta.glob("../assets/products/crayons-chalks/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  folderTrans: import.meta.glob("../assets/products/folder/translucent/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  folderCorp:  import.meta.glob("../assets/products/folder/corporate/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  folderMod:   import.meta.glob("../assets/products/folder/modern/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  fileCorp:    import.meta.glob("../assets/products/file/corporate/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  fileMod:     import.meta.glob("../assets/products/file/modern/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  binderCorp:  import.meta.glob("../assets/products/binder/corporate/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  binderMod:   import.meta.glob("../assets/products/binder/modern/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  nbA4:        import.meta.glob("../assets/products/notebooks/a4/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  nbA5:        import.meta.glob("../assets/products/notebooks/a5/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  nbSpiral:    import.meta.glob("../assets/products/notebooks/spiral/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  paints:      import.meta.glob("../assets/products/paints/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  pencils:     import.meta.glob("../assets/products/pencils/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  pens:        import.meta.glob("../assets/products/pens/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
  pouches:     import.meta.glob("../assets/products/pouches/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }),
};

const PRICE = {
  "Crayons & Chalks": 99, "Folder": 89, "File": 69, "Binder": 129,
  "Notebook": 199, "Paints": 149, "Pencil": 49, "Pens": 59, "Pouch": 129,
};

export const SUBCATS = {
  "Folder": ["Translucent", "Corporate", "Modern"],
  "File": ["Corporate", "Modern"],
  "Binder": ["Corporate", "Modern"],
  "Notebook": ["A4", "A5", "Spiral"],
};

export const FILTERS = [
  "ALL", "Crayons & Chalks", "Folder", "File", "Binder",
  "Notebook", "Paints", "Pencil", "Pens", "Pouch",
];

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const prettify = (s) =>
  s.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim()
   .replace(/\b\w/g, (c) => c.toUpperCase());

/* group files into products (pairing -front/-back) + merge editable details */
function build(glob, category, sub) {
  const groups = {};
  for (const [path, src] of Object.entries(glob)) {
    const fname = path.split("/").pop().replace(/\.(png|jpe?g|webp)$/i, "");
    const m = fname.match(/^(.*?)[-_](front|back)$/i);
    const base = m ? m[1] : fname;
    const side = m ? m[2].toLowerCase() : "front";
    if (!groups[base]) groups[base] = { base };
    groups[base][side] = src;
  }

  return Object.values(groups).map((g) => {
    const key = slugify(g.base);
    const detail = PRODUCT_DETAILS[key] || {};
    const cat = CATEGORY_DEFAULTS[category] || {};

    return {
      id: `${slugify(category)}-${slugify(sub || "")}-${key}`,
      slug: `${slugify(category)}-${slugify(sub || "")}-${key}`,
      title: detail.name || prettify(g.base),
      category,
      sub: sub || null,
      front: g.front || g.back,
      back: g.back || null,
      price: detail.price ?? cat.price ?? PRICE[category] ?? 99,
      description: detail.description || cat.description || "",
      dimensions: detail.dimensions || cat.dimensions || "—",
      material: detail.material || cat.material || "—",
      features: detail.features || cat.features || [],
      reviews: detail.reviews || cat.reviews || DEFAULT_REVIEWS,
    };
  });
}

export const ALL_PRODUCTS = [
  ...build(G.crayons, "Crayons & Chalks"),
  ...build(G.folderTrans, "Folder", "Translucent"),
  ...build(G.folderCorp, "Folder", "Corporate"),
  ...build(G.folderMod, "Folder", "Modern"),
  ...build(G.fileCorp, "File", "Corporate"),
  ...build(G.fileMod, "File", "Modern"),
  ...build(G.binderCorp, "Binder", "Corporate"),
  ...build(G.binderMod, "Binder", "Modern"),
  ...build(G.nbA4, "Notebook", "A4"),
  ...build(G.nbA5, "Notebook", "A5"),
  ...build(G.nbSpiral, "Notebook", "Spiral"),
  ...build(G.paints, "Paints"),
  ...build(G.pencils, "Pencil"),
  ...build(G.pens, "Pens"),
  ...build(G.pouches, "Pouch"),
];

export const getProduct = (slug) =>
  ALL_PRODUCTS.find((p) => p.slug === slug);

export const avgRating = (reviews) =>
  reviews && reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;
