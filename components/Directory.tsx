"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export interface Project {
    id: string;
    year: string;
    title: string;
    location: string;
    image: string;
    category: string;
}

export const projectArchive: Project[] = [
    {
        id: "01",
        year: "2026",
        title: "monolith house",
        location: "pune, india",
        image: "https://images.pexels.com/photos/13041129/pexels-photo-13041129.jpeg?auto=compress&cs=tinysrgb&w=500",
        category: "residential"
    },
    {
        id: "02",
        year: "2026",
        title: "concrete pavilion",
        location: "alibaug, india",
        image: "https://images.pexels.com/photos/9890939/pexels-photo-9890939.jpeg?auto=compress&cs=tinysrgb&w=500",
        category: "spatial installation"
    },
    {
        id: "03",
        year: "2025",
        title: "basalt residence",
        location: "lonavala, india",
        image: "https://images.pexels.com/photos/4744622/pexels-photo-4744622.jpeg?auto=compress&cs=tinysrgb&w=500",
        category: "residential"
    },
    {
        id: "04",
        year: "2025",
        title: "void studio",
        location: "goa, india",
        image: "https://images.pexels.com/photos/10267183/pexels-photo-10267183.jpeg?auto=compress&cs=tinysrgb&w=500",
        category: "commercial workspace"
    },
    {
        id: "05",
        year: "2024",
        title: "interlocking mass",
        location: "mumbai, india",
        image: "https://images.pexels.com/photos/30892304/pexels-photo-30892304.jpeg?auto=compress&cs=tinysrgb&w=500",
        category: "cultural center"
    }
];

export default function Directory() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const xTo = useRef<((value: number) => void) | null>(null);
    const yTo = useRef<((value: number) => void) | null>(null);

    const followerRef = useRef<HTMLDivElement | null>(null);

    // 1. Tracks mouse inside container bounds
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!followerRef.current) return;

        if (!xTo.current || !yTo.current) {
            gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });
            xTo.current = gsap.quickTo(followerRef.current, "x", { duration: 0.4, ease: "power3.out" });
            yTo.current = gsap.quickTo(followerRef.current, "y", { duration: 0.4, ease: "power3.out" });
        }

        xTo.current?.(e.clientX);
        yTo.current?.(e.clientY);
    };

    // 2. Pure React-driven mouse triggers (Clean and dynamic)
    const handleMouseEnter = (projectId: string) => {
        if (!followerRef.current) return;

        const activeImg = followerRef.current.querySelector(`[data-img-id="${projectId}"]`);
        const otherImgs = followerRef.current.querySelectorAll(`.project-preview-img:not([data-img-id="${projectId}"])`);

        if (activeImg) {
            gsap.to(activeImg, {
                opacity: 1,
                duration: 0.2,
                overwrite: "auto"
            });
        }
        if (otherImgs.length > 0) {
            gsap.to(otherImgs, {
                opacity: 0,
                duration: 0.2,
                overwrite: "auto"
            });
        }

        gsap.to(followerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.inOut",
            overwrite: "auto"
        });
    };

    const handleMouseLeave = () => {
        if (!followerRef.current) return;
        gsap.to(followerRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "back.out",
            overwrite: "auto"
        });
    };

    useGSAP(() => {
        gsap.fromTo(".project-row", {
            yPercent: 20,
            autoAlpha: 0,
        }, {
            scrollTrigger: {
                trigger: ".project-row",
                start: "top 60%",
                end: "bottom 40%",
                scrub: 1,
            },
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out",
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="directory"
            onMouseMove={handleMouseMove}
            className="relative h-[100dvh] w-full flex items-center justify-center font-sans flex-col md:px-12 overflow-hidden select-none"
        >
            {
                projectArchive.map((p, idx) => (
                    <div
                        key={p.id}
                        onMouseEnter={() => handleMouseEnter(p.id)}
                        onMouseLeave={handleMouseLeave}
                        className="project-row flex gap-4 w-full justify-between p-4 py-8 text-foreground/60 hover:text-foreground transition-colors duration-300 cursor-pointer z-10"
                    >
                        <div className="flex-1 flex justify-center items-center">
                            <h1 className="text-xs tracking-[0.08em]">{p.year}</h1>
                        </div>
                        <div className="flex-[8] md:flex-[5] flex justify-center items-center">
                            <h1 className="text-md tracking-wide font-semibold">{p.title}</h1>
                        </div>
                        <div className="flex-2 flex justify-center items-center text-end md:text-center">
                            <h1 className="text-xs md:text-md tracking-[0.08em]">{p.location}</h1>
                        </div>
                    </div>
                ))
            }

            <div
                ref={followerRef}
                className="pointer-events-none fixed top-0 left-0 opacity-0 scale-75 z-50 transition-shadow duration-300 sepia-[20%] saturation-[78%] overflow-hidden"
                style={{ willChange: "transform, opacity" }}
            >
                <div className="relative w-75 aspect-[4/5] overflow-hidden">
                    {projectArchive.map((p) => (
                        <img
                            key={p.id}
                            data-img-id={p.id}
                            src={p.image}
                            alt={p.title}
                            decoding="async"
                            loading="eager"
                            className="project-preview-img absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none select-none"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
