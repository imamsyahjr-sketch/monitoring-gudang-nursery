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
      <div className="p-6 max-w-md">

        <h2 className="text-xl font-semibold mb-4">
          Input Material Masuk
        </h2>

        <input
          placeholder="No Material"
          value={noMaterial}
          onChange={(e) => setNoMaterial(e.target.value)}
          className="w-full border p-2 mb-2"
        />

        <input
          placeholder="Nama Material"
          value={namaMaterial}
          onChange={(e) => setNamaMaterial(e.target.value)}
          className="w-full border p-2 mb-2"
        />

        <input
          type="number"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          className="w-full border p-2 mb-2"
        />

        <input
          type="number"
          placeholder="Stok Minimum"
          value={stokMin}
          onChange={(e) => setStokMin(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>

      </div>
    </DashboardLayout>
  );
}