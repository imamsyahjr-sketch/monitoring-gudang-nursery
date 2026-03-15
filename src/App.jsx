import { HashRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Listmaterial from "./pages/Listmaterial"
import Masuk from "./pages/Masuk"
import Keluar from "./pages/Keluar"
import Report from "./pages/Report"

function App() {

  return (

    <HashRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/material" element={<Listmaterial />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/keluar" element={<Keluar />} />
        <Route path="/report" element={<Report />} />
      </Routes>

    </HashRouter>

  )

}

export default App