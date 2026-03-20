import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <form>
      <button formAction={logout} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors">
        Cerrar sesión
      </button>
    </form>
  );
}
