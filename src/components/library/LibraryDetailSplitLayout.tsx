import type { ReactNode, RefObject } from "react";

type LibraryDetailSplitLayoutProps = {
  isMobile: boolean;
  focusedDetail: boolean;
  showDesktopBack: boolean;
  backLabel: string;
  onBack: () => void;
  mobileHeader?: ReactNode;
  sidePane: ReactNode;
  detailPane: ReactNode;
  sidePaneRef?: RefObject<HTMLElement | null>;
  detailPaneRef?: RefObject<HTMLElement | null>;
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
  <section
    className={
      isMobile
        ? "w-full min-w-0 space-y-4"
        : `grid w-full min-w-0 items-start gap-6 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] ${focusedDetail ? "" : "lg:h-[calc(100vh-8rem)]"}`
    }
  >
    {!isMobile && showDesktopBack ? (
      <div className="lg:col-span-2">
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

    <aside
      ref={sidePaneRef}
      className={`min-w-0 space-y-4 lg:sticky lg:top-24 ${focusedDetail ? "lg:pr-1" : "lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1"}`}
    >
      {sidePane}
    </aside>

    <div
      ref={detailPaneRef}
      className={`min-w-0 space-y-4 ${focusedDetail ? "lg:pr-1" : "lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1"}`}
    >
      {detailPane}
    </div>
  </section>
);

export default LibraryDetailSplitLayout;
