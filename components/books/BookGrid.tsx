import Link from "next/link";
import BookCover from "@/components/books/BookCover";
import {bookHref, type Book} from "@/lib/books";

export default function BookGrid({books, headingLevel = "h3"}: {books: Book[]; headingLevel?: "h2" | "h3"}) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <li key={book.slug} className="flex flex-col">
          <Link href={bookHref(book)} aria-hidden="true" tabIndex={-1} className="block max-w-[17rem]">
            <BookCover book={book} sizes="272px" />
          </Link>
          <p className={`status-tag status-tag--${book.status} mt-6 self-start`}>{book.statusLabel}</p>
          <Heading className="mt-4 text-2xl font-bold leading-tight">{book.title}</Heading>
          <p className="mt-3 flex-1 leading-7 text-muted">{book.description}</p>
          <p className="mt-4 text-sm leading-6"><b className="font-semibold">For:</b> <span className="text-muted">{book.audience}</span></p>
          <Link href={bookHref(book)} className="text-link mt-5 self-start" aria-label={`${book.status === "available" ? "View" : "Preview"} ${book.title}`}>
            {book.status === "available" ? "View the book" : "See the preview"}
          </Link>
        </li>
      ))}
    </ul>
  );
}
