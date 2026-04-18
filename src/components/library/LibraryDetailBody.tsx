import { Children, type ReactNode } from "react";

type LibraryDetailBodyProps = {
  children: ReactNode;
};

const LibraryDetailBody = ({ children }: LibraryDetailBodyProps) => {
  const sections = Children.toArray(children).filter(Boolean);
  if (!sections.length) return null;

  const [firstSection, ...restSections] = sections;

  return (
    <main className="w-full min-w-0 space-y-5">
      <div className="min-w-0">{firstSection}</div>
      {restSections.length ? (
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-6">
          {restSections.map((section, index) => (
            <div key={index} className="min-w-0">
              {section}
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
};

export default LibraryDetailBody;
