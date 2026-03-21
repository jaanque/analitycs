import Sidebar from "@/components/dashboard/Sidebar";
import LogoutButton from "@/components/dashboard/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#FAFAFA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen relative">
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 shrink-0 relative z-10">
            <h2 className="text-sm font-medium text-zinc-500 relative z-10">Workspace / Panel Principal</h2>
            <div className="flex items-center gap-6">
                <div className="text-sm text-zinc-400 relative z-10">Jan Analytics Admin</div>
                <LogoutButton />
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
