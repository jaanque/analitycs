import { signup } from '@/actions/auth'
import Link from 'next/link'

export default function RegisterForm() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <form className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required className="border p-2 rounded" />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required className="border p-2 rounded" />
        <button formAction={signup} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Sign up
        </button>
      </form>
      <div className="flex flex-col gap-2 text-sm text-center">
        <Link href="/login" className="text-green-500 hover:underline">
          Ya tengo cuenta, iniciar sesión
        </Link>
        <Link href="/" className="text-gray-500 hover:underline border-t pt-2">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
