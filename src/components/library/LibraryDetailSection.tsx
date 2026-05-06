import type { ReactNode } from "react";

export type LibraryDetailSectionSpan = "half" | "full";

export type LibraryDetailSectionProps = {
  children: ReactNode;
  span?: LibraryDetailSectionSpan;
  weight?: number;
};

const LibraryDetailSection = ({ children }: LibraryDetailSectionProps) => <>{children}</>;

export default LibraryDetailSection;
