import Image from "next/image";

const brands = [
  {
    name: "Bisacom",
    src: "/img/bisacom-brand.png",
    label: "Design & technology brand",
    brief: "Create a recognisable identity that can sit across product design, design engineering, education and digital content without feeling limited to one service.",
    idea: "A compact, directional B-mark creates a sense of forward movement while the blue-to-cyan system keeps the brand technical, modern and digital-first.",
    construction: "Angular geometry, a strong diagonal and negative-space cuts create a mark that remains identifiable at avatar, favicon and interface scale.",
    type: "Bold geometric sans-serif for clarity, confidence and strong digital legibility.",
    colours: [
      {name:"Electric Blue",hex:"#3157E8"},
      {name:"Cyan",hex:"#10CBE8"},
      {name:"Deep Navy",hex:"#071127"},
    ],
    applications: ["Portfolio & product UI","Social / profile identity","Digital publishing"],
    tone: "from-[#3157E8] to-[#10CBE8]",
    surface: "bg-[#071127]",
  },
  {
    name: "Mall Street Food",
    src: "/img/mall-street-food.png",
    label: "Food brand identity",
    brief: "Build a bold food identity that feels fresh, energetic and memorable while staying practical for packaging, signage and digital promotion.",
    idea: "Leaf-like forms rise into a crown / flame silhouette, balancing freshness with the energy and warmth associated with prepared food.",
    construction: "A symmetrical emblem uses repeated organic shapes around a central vertical form, giving the mark a stable silhouette and strong recognition from distance.",
    type: "Heavy uppercase sans-serif with a lighter secondary line to create a clear brand-name hierarchy.",
    colours: [
      {name:"Forest",hex:"#1E4F2A"},
      {name:"Fresh Green",hex:"#A3BD2C"},
      {name:"Orange",hex:"#E85A25"},
      {name:"Golden",hex:"#FFC12B"},
    ],
    applications: ["Food packaging","Storefront / signage","Social campaign tiles"],
    tone: "from-[#1E4F2A] via-[#A3BD2C] to-[#FFC12B]",
    surface: "bg-[#F8F4E8]",
  },
  {
    name: "Aba's Pie",
    src: "/img/abas-pie-brand.png",
    label: "Bakery & food identity",
    brief: "Create a warm, handcrafted identity for a pie brand that feels distinctive, appetising and flexible enough for labels, packaging and social content.",
    idea: "Two pastry forms meet around a warm filling, turning the product itself into the centre of the brand story while the steam reinforces freshness.",
    construction: "A simple illustrated mark combines mirrored pastry shapes, rising steam and a centred composition that works as both a standalone icon and a lock-up.",
    type: "A characterful serif wordmark creates warmth and craft, supported by a compact uppercase tagline.",
    colours: [
      {name:"Cocoa",hex:"#6B3513"},
      {name:"Caramel",hex:"#C86D2A"},
      {name:"Pastry",hex:"#F0CD97"},
      {name:"Cream",hex:"#FFF5E8"},
    ],
    applications: ["Pie box / label","Menu & point-of-sale","Social product launch"],
    tone: "from-[#6B3513] via-[#C86D2A] to-[#F0CD97]",
    surface: "bg-[#FFF8EF]",
  },
];

function ColourSwatches({items}:{items:{name:string;hex:string}[]}) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {items.map((c)=><div key={c.hex} className="min-w-[92px]"><span className="block h-12 rounded-xl border border-white/10" style={{backgroundColor:c.hex}}/><span className="mt-2 block text-xs font-bold text-white">{c.name}</span><span className="text-[11px] text-slate-400">{c.hex}</span></div>)}
    </div>
  )
}

function ApplicationStudy({brand}:{brand:(typeof brands)[number]}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {brand.applications.map((item,index)=><div key={item} className={`relative min-h-40 overflow-hidden rounded-2xl border border-white/10 ${brand.surface}`}>
        <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${brand.tone}`}/>
        <div className="relative flex h-full min-h-40 flex-col justify-between p-5">
          <div className="relative h-16 w-28"><Image src={brand.src} alt="" fill sizes="112px" className="object-contain object-left"/></div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[.18em] text-slate-500">Application 0{index+1}</span>
            <p className="mt-1 text-sm font-black text-slate-900">{item}</p>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default function BrandSystemsPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-8">
        <p className="eyebrow text-blue-300">Selected brand systems</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-[-.04em] sm:text-5xl md:text-6xl">Three identities showing how I move from visual idea to usable brand system.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Bisacom, Mall Street Food and Aba&apos;s Pie demonstrate the visual side of my practice: logo craft, colour, typography, hierarchy and application thinking that can sit alongside product design work.</p>
      </section>

      <section className="mx-auto max-w-7xl space-y-16 px-6 pb-24 lg:px-8">
        {brands.map((brand,index)=>(
          <article key={brand.name} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.04]">
            <div className="grid lg:grid-cols-[.86fr_1.14fr]">
              <div className={`relative min-h-[420px] ${brand.surface}`}>
                <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${brand.tone}`}/>
                <Image src={brand.src} alt={`${brand.name} identity`} fill sizes="(max-width:1024px) 100vw,42vw" className="object-contain p-14"/>
              </div>
              <div className="p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-3"><span className="text-xs font-black text-blue-300">0{index+1}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">{brand.label}</span></div>
                <h2 className="mt-5 text-3xl font-black">{brand.name}</h2>
                <div className="mt-8 grid gap-7 md:grid-cols-2">
                  <div><p className="eyebrow text-blue-300">Brief</p><p className="mt-3 text-sm leading-7 text-slate-300">{brand.brief}</p></div>
                  <div><p className="eyebrow text-blue-300">Design idea</p><p className="mt-3 text-sm leading-7 text-slate-300">{brand.idea}</p></div>
                  <div><p className="eyebrow text-blue-300">Logo construction</p><p className="mt-3 text-sm leading-7 text-slate-300">{brand.construction}</p></div>
                  <div><p className="eyebrow text-blue-300">Typography direction</p><p className="mt-3 text-sm leading-7 text-slate-300">{brand.type}</p></div>
                </div>
                <div className="mt-8"><p className="eyebrow text-blue-300">Colour palette</p><ColourSwatches items={brand.colours}/></div>
              </div>
            </div>
            <div className="border-t border-white/10 p-7 md:p-10">
              <div className="mb-6"><p className="eyebrow text-blue-300">Application studies</p><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Simple portfolio studies showing how the identity can retain recognition across common brand touchpoints.</p></div>
              <ApplicationStudy brand={brand}/>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-white/10 bg-white/[.03] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="eyebrow text-blue-300">How I approach brand systems</p>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[['Identity & mark','Build a recognisable visual idea before adding decoration.'],['Colour & type','Create a hierarchy that stays coherent across channels.'],['Application','Test the system at real sizes and in different formats.'],['Consistency','Document repeatable rules so the brand can scale.']].map(([item,copy], i) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#0B1120] p-5">
                <span className="text-xs font-black text-blue-300">0{i + 1}</span>
                <h3 className="mt-4 font-black">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
          <a href="/#projects" className="mt-10 inline-flex text-sm font-bold text-blue-300 hover:text-white">← Back to selected work</a>
        </div>
      </section>
    </main>
  );
}
