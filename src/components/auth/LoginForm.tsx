import { login } from '@/actions/auth'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <form className="flex flex-col gap-4">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required className="border p-2 rounded" />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required className="border p-2 rounded" />
        <button formAction={login} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Log in
        </button>
      </form>
      <div className="flex flex-col gap-2 text-sm text-center">
        <Link href="/register" className="text-blue-500 hover:underline">
          No tengo cuenta, crear una
        </Link>
        <Link href="/" className="text-gray-500 hover:underline border-t pt-2">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
