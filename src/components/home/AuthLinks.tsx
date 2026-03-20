import Link from "next/link";

export default function AuthLinks() {
  return (
    <div className="flex gap-4">
      <Link href="/login">
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </Link>
      <Link href="/register">
        <button className="bg-green-500 text-white p-2 rounded">Register</button>
      </Link>
    </div>
  );
}
