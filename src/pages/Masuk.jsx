import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { supabase } from "../supabaseClient";

export default function Masuk() {

  const [noMaterial, setNoMaterial] = useState("");
  const [namaMaterial, setNamaMaterial] = useState("");
  const [stok, setStok] = useState("");
  const [stokMin, setStokMin] = useState("");

  const [history, setHistory] = useState([]);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let query = supabase
      .from("material_masuk")
      .select("*")
      .order("created_at", { ascending: false });

    if (dateFrom) {
      query = query.gte("created_at", dateFrom);
    }

    if (dateTo) {
      query = query.lte("created_at", dateTo);
    }

    const { data, error } = await query;

    if (!error) setHistory(data);
  };

  const handleSubmit = async () => {

    if (!noMaterial || !namaMaterial) {
      alert("Isi semua field");
      return;
    }

    // insert ke master materials
    await supabase.from("materials").insert([
      {
        no_material: noMaterial,
        nama_material: namaMaterial,
        stok: Number(stok),
        stok_min: Number(stokMin),
      },
    ]);

    // insert ke histori
    await supabase.from("material_masuk").insert([
      {
        no_material: noMaterial,
        nama_material: namaMaterial,
        qty: Number(stok),
      },
    ]);

    alert("Berhasil tambah material");

    setNoMaterial("");
    setNamaMaterial("");
    setStok("");
    setStokMin("");

    fetchHistory();
  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Material Masuk
          </h2>
          <p className="text-sm text-gray-500">
            Input dan monitor material masuk gudang
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border">

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">No Material</label>
              <input
                value={noMaterial}
                onChange={(e)=>setNoMaterial(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Nama Material</label>
              <input
                value={namaMaterial}
                onChange={(e)=>setNamaMaterial(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Qty Masuk</label>
              <input
                type="number"
                value={stok}
                onChange={(e)=>setStok(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Stok Minimum</label>
              <input
                type="number"
                value={stokMin}
                onChange={(e)=>setStokMin(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow"
            >
              Simpan Material
            </button>
          </div>

        </div>

        {/* FILTER */}
        <div className="bg-white p-4 rounded-xl shadow border flex flex-wrap gap-3 items-end">

          <div>
            <label className="text-xs text-gray-500">Dari Tanggal</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e)=>setDateFrom(e.target.value)}
              className="border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Sampai</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e)=>setDateTo(e.target.value)}
              className="border p-2 rounded-lg"
            />
          </div>

          <button
            onClick={fetchHistory}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Filter
          </button>

        </div>

        {/* HISTORI */}
        <div className="bg-white shadow rounded-2xl overflow-hidden border">

          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700">
              Histori Material Masuk
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2">No</th>
                  <th>No Material</th>
                  <th>Nama</th>
                  <th>Qty</th>
                  <th>Tanggal</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item, i) => (
                  <tr key={item.id} className="text-center border-t hover:bg-gray-50">
                    <td>{i + 1}</td>
                    <td>{item.no_material}</td>
                    <td>{item.nama_material}</td>
                    <td className="font-semibold text-green-600">
                      +{item.qty}
                    </td>
                    <td>
                      {new Date(item.created_at).toLocaleString()}
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