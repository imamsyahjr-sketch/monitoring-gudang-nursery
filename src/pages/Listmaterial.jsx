import { useState, useEffect } from "react";
import Select from "react-select";
import DashboardLayout from "../layout/DashboardLayout";
import { supabase } from "../supabaseClient";

export default function Listmaterial() {

  const [materials, setMaterials] = useState([]);

  const [search, setSearch] = useState("");

  const [editData, setEditData] = useState(null);
  const [stokEdit, setStokEdit] = useState("");
  const [stokMinEdit, setStokMinEdit] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data, error } = await supabase
      .from("materials")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setMaterials(data);
  };

  const filteredMaterials = materials.filter(
    (item) =>
      item.no_material.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_material.toLowerCase().includes(search.toLowerCase())
  );

  const options = materials.map((item) => ({
    value: item.no_material,
    label: `${item.no_material} - ${item.nama_material}`,
  }));

  const handleEdit = (item) => {
    setEditData(item);
    setStokEdit(item.stok);
    setStokMinEdit(item.stok_min);
  };

  const handleSave = async () => {
    await supabase
      .from("materials")
      .update({
        stok: Number(stokEdit),
        stok_min: Number(stokMinEdit),
      })
      .eq("id", editData.id);

    fetchMaterials();
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus?")) return;

    await supabase.from("materials").delete().eq("id", id);

    fetchMaterials();
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
              Edit Material {editData.no_material}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Stok</label>
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
                      {item.no_material}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {item.nama_material}
                    </td>

                    <td
                      className={`px-3 py-2 text-center font-semibold ${
                        item.stok <= item.stok_min
                          ? "text-red-500"
                          : "text-gray-700"
                      }`}
                    >
                      {item.stok}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {item.stok_min}
                    </td>

                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:underline text-sm md:opacity-0 md:group-hover:opacity-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline text-sm ml-2 md:opacity-0 md:group-hover:opacity-100 transition"
                      >
                        Hapus
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