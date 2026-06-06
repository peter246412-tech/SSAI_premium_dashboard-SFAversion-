import { Copy } from "lucide-react";

type ReportSentenceBoxProps = {
  sentence: string;
};

export function ReportSentenceBox({ sentence }: ReportSentenceBoxProps) {
  const copySentence = async () => {
    try {
      await navigator.clipboard.writeText(sentence);
    } catch {
      // Clipboard may be unavailable in some browser contexts.
    }
  };

  return (
    <div className="rounded-md border border-[#c9a85c]/30 bg-[#c9a85c]/10 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-black text-[#f6e7bd]">보고 문장</p>
        <button
          className="inline-flex items-center gap-1.5 rounded-md border border-[#c9a85c]/40 bg-black/20 px-3 py-1.5 text-xs font-black text-[#f6e7bd] transition hover:bg-[#c9a85c]/20"
          type="button"
          onClick={copySentence}
        >
          <Copy className="h-3.5 w-3.5" />
          복사
        </button>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-[#f6e7bd]">{sentence}</p>
    </div>
  );
}
