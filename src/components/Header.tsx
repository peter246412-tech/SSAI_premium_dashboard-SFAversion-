type HeaderProps = {
  profile: {
    subtitle: string;
    modelName: string;
    lastUpdatedAt: string;
    simulationMode: string;
    marketDateRule: string;
  };
};

export function Header({ profile }: HeaderProps) {
  return (
    <header className="premium-panel relative overflow-hidden px-6 py-5 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f3d58a] to-transparent" />
      <span className="absolute right-5 top-4 z-20 rounded-md border border-[#c9a85c]/40 bg-[#c9a85c]/10 px-2.5 py-1 text-xs font-bold text-[#f6e7bd]">
        Enterprise Risk Monitor
      </span>
      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-[92px] shrink-0 place-items-center rounded-md border border-white/20 bg-white px-3 shadow-[0_0_30px_rgba(37,99,235,0.18)]">
            <svg aria-label="SFA" className="h-8 w-full" role="img" viewBox="0 0 112 42">
              <text
                fill="#0068b7"
                fontFamily="Arial Black, Arial, sans-serif"
                fontSize="34"
                fontStyle="italic"
                fontWeight="900"
                letterSpacing="-4"
                x="1"
                y="33"
              >
                SFA
              </text>
              <path d="M77 27 L111 14 L84 40 L89 27 Z" fill="#0068b7" />
            </svg>
          </div>
          <div>
            <div className="flex flex-wrap items-center">
              <div className="relative h-[76px] w-[238px] max-w-[62vw]">
                <img
                  alt="SSAI"
                  className="h-[72px] w-[292px] max-w-none object-contain object-left"
                  src="/brand/ssai-wordmark-dark.svg"
                />
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute left-[102px] top-[5px] h-[42px] w-auto opacity-90"
                  src="/brand/guardian-dashboard.png"
                />
              </div>
            </div>
            <p className="mt-1 text-sm font-medium text-slate-300">{profile.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="champagne-line relative z-10 my-5" />

      <div className="relative z-10 grid gap-3 lg:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-white/[0.045] px-4 py-3">
          <p className="text-xs font-black uppercase text-slate-400">기준일</p>
          <p className="mt-1 font-black text-white">2026-02-21</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.045] px-4 py-3">
          <p className="text-xs font-black uppercase text-slate-400">Daily Brief</p>
          <p className="mt-1 font-black text-white">{profile.simulationMode}</p>
        </div>
        <div className="rounded-md border border-[#c9a85c]/30 bg-[#c9a85c]/10 px-4 py-3">
          <p className="text-xs font-black uppercase text-[#f6e7bd]">Procurement Action</p>
          <p className="mt-1 font-black text-white">구매 조건 재검증</p>
        </div>
      </div>

      <p className="relative z-10 mt-4 rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300">
        {profile.marketDateRule}
      </p>
    </header>
  );
}
