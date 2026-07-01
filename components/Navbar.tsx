"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    useGSAP(() => {
        const container = document.querySelector(".hero-nav-links-container");
        if (!container) return;

        // Animate out main nav links on scroll
        gsap.fromTo(container, {
            yPercent: 0,
            autoAlpha: 1,
        }, {
            yPercent: -100,
            autoAlpha: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "180px top",
                scrub: true,
            }
        });

        // Animate in the menu trigger (lines) on scroll
        gsap.fromTo(".nav-trigger", {
            autoAlpha: 0,
            display: "none",
        }, {
            autoAlpha: 1,
            display: "flex",
            ease: "power3.out",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "280px top",
                end: "480px top",
                scrub: true,
                onLeaveBack: () => {
                    setIsNavOpen(false);
                }
            }
        });

        // Set initial state of liquid overlay background and links
        const path = document.querySelector(".menu-path");
        const content = document.querySelector(".menu-content");
        if (path) {
            gsap.set(path, {
                attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" }
            });
        }
        if (content) {
            gsap.set(content, {
                autoAlpha: 0
            });
        }
    }, []);

    useGSAP(() => {
        const path = document.querySelector(".menu-path");
        const content = document.querySelector(".menu-content");
        const links = document.querySelectorAll(".menu-link");

        if (!path || !content) return;

        if (isNavOpen) {
            // Animate SVG lines into a Cross (X)
            gsap.to(".line-1", {
                attr: { x1: 12, y1: 6, x2: 32, y2: 18 },
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });
            gsap.to(".line-2", {
                attr: { x1: 12, y1: 18, x2: 32, y2: 6 },
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });

            // Liquid Dropdown Animation (stretch then flatten)
            const tl = gsap.timeline();
            tl.to(path, {
                attr: { d: "M 0 0 L 100 0 L 100 65 Q 50 100 0 65 Z" },
                duration: 0.45,
                ease: "power3.in",
            })
                .to(path, {
                    attr: { d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z" },
                    duration: 0.4,
                    ease: "power2.out",
                });

            // Fade in text content with stagger
            gsap.to(content, {
                autoAlpha: 1,
                duration: 0.3,
                overwrite: "auto"
            });

            const split = SplitText.create(links, {
                type: "words, chars",
                mask: "words"
            });

            gsap.set(split.words, { paddingRight: "0.04em" })

            gsap.fromTo(split.chars, {
                yPercent: 100,
                autoAlpha: 0
            }, {
                yPercent: 0,
                autoAlpha: 1,
                stagger: 0.035,
                duration: 0.65,
                ease: "power4.out",
                delay: 0.45,
                overwrite: "auto"
            });

        } else {
            // Animate SVG lines back to Hamburger
            gsap.to(".line-1", {
                attr: { x1: 8, y1: 8, x2: 36, y2: 8 },
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });
            gsap.to(".line-2", {
                attr: { x1: 16, y1: 16, x2: 36, y2: 16 },
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });

            // Fade out links content
            gsap.to(content, {
                autoAlpha: 0,
                duration: 0.25,
                overwrite: "auto"
            });

            // Liquid Roll-up Animation (stretch up then hide)
            const tl = gsap.timeline();
            tl.to(path, {
                attr: { d: "M 0 0 L 100 0 L 100 35 Q 50 0 0 35 Z" },
                duration: 0.35,
                ease: "power3.in",
            })
                .to(path, {
                    attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
                    duration: 0.3,
                    ease: "power2.out",
                });
        }
    }, [isNavOpen]);

    return (<>
        <nav className="fixed top-0 left-0 z-[10000] w-full px-6 py-6 flex items-center justify-between pointer-events-none">
            {/* The slot where the title will sit */}
            <div id="navbar-logo-slot" className="w-24 h-8 flex items-center justify-start z-100">
                {/* Empty container establishing coordinates for the docked title */}
            </div>

            <div className="flex gap-6 items-center relative">
                {/* Nav links */}
                <div className="hero-nav-links-container flex gap-6 pointer-events-auto text-sm font-semibold tracking-wider">
                    <a href="#directory" className="hero-nav text-foreground/80 hover:text-foreground transition-colors">index</a>
                    <a href="#contact" className="hero-nav text-foreground/80 hover:text-foreground transition-colors">contact</a>
                </div>

                <div onClick={handleNav} className="nav-trigger z-100 hidden pointer-events-auto" style={{ cursor: "pointer" }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 44 24"
                        width={44}
                        height={24}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                    >
                        <line className="line-1" x1="8" y1="8" x2="36" y2="8" />
                        <line className="line-2" x1="16" y1="16" x2="36" y2="16" />
                    </svg>
                </div>
            </div>
        </nav>

        {/* Liquid Menu Overlay */}
        <div className={`nav-overlay-wrapper fixed inset-0 z-50 flex items-center justify-center ${isNavOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Animated SVG background curtain */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    className="menu-path"
                    style={{ fill: "var(--background)" }}
                    d="M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
                />
            </svg>

            {/* Content overlay */}
            <div className="menu-content relative z-10 opacity-0 flex flex-col items-center justify-center space-y-6 font-sans">
                <a href="#directory" onClick={() => setIsNavOpen(false)} className="menu-link text-5xl font-semibold tracking-[-0.06em] text-foreground hover:text-foreground/60 transition-colors duration-300 leading-[0.8]">
                    index
                </a>
                <a href="#contact" onClick={() => setIsNavOpen(false)} className="menu-link text-5xl font-semibold tracking-[-0.06em] text-foreground hover:text-foreground/60 transition-colors duration-300 leading-[0.8]">
                    contact
                </a>
            </div>
        </div>
    </>
    );
}