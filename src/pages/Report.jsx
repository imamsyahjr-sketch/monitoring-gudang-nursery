import { useState } from "react"
import DashboardLayout from "../layout/DashboardLayout"

export default function Report(){

  const [jenis,setJenis] = useState("masuk")
  const [dateFrom,setDateFrom] = useState("")
  const [dateTo,setDateTo] = useState("")

  const handleDownload = () => {
    alert(`Download ${jenis} dari ${dateFrom} sampai ${dateTo}`)
  }

  return(

    <DashboardLayout>

      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Download Report Gudang
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">

        {/* JENIS DATA */}

        <div className="mb-4">

          <label className="text-sm text-gray-600">
            Jenis Data
          </label>

          <select
            value={jenis}
            onChange={(e)=>setJenis(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
          >
            <option value="masuk">Material Masuk</option>
            <option value="keluar">Material Keluar</option>
          </select>

        </div>


        {/* TANGGAL */}

        <div className="grid md:grid-cols-2 gap-4 mb-4">

          <div>

            <label className="text-sm text-gray-600">
              Dari Tanggal
            </label>

            <input
              type="date"
              value={dateFrom}
              onChange={(e)=>setDateFrom(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            />

          </div>

          <div>

            <label className="text-sm text-gray-600">
              Sampai Tanggal
            </label>

            <input
              type="date"
              value={dateTo}
              onChange={(e)=>setDateTo(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            />

          </div>

        </div>


        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Download
        </button>

      </div>

    </DashboardLayout>

  )

}