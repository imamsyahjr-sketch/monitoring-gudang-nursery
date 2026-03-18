import { useState } from "react"
import { motion } from "framer-motion"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import greenhouse from "../assets/images/login-bg.png"

export default function Login() {

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Email dan password wajib diisi")
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Login gagal: " + error.message)
      return
    }

    localStorage.setItem("isLogin", "true")
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          {/* IMAGE (NOW SHOWS ON MOBILE TOO) */}
          <div className="relative h-48 md:h-auto">

            <img
              src={greenhouse}
              alt="greenhouse"
              className="w-full h-full object-cover"
            />

            {/* overlay biar tulisan kebaca */}
            <div className="absolute inset-0 bg-black/30 md:hidden flex items-center justify-center">
              
            </div>

          </div>

          {/* LOGIN FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10"
          >

            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
              Aplikasi Gudang
            </h2>

            <p className="text-gray-500 mb-6">
Nursery Mengkiang            </p>

            {/* EMAIL */}
            <div className="mb-4">

              <label className="text-sm text-gray-600">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />

            </div>

            {/* PASSWORD */}
            <div className="mb-5">

              <label className="text-sm text-gray-600">
                Kata Sandi
              </label>

              <div className="relative mt-1">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none pr-12"
                />

                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5"/>
                  ) : (
                    <EyeIcon className="w-5 h-5"/>
                  )}
                </button>

              </div>

            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Masuk
            </button>

            <p className="text-center text-xs md:text-sm text-gray-500 mt-6">
              PT. FINNANTARA INTIGA
            </p>

          </motion.div>

        </div>

      </div>

    </div>
  )
}