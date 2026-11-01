import Image from "next/image";
import type {Book} from "@/lib/books";

export default function BookCover({book, sizes, priority = false}: {book: Book; sizes: string; priority?: boolean}) {
  if (book.cover) {
    return <Image src={book.cover.src} alt={book.cover.alt} width={book.cover.width} height={book.cover.height} sizes={sizes} priority={priority} className="h-auto w-full rounded-md border border-line" />;
  }
  return (
    <div className="on-navy flex aspect-[7/10] w-full flex-col justify-between rounded-md border border-line bg-navy p-5 text-on-navy">
      <p className="mono-note text-on-navy-muted">Cover coming soon</p>
      <div>
        <i className="mb-4 block h-1 w-10 bg-accent" />
        <p className="text-2xl font-black leading-tight tracking-tight">{book.title}</p>
        <p className="mono-note mt-3 text-on-navy-muted">Bismark Apenkwah</p>
      </div>
    </div>
  );
}
