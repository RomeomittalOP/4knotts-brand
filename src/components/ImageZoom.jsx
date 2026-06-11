import { useRef, useState } from "react";

// Hover a product image to reveal a circular magnifying-glass lens that
// follows the cursor and shows a zoomed-in view.
export default function ImageZoom({ src, alt, zoom = 2.3, size = 190 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [lens, setLens] = useState({ x: 0, y: 0, bgx: 0, bgy: 0, w: 1, h: 1 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;
    x = Math.max(0, Math.min(x, r.width));
    y = Math.max(0, Math.min(y, r.height));
    setLens({
      x,
      y,
      w: r.width,
      h: r.height,
      bgx: -(x * zoom - size / 2),
      bgy: -(y * zoom - size / 2),
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={onMove}
      style={styles.wrap}
    >
      <img src={src} alt={alt} style={styles.img} draggable={false} />

      {show && (
        <div
          style={{
            ...styles.lens,
            left: lens.x - size / 2,
            top: lens.y - size / 2,
            width: size,
            height: size,
            backgroundImage: `url(${src})`,
            backgroundSize: `${lens.w * zoom}px ${lens.h * zoom}px`,
            backgroundPosition: `${lens.bgx}px ${lens.bgy}px`,
          }}
        />
      )}
    </div>
  );
}

const styles = {
  wrap: {
    position: "relative",
    width: "100%",
    height: "100%",
    cursor: "zoom-in",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "16px",
    boxSizing: "border-box",
    display: "block",
  },
  lens: {
    position: "absolute",
    borderRadius: "50%",
    border: "3px solid #fff",
    boxShadow: "0 10px 34px rgba(0,0,0,.3), 0 0 0 1px rgba(0,0,0,.06)",
    backgroundColor: "#fff",
    backgroundRepeat: "no-repeat",
    pointerEvents: "none",
    zIndex: 6,
  },
};
