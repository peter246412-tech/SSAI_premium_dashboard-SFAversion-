import type { Supplier } from "../types";

type SupplierTableProps = {
  suppliers: Supplier[];
};

const riskClass: Record<Supplier["riskLevel"], string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  High: "bg-red-50 text-red-700 border-red-200",
};

export function SupplierTable({ suppliers }: SupplierTableProps) {
  return (
    <section className="dashboard-card overflow-hidden">
      <div className="border-b border-slate-200 p-5">
        <p className="text-sm font-semibold text-slate-500">Supplier Exposure Table</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">PCB 공급처 노출도</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3 font-bold">Supplier</th>
              <th className="px-5 py-3 font-bold">Country</th>
              <th className="px-5 py-3 font-bold">Type</th>
              <th className="px-5 py-3 font-bold">Risk</th>
              <th className="px-5 py-3 font-bold">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {suppliers.map((supplier) => (
              <tr className="bg-white" key={supplier.name}>
                <td className="px-5 py-4 font-bold text-slate-950">{supplier.name}</td>
                <td className="px-5 py-4 text-slate-600">{supplier.country}</td>
                <td className="px-5 py-4 text-slate-600">{supplier.type}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${riskClass[supplier.riskLevel]}`}>
                    {supplier.riskLevel} Risk
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">{supplier.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
