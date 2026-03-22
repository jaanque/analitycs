"use client"

import React, { useEffect, useRef } from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import gsap from 'gsap';

export default function PagePlaceholder({ title, description }: { title: string, description: string }) {
    const skeletonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!skeletonRef.current) return;
        
        // Find all skeleton pulse elements and animate them with a beautiful staggering wave
        const pulses = skeletonRef.current.querySelectorAll('.gsap-pulse');
        gsap.to(pulses, {
            opacity: 0.4,
            duration: 1.5,
            stagger: {
                each: 0.1,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            }
        });
    }, []);

    return (
        <div className="w-full h-full flex flex-col" ref={skeletonRef}>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">{title}</h1>
                    <p className="text-sm text-zinc-500 mt-1">{description}</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-[8px] text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        <span>Últimos 30 días</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-[8px] text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors shadow-sm">
                        <Filter className="w-4 h-4 text-zinc-400" />
                        <span>Filtros</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-900 rounded-[8px] text-[13px] font-medium text-white hover:bg-zinc-800 transition-colors shadow-md">
                        <Download className="w-4 h-4 text-zinc-300" />
                        <span>Exportar</span>
                    </button>
                </div>
            </div>

            {/* Content Skeleton Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Metric Cards */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-[12px] p-5 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 mb-4 flex items-center justify-center gsap-pulse opacity-70"></div>
                        <div className="w-24 h-4 bg-zinc-100 rounded-full mb-2 gsap-pulse opacity-70"></div>
                        <div className="w-16 h-8 bg-zinc-100 rounded-md gsap-pulse opacity-70"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[400px]">
                {/* Main Chart Area */}
                <div className="md:col-span-2 bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-[12px] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="w-32 h-5 bg-zinc-100 rounded-full mb-2 gsap-pulse opacity-70"></div>
                            <div className="w-48 h-3 bg-zinc-50 rounded-full gsap-pulse opacity-70"></div>
                        </div>
                        <div className="w-20 h-8 bg-zinc-100 rounded-[6px] gsap-pulse opacity-70"></div>
                    </div>
                    <div className="flex-1 w-full bg-gradient-to-t from-zinc-50 to-transparent rounded-[8px] border border-zinc-100 border-dashed gsap-pulse opacity-50 relative overflow-hidden">
                        {/* Fake chart lines via CSS */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] border-t border-zinc-200 transform -skew-y-3"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[30%] border-t border-zinc-200 transform skew-y-6"></div>
                    </div>
                </div>

                {/* Secondary Sidebar Area */}
                <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-[12px] p-6 shadow-sm flex flex-col">
                    <div className="w-24 h-5 bg-zinc-100 rounded-full mb-6 gsap-pulse opacity-70"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[6px] bg-zinc-50 border border-zinc-100 gsap-pulse opacity-70"></div>
                                    <div className="w-20 h-3 bg-zinc-100 rounded-full gsap-pulse opacity-70"></div>
                                </div>
                                <div className="w-12 h-3 bg-zinc-100 rounded-full gsap-pulse opacity-70"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
