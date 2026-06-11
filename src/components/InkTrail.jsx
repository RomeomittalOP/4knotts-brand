import { useEffect, useRef } from "react";

// A subtle fountain-pen ink trail that follows the cursor — on brand for a
// stationery house. Disabled on touch devices and for reduced-motion users.
export default function InkTrail() {
  const ref = useRef(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let dots = [];
    let last = { x: 0, y: 0 };

    const onMove = (e) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 5) {
        dots.push({
          x: e.clientX,
          y: e.clientY,
          r: Math.min(5.5, 1.8 + dist * 0.05),
          a: 0.38,
        });
        last = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.a -= 0.011;
        d.r *= 0.986;
      }
      dots = dots.filter((d) => d.a > 0.02);
      ctx.fillStyle = "#2C2E6B";
      for (const d of dots) {
        ctx.globalAlpha = d.a;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}
