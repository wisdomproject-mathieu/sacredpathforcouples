import { Children, isValidElement, type ReactNode } from "react";
import LibraryDetailSection, { type LibraryDetailSectionProps } from "@/components/library/LibraryDetailSection";

type LibraryDetailBodyProps = {
  children: ReactNode;
};

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
  return textLength >= 1300 ? "full" : "half";
};

const getAutoWeight = (content: ReactNode): number => {
  const textLength = countTextLength(content);
  if (textLength >= 2200) return 4;
  if (textLength >= 1400) return 3;
  if (textLength >= 700) return 2;
  return 1;
};

const LibraryDetailBody = ({ children }: LibraryDetailBodyProps) => {
  const sections = Children.toArray(children).filter(Boolean).map((node, index) => {
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

  const blocks: Array<
    | { kind: "full"; key: string | number; content: ReactNode }
    | { kind: "half"; key: string; left: ReactNode[]; right: ReactNode[] }
  > = [];

  let halfChunk: typeof restSections = [];

  const flushHalfChunk = () => {
    if (!halfChunk.length) return;
    const left: ReactNode[] = [];
    const right: ReactNode[] = [];
    let leftWeight = 0;
    let rightWeight = 0;

    halfChunk.forEach((section) => {
      if (leftWeight <= rightWeight) {
        left.push(<div key={String(section.key)} className="min-w-0">{section.content}</div>);
        leftWeight += section.weight;
      } else {
        right.push(<div key={String(section.key)} className="min-w-0">{section.content}</div>);
        rightWeight += section.weight;
      }
    });

    blocks.push({
      kind: "half",
      key: `half-${blocks.length}`,
      left,
      right,
    });

    halfChunk = [];
  };

  restSections.forEach((section) => {
    if (section.span === "full") {
      flushHalfChunk();
      blocks.push({
        kind: "full",
        key: section.key,
        content: section.content,
      });
      return;
    }

    halfChunk.push(section);
  });

  flushHalfChunk();

  return (
    <main className="w-full min-w-0 space-y-5">
      <div className="min-w-0">{firstSection.content}</div>
      {blocks.length ? (
        <div className="min-w-0 space-y-5">
          <div className="space-y-5 lg:hidden">
            {restSections.map((section) => (
              <div key={String(section.key)} className="min-w-0">
                {section.content}
              </div>
            ))}
          </div>

          <div className="hidden min-w-0 space-y-5 lg:block">
            {blocks.map((block) => {
              if (block.kind === "full") {
                return (
                  <div key={String(block.key)} className="min-w-0">
                    {block.content}
                  </div>
                );
              }

              return (
                <div key={block.key} className="grid min-w-0 grid-cols-2 items-start gap-6">
                  <div className="min-w-0 space-y-5">{block.left}</div>
                  <div className="min-w-0 space-y-5">{block.right}</div>
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
