"use client"

export default function PhoneRail({
  items,
}: {
  items: {src: string; alt: string; caption?: string}[]
}) {
  if (!items.length) return null
  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex min-w-max gap-6">
        {items.map((item, index) => (
          <figure key={index} className="w-[250px] shrink-0 md:w-[290px]">
            <div className="rounded-[2.5rem] border-[10px] border-slate-950 bg-slate-950 p-1 shadow-2xl">
              <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-black" />
              <img src={item.src} alt={item.alt} className="w-full rounded-[1.8rem]" />
            </div>
            {item.caption && (
              <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
