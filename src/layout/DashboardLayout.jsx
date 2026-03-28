import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

export default function DashboardLayout({children}){

  const [openSidebar,setOpenSidebar] = useState(false)

  return(

    <div className="flex min-h-screen">

      <Sidebar open={openSidebar} setOpen={setOpenSidebar}/>

      <div className="flex flex-col flex-1 bg-gray-100">

        <Topbar openSidebar={()=>setOpenSidebar(true)}/>

        {/* CONTENT */}
        <div className="flex-1 p-6">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="text-center text-sm p-3 border-t border-gray-700">
          © 2026 Inventory Gudang Ns.MKG — Created by 
          <span className="text-G-400"> ImamSyah</span>
        </footer>

      </div>

    </div>

  )
}