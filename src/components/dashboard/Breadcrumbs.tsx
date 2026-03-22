"use client"

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const ROUTE_NAMES: Record<string, string> = {
    '/dashboard': 'Inicio',
    '/dashboard/realtime': 'Tiempo Real',
    '/dashboard/acquisition': 'Adquisición',
    '/dashboard/engagement': 'Interacción',
    '/dashboard/monetization': 'Monetización',
    '/dashboard/retention': 'Retención',
    '/dashboard/demographics': 'Datos demográficos',
    '/dashboard/technology': 'Tecnología',
    '/dashboard/explore': 'Explorar',
    '/dashboard/configure': 'Configurar',
    '/dashboard/admin': 'Administración',
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    const currentPath = pathname || '';
    const currentRouteName = ROUTE_NAMES[currentPath] || 'Panel Principal';

    return (
        <div className="flex items-center gap-2 text-[13.5px] font-medium text-zinc-500 relative z-10">
            <span className="hover:text-zinc-800 cursor-pointer transition-colors">Analytics+</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-[6px] shadow-sm border border-zinc-200/60">
                {currentRouteName}
            </span>
        </div>
    );
}
