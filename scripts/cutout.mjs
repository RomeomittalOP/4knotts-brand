import Jimp from "jimp";

// Usage: node scripts/cutout.mjs <src> <out> [localTol] [globalTol]
const src = process.argv[2] || "src/assets/products/hero.png";
const out = process.argv[3] || "src/assets/products/hero-cutout.png";
const localTol = Number(process.argv[4] || 30);   // gradient continuity threshold
const globalTol = Number(process.argv[5] || 95);  // max distance from background average

const img = await Jimp.read(src);
const { width, height, data } = img.bitmap;
const N = width * height;

const localTol2 = localTol * localTol;
const globalTol2 = globalTol * globalTol;

const r = (k) => data[k * 4];
const g = (k) => data[k * 4 + 1];
const b = (k) => data[k * 4 + 2];

// background reference = average of corners + edge midpoints
const sampleK = [
  0,
  width - 1,
  (height - 1) * width,
  height * width - 1,
  (width / 2) | 0,
  ((height / 2) | 0) * width,
  ((height / 2) | 0) * width + width - 1,
  (height - 1) * width + ((width / 2) | 0),
];
let br = 0, bg = 0, bb = 0;
for (const k of sampleK) { br += r(k); bg += g(k); bb += b(k); }
br = Math.round(br / sampleK.length);
bg = Math.round(bg / sampleK.length);
bb = Math.round(bb / sampleK.length);

const dist2 = (k, R, G, B) => {
  const dr = r(k) - R, dg = g(k) - G, db = b(k) - B;
  return dr * dr + dg * dg + db * db;
};

const visited = new Uint8Array(N);
const remove = new Uint8Array(N);
const stack = [];

// seed: every border pixel
for (let x = 0; x < width; x++) {
  stack.push(x);                        // top
  stack.push((height - 1) * width + x); // bottom
}
for (let y = 0; y < height; y++) {
  stack.push(y * width);                // left
  stack.push(y * width + width - 1);    // right
}

while (stack.length) {
  const k = stack.pop();
  if (visited[k]) continue;
  visited[k] = 1;

  // stop if this pixel is far from the background colour (= subject)
  if (dist2(k, br, bg, bb) > globalTol2) continue;
  remove[k] = 1;

  const x = k % width;
  const y = (k / width) | 0;
  const R = r(k), G = g(k), B = b(k);

  const neigh = [];
  if (x + 1 < width) neigh.push(k + 1);
  if (x - 1 >= 0) neigh.push(k - 1);
  if (y + 1 < height) neigh.push(k + width);
  if (y - 1 >= 0) neigh.push(k - width);

  for (const nk of neigh) {
    if (!visited[nk] && dist2(nk, R, G, B) < localTol2) stack.push(nk);
  }
}

// erode one ring: remove leftover bg-ish pixels touching a removed pixel
for (let k = 0; k < N; k++) {
  if (remove[k] || dist2(k, br, bg, bb) > globalTol2) continue;
  const x = k % width, y = (k / width) | 0;
  if (
    (x + 1 < width && remove[k + 1]) ||
    (x - 1 >= 0 && remove[k - 1]) ||
    (y + 1 < height && remove[k + width]) ||
    (y - 1 >= 0 && remove[k - width])
  ) {
    remove[k] = 1;
  }
}

let count = 0;
for (let k = 0; k < N; k++) {
  if (remove[k]) { data[k * 4 + 3] = 0; count++; }
}

await img.writeAsync(out);
console.log("done", { src, out, localTol, globalTol, width, height, bgRef: [br, bg, bb], removed: count, total: N });
