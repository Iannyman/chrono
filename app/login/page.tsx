'use client'
import { useRouter } from 'next/navigation'


export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const username = formData.get('username')
  const password = formData.get('password')

  try {
    const response = await fetch('http://172.23.5.77:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })

    const data = await response.text()
    console.log('Server response:', data)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    router.push('/employee/page.tsx')
  } catch (error) {
    console.error('Login error:', error)
  }
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 w-full">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-center text-2xl font-bold mb-6 text-white">
          Login Page
        </h1>

        <h3 className="text-center mb-6 text-gray-300">
          Enter your username and password
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-[#4682B4] text-white rounded-md py-2 hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}