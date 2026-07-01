"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react";

declare global {
    interface Window {
        __preloaderComplete?: boolean;
    }
}

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !svgRef.current) return;

        // Disable scrolling on mount for both body and document element
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const tl = gsap.timeline({
            onComplete: () => {
                // Restore scroll when the preloader is fully gone
                document.body.style.overflow = "";
                document.documentElement.style.overflow = "";
                document.body.classList.remove("loading");
                document.documentElement.classList.remove("loading");
                if (containerRef.current) {
                    containerRef.current.style.display = "none";
                }
            }
        });

        // 1. Initial State: SVG shifted down completely, set rotation origin to center
        gsap.set(svgRef.current, {
            yPercent: 150,
            rotation: 0,
            transformOrigin: "50% 50%"
        });

        // Make the SVG opaque now that it has been translated safely out of the mask
        gsap.set(svgRef.current, { opacity: 1 });

        // 2. Slide the SVG up into view (smooth mask reveal)
        tl.to(svgRef.current, {
            yPercent: 0,
            duration: 1.2,
            ease: "power4.out",
        })
            // 3. Smooth, minimalistic loading spin (180-degree rotation)
            .to(svgRef.current, {
                rotation: 180,
                duration: 1.3,
                ease: "power3.inOut"
            })
            // 4. Brief hold after spinning
            .to({}, { duration: 0.2 })
            // 5. Slide up the entire preloader curtain
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.1,
                ease: "power4.inOut",
                onStart: () => {
                    // Set global flag and dispatch event
                    window.__preloaderComplete = true;
                    window.dispatchEvent(new Event("preloaderComplete"));
                }
            })
            // Parallax exit for the SVG logo (sliding up out of the mask)
            .to(svgRef.current, {
                yPercent: -150,
                duration: 0.9,
                ease: "power3.out"
            }, "<");

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 p-0 m-0 bg-foreground flex items-center justify-center z-[100000] pointer-events-auto select-none overflow-hidden"
        >
            <div className="overflow-hidden flex items-center justify-center w-36 h-36 md:w-48 md:h-48">
                <svg
                    ref={svgRef}
                    className="text-white w-24 h-24 md:w-32 md:h-32 origin-center opacity-0"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask id="mask0_1_715" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
                        <path d="M200 0H0V200H200V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_1_715)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M200 50V4.37114e-06L100 0V49.9803C99.9893 22.3751 77.6077 4.37114e-06 50 4.37114e-06H2.18557e-06V100H50C22.3858 100 -1.20706e-06 122.386 0 150L2.18557e-06 200H100V150C100 177.614 122.386 200 150 200H200V100H150.02C177.625 99.9893 200 77.6077 200 50Z" fill="currentColor" />
                    </g>
                </svg>
            </div>
        </div>
    );
}