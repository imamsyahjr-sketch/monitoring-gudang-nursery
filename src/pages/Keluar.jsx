import { useState } from "react"
import { motion } from "framer-motion"
import DashboardLayout from "../layout/DashboardLayout"

export default function Keluar() {

  const [material, setMaterial] = useState("")
  const [jumlah, setJumlah] = useState("")
  const [supervisor, setSupervisor] = useState("")
  const [keterangan, setKeterangan] = useState("")

  const [history, setHistory] = useState([])
  const [editId, setEditId] = useState(null)

  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const supervisors = [
    "Yopi Purwadi (Admin)",
    "Ahmad Subuh (Spv. Prod)",
    "Fransiskus (Spv.Stoolplant)",
    "Imamsyah (Spv.Infra)",
    "Trimulyo (Spv.Maintenance)"
  ]


  const handleSubmit = (e) => {

    e.preventDefault()

    if(!material || !jumlah || !supervisor) return

    const now = new Date()

    const newData = {

      id: editId ? editId : Date.now(),
      material,
      jumlah,
      supervisor,
      keterangan,
      tanggal: now.toISOString().split("T")[0],
      waktu: now.toLocaleTimeString()

    }

    if(editId){

      const updated = history.map((item)=>
        item.id === editId ? newData : item
      )

      setHistory(updated)
      setEditId(null)

    }else{

      setHistory([newData, ...history])

    }

    setMaterial("")
    setJumlah("")
    setSupervisor("")
    setKeterangan("")
  }


  const handleDelete = (id) => {

    const confirmDelete = confirm("Yakin ingin menghapus data ini?")

    if(!confirmDelete) return

    setHistory(history.filter((item)=> item.id !== id))

  }


  const handleEdit = (item) => {

    setEditId(item.id)

    setMaterial(item.material)
    setJumlah(item.jumlah)
    setSupervisor(item.supervisor)
    setKeterangan(item.keterangan)

  }


  const filteredHistory = history.filter((item)=>{

    if(!dateFrom && !dateTo) return true

    const tgl = item.tanggal

    if(dateFrom && tgl < dateFrom) return false
    if(dateTo && tgl > dateTo) return false

    return true

  })


  return (

    <DashboardLayout>

      <div className="p-6">

        {/* TITLE */}

        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Input Material Keluar
        </h1>


        {/* FORM */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="bg-white p-6 rounded-xl shadow-md mb-8"
        >

          <div className="grid md:grid-cols-4 gap-4">

            {/* MATERIAL */}

            <div>

              <label className="text-sm text-gray-600">
                No.Material / Nama Material
              </label>

              <input
                type="text"
                value={material}
                onChange={(e)=>setMaterial(e.target.value)}
                placeholder="Cari atau ketik material"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />

            </div>


            {/* JUMLAH */}

            <div>

              <label className="text-sm text-gray-600">
                Jumlah Keluar
              </label>

              <input
                type="number"
                value={jumlah}
                onChange={(e)=>setJumlah(e.target.value)}
                placeholder="Jumlah"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />

            </div>


            {/* SUPERVISOR */}

            <div>

              <label className="text-sm text-gray-600">
                Supervisor
              </label>

              <select
                value={supervisor}
                onChange={(e)=>setSupervisor(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              >

                <option value="" > 
                  Pilih Supervisor
                </option>

                {supervisors.map((spv,index)=>(
                  <option key={index} value={spv}>
                    {spv}
                  </option>
                ))}

              </select>

            </div>


            {/* KETERANGAN */}

            <div>

              <label className="text-sm text-gray-600">
                Keterangan
              </label>

              <input
                type="text"
                value={keterangan}
                onChange={(e)=>setKeterangan(e.target.value)}
                placeholder="Contoh: Perbaikan greenhouse"
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



        {/* HISTORY */}

        <div className="bg-white shadow-md rounded-xl overflow-hidden">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b gap-4">

            <h2 className="text-lg font-semibold text-gray-700">
              History Material Keluar
            </h2>


            {/* FILTER */}

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

                  <th className="px-3 py-2 border-b text-center">
                    No
                  </th>

                  <th className="px-3 py-2 border-b">
                    Material
                  </th>

                  <th className="px-3 py-2 border-b text-center">
                    Jumlah
                  </th>

                  <th className="px-3 py-2 border-b">
                    Supervisor
                  </th>

                  <th className="px-3 py-2 border-b">
                    Keterangan
                  </th>

                  <th className="px-3 py-2 border-b text-center">
                    Tanggal
                  </th>

                  <th className="px-3 py-2 border-b text-center">
                    Waktu
                  </th>

                  <th className="px-3 py-2 border-b text-center">
                    Action
                  </th>

                </tr>

              </thead>



              <tbody className="divide-y divide-gray-100">

                {filteredHistory.length === 0 && (

                  <tr>

                    <td colSpan="8" className="text-center py-4 text-gray-400">
                      Tidak ada data
                    </td>

                  </tr>

                )}


                {filteredHistory.map((item,index)=>(

                  <tr
                    key={item.id}
                    className="group hover:bg-green-50 transition"
                  >

                    <td className="px-3 py-2 text-center">
                      {index+1}
                    </td>

                    <td className="px-3 py-2">
                      {item.material}
                    </td>

                    <td className="px-3 py-2 text-center text-red-600 font-semibold">
                      -{item.jumlah}
                    </td>

                    <td className="px-3 py-2">
                      {item.supervisor}
                    </td>

                    <td className="px-3 py-2">
                      {item.keterangan}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {item.tanggal}
                    </td>

                    <td className="px-3 py-2 text-center text-gray-500">
                      {item.waktu}
                    </td>


                    {/* ACTION */}

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