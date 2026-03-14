import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

import {
  Bars3Icon,
  ChevronDownIcon
} from "@heroicons/react/24/outline"

export default function Topbar({ openSidebar }) {

  const navigate = useNavigate()

  const [hoverUser, setHoverUser] = useState(false)

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  })

  const handleLogout = () => {
    navigate("/")
  }

  const handleReport = () => {
    navigate("/report")
  }

  return (

    <div className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between relative">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button onClick={openSidebar} className="md:hidden text-gray-600">
          <Bars3Icon className="w-7 h-7"/>
        </button>

        <div>
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-800">
            Monitoring Gudang
          </h2>

          <p className="text-xs text-gray-500">{today}</p>
        </div>

      </div>


      {/* RIGHT USER */}

      <div
        className="relative"
        onMouseEnter={() => setHoverUser(true)}
        onMouseLeave={() => setHoverUser(false)}
      >

        <div className="flex items-center gap-2 cursor-pointer">

          <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>

          <span className="hidden md:block text-sm font-medium text-gray-700">
            Admin
          </span>

          <ChevronDownIcon className="w-4 h-4 text-gray-500"/>

        </div>


        {/* DROPDOWN */}

        <AnimatePresence>

          {hoverUser && (

            <motion.div
              initial={{ opacity:0, y:-10 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.2 }}
              className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg border text-sm z-50"
            >

              <div className="p-3 border-b">
                <p className="font-semibold">Admin</p>
                <p className="text-gray-500 text-xs">Warehouse</p>
              </div>

              <button
                onClick={handleReport}
                className="w-full text-left p-3 hover:bg-gray-100"
              >
                Report
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left p-3 hover:bg-red-50 text-red-500"
              >
                Logout
              </button>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </div>

  )
}