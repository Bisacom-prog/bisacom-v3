import Image from "next/image";
import type {
  SanityBlogBodyBlock,
  SanityPortableTextBlock,
  SanityPortableTextChild,
} from "@/lib/sanity-blog";

function renderSpan(child: SanityPortableTextChild, block: SanityPortableTextBlock) {
  let content: React.ReactNode = child.text ?? "";
  const marks = child.marks ?? [];

  for (const mark of marks) {
    if (mark === "strong") content = <strong>{content}</strong>;
    else if (mark === "em") content = <em>{content}</em>;
    else if (mark === "code") content = <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[.9em] dark:bg-white/10">{content}</code>;
    else {
      const def = block.markDefs?.find((item) => item._key === mark);
      if (def?._type === "link" && def.href) {
        const external = def.openInNewTab || /^https?:\/\//.test(def.href);
        content = (
          <a
            href={def.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="font-semibold text-blue-600 underline decoration-blue-300 underline-offset-4 hover:text-blue-700 dark:text-blue-400"
          >
            {content}
          </a>
        );
      }
    }
  }

  return <span key={child._key ?? `${child.text}-${marks.join("-")}`}>{content}</span>;
}

function renderTextBlock(block: SanityPortableTextBlock) {
  const children = block.children?.map((child) => renderSpan(child, block));

  if (block.style === "h2") {
    return <h2 className="mt-12 text-2xl font-black tracking-tight md:text-3xl">{children}</h2>;
  }
  if (block.style === "h3") {
    return <h3 className="mt-9 text-xl font-black tracking-tight md:text-2xl">{children}</h3>;
  }
  if (block.style === "blockquote") {
    return <blockquote className="mt-7 border-l-4 border-blue-500 pl-5 text-xl font-semibold leading-8 text-slate-700 dark:text-slate-200">{children}</blockquote>;
  }

  return <p className="mt-5 text-[1.05rem] leading-8 text-slate-700 dark:text-slate-300">{children}</p>;
}

export function SanityArticleBody({body}: {body: SanityBlogBodyBlock[]}) {
  const output: React.ReactNode[] = [];

  for (let i = 0; i < body.length; i += 1) {
    const block = body[i];

    if (block._type === "block" && block.listItem) {
      const listType = block.listItem;
      const items: SanityPortableTextBlock[] = [];
      let cursor = i;

      while (
        cursor < body.length &&
        body[cursor]._type === "block" &&
        (body[cursor] as SanityPortableTextBlock).listItem === listType
      ) {
        items.push(body[cursor] as SanityPortableTextBlock);
        cursor += 1;
      }

      const listItems = items.map((item) => (
        <li key={item._key} className="leading-7 text-slate-700 dark:text-slate-300">
          {item.children?.map((child) => renderSpan(child, item))}
        </li>
      ));

      output.push(
        listType === "number" ? (
          <ol key={`list-${i}`} className="mt-6 grid list-decimal gap-3 pl-6">{listItems}</ol>
        ) : (
          <ul key={`list-${i}`} className="mt-6 grid list-disc gap-3 pl-6">{listItems}</ul>
        ),
      );

      i = cursor - 1;
      continue;
    }

    if (block._type === "block") {
      output.push(<div key={block._key ?? `block-${i}`}>{renderTextBlock(block)}</div>);
      continue;
    }

    if (block._type === "image" && block.url) {
      output.push(
        <figure key={block._key ?? `image-${i}`} className="mt-10">
          <Image
            src={block.url}
            alt={block.alt ?? "Article image"}
            width={1400}
            height={900}
            className="h-auto w-full rounded-2xl border border-slate-200 object-cover dark:border-white/10"
          />
          {block.caption && <figcaption className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{block.caption}</figcaption>}
        </figure>,
      );
      continue;
    }

    if (block._type === "callout") {
      output.push(
        <aside key={block._key ?? `callout-${i}`} className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-500/20 dark:bg-blue-500/[.08]">
          <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700 dark:text-blue-300">{block.tone ?? "Insight"}</p>
          {block.title && <h3 className="mt-2 text-xl font-black">{block.title}</h3>}
          {block.text && <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">{block.text}</p>}
        </aside>,
      );
    }
  }

  return <>{output}</>;
}
