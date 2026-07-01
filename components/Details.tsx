"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react"
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Details() {

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const columns = gsap.utils.toArray<HTMLDivElement>(".details-column");

        // Custom progress thresholds (from 0.0 to 1.0) for each column's transitions
        const thresholds = [
            { img2: 0.25, img3: 0.65, img2Fired: false, img3Fired: false }, // Column 1 (Left) - starts second
            { img2: 0.35, img3: 0.75, img2Fired: false, img3Fired: false }, // Column 2 (Middle) - starts last
            { img2: 0.15, img3: 0.55, img2Fired: false, img3Fired: false }  // Column 3 (Right) - starts first
        ];

        // Initialize first image as fully visible, secondary images as fully clipped
        columns.forEach((col) => {
            const cimages = col.querySelectorAll(".details-image");
            if (cimages.length > 0) {
                gsap.set(cimages[0], { clipPath: "inset(0% 0% 0% 0%)" });
            }
            if (cimages.length > 1) {
                gsap.set(Array.from(cimages).slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
            }
        });

        // 1. Master ScrollTrigger that pins the section and drives the transition callbacks
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=1800px", // Pin duration
            pin: true,
            onUpdate: (self) => {
                const progress = self.progress;

                columns.forEach((col, idx) => {
                    const cimages = col.querySelectorAll(".details-image");
                    const state = thresholds[idx] || thresholds[0];

                    // Transition trigger for Image 2
                    if (cimages[1]) {
                        if (progress >= state.img2 && !state.img2Fired) {
                            state.img2Fired = true;
                            gsap.to(cimages[1], {
                                clipPath: "inset(0% 0% 0% 0%)",
                                duration: 0.8,
                                ease: "power3.out",
                                overwrite: "auto"
                            });
                        } else if (progress < state.img2 && state.img2Fired) {
                            state.img2Fired = false;
                            gsap.to(cimages[1], {
                                clipPath: "inset(100% 0% 0% 0%)",
                                duration: 0.8,
                                ease: "power3.out",
                                overwrite: "auto"
                            });
                        }
                    }

                    // Transition trigger for Image 3
                    if (cimages[2]) {
                        if (progress >= state.img3 && !state.img3Fired) {
                            state.img3Fired = true;
                            gsap.to(cimages[2], {
                                clipPath: "inset(0% 0% 0% 0%)",
                                duration: 0.8,
                                ease: "power3.out",
                                overwrite: "auto"
                            });
                        } else if (progress < state.img3 && state.img3Fired) {
                            state.img3Fired = false;
                            gsap.to(cimages[2], {
                                clipPath: "inset(100% 0% 0% 0%)",
                                duration: 0.8,
                                ease: "power3.out",
                                overwrite: "auto"
                            });
                        }
                    }
                });
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="h-[110dvh] bg-background grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12 px-0 md:px-8 lg:px-12 py-24">
            {/* Column 1 */}
            <div className="details-column col-span-1 overflow-hidden relative w-full h-full">
                <img
                    src="https://images.pexels.com/photos/18851411/pexels-photo-18851411.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 1-1"
                />
                <img
                    src="https://images.pexels.com/photos/29457855/pexels-photo-29457855.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 1-2"
                />
                <img
                    src="https://images.pexels.com/photos/220885/pexels-photo-220885.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 1-3"
                />
            </div>

            {/* Column 2 */}
            <div className="details-column col-span-1 overflow-hidden relative w-full h-full">
                <img
                    src="https://images.pexels.com/photos/33389163/pexels-photo-33389163.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 2-1"
                />
                <img
                    src="https://images.pexels.com/photos/280475/pexels-photo-280475.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 2-2"
                />
                <img
                    src="https://images.pexels.com/photos/29598757/pexels-photo-29598757.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 2-3"
                />
            </div>

            {/* Column 3 */}
            <div className="details-column col-span-1 overflow-hidden relative w-full h-full">
                <img
                    src="https://images.pexels.com/photos/33016827/pexels-photo-33016827.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 3-1"
                />
                <img
                    src="https://images.pexels.com/photos/13292645/pexels-photo-13292645.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 3-2"
                />
                <img
                    src="https://images.pexels.com/photos/36150852/pexels-photo-36150852.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    className="details-image absolute inset-0 w-full h-full object-cover"
                    alt="Details 3-3"
                />
            </div>
        </section>
    );
}