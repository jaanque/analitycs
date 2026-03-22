"use client"

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import MenuGlCanvas from './MenuGlCanvas';

import { 
    Home, 
    Activity, 
    Target, 
    MousePointerClick, 
    CircleDollarSign, 
    Users, 
    Map, 
    Laptop, 
    Compass, 
    Settings, 
    Shield 
} from 'lucide-react';

const NavItem = ({ href, children, isActive, icon: Icon }: { href: string; children: React.ReactNode; isActive: boolean; icon?: React.ElementType }) => {
    return (
        <li className="pr-px relative z-20">
            <Link 
                href={href} 
                data-href={href}
                className={`flex items-center gap-3 w-full px-3 py-2.5 text-[13.5px] rounded-l-[10px] transition-colors duration-200 ease-in-out ${
                    isActive 
                        ? 'text-zinc-950 font-semibold' 
                        : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-medium'
                }`}
            >
                {Icon && <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-zinc-800' : 'text-zinc-400'}`} strokeWidth={isActive ? 2.5 : 2} />}
                {children}
            </Link>
        </li>
    );
};

const ActiveIndicator = ({ activePath }: { activePath: string }) => {
    return (
        <div id="active-indicator" className="absolute left-4 right-0 z-10 pointer-events-none opacity-0">
            {/* The main active tab background with ThreeJS Canvas */}
            <div className="absolute inset-0 bg-[#FAFAFA] border-y border-l border-zinc-200 rounded-l-[10px] overflow-hidden">
                <MenuGlCanvas activePath={activePath} />
            </div>

            {/* Top curve container */}
            <div className="absolute -top-[12px] right-0 w-[16px] h-[13px] bg-[#FAFAFA] overflow-hidden">
                <div className="w-full h-full bg-white border-b border-r border-zinc-200 rounded-br-[12px]" />
            </div>

            {/* Bottom curve container */}
            <div className="absolute -bottom-[12px] right-0 w-[16px] h-[13px] bg-[#FAFAFA] overflow-hidden">
                <div className="w-full h-full bg-white border-t border-r border-zinc-200 rounded-tr-[12px]" />
            </div>
        </div>
    );
};

const Sidebar = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
    const containerRef = useRef<HTMLDivElement>(null);

    const isInit = useRef(false);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const activeEl = containerRef.current.querySelector(`[data-href="${pathname}"]`) as HTMLElement;
        const indicatorEl = containerRef.current.querySelector('#active-indicator') as HTMLElement;
        
        if (activeEl && indicatorEl) {
            let top = 0;
            let el = activeEl;
            // Traverse up to find the offset relative to containerRef
            while (el && el !== containerRef.current) {
                top += el.offsetTop;
                el = el.offsetParent as HTMLElement;
            }

            const height = activeEl.offsetHeight;

            if (!isInit.current) {
                gsap.set(indicatorEl, { y: top, height: height, opacity: 1 });
                isInit.current = true;
            } else {
                gsap.to(indicatorEl, {
                    y: top,
                    height: height,
                    opacity: 1,
                    duration: 0.5,
                    ease: "expo.out"
                });
            }
        }
    }, [pathname]);

    const sectionHeaderClass = "px-3 mt-8 mb-2 text-[11px] font-semibold tracking-widest text-zinc-400 uppercase";

    return (
        <aside className="w-64 h-screen sticky top-0 bg-white flex flex-col z-20">
            {/* The vertical border line is placed behind the scrollable content, starting below the header area */}
            <div className="absolute top-16 bottom-0 right-0 w-px bg-zinc-200 z-0 pointer-events-none"></div>
            
            <div className="w-full h-full overflow-y-auto flex flex-col relative z-10" ref={containerRef}>
                <ActiveIndicator activePath={pathname || ""} />
                
                <div className="h-16 flex flex-none px-6 items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-zinc-950 rounded-[6px] shadow-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-[17px] font-bold text-zinc-950 tracking-tight">Analytics+</span>
                    </div>
                </div>
                
                <div className="flex-1 pl-4 py-4">
                    <nav>
                        <section>
                            <h3 className={sectionHeaderClass}>Menú Principal</h3>
                            <ul className="space-y-0.5">
                                <NavItem href="/dashboard" isActive={isActive("/dashboard")} icon={Home}>Inicio</NavItem>
                                <NavItem href="/dashboard/realtime" isActive={isActive("/dashboard/realtime")} icon={Activity}>Tiempo Real</NavItem>
                            </ul>
                        </section>

                        <section>
                            <h3 className={sectionHeaderClass}>Informes</h3>
                            <ul className="space-y-0.5">
                                <NavItem href="/dashboard/acquisition" isActive={isActive("/dashboard/acquisition")} icon={Target}>Adquisición</NavItem>
                                <NavItem href="/dashboard/engagement" isActive={isActive("/dashboard/engagement")} icon={MousePointerClick}>Interacción</NavItem>
                                <NavItem href="/dashboard/monetization" isActive={isActive("/dashboard/monetization")} icon={CircleDollarSign}>Monetización</NavItem>
                                <NavItem href="/dashboard/retention" isActive={isActive("/dashboard/retention")} icon={Users}>Retención</NavItem>
                            </ul>
                        </section>

                        <section>
                            <h3 className={sectionHeaderClass}>Usuario</h3>
                            <ul className="space-y-0.5">
                                <NavItem href="/dashboard/demographics" isActive={isActive("/dashboard/demographics")} icon={Map}>Datos demográficos</NavItem>
                                <NavItem href="/dashboard/technology" isActive={isActive("/dashboard/technology")} icon={Laptop}>Tecnología</NavItem>
                            </ul>
                        </section>
                    </nav>
                </div>

                <div className="pl-4 py-4 border-t border-zinc-200 mt-auto flex-none">
                    <ul className="space-y-0.5">
                        <NavItem href="/dashboard/explore" isActive={isActive("/dashboard/explore")} icon={Compass}>Explorar</NavItem>
                        <NavItem href="/dashboard/configure" isActive={isActive("/dashboard/configure")} icon={Settings}>Configurar</NavItem>
                        <NavItem href="/dashboard/admin" isActive={isActive("/dashboard/admin")} icon={Shield}>Administración</NavItem>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
