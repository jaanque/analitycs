import LoginForm from "@/components/auth/LoginForm";

export default function LoginView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <LoginForm />
    </div>
  )
}
