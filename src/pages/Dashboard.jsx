import DashboardLayout from "../layout/DashboardLayout"
import StatCard from "../components/StatCard"

export default function Dashboard(){

  return(

    <DashboardLayout>

      {/* STAT CARD */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <StatCard
          title="Jenis Item"
          value="100"
        />

        <StatCard
          title="Total Material"
          value="2400"
        />

        <StatCard
          title="Material Masuk Hari Ini"
          value="120"
        />

        <StatCard
          title="Material Keluar Hari Ini"
          value="45"
        />

      </div>

{/* PERINGATAN STOK MENIPIS */}
<div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
  <h3 className="text-lg font-semibold mb-3">
    Peringatan Stok Material Menipis
  </h3>

  <div className="space-y-2">
    <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 p-2.5 rounded-lg hover:shadow-md transition">
      <div>
        <p className="font-semibold text-gray-700 text-sm">
          Pupuk NPK
        </p>
        <p className="text-xs text-gray-500">
          Batas minimum: 100 kg
        </p>
      </div>
      <span className="text-red-500 font-bold text-sm">
        Stok: 100 kg
      </span>
    </div>

    <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 p-2.5 rounded-lg hover:shadow-md transition">
      <div>
        <p className="font-semibold text-gray-700 text-sm">
          Fungisida Starner
        </p>
        <p className="text-xs text-gray-500">
          Batas minimum: 50 pcs
        </p>
      </div>
      <span className="text-red-500 font-bold text-sm">
        Stok: 50 pcs
      </span>
    </div>

    <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 p-2.5 rounded-lg hover:shadow-md transition">
      <div>
        <p className="font-semibold text-gray-700 text-sm">
          Elbow 1/2"
        </p>
        <p className="text-xs text-gray-500">
          Batas minimum: 10 pcs
        </p>
      </div>
      <span className="text-red-500 font-bold text-sm">
        Stok: 10 pcs
      </span>
    </div>

    <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 p-2.5 rounded-lg hover:shadow-md transition">
      <div>
        <p className="font-semibold text-gray-700 text-sm">
          Tee 1/2"
        </p>
        <p className="text-xs text-gray-500">
          Batas minimum: 10 pcs
        </p>
      </div>
      <span className="text-red-500 font-bold text-sm">
        Stok: 10 pcs
      </span>
    </div>

    <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 p-2.5 rounded-lg hover:shadow-md transition">
      <div>
        <p className="font-semibold text-gray-700 text-sm">
          Pipa 1/2"
        </p>
        <p className="text-xs text-gray-500">
          Batas minimum: 20 batang
        </p>
      </div>
      <span className="text-red-500 font-bold text-sm">
        Stok: 20 batang
      </span>
    </div>
  </div>
</div>

    </DashboardLayout>

  )
}