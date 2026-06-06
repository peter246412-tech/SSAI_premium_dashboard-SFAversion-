import type { SupplierImpact } from "../types";

type SupplierImpactTableProps = {
  impacts: SupplierImpact[];
};

const riskTone: Record<SupplierImpact["riskLevel"], string> = {
  Low: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  Medium: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  High: "border-red-300/30 bg-red-400/10 text-red-200",
};

export function SupplierImpactTable({ impacts }: SupplierImpactTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-white/10">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-white/10 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3 font-black">Supplier</th>
            <th className="px-4 py-3 font-black">Country</th>
            <th className="px-4 py-3 font-black">Exposure Type</th>
            <th className="px-4 py-3 font-black">Impacted Indicator</th>
            <th className="px-4 py-3 font-black">Risk</th>
            <th className="px-4 py-3 font-black">Suggested Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {impacts.map((impact) => (
            <tr key={impact.supplier}>
              <td className="px-4 py-3 font-black text-white">{impact.supplier}</td>
              <td className="px-4 py-3 text-slate-300">{impact.country}</td>
              <td className="px-4 py-3 text-slate-300">{impact.exposureType}</td>
              <td className="px-4 py-3 text-slate-300">{impact.impactedIndicator}</td>
              <td className="px-4 py-3">
                <span className={`rounded-md border px-2 py-1 text-xs font-black ${riskTone[impact.riskLevel]}`}>
                  {impact.riskLevel}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-[#f6e7bd]">{impact.suggestedAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
