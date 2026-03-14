import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import {
  HomeIcon,
  CubeIcon,
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon
} from "@heroicons/react/24/outline"

export default function Sidebar() {

  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = useNavigate()

  const menu = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "List Material", icon: ArchiveBoxIcon, path: "/material" },
    { name: "Material Masuk", icon: CubeIcon, path: "/masuk" },
    { name: "Material Keluar", icon: CubeIcon, path: "/keluar" },
    { name: "Logout", icon: ArrowRightOnRectangleIcon, path: "/" }
  ]

  const handleMenuClick = (item) => {

    if(item.name === "Logout"){

      const confirmLogout = confirm("Yakin ingin logout?")

      if(!confirmLogout) return

    }

    navigate(item.path)

    setMobileOpen(false)

  }

  return (

    <>
    
      {/* MOBILE BUTTON */}

      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-lg"
      >
        <Bars3Icon className="w-6 h-6"/>
      </button>


      {/* SIDEBAR */}

      <motion.div

        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}

        animate={{
          width: expanded ? 220 : 70
        }}

        transition={{ duration: 0.2 }}

        className="hidden md:flex flex-col bg-green-700 text-white min-h-screen p-3"

      >

        {/* LOGO */}

        <div className="mb-10 mt-2 text-center font-bold text-lg">

          {expanded ? "Nursery Mengkiang" : "MKG"}

        </div>


        {/* MENU */}

        <nav className="space-y-3">

          {menu.map((item, index) => {

            const Icon = item.icon

            return (

              <div
                key={index}
                onClick={() => handleMenuClick(item)}
                className="flex items-center gap-3 hover:bg-green-600 p-3 rounded-lg cursor-pointer transition"
              >

                <Icon className="w-6 h-6"/>

                {expanded && (
                  <span className="text-sm">
                    {item.name}
                  </span>
                )}

              </div>

            )

          })}

        </nav>

      </motion.div>



      {/* MOBILE SIDEBAR */}

      {mobileOpen && (

        <div className="fixed inset-0 z-40 flex md:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-64 bg-green-700 text-white p-6"
          >

            <h1 className="text-xl font-bold mb-10">
              NS.MKG
            </h1>

            <nav className="space-y-4">

              {menu.map((item, index) => {

                const Icon = item.icon

                return (

                  <div
                    key={index}
                    onClick={() => handleMenuClick(item)}
                    className="flex items-center gap-3 hover:bg-green-600 p-3 rounded-lg cursor-pointer"
                  >

                    <Icon className="w-5 h-5"/>

                    {item.name}

                  </div>

                )

              })}

            </nav>

          </motion.div>

        </div>

      )}

    </>
  )
}