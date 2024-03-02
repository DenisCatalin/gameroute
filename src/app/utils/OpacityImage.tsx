"use client";

import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  src: string;
  tabIndex?: number;
  fittment: "fill" | "contain" | "cover" | "none" | "scale-down";
};

const OpacityImage = ({ src, fittment }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });
  return (
    <div ref={ref} style={{ backgroundColor: "#e9c6b0" }}>
      <Image
        src={src}
        blurDataURL={src}
        placeholder="blur"
        fill
        sizes="100vw"
        alt=""
        style={{
          objectFit: fittment,
          opacity: inView ? 1 : 0,
          transition: "opacity 1s cubic-bezier(0.3, 0.2, 0.2, 0.8)",
        }}
      />
    </div>
  );
};

export default OpacityImage;
