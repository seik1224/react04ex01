import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section01 = () => {
  const containerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0); // 현재 이미지 번호
  const totalImages = 12; // 총 이미지 갯수

  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const divs = [
      div1Ref.current,
      div2Ref.current,
      div3Ref.current,
      div4Ref.current,
    ];

    //  GSAP :: 이미지 변경
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "30% bottom",
      scrub: true,
      // markers: true,
      onUpdate: (self) => {
        console.log(
          `스크롤 진행도: ${self.progress}, 스크롤 방향: ${self.direction}`
        );
        const progress = self.progress;
        const newImageNumber = Math.floor(progress * (totalImages - 1)); // 이미지 번호 계산 : 내림(0.1 * (12 - 1))
        if (newImageNumber !== currentImage) {
          setCurrentImage(newImageNumber);
        }
      },
    });

    // GSAP :: DIV 변경

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    divs.forEach((div, index) => {
      tl.to(
        div,
        {
          y: "0%",
          duration: 0.25,
        },
        index * 0.25
      );
    });

    return () => {
      scrollTrigger.kill();

      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [currentImage, totalImages]);

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
        <div
          ref={div1Ref}
          className="absolute left-0 w-1/4 h-full bg-white"
          style={{ transform: "translateY(100%)" }}
        ></div>
        <div
          ref={div2Ref}
          className="absolute left-1/4 w-1/4 h-full bg-white"
          style={{ transform: "translateY(100%)" }}
        ></div>
        <div
          ref={div3Ref}
          className="absolute left-2/4 w-1/4 h-full bg-white"
          style={{ transform: "translateY(100%)" }}
        ></div>
        <div
          ref={div4Ref}
          className="absolute left-3/4 w-1/4 h-full bg-white"
          style={{ transform: "translateY(100%)" }}
        ></div>
      </div>
    </section>
  );
};

export default Section01;
