export default function ErrorView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p>Please try again later.</p>
      <a href="/login" className="text-blue-500 underline mt-4">Back to Login</a>
    </div>
  )
}
