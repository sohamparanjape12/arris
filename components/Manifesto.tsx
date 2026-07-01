"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Manifesto() {

    const containerRef = useRef(null);

    useGSAP(() => {

        if (!containerRef.current) return;

        gsap.fromTo(".manifesto-image", {
            y: 0,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".manifesto-image",
                start: "top 80%",
            },
        });

        const split = SplitText.create(".manifesto-text", {
            type: "words",
            mask: "words",
        });

        const words = split.words;

        gsap.fromTo(words, {
            yPercent: 100,
        },
            {
                yPercent: 0,
                autoAlpha: 1,
                duration: 1.2,
                stagger: 0.085,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 20%",
                    end: "bottom 80%",
                    scrub: 1.4
                }
            }
        );

        gsap.fromTo(".manifesto-image", {
            yPercent: 0,
            scale: 1.3
        }, {
            yPercent: -20,
            scale: 1.3,
            ease: "none",
            scrollTrigger: {
                trigger: ".manifesto-image",
                start: "top 50%",
                end: "bottom -200%",
                scrub: 1.8,
            },
            duration: 1
        })
    }, []);

    return (
        <section ref={containerRef} className="h-[100dvh] w-full flex items-center justify-center font-sans flex-col lg:flex-row">
            <div className="flex-2 flex items-center justify-center h-full md:m-12 overflow-hidden">
                <img className="manifesto-image h-full w-full object-cover" src="https://images.pexels.com/photos/13041129/pexels-photo-13041129.jpeg" alt="" />
            </div>
            <div className="text-lg text-center tracking-[0.1em] leading-normal flex flex-col flex-3 relative w-full h-full">
                <div className="manifesto-text absolute top-20 right-1/2 translate-x-1/2 w-[90%] md:w-[30vw] md:right-20 md:bottom-20 font-semibold tracking-tight text-balance">
                    <p>our practice is dictated by permanence. we believe spaces should not merely occupy volume, but converse with light, shadow, and time.</p>
                    <br />
                    <p>arris is an intersection of raw physical masonry and contemporary digital curation.</p>
                </div>
            </div>
        </section>
    );
}