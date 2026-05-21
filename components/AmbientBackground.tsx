"use client";

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Deep neutral base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #18181B 0%, #0A0A0C 55%, #07070A 100%)",
        }}
      />

      {/* Orb 1 — top-left, primary */}
      <div
        className="absolute rounded-full"
        style={{
          width: "720px",
          height: "720px",
          top: "-180px",
          left: "-160px",
          background: "var(--orb-1)",
          filter: "blur(140px)",
          opacity: 0.32,
          animation: "orb-drift-a 18s ease-in-out infinite alternate",
        }}
      />

      {/* Orb 2 — right-side, secondary */}
      <div
        className="absolute rounded-full"
        style={{
          width: "640px",
          height: "640px",
          top: "200px",
          right: "-200px",
          background: "var(--orb-2)",
          filter: "blur(150px)",
          opacity: 0.28,
          animation: "orb-drift-b 22s ease-in-out infinite alternate",
        }}
      />

      {/* Orb 3 — mid-page, tertiary */}
      <div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          top: "1400px",
          left: "30%",
          background: "var(--orb-3)",
          filter: "blur(160px)",
          opacity: 0.22,
          animation: "orb-drift-c 26s ease-in-out infinite alternate",
        }}
      />

      {/* Orb 4 — deep, near contact */}
      <div
        className="absolute rounded-full"
        style={{
          width: "560px",
          height: "560px",
          bottom: "-200px",
          right: "10%",
          background: "var(--orb-1)",
          filter: "blur(170px)",
          opacity: 0.22,
        }}
      />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 75%)",
          opacity: 0.5,
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
