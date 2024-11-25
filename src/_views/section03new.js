import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section03 = () => {
  const containerRef = useRef(null);
  const imageCount = 6; // 이미지 개수
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md 브레이크포인트
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerHeight = isMobile
    ? `${(imageCount - 1) * 100}vh`
    : `${(imageCount / 2 - 1) * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? ["0%", `${-100 * (imageCount - 1)}%`]
      : ["0%", `${-100 * (imageCount / 2 - 1)}vw`]
  );

  const rotations = [-7.5, 15, 2.5, 7.5, -5, 5]; // 회전 각도 배열

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight }}
      className="bg-blue-500"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full items-center" style={{ x }}>
          {Array.from({ length: imageCount }).map((_, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 h-full flex items-center justify-center flex-none"
            >
              <img
                className="h-3/4 rounded-3xl shadow-2xl"
                src={`/po0${index + 1}.webp`}
                alt={`Poster ${index + 1}`}
                style={{ rotate: `${rotations[index]}deg` }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Section03;
