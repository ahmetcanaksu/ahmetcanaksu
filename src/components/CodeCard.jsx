// A restrained "code window" for showing a project's real usage.
// Light editorial styling; comment lines are dimmed for a touch of life.
const isComment = (line) => {
  const t = line.trimStart();
  return t.startsWith("//") || t.startsWith("#");
};

const CodeCard = ({ file, code }) => {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <div className="overflow-hidden rounded-sm border border-rule bg-paper-2/50 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink/15" />
        </span>
        <span className="meta ml-1 truncate">{file}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-ink-2">
        <code>
          {lines.map((line, i) => (
            <div
              key={i}
              className={isComment(line) ? "text-ink-3" : undefined}
            >
              {line === "" ? " " : line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeCard;
