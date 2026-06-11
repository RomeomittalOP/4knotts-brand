import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import heroImage from "../assets/products/hero-cutout.png";

// Interactive 3D mascot: tilts in real perspective toward the cursor,
// pops forward in Z, and its drop-shadow shifts like a real light source.
export default function Mascot3D() {
  const ref = useRef(null);

  // normalized cursor position (-0.5 .. 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 140, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 140, damping: 16, mass: 0.6 });

  // 3D rotation
  const rotateY = useTransform(sx, [-0.5, 0.5], [-24, 24]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [18, -18]);

  // parallax for glow (moves opposite, sits behind)
  const glowX = useTransform(sx, [-0.5, 0.5], [40, -40]);
  const glowY = useTransform(sy, [-0.5, 0.5], [30, -30]);

  // dynamic drop-shadow that follows the alpha shape like real light
  const shX = useTransform(sx, [-0.5, 0.5], [38, -38]);
  const shY = useTransform(sy, [-0.5, 0.5], [-26, 34]);
  const mascotFilter = useMotionTemplate`drop-shadow(${shX}px ${shY}px 28px rgba(0,0,0,.55))`;

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={styles.stage}
    >
      {/* glowing halo behind, with parallax */}
      <motion.div style={{ ...styles.glow, x: glowX, y: glowY }} />

      {/* the 3D tilting rig */}
      <motion.div style={{ ...styles.tilt, rotateX, rotateY }}>
        {/* slow-rotating 3D rings behind the mascot */}
        <motion.div
          style={styles.ring}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          style={styles.ringInner}
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        {/* ground shadow that breathes */}
        <motion.div
          style={styles.ground}
          animate={{ scaleX: [1, 0.8, 1], opacity: [0.5, 0.25, 0.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* mascot pops forward in Z + gentle idle float */}
        <motion.img
          src={heroImage}
          alt="Noted By 4 Knotts mascot"
          draggable={false}
          style={{ ...styles.img, z: 70, filter: mascotFilter }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

const styles = {
  stage: {
    position: "relative",
    width: "100%",
    minHeight: "620px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: "1100px",
  },

  glow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "460px",
    height: "460px",
    transform: "translate(-50%,-55%)",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(44,46,107,.22), rgba(44,46,107,.10) 45%, transparent 70%)",
    filter: "blur(22px)",
    zIndex: 0,
  },

  tilt: {
    position: "relative",
    transformStyle: "preserve-3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    willChange: "transform",
  },

  img: {
    width: "min(540px, 92%)",
    height: "auto",
    objectFit: "contain",
    position: "relative",
    zIndex: 2,
    cursor: "pointer",
    willChange: "transform",
  },

  ground: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%) translateZ(-40px)",
    width: "280px",
    height: "34px",
    borderRadius: "50%",
    background: "radial-gradient(ellipse, rgba(0,0,0,.55), transparent 70%)",
    filter: "blur(14px)",
    zIndex: 0,
  },

  ring: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "440px",
    height: "440px",
    marginTop: "-220px",
    marginLeft: "-220px",
    borderRadius: "50%",
    border: "1px dashed rgba(44,46,107,.28)",
    transform: "translateZ(-70px)",
    zIndex: 0,
  },

  ringInner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "330px",
    height: "330px",
    marginTop: "-165px",
    marginLeft: "-165px",
    borderRadius: "50%",
    border: "1px solid rgba(44,46,107,.18)",
    transform: "translateZ(-50px)",
    zIndex: 0,
  },

};
