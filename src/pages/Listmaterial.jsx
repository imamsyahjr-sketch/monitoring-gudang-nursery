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

    if (error) {
      console.error(error);
    } else {
      setMaterials(data);
    }
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
    const { error } = await supabase
      .from("materials")
      .update({
        stok: Number(stokEdit),
        stok_min: Number(stokMinEdit),
      })
      .eq("id", editData.id);

    if (error) {
      console.error(error);
    } else {
      fetchMaterials();
      setEditData(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin hapus?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("materials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      fetchMaterials();
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            List Stok Material
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
          <div className="bg-yellow-50 border p-4 rounded mb-4">
            <h3 className="mb-2 font-semibold">
              Edit {editData.no_material}
            </h3>

            <input
              type="number"
              value={stokEdit}
              onChange={(e) => setStokEdit(e.target.value)}
              className="border p-2 mr-2"
              placeholder="Stok"
            />

            <input
              type="number"
              value={stokMinEdit}
              onChange={(e) => setStokMinEdit(e.target.value)}
              className="border p-2 mr-2"
              placeholder="Stok Min"
            />

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-2 mr-2"
            >
              Simpan
            </button>

            <button
              onClick={() => setEditData(null)}
              className="bg-gray-400 px-3 py-2"
            >
              Batal
            </button>
          </div>
        )}

        {/* TABLE */}
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>No</th>
              <th>No Material</th>
              <th>Nama</th>
              <th>Stok</th>
              <th>Min</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredMaterials.map((item, i) => (
              <tr key={item.id} className="text-center border-t">
                <td>{i + 1}</td>
                <td>{item.no_material}</td>
                <td>{item.nama_material}</td>

                <td
                  className={
                    item.stok <= item.stok_min
                      ? "text-red-500 font-bold"
                      : ""
                  }
                >
                  {item.stok}
                </td>

                <td>{item.stok_min}</td>

                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </DashboardLayout>
  );
}