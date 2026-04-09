'use client';

const AuthPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 w-full">

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-md p-8">

        <h1 className="text-center text-2xl font-bold mb-6">
          Authentication Page
        </h1>

        <h3 className="text-center mb-6">
          Enter your name and password
        </h3>

        <form action="/auth" method="POST" className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
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
  );
};

export default AuthPage;