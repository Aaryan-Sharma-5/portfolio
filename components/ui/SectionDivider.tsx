"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-20 origin-center"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />
    </div>
  );
}
