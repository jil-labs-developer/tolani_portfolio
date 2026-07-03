interface PlaceholderImageProps {
  /** Short name reviewers/you will use to know which real asset goes here, e.g. "hero-shot". */
  label: string;
  /** Intended real-asset pixel dimensions, shown so the right export can be produced later. */
  width: number;
  height: number;
  className?: string;
}

/**
 * Visual stand-in for a case-study image/video. Renders inline (no file on
 * disk to swap) so review screenshots show a real, labeled slot instead of a
 * broken <img>. Once the real asset exists, replace the call site with a
 * plain <img>/<video> — this component is draft-only scaffolding.
 */
export function PlaceholderImage({ label, width, height, className = '' }: PlaceholderImageProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-1 border border-dashed border-black/35 bg-black/5 p-2 text-center font-['IBM_Plex_Mono'] text-[10px] text-[#666] ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <span className="font-bold tracking-[0.05em]">{label.toUpperCase()}</span>
      <span>
        {width}×{height}
      </span>
    </div>
  );
}
