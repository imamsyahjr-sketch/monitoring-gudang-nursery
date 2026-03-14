import { useState } from "react"
import { motion } from "framer-motion"
import DashboardLayout from "../layout/DashboardLayout"

export default function Masuk() {

  const [noMaterial, setNoMaterial] = useState("")
  const [namaMaterial, setNamaMaterial] = useState("")
  const [stok, setStok] = useState("")

  const [history, setHistory] = useState([])

  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!noMaterial || !namaMaterial || !stok) return

    const now = new Date()

    const newData = {
      id: editId ? editId : Date.now(),
      noMaterial,
      namaMaterial,
      stok,
      tanggal: now.toISOString().split("T")[0],
      waktu: now.toLocaleTimeString()
    }

    if (editId) {

      const updated = history.map((item)=>
        item.id === editId ? newData : item
      )

      setHistory(updated)
      setEditId(null)

    } else {

      setHistory([newData, ...history])

    }

    setNoMaterial("")
    setNamaMaterial("")
    setStok("")
  }


  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus data ini?")
    if (!confirmDelete) return

    const filtered = history.filter((item)=> item.id !== id)
    setHistory(filtered)
  }


  const handleEdit = (item) => {

    setEditId(item.id)
    setNoMaterial(item.noMaterial)
    setNamaMaterial(item.namaMaterial)
    setStok(item.stok)

  }


  const filteredHistory = history.filter((item) => {

    if (!dateFrom && !dateTo) return true

    const tgl = item.tanggal

    if (dateFrom && tgl < dateFrom) return false
    if (dateTo && tgl > dateTo) return false

    return true
  })


  return (

    <DashboardLayout>

      <div className="p-6">

        {/* TITLE */}

        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Input Material Masuk
        </h1>


        {/* FORM INPUT */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          className="bg-white p-6 rounded-xl shadow-md mb-8"
        >

          <div className="grid md:grid-cols-3 gap-4">

            {/* NO MATERIAL */}

            <div>
              <label className="text-sm text-gray-600">
                No. Material
              </label>

              <input
                type="text"
                value={noMaterial}
                onChange={(e)=>setNoMaterial(e.target.value)}
                placeholder="MAT001"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>


            {/* NAMA MATERIAL */}

            <div>
              <label className="text-sm text-gray-600">
                Nama Material
              </label>

              <input
                type="text"
                value={namaMaterial}
                onChange={(e)=>setNamaMaterial(e.target.value)}
                placeholder="Nama Material"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>


            {/* STOK */}

            <div>
              <label className="text-sm text-gray-600">
                Penambahan Stok
              </label>

              <input
                type="number"
                value={stok}
                onChange={(e)=>setStok(e.target.value)}
                placeholder="Jumlah stok"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          >
            {editId ? "Update" : "Simpan"}
          </button>

        </motion.form>



        {/* HISTORY TABLE */}

        <div className="bg-white shadow-md rounded-xl overflow-hidden">

          {/* HEADER + FILTER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b gap-4">

            <h2 className="text-lg font-semibold text-gray-700">
              History Penambahan Stok
            </h2>

            <div className="flex flex-wrap items-end gap-3">

              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Dari
                </label>

                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e)=>setDateFrom(e.target.value)}
                  className="border rounded-lg p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Sampai
                </label>

                <input
                  type="date"
                  value={dateTo}
                  onChange={(e)=>setDateTo(e.target.value)}
                  className="border rounded-lg p-2 text-sm"
                />
              </div>

              <button
                onClick={()=>{
                  setDateFrom("")
                  setDateTo("")
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
              >
                Reset
              </button>

            </div>

          </div>


          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-3 py-2 text-center border-b">
                    No
                  </th>

                  <th className="px-3 py-2 border-b">
                    No.Material
                  </th>

                  <th className="px-3 py-2 border-b">
                    Nama Material
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Stok
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Tanggal
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Waktu
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-gray-100">

                {filteredHistory.length === 0 && (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-4 text-gray-400"
                    >
                      Tidak ada data pada rentang tanggal ini
                    </td>

                  </tr>

                )}


                {filteredHistory.map((item,index)=> (

                  <tr
                    key={item.id}
                    className="group hover:bg-green-50 transition"
                  >

                    <td className="px-3 py-2 text-center">
                      {index+1}
                    </td>

                    <td className="px-3 py-2">
                      {item.noMaterial}
                    </td>

                    <td className="px-3 py-2">
                      {item.namaMaterial}
                    </td>

                    <td className="px-3 py-2 text-center text-green-600 font-semibold">
                      +{item.stok}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {item.tanggal}
                    </td>

                    <td className="px-3 py-2 text-center text-gray-500">
                      {item.waktu}
                    </td>

                    {/* ACTION BUTTON */}

                    <td className="px-3 py-2 text-center">

                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition">

                        <button
                          onClick={()=>handleEdit(item)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={()=>handleDelete(item.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Hapus
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>

  )

}