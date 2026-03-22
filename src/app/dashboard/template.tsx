"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Template({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return;
        
        // Find all immediate children of the inner page content to stagger them
        const pageContent = containerRef.current.firstElementChild;
        const elementsToAnimate = pageContent ? pageContent.children : containerRef.current;

        gsap.fromTo(
            elementsToAnimate,
            { opacity: 0, y: 15 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                stagger: 0.05,
                ease: "expo.out" 
            }
        )
    }, [])

    return (
        <div ref={containerRef} className="w-full h-full p-8 relative z-20">
            {children}
        </div>
    )
}
