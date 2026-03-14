import { useState } from "react";
import Select from "react-select";
import DashboardLayout from "../layout/DashboardLayout";

export default function Listmaterial() {

  const initialData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    noMaterial: `MAT${String(i + 1).padStart(3, "0")}`,
    namaMaterial: `Material ${i + 1}`,
    stok: (i + 1) * 5,
    stokMin: 20
  }));

  const [materials, setMaterials] = useState(initialData);

  const [search, setSearch] = useState("");

  const [editData, setEditData] = useState(null);
  const [stokEdit, setStokEdit] = useState("");
  const [stokMinEdit, setStokMinEdit] = useState("");


  const filteredMaterials = materials.filter(
    (item) =>
      item.noMaterial.toLowerCase().includes(search.toLowerCase()) ||
      item.namaMaterial.toLowerCase().includes(search.toLowerCase())
  );


  const options = materials.map((item) => ({
    value: item.noMaterial,
    label: `${item.noMaterial} - ${item.namaMaterial}`,
  }));


  const handleEdit = (item) => {

    setEditData(item);

    setStokEdit(item.stok);

    setStokMinEdit(item.stokMin);

  };


  const handleSave = () => {

    const updated = materials.map((item) =>

      item.id === editData.id
        ? { ...item, stok: Number(stokEdit), stokMin: Number(stokMinEdit) }
        : item
    );

    setMaterials(updated);

    setEditData(null);

  };


  return (

    <DashboardLayout>

      <div className="p-6">


        {/* HEADER */}

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-semibold text-gray-800">
            List Stok Material Nursery Mengkiang
          </h2>

          <div className="w-72">

            <Select
              options={options}
              placeholder="Cari material..."
              onChange={(selected) =>
                setSearch(selected ? selected.label : "")
              }
              isClearable
              className="text-sm"
            />

          </div>

        </div>


        {/* EDIT FORM */}

        {editData && (

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">

            <h3 className="font-semibold text-gray-700 mb-3">
              Edit Material {editData.noMaterial}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <label className="text-sm text-gray-600">
                  Stok
                </label>

                <input
                  type="number"
                  value={stokEdit}
                  onChange={(e)=>setStokEdit(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                />

              </div>

              <div>

                <label className="text-sm text-gray-600">
                  Stok Minimum
                </label>

                <input
                  type="number"
                  value={stokMinEdit}
                  onChange={(e)=>setStokMinEdit(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                />

              </div>

            </div>


            <div className="mt-4 flex gap-3">

              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Simpan
              </button>

              <button
                onClick={()=>setEditData(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Batal
              </button>

            </div>

          </div>

        )}


        {/* TABLE */}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-3 py-2 text-center border-b">No</th>

                  <th className="px-3 py-2 text-center border-b">
                    No.Material
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Nama Material
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Stok
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Stok Minimum
                  </th>

                  <th className="px-3 py-2 text-center border-b">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-gray-100">

                {filteredMaterials.map((item, index) => (

                  <tr
                    key={item.id}
                    className={`group hover:bg-blue-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >

                    <td className="px-3 py-2 text-center">
                      {index + 1}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {item.noMaterial}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {item.namaMaterial}
                    </td>

                    <td
                      className={`px-3 py-2 text-center font-semibold ${
                        item.stok <= item.stokMin
                          ? "text-red-500"
                          : "text-gray-700"
                      }`}
                    >
                      {item.stok}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {item.stokMin}
                    </td>


                    <td className="px-3 py-2 text-center">

                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:underline text-sm md:opacity-0 md:group-hover:opacity-100 transition"
                      >
                        Edit
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}