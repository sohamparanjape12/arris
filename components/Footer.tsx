"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Footer() {

    useGSAP(() => {
        const footerTitle = document.querySelector(".footer-title");
        gsap.fromTo(footerTitle, {
            autoAlpha: 0,
            yPercent: -20,
        }, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: footerTitle,
                start: "top 80%",
                end: "bottom top",
            },
            ease: "power4.out",
        });

        gsap.utils.toArray(".footer-nav-link").forEach((link: any) => {
            gsap.fromTo(link, {
                autoAlpha: 0,
                yPercent: -20,
            }, {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: link,
                    start: "top 80%",
                    end: "bottom top",
                },
                ease: "power4.out",
            });
        });

        const split = SplitText.create(".footer-text", {
            type: "words, chars",
            mask: "lines"
        })

        gsap.fromTo(split.words,
            { autoAlpha: 0 },
            {
                autoAlpha: 1,
                duration: 0.85,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: ".footer-text",
                    start: "top 80%",
                    end: "bottom top",
                },
                ease: "power4.out",
            });
    });

    return (
        <footer className="min-h-[60dvh] w-full bg-foreground grid grid-cols-5 gap-y-8 px-12 pt-12 pb-12 overflow-hidden">
            <div className="col-span-5 md:col-span-3 row-start-2 md:row-start-1">
                <h1 className="footer-text text-3xl md:text-4xl font-medium text-white tracking-tight max-w-full md:max-w-[65%] lowercase">
                    Let&apos;s create
                    something
                    extraordinary together.
                </h1>
            </div>
            <div className="col-span-2 flex flex-col z-100">
                <a href="#directory" className="footer-nav-link text-lg font-medium text-white tracking-tight">index</a>
                <a href="#contact" className="footer-nav-link text-lg font-medium text-white tracking-tight">contact</a>
            </div>
            <div className="col-span-5 flex justify-end items-end">
                <h1 className="footer-title text-white tracking-tight font-black leading-[0.65] select-none" style={{ fontSize: "clamp(10rem, 20.83vw, 20.83vw)", letterSpacing: "-0.08em" }}>arris</h1>
            </div>
        </footer>
    )
}