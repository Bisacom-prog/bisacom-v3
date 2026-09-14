import Image from "next/image";

const brands = [
  { name: "Bisacom", src: "/img/bisacom-brand.png", note: "Independent design practice identity" },
  { name: "Mall Street Food", src: "/img/mall-street-food.png", note: "Food brand identity" },
  { name: "Aba's Pie", src: "/img/abas-pie-brand.png", note: "Food and bakery identity" },
];

export default function BrandSystemsPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-8">
        <p className="eyebrow text-blue-300">Selected brand work</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.04em] sm:text-5xl md:text-6xl">Brand systems built to stay recognisable across digital touchpoints.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">A focused selection of identity work for Bisacom, Mall Street Food and Aba&apos;s Pie, showing range across technology and food brands.</p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3 lg:px-8">
        {brands.map((brand) => (
          <article key={brand.name} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.04]">
            <div className="relative aspect-square bg-white p-8">
              <Image src={brand.src} alt={`${brand.name} identity`} fill sizes="(max-width:768px) 100vw,33vw" className="object-contain p-10" />
            </div>
            <div className="p-6">
              <p className="eyebrow text-blue-300">Brand identity</p>
              <h2 className="mt-2 text-2xl font-black">{brand.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{brand.note}. Selected to demonstrate logo craft, colour direction, visual hierarchy and application-ready brand thinking.</p>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-white/10 bg-white/[.03] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="eyebrow text-blue-300">How I approach brand systems</p>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {["Identity & mark", "Colour & type", "Responsive application", "Consistency across touchpoints"].map((item, i) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#0B1120] p-5">
                <span className="text-xs font-black text-blue-300">0{i + 1}</span>
                <h3 className="mt-4 font-black">{item}</h3>
              </div>
            ))}
          </div>
          <a href="/#projects" className="mt-10 inline-flex text-sm font-bold text-blue-300 hover:text-white">← Back to selected work</a>
        </div>
      </section>
    </main>
  );
}
