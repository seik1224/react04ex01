import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section01 = () => {
  const containerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0); // 현재 이미지 번호
  const totalImages = 12; // 총 이미지 갯수

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 이미지 변경
  const currentImageIndex = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, totalImages - 1]
  );

  useEffect(() => {
    const unsubscribe = currentImageIndex.on("change", (latest) => {
      console.log(`스크롤 진행도: ${latest}`);
      const newImageNumber = Math.floor(latest);
      if (newImageNumber !== currentImage) {
        setCurrentImage(newImageNumber);
      }
    });

    return () => unsubscribe();
  }, [currentImageIndex, currentImage]);

  //  DIV 변경
  const y1 = useTransform(scrollYProgress, [0.3, 0.35], ["100%", "0%"]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.4], ["100%", "0%"]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.45], ["100%", "0%"]);
  const y4 = useTransform(scrollYProgress, [0.45, 0.5], ["100%", "0%"]);

  return (
    <section
      ref={containerRef}
      className="w-full h-[400vh] relative bg-black text-white"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div
          style={{ backgroundImage: `url(/digivice.jpg)` }}
          className="w-[400px] h-[400px] flex justify-center items-center"
        >
          <img
            src={`/001/egg${currentImage.toString().padStart(2, "0")}.png`}
            alt={`egg ${currentImage}`}
            className="max-w-full max-h-full"
          />
        </div>
      </div>
      <div className="sticky top-0 left-0 w-full h-full overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute left-0 w-1/4 h-full bg-white"
        ></motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute left-1/4 w-1/4 h-full bg-white"
        ></motion.div>
        <motion.div
          style={{ y: y3 }}
          className="absolute left-2/4 w-1/4 h-full bg-white"
        ></motion.div>
        <motion.div
          style={{ y: y4 }}
          className="absolute left-3/4 w-1/4 h-full bg-white"
        ></motion.div>
      </div>
    </section>
  );
};

export default Section01;
