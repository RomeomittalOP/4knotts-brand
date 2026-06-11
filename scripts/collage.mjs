import Jimp from "jimp";

const base = "src/assets/products/";
const picks = [
  "folder/translucent/Aqua.png",
  "file/corporate/Vertex.png",
  "crayons-chalks/Spectrum.png",
  "binder/corporate/Marble.png",
  "pens/Prestige.png",
  "folder/corporate/Quantum.png",
];

const W = 1200, H = 1240;
const cols = 2, rows = 3;
const pad = 28, gap = 22;
const cellW = Math.floor((W - 2 * pad - (cols - 1) * gap) / cols);
const cellH = Math.floor((H - 2 * pad - (rows - 1) * gap) / rows);

const canvas = new Jimp(W, H, 0xf4f1ebff); // warm off-white base (light theme)

for (let i = 0; i < picks.length; i++) {
  const r = Math.floor(i / cols);
  const c = i % cols;
  const x0 = pad + c * (cellW + gap);
  const y0 = pad + r * (cellH + gap);

  // white card background per cell
  const cell = new Jimp(cellW, cellH, 0xffffffff);
  canvas.composite(cell, x0, y0);

  // product image, fit inside the cell with a little inner padding
  const img = await Jimp.read(base + picks[i]);
  const innerW = cellW - 28, innerH = cellH - 28;
  img.scaleToFit(innerW, innerH);
  const x = x0 + Math.floor((cellW - img.bitmap.width) / 2);
  const y = y0 + Math.floor((cellH - img.bitmap.height) / 2);
  canvas.composite(img, x, y);
}

await canvas.writeAsync(base + "catalog-collage.png");
console.log("collage saved:", base + "catalog-collage.png", `${W}x${H}`);
