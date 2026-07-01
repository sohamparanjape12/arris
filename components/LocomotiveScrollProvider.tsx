'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function LocomotiveScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        let locomotiveScroll: any;
        let isInitialized = false;

        // Dynamically import to ensure it only runs on the client-side
        const initLocomotiveScroll = async () => {
            if (isInitialized) return;
            isInitialized = true;

            const LocomotiveScroll = (await import('locomotive-scroll')).default;
            locomotiveScroll = new LocomotiveScroll({
                lenisOptions: {
                    wrapper: window,
                    content: document.documentElement,
                    lerp: 0.1,
                    duration: 1.2,
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                },
            });

            // 1. Update ScrollTrigger on scroll via the underlying Lenis instance
            if (locomotiveScroll.lenis) {
                locomotiveScroll.lenis.on('scroll', () => {
                    ScrollTrigger.update();
                });
            }

            // 2. Let Lenis know when ScrollTrigger refreshes
            ScrollTrigger.addEventListener('refresh', () => {
                if (locomotiveScroll.lenis) {
                    locomotiveScroll.lenis.resize();
                }
            });

            // 3. Initial refresh to align coordinates (wrapped in setTimeout to wait for Next.js DOM to settle)
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);
        };

        const handleStart = () => {
            initLocomotiveScroll();
        };

        if (window.__preloaderComplete) {
            handleStart();
        } else {
            window.addEventListener('preloaderComplete', handleStart);
        }

        // Cleanup phase on component unmount
        return () => {
            window.removeEventListener('preloaderComplete', handleStart);
            if (locomotiveScroll) {
                locomotiveScroll.destroy();
            }
        };
    }, []);

    return <>{children}</>;
}