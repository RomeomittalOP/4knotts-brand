/* =====================================================================
   PRODUCT DETAILS — ✏️ EDIT EVERYTHING HERE
   ---------------------------------------------------------------------
   Har product ka data yahan hai. Kisi bhi product ko edit karna ho toh
   neeche PRODUCT key (= image file ka naam, lowercase, spaces ki jagah -)
   dhoondho aur badal do. Naye product ke liye nayi key add kar do.

   Agar kisi product ki key yahan nahi hai, toh CATEGORY_DEFAULTS use hoti
   hai (taaki har product ke paas details automatically rahe).
===================================================================== */

// Defaults per category — agar product-specific entry na ho toh ye chalte hain
export const CATEGORY_DEFAULTS = {
  "Notebook": {
    material: "100 GSM premium bleed-proof paper",
    dimensions: "A5 · 14.8 × 21 cm · 160 pages",
    description:
      "A premium notebook built for everyday writing — buttery smooth pages, a sturdy bound spine, and a cover that survives the daily grind.",
    features: ["100 GSM paper", "160 pages", "Lay-flat binding", "Smudge-free"],
  },
  "Folder": {
    material: "Durable translucent polypropylene",
    dimensions: "A4 · 24 × 33 cm",
    description:
      "A sturdy see-through folder that keeps your documents crisp and organised. Smooth finish, flexible spine, and a clasp that actually holds.",
    features: ["Holds 100+ sheets", "Water-resistant", "A4 size", "Flexible spine"],
  },
  "File": {
    material: "Laminated board with elastic closure",
    dimensions: "A4 · 24 × 32 cm",
    description:
      "A clean, professional file with a secure elastic band — perfect for reports, projects and keeping your paperwork boardroom-ready.",
    features: ["Elastic closure", "Reinforced corners", "A4 size", "Spill-resistant"],
  },
  "Binder": {
    material: "Premium leatherette with ring mechanism",
    dimensions: "A4 · 26 × 32 cm · 2-ring",
    description:
      "A premium ring binder that organises everything — finance, files and formal docs — with a smooth-snap mechanism and a finish that means business.",
    features: ["2-ring mechanism", "Holds 250+ sheets", "Leatherette finish", "A4 size"],
  },
  "Crayons & Chalks": {
    material: "Non-toxic, dust-free, washable",
    dimensions: "Set · standard size",
    description:
      "Bright, smooth and non-toxic — built for creators big and small. Rich pigments, easy grip, and zero mess.",
    features: ["Non-toxic", "Dust-free", "Bright pigments", "Washable"],
  },
  "Paints": {
    material: "Non-toxic washable paints",
    dimensions: "Set · standard size",
    description:
      "Vibrant, blendable and non-toxic paints that bring any idea to life. Smooth flow, true colours, and easy clean-up.",
    features: ["Non-toxic", "Vibrant colours", "Blendable", "Quick-dry"],
  },
  "Pencil": {
    material: "Premium graphite / colour core",
    dimensions: "Standard · 17.5 cm",
    description:
      "Smooth-glide pencils that don't snap mid-thought. Strong core, clean lines, and an easy sharpen.",
    features: ["Break-resistant core", "Smooth glide", "Easy sharpen", "Premium wood"],
  },
  "Pens": {
    material: "Metal body · smooth-flow refill",
    dimensions: "Standard · 14 cm",
    description:
      "A premium pen that writes like butter and feels like a flex. Balanced weight, smooth ink flow, and a finish that turns heads.",
    features: ["Smooth-flow ink", "Premium metal body", "Refillable", "Comfort grip"],
  },
  "Pouch": {
    material: "Water-resistant fabric · zip closure",
    dimensions: "21 × 9 × 5 cm",
    description:
      "A roomy, durable pouch that holds all your essentials and zips shut clean. Built to take a beating in any bag.",
    features: ["Water-resistant", "Heavy-duty zip", "Roomy", "Easy clean"],
  },
};

// Sample reviews shown when a product has no custom reviews
export const DEFAULT_REVIEWS = [
  { name: "Aarav S.", rating: 5, text: "Premium quality, exactly as shown. Super happy with it." },
  { name: "Priya M.", rating: 4, text: "Great value for the price. Delivery was quick too." },
  { name: "Rohan K.", rating: 5, text: "Looks even better in person. Will order again." },
];

/* Per-product overrides. Key = image file name (lowercase, spaces -> -).
   Add `price`, `dimensions`, `features`, `reviews` here too if you want to
   override the category default for a specific product. */
export const PRODUCT_DETAILS = {
  // ---------- FOLDER · Translucent ----------
  aqua:   { name: "Aqua Translucent Folder",   description: "A cool aqua-tinted see-through folder — calm, clean, and easy to spot in any bag." },
  black:  { name: "Black Translucent Folder",  description: "A smoked-black translucent folder with an understated, premium edge." },
  golden: { name: "Golden Translucent Folder", description: "A warm golden-tint folder that adds a soft glow to your everyday carry." },
  grey:   { name: "Grey Translucent Folder",   description: "A minimal smoke-grey folder — neutral, professional, goes with everything." },
  pink:   { name: "Pink Translucent Folder",   description: "A soft pink translucent folder for a pop of personality on your desk." },
  purple: { name: "Purple Translucent Folder", description: "A rich purple-tint folder that stands out without trying too hard." },
  yellow: { name: "Yellow Translucent Folder", description: "A sunny yellow folder that's impossible to lose in a crowded bag." },

  // ---------- FOLDER · Corporate ----------
  framework: { name: "Framework Corporate Folder", description: "A structured corporate folder built for presentations, pitches and paperwork that matters." },
  quantum:   { name: "Quantum Corporate Folder",   description: "A sleek matte-black corporate folder — sharp, professional, boardroom-ready." },
  vector:    { name: "Vector Corporate Folder",    description: "A bold geometric corporate folder that makes your documents look the part." },

  // ---------- FILE · Corporate ----------
  elevate:  { name: "Elevate File",  description: "A clean corporate file designed to elevate any report or proposal." },
  momentum: { name: "Momentum File", description: "A no-nonsense file that keeps your projects moving and organised." },
  nexus:    { name: "Nexus File",    description: "A connected, modular file for people juggling a hundred things at once." },
  vertex:   { name: "Vertex File",   description: "A premium black file with reinforced corners and an elastic band that holds tight." },

  // ---------- FILE · Modern ----------
  leaf:          { name: "Leaf File",        description: "A fresh, nature-inspired file with soft tones and a clean modern finish." },
  nova:          { name: "Nova File",        description: "A bright, modern file that adds energy to your everyday workflow." },
  "splash-vibe": { name: "Splash Vibe File", description: "A playful splash-print file for those who like their stationery loud." },

  // ---------- BINDER · Corporate ----------
  marble:     { name: "Marble Binder",     description: "An elegant marble-finish binder for finance, files and formal docs." },
  prime:      { name: "Prime Binder",      description: "A premium everyday binder with a smooth-snap ring mechanism." },
  skyscraper: { name: "SkyScraper Binder", description: "A tall-capacity corporate binder built to hold your biggest projects." },

  // ---------- CRAYONS & CHALKS ----------
  spectrum:         { name: "Spectrum Crayons",     description: "A full spectrum of 24 rich, smooth crayons in a premium NOTED box.", dimensions: "24 crayons · premium box" },
  brightbox:        { name: "BrightBox Crayons",    description: "A bright, beginner-friendly crayon set that keeps little artists busy." },
  "color-adventure":{ name: "Color Adventure Crayons", description: "A playful crayon set built for big imaginations and bigger doodles." },
  "color-vault":    { name: "Color Vault Crayons",  description: "A premium vault of vivid crayons — every shade you'll ever need." },
  "drawer-box":     { name: "Drawer Box Crayons",   description: "A neat slide-out drawer box of crayons that keeps everything in place." },
  "chalk-holder":   { name: "Dust-Free Chalk Holder", description: "A clean-grip holder so you can write with chalk without the mess." },
  "blue-chalk":     { name: "Blue Dust-Free Chalk",     description: "Smooth, vivid blue dust-free chalk — bold lines, zero mess." },
  "green-chalk":    { name: "Green Dust-Free Chalk",    description: "Bright green dust-free chalk that writes clean and wipes clean." },
  "orange-chalk":   { name: "Orange Dust-Free Chalk",   description: "Warm orange dust-free chalk for boards that pop." },
  "purple-chalk":   { name: "Purple Dust-Free Chalk",   description: "Rich purple dust-free chalk — smooth glide, bold colour." },
  "turquoise-chalk":{ name: "Turquoise Dust-Free Chalk",description: "Cool turquoise dust-free chalk for standout notes." },
  "white-chalk":    { name: "White Dust-Free Chalk",    description: "Classic white dust-free chalk — crisp, clean, reliable." },
  "yellow-chalk":   { name: "Yellow Dust-Free Chalk",   description: "Sunny yellow dust-free chalk that's easy on the eyes and the board." },

  // ---------- PENS ----------
  prestige:   { name: "Prestige Pen",   description: "A premium metal-body pen with a smooth gold-trim finish — writing, elevated." },
  crownliner: { name: "Crownliner Pen", description: "A sleek everyday pen with a crisp line and a confident, balanced feel." },
  obsidian:   { name: "Obsidian Pen",   description: "A matte-black statement pen that writes like silk and looks like a flex." },
};
