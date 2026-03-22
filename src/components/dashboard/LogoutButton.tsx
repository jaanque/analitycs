import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <form>
      <button 
        formAction={logout} 
        title="Cerrar sesión"
        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-lg flex items-center justify-center"
      >
        <LogOut className="w-[18px] h-[18px]" strokeWidth={2.5} />
      </button>
    </form>
  );
}
