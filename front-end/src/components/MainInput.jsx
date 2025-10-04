import React from 'react'

const Input = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w[90%] max-w-md text-center">
      <h1 className="text-3xl font-semibold mb-6 text-white">Register Here 🚀</h1>

      <form className="flex flex-col gap-4">
        {/* الاسم */}
        <input
          type="text"
          placeholder="Enter your name"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* الإيميل */}
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* الباسورد */}
        <div>
          <input
          type="password"
          placeholder="Enter your password"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
         

        </div>
        {/* زر التسجيل */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-semibold p-3 rounded-lg shadow-md"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Input
