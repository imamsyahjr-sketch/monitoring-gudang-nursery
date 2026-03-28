import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { supabase } from "../supabaseClient";

export default function Masuk() {

  const [noMaterial, setNoMaterial] = useState("");
  const [namaMaterial, setNamaMaterial] = useState("");
  const [stok, setStok] = useState("");
  const [stokMin, setStokMin] = useState("");

  const handleSubmit = async () => {
    if (!noMaterial || !namaMaterial) {
      alert("Isi semua field");
      return;
    }

    const { error } = await supabase.from("materials").insert([
      {
        no_material: noMaterial,
        nama_material: namaMaterial,
        stok: Number(stok),
        stok_min: Number(stokMin),
      },
    ]);

    if (error) {
      console.error(error);
      alert("Gagal simpan");
    } else {
      alert("Berhasil tambah material");

      setNoMaterial("");
      setNamaMaterial("");
      setStok("");
      setStokMin("");
    }
  };

  return (
    <DashboardLayout>

      <div className="p-6">

        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Input Material Masuk
        </h2>

        {/* FORM */}
        <div className="bg-white shadow-md rounded-lg p-4 max-w-xl">

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">
                No Material
              </label>
              <input
                value={noMaterial}
                onChange={(e) => setNoMaterial(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Nama Material
              </label>
              <input
                value={namaMaterial}
                onChange={(e) => setNamaMaterial(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Stok
              </label>
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Stok Minimum
              </label>
              <input
                type="number"
                value={stokMin}
                onChange={(e) => setStokMin(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Simpan
            </button>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}