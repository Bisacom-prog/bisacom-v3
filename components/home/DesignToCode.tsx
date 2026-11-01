import Link from "next/link";

// A real component, its real spec and its real code: the values mirror .btn in globals.css.
export default function DesignToCode() {
  return (
    <figure className="on-navy overflow-hidden rounded-xl bg-navy text-on-navy" aria-label="The Explore Projects button shown three ways: as a selected design layer, as its specification and as code">
      <div className="flex items-center justify-between border-b border-navy-line px-5 py-3 mono-note text-on-navy-muted">
        <span>Button / Primary</span>
        <span>One decision, three forms</span>
      </div>

      <div className="grid place-items-center px-5 py-14">
        <div className="inspect-frame">
          <Link href="/#projects" className="btn btn-primary">Explore Projects</Link>
          <i className="inspect-handle" style={{top: "-.75rem", left: "-.75rem"}} />
          <i className="inspect-handle" style={{top: "-.75rem", right: "-.75rem"}} />
          <i className="inspect-handle" style={{bottom: "-.75rem", left: "-.75rem"}} />
          <i className="inspect-handle" style={{bottom: "-.75rem", right: "-.75rem"}} />
        </div>
      </div>

      <dl className="grid grid-cols-3 border-y border-navy-line mono-note">
        {[["Height", "48px"], ["Padding", "24px"], ["Contrast", "AA"]].map(([term, value]) => (
          <div key={term} className="border-r border-navy-line px-5 py-3 last:border-r-0">
            <dt className="text-on-navy-muted">{term}</dt>
            <dd className="mt-0.5 font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-6"><code>
        <span className="code-token-note">{"// Same tokens in Figma and in production"}</span>{"\n"}
        <span className="code-token-tag">{"<Link"}</span>{" "}<span className="code-token-attr">className</span>=<span className="code-token-str">{'"btn btn-primary"'}</span>{" "}<span className="code-token-attr">href</span>=<span className="code-token-str">{'"/#projects"'}</span><span className="code-token-tag">{">"}</span>{"\n"}
        {"  Explore Projects"}{"\n"}
        <span className="code-token-tag">{"</Link>"}</span>
      </code></pre>
    </figure>
  );
}
