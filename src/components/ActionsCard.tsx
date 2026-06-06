type ActionsCardProps = {
  actions: string[];
};

export function ActionsCard({ actions }: ActionsCardProps) {
  return (
    <section className="dashboard-card p-5">
      <div>
        <p className="text-sm font-semibold text-slate-500">Recommended Actions</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">자동 생성 대응 행동 3개</h2>
      </div>

      <div className="mt-5 space-y-3">
        {actions.map((action, index) => (
          <label className="flex min-h-16 items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4" key={action}>
            <input className="mt-1 h-4 w-4 accent-blue-600" type="checkbox" defaultChecked={index === 0} />
            <div>
              <p className="font-semibold leading-6 text-slate-900">{action}</p>
              <p className="mt-1 text-sm text-slate-500">{index === 0 ? "오늘 우선 처리" : "이번 주 검토"}</p>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
