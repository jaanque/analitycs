import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <RegisterForm />
    </div>
  )
}
