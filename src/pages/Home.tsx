import AuthLinks from "@/components/home/AuthLinks";

export default function HomeView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <AuthLinks />
    </div>
  );
}
