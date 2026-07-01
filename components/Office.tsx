"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Office() {

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const text = document.querySelector(".office-text-1");
        if (!text) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1500px",
                pin: true,
                scrub: 2.4
            }
        })

        const t1Split = SplitText.create(text, {
            type: "words, lines",
            mask: "lines"
        });

        tl.fromTo(t1Split.words, {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.095,
        })
            .fromTo(t1Split.lines, {
                yPercent: 0
            },
                {
                    yPercent: 100,
                    duration: 1.8,
                    stagger: 0.4,
                    ease: "power2.out",
                });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="h-[100dvh] flex items-center justify-center">
            <div className="flex-1 max-w-[80%] md:max-w-[40%] text-center">
                <h3 className="office-text-1 text-xl font-medium tracking-normal leading-normal text-pretty">
                    arris is an architectural practice based in Pune and Goa.<br /> The studio works on residential, cultural, and spatial projects. We design spaces that respond directly to their site, climate, and materials, balancing raw physical construction with digital planning.
                </h3>
            </div>
        </section>
    )
}