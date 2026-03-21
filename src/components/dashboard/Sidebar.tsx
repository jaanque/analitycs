"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => {
    if (isActive) {
        return (
            <li className="relative">
                {/* The main active tab */}
                <Link 
                    href={href} 
                    className="relative flex items-center px-3 py-2 text-sm text-zinc-950 font-medium bg-[#FAFAFA] border-y border-l border-zinc-200 rounded-l-[10px] z-10 w-full"
                >
                    {children}
                </Link>

                {/* Top curve container */}
                <div className="absolute -top-[12px] right-0 w-[16px] h-[13px] bg-[#FAFAFA] z-20 pointer-events-none overflow-hidden">
                    <div className="w-full h-full bg-white border-b border-r border-zinc-200 rounded-br-[12px]" />
                </div>

                {/* Bottom curve container */}
                <div className="absolute -bottom-[12px] right-0 w-[16px] h-[13px] bg-[#FAFAFA] z-20 pointer-events-none overflow-hidden">
                    <div className="w-full h-full bg-white border-t border-r border-zinc-200 rounded-tr-[12px]" />
                </div>
            </li>
        );
    }

    return (
        <li className="pr-px">
            <Link 
                href={href} 
                className="flex items-center w-full px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 border-y border-l border-transparent rounded-l-[10px] transition-all duration-200 ease-in-out"
            >
                {children}
            </Link>
        </li>
    );
};

const Sidebar = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    const sectionHeaderClass = "px-3 mt-8 mb-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase";

    return (
        <aside className="w-64 h-screen sticky top-0 bg-white flex flex-col z-20">
            {/* The vertical border line is placed behind the scrollable content, starting below the header area */}
            <div className="absolute top-16 bottom-0 right-0 w-px bg-zinc-200 z-0 pointer-events-none"></div>
            
            <div className="w-full h-full overflow-y-auto flex flex-col relative z-10">
                <div className="h-16 flex flex-none px-6 items-center">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 bg-zinc-950 rounded-[4px] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-[17px] font-semibold text-zinc-950 tracking-tight">Analytics+</span>
                    </div>
                </div>
                
                <div className="flex-1 pl-4 py-6">
                    <nav>
                        <section>
                            <h3 className={sectionHeaderClass}>Menú Principal</h3>
                            <ul className="space-y-1">
                                <NavItem href="/dashboard" isActive={isActive("/dashboard")}>Inicio</NavItem>
                                <NavItem href="/dashboard/realtime" isActive={isActive("/dashboard/realtime")}>Tiempo Real</NavItem>
                            </ul>
                        </section>

                        <section>
                            <h3 className={sectionHeaderClass}>Informes</h3>
                            <ul className="space-y-1">
                                <NavItem href="/dashboard/acquisition" isActive={isActive("/dashboard/acquisition")}>Adquisición</NavItem>
                                <NavItem href="/dashboard/engagement" isActive={isActive("/dashboard/engagement")}>Interacción</NavItem>
                                <NavItem href="/dashboard/monetization" isActive={isActive("/dashboard/monetization")}>Monetización</NavItem>
                                <NavItem href="/dashboard/retention" isActive={isActive("/dashboard/retention")}>Retención</NavItem>
                            </ul>
                        </section>

                        <section>
                            <h3 className={sectionHeaderClass}>Usuario</h3>
                            <ul className="space-y-1">
                                <NavItem href="/dashboard/demographics" isActive={isActive("/dashboard/demographics")}>Datos demográficos</NavItem>
                                <NavItem href="/dashboard/technology" isActive={isActive("/dashboard/technology")}>Tecnología</NavItem>
                            </ul>
                        </section>
                    </nav>
                </div>

                <div className="pl-4 py-4 border-t border-zinc-200 mt-auto flex-none">
                    <ul className="space-y-1">
                        <NavItem href="/dashboard/explore" isActive={isActive("/dashboard/explore")}>Explorar</NavItem>
                        <NavItem href="/dashboard/configure" isActive={isActive("/dashboard/configure")}>Configurar</NavItem>
                        <NavItem href="/dashboard/admin" isActive={isActive("/dashboard/admin")}>Administración</NavItem>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
