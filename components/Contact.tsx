"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger);

export default function Contact() {

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        if (!containerRef.current) return;

        const address = containerRef.current.querySelectorAll(".address");
        const mail = containerRef.current.querySelector(".mail");
        const tel = containerRef.current.querySelector(".tel");

        gsap.fromTo(address, {
            opacity: 0,
            yPercent: 20,
        }, {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom top",
            },
            ease: "power4.out",
        });

        gsap.fromTo(mail, {
            opacity: 0,
            yPercent: 20,
        }, {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom top",
            },
            ease: "power4.out",
        });

        gsap.fromTo(tel, {
            opacity: 0,
            yPercent: 20,
        }, {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom top",
            },
            ease: "power4.out",
        });
    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="contact" className="h-[60dvh] flex items-center justify-center relative">
            <div className="flex flex-col gap-2 justify-center items-end text-end lowercase absolute bottom-8 md:bottom-12 right-8 md:right-12">
                <p className="address text-xl font-light max-w-[400px] text-balance"><span className="font-medium">Pune</span> Studio 12 Koregaon Park Road Pune 411001</p>
                <p className="address text-xl font-light max-w-[400px] text-balance"><span className="font-medium">Goa</span> Studio 08 Saligao Road Saligao Goa 403507</p>
                <div className="flex gap-4 mt-2">
                    <a href="mailto:info@arris.com" className="mail text-xl font-medium transition-all">info@arris.com</a>
                    <a href="tel:+911234567890" className="tel text-xl font-medium transition-all">+91-20-12345678</a>
                </div>
            </div>
        </section>
    )
}