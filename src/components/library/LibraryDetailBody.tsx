import { Children, isValidElement, type ReactNode } from "react";
import LibraryDetailSection, { type LibraryDetailSectionProps } from "@/components/library/LibraryDetailSection";

type LibraryDetailBodyProps = {
  children: ReactNode;
};

type NormalizedSection = {
  key: string | number;
  content: ReactNode;
  span: "full" | "half";
  weight: number;
};

type DesktopRow =
  | { kind: "full"; key: string; content: ReactNode }
  | { kind: "pair"; key: string; left: ReactNode; right: ReactNode };

const countTextLength = (node: ReactNode): number => {
  if (node == null || typeof node === "boolean") return 0;
  if (typeof node === "string" || typeof node === "number") return String(node).length;
  if (Array.isArray(node)) return node.reduce((sum, item) => sum + countTextLength(item), 0);
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return countTextLength(props.children);
  }
  return 0;
};

const getAutoSpan = (index: number, content: ReactNode): "full" | "half" => {
  if (index === 0) return "full";
  const textLength = countTextLength(content);
  return textLength >= 1700 ? "full" : "half";
};

const getAutoWeight = (content: ReactNode): number => {
  const textLength = countTextLength(content);
  if (textLength >= 2200) return 4;
  if (textLength >= 1400) return 3;
  if (textLength >= 700) return 2;
  return 1;
};

const buildBalancedHalfRows = (sections: NormalizedSection[], rowSeed: number): DesktopRow[] => {
  const queue = [...sections];
  const rows: DesktopRow[] = [];
  let localSeed = rowSeed;

  while (queue.length) {
    const first = queue.shift();
    if (!first) break;

    if (!queue.length) {
      rows.push({
        kind: "full",
        key: `row-${localSeed++}`,
        content: first.content,
      });
      break;
    }

    const lookahead = Math.min(4, queue.length);
    let bestIndex = 0;
    let bestScore = Number.POSITIVE_INFINITY;

    for (let i = 0; i < lookahead; i += 1) {
      const candidate = queue[i];
      const score = Math.abs(first.weight - candidate.weight) + i * 0.3;
      if (score < bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    const second = queue.splice(bestIndex, 1)[0];

    rows.push({
      kind: "pair",
      key: `row-${localSeed++}`,
      left: first.content,
      right: second.content,
    });
  }

  return rows;
};

const buildDesktopRows = (sections: NormalizedSection[]): DesktopRow[] => {
  const rows: DesktopRow[] = [];
  const pendingHalf: NormalizedSection[] = [];
  let rowSeed = 0;

  const flushHalfRows = () => {
    if (!pendingHalf.length) return;
    const balanced = buildBalancedHalfRows(pendingHalf, rowSeed);
    rows.push(...balanced);
    rowSeed += balanced.length;
    pendingHalf.length = 0;
  };

  sections.forEach((section) => {
    if (section.span === "full") {
      flushHalfRows();
      rows.push({
        kind: "full",
        key: `row-${rowSeed++}`,
        content: section.content,
      });
      return;
    }

    pendingHalf.push(section);
  });

  flushHalfRows();
  return rows;
};

const LibraryDetailBody = ({ children }: LibraryDetailBodyProps) => {
  const sections: NormalizedSection[] = Children.toArray(children).filter(Boolean).map((node, index) => {
    if (isValidElement(node) && node.type === LibraryDetailSection) {
      const props = node.props as LibraryDetailSectionProps;
      const span = props.span ?? "half";
      return {
        key: node.key ?? index,
        content: props.children,
        span,
        weight: props.weight ?? (span === "full" ? 3 : 1),
      };
    }

    return {
      key: (isValidElement(node) ? node.key : null) ?? index,
      content: node,
      span: getAutoSpan(index, node),
      weight: getAutoWeight(node),
    };
  });

  if (!sections.length) return null;

  const [firstSection, ...restSections] = sections;
  const desktopRows = buildDesktopRows(restSections);

  return (
    <main className="w-full min-w-0 space-y-5">
      <div className="min-w-0">{firstSection.content}</div>
      {desktopRows.length ? (
        <div className="min-w-0 space-y-5">
          <div className="space-y-5 lg:hidden">
            {restSections.map((section) => (
              <div key={String(section.key)} className="min-w-0">
                {section.content}
              </div>
            ))}
          </div>

          <div className="hidden min-w-0 space-y-5 lg:block">
            {desktopRows.map((row) => {
              if (row.kind === "pair") {
                return (
                  <div key={row.key} className="grid min-w-0 grid-cols-2 items-start gap-6">
                    <div className="min-w-0">{row.left}</div>
                    <div className="min-w-0">{row.right}</div>
                  </div>
                );
              }

              return (
                <div key={row.key} className="min-w-0">
                  {row.content}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default LibraryDetailBody;
