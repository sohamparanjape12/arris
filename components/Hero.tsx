"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function Hero() {

    const SLIDE_WIDTH = 450;
    const SLIDE_HEIGHT = 562.5; // 4/5 aspect ratio
    const SLIDE_GAP = 480; // Configurable slide gap
    const ARC_DEPTH = 20;
    const CENTER_LIFT = 20;
    const SCROLL_LERP = 0.4;

    const slidesData = [
        {
            id: 1,
            title: "Villa Projects",
            src: "https://images.pexels.com/photos/32649835/pexels-photo-32649835.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
            id: 2,
            title: "Interior Designs",
            src: "https://images.pexels.com/photos/29598757/pexels-photo-29598757.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
            id: 3,
            title: "Building Architecture",
            src: "https://images.pexels.com/photos/18414294/pexels-photo-18414294.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
            id: 4,
            title: "Urban Planning",
            src: "https://images.pexels.com/photos/36150852/pexels-photo-36150852.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
            id: 5,
            title: "Landscape Architecture",
            src: "https://images.pexels.com/photos/19605258/pexels-photo-19605258.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
    ];

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(SplitText)

        const tl = gsap.timeline({ paused: true });

        const splitHero = SplitText.create(".hero-title", {
            type: "words, chars",
            mask: "words"
        })

        gsap.set(splitHero.words, { paddingRight: "0.08em" });

        const heroChars = splitHero.chars;
        tl.fromTo(heroChars, {
            yPercent: 100,
        },
            {
                yPercent: 0,
                stagger: 0.15,
                duration: 1.4,
                ease: "power4.out",
            }
        );

        const splitSubtitle = SplitText.create(".hero-subtitle", {
            type: "words, chars",
        })

        gsap.set(splitSubtitle.words, { paddingRight: "0.08em" });

        const subTitleChars = splitSubtitle.chars;

        tl.fromTo(subTitleChars, {
            yPercent: 20,
            autoAlpha: 0,
        },
            {
                yPercent: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                stagger: 0.02,
                duration: 0.8,
                ease: "power4.out",
            },
            "-=0.8"
        );

        tl.fromTo(".hero-nav", {
            opacity: 0,
            yPercent: 100,
        }, {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out"
        }, "-=0.4");

        tl.fromTo(".slide", {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8");


        const sliderContainer = document.querySelector("#slider") as HTMLElement;
        if (!sliderContainer) return;

        const slideElements = gsap.utils.toArray(".slide");
        if (slideElements.length === 0) return;

        let slideWidth = 450;
        let slideHeight = 562.5;
        let slideGap = 480;
        let trackWidth = slidesData.length * slideGap;

        function updateDimensions(w: number) {
            if (w < 640) {
                // Mobile
                slideWidth = w * 0.8;
                slideGap = slideWidth - 104;
            } else if (w < 1024) {
                // Tablet
                slideWidth = 350;
                slideGap = 380;
            } else {
                // Desktop
                slideWidth = 450;
                slideGap = 480;
            }
            slideHeight = slideWidth * 1.25;
            trackWidth = slidesData.length * slideGap;
        }

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let windowCenterX = windowWidth / 2;
        let sliderHeight = sliderContainer.clientHeight || 650;
        let arcBaselineY = sliderHeight * 0.55; // Centered with top padding to prevent touching subtitle

        updateDimensions(windowWidth);

        function computeSlideTransform(slideIndex: number, scrollOffset: number) {
            let wrappedOffsetX = (((slideIndex * slideGap - scrollOffset) % trackWidth) + trackWidth) % trackWidth;
            if (wrappedOffsetX > trackWidth / 2) wrappedOffsetX -= trackWidth;

            const slideCenterX = windowCenterX + wrappedOffsetX;
            const normalizedDist = (slideCenterX - windowCenterX) / windowWidth;
            const absDist = Math.min(Math.abs(normalizedDist), 1.2);

            const scaleFactor = Math.max(1 - absDist * 0.8, 0.25);
            const scaledWidth = slideWidth * scaleFactor;
            const scaledHeight = slideHeight * scaleFactor;

            const clampedDist = Math.min(absDist, 1);
            const arcDropY = (1 - Math.cos(clampedDist * Math.PI)) * 0.5 * ARC_DEPTH;
            const centerLiftY = Math.max(1 - absDist * 2, 0) * CENTER_LIFT;

            return {
                x: slideCenterX - scaledWidth / 2,
                y: arcBaselineY - scaledHeight / 2 + arcDropY - centerLiftY,
                width: scaledWidth,
                height: scaledHeight,
                zIndex: Math.round((1 - absDist) * 100)
            };
        }

        const lastApplied = slideElements.map(() => ({
            x: -9999,
            y: -9999,
            width: -1,
            height: -1,
            zIndex: -1
        }));

        function layoutSlides(scrollOffset: number) {
            slideElements.forEach((slideEl: any, i: number) => {
                const { x, y, width, height, zIndex } = computeSlideTransform(i, scrollOffset);
                const last = lastApplied[i];

                const xChanged = Math.abs(x - last.x) > 0.1;
                const yChanged = Math.abs(y - last.y) > 0.1;
                const wChanged = Math.abs(width - last.width) > 0.1;
                const hChanged = Math.abs(height - last.height) > 0.1;
                const zChanged = zIndex !== last.zIndex;

                if (xChanged || yChanged) {
                    slideEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
                    last.x = x;
                    last.y = y;
                }
                if (wChanged) {
                    slideEl.style.width = `${width.toFixed(1)}px`;
                    last.width = width;
                }
                if (hChanged) {
                    slideEl.style.height = `${height.toFixed(1)}px`;
                    last.height = height;
                }
                if (zChanged) {
                    slideEl.style.zIndex = zIndex.toString();
                    last.zIndex = zIndex;
                }
            });
        }

        layoutSlides(0);

        let scrollTarget = 0;
        let scrollCurrent = 0;
        let animationFrameId: number = 0;
        let isAnimating = false;

        function animate() {
            const scrollDiff = scrollTarget - scrollCurrent;
            if (Math.abs(scrollDiff) > 0.05) {
                scrollCurrent += scrollDiff * SCROLL_LERP;
                layoutSlides(scrollCurrent);
                animationFrameId = requestAnimationFrame(animate);
            } else {
                scrollCurrent = scrollTarget;
                layoutSlides(scrollCurrent);
                isAnimating = false;
            }
        }

        const handleScroll = () => {
            scrollTarget = window.scrollY * 1.2;
            if (!isAnimating) {
                isAnimating = true;
                animate();
            }
        };
        window.addEventListener("scroll", handleScroll);

        const handleResize = () => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
            windowCenterX = windowWidth / 2;
            sliderHeight = sliderContainer.clientHeight || 650;
            arcBaselineY = sliderHeight * 0.55;
            updateDimensions(windowWidth);
            layoutSlides(scrollCurrent);
        };
        window.addEventListener("resize", handleResize);

        // Scroll Docking Setup
        const title = document.querySelector(".hero-title") as HTMLElement;
        const wrapper = document.querySelector(".hero-title-wrapper") as HTMLElement;
        const slot = document.querySelector("#navbar-logo-slot") as HTMLElement;

        const setupDocking = () => {
            if (!title || !wrapper || !slot) return;

            gsap.set(title, { clearProps: "position,top,left,width,margin,zIndex,transformOrigin" });
            wrapper.style.height = "";

            const rect = wrapper.getBoundingClientRect();
            const slotRect = slot.getBoundingClientRect();

            wrapper.style.height = `${rect.height}px`;

            // Calculate scroll-independent absolute coordinates
            const absoluteTop = rect.top + window.scrollY;
            const absoluteLeft = rect.left + window.scrollX;

            gsap.set(title, {
                position: "fixed",
                top: absoluteTop,
                left: absoluteLeft,
                width: rect.width,
                margin: 0,
                zIndex: 50,
                transformOrigin: "left top",
            });

            const targetX = slotRect.left - absoluteLeft;
            const targetY = slotRect.top - absoluteTop;
            const targetScale = slotRect.height / rect.height;

            gsap.fromTo(title,
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                },
                {
                    x: targetX,
                    y: targetY,
                    scale: targetScale,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: "top top",
                        end: windowHeight + "px top",
                        scrub: true,
                        invalidateOnRefresh: true,
                        id: "hero-docking"
                    }
                }
            );
        };

        if (title && wrapper && slot) {
            setupDocking();
        }

        const onRefreshInit = () => {
            gsap.set(title, { clearProps: "transform,position,top,left,width,margin,zIndex,transformOrigin" });
            wrapper.style.height = "";
        };

        const onRefresh = () => {
            setupDocking();
        };

        ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
        ScrollTrigger.addEventListener("refresh", onRefresh);

        const playTimeline = () => {
            tl.play();
        };

        if (window.__preloaderComplete) {
            playTimeline();
        } else {
            window.addEventListener("preloaderComplete", playTimeline);
        }

        return () => {
            window.removeEventListener("preloaderComplete", playTimeline);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            const trigger = ScrollTrigger.getById("hero-docking");
            if (trigger) trigger.kill();
            splitHero.revert();
            splitSubtitle.revert();
        };
    })

    return (
        <section className="flex flex-col flex-1 bg-background font-sans relative min-h-[100dvh]">
            <div className="text-start w-full px-4 space-y-2 mt-12 sm:mt-0">
                <div className="hero-title-wrapper select-none">
                    <h1
                        className="hero-title font-black tracking-[-0.08em] leading-[0.8] z-[10000]"
                        style={{ fontSize: "clamp(10rem, 20.83vw, 20.83vw)" }}
                    >
                        arris
                    </h1>
                </div>
                <h3
                    className="hero-subtitle font-medium tracking-[-0.08em] leading-[1] text-[8.2vw] md:text-[5.208vw]"
                >
                    selected architecture archives 2026
                </h3>
            </div>

            <section id="slider" className="w-full relative h-[550px] md:h-[550px] lg:h-[650px] overflow-x-hidden">
                {slidesData.map((slide) => (
                    <div
                        key={slide.id}
                        className="slide absolute top-0 left-0 overflow-hidden"
                        style={{
                            width: `${SLIDE_WIDTH}px`,
                            height: `${SLIDE_HEIGHT}px`,
                            willChange: "transform, opacity",
                            opacity: 0, // Prevent Flash of Unstyled Content (FOUC) before GSAP runs
                        }}
                    >
                        <img
                            src={slide.src}
                            alt={slide.title}
                            className="w-full h-full object-cover pointer-events-none select-none"
                            decoding="async"
                            loading="eager"
                        />
                    </div>
                ))}
            </section>
        </section>
    );
}
