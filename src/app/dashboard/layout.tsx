import Sidebar from "@/components/dashboard/Sidebar";
import LogoutButton from "@/components/dashboard/LogoutButton";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import AmbientGlCanvas from "@/components/dashboard/AmbientGlCanvas";
import { Search, Bell } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#FAFAFA] overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen relative z-10">
        <AmbientGlCanvas />
        <header className="h-16 border-b border-zinc-200 bg-white/70 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-20">
            <Breadcrumbs />
            
            <div className="flex items-center gap-5 relative z-10">
                <div className="flex items-center gap-2 text-zinc-400 border-r border-zinc-200 pr-5">
                    <div className="p-2 hover:bg-zinc-100/80 rounded-[8px] cursor-pointer transition-all hover:text-zinc-600">
                        <Search className="w-[18px] h-[18px]" strokeWidth={2} />
                    </div>
                    <div className="p-2 hover:bg-zinc-100/80 rounded-[8px] cursor-pointer transition-all hover:text-zinc-600">
                        <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-zinc-800 to-zinc-950 flex items-center justify-center text-white text-[11px] tracking-wider font-bold shadow-md group-hover:shadow transition-all ring-1 ring-zinc-950/5">
                            JA
                        </div>
                        <span className="text-[13.5px] font-semibold text-zinc-700 hidden md:block group-hover:text-zinc-950 transition-colors">Jan Admin</span>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </header>

        {/* The inverted corner curve connecting the header and sidebar */}
        <div className="absolute top-[63px] -left-px w-[20px] h-[20px] bg-white z-20 pointer-events-none hidden md:block">
            <div className="w-full h-full bg-[#FAFAFA] border-t border-l border-zinc-200 rounded-tl-[16px]"></div>
        </div>
        
        <main className="flex-1 overflow-y-auto relative z-0">
          <div className="p-8 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
