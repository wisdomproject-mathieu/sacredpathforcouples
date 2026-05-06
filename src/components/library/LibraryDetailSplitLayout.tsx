import type { ReactNode, RefObject } from "react";
import { sacredVisualSystem } from "@/lib/sacredVisualSystem";

type LibraryDetailSplitLayoutProps = {
  isMobile: boolean;
  focusedDetail: boolean;
  showDesktopBack: boolean;
  backLabel: string;
  onBack: () => void;
  mobileHeader?: ReactNode;
  sidePane: ReactNode;
  detailPane: ReactNode;
  sidePaneRef?: RefObject<HTMLDivElement | null>;
  detailPaneRef?: RefObject<HTMLDivElement | null>;
};

const LibraryDetailSplitLayout = ({
  isMobile,
  focusedDetail,
  showDesktopBack,
  backLabel,
  onBack,
  mobileHeader,
  sidePane,
  detailPane,
  sidePaneRef,
  detailPaneRef,
}: LibraryDetailSplitLayoutProps) => (
  <section className="w-full min-w-0 space-y-4" data-focused={focusedDetail ? "true" : "false"}>
    {!isMobile && showDesktopBack ? (
      <div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-border/35 bg-card/45 px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground transition-all hover:border-border/55 hover:bg-card/60"
        >
          {backLabel}
        </button>
      </div>
    ) : null}

    {isMobile ? mobileHeader : null}

    <div
      ref={sidePaneRef}
      className={`w-full min-w-0 space-y-4 ${sacredVisualSystem.contourEmerald}`}
    >
      {sidePane}
    </div>

    <div
      ref={detailPaneRef}
      className={`w-full min-w-0 ${sacredVisualSystem.contourCyan}`}
    >
      {detailPane}
    </div>
  </section>
);

export default LibraryDetailSplitLayout;
