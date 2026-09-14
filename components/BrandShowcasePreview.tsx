import Image from "next/image";

const brands = [
  { name: "Bisacom", src: "/img/bisacom-brand.png", className: "brand-tile brand-tile--bisacom" },
  { name: "Mall Street Food", src: "/img/mall-street-food.png", className: "brand-tile brand-tile--mall" },
  { name: "Aba's Pie", src: "/img/abas-pie-brand.png", className: "brand-tile brand-tile--abas" },
];

export default function BrandShowcasePreview() {
  return (
    <div className="brand-preview" aria-label="Selected brand identity work for Bisacom, Mall Street Food and Aba's Pie">
      <div className="brand-preview__halo brand-preview__halo--one" aria-hidden="true" />
      <div className="brand-preview__halo brand-preview__halo--two" aria-hidden="true" />
      <div className="brand-preview__grid">
        {brands.map((brand) => (
          <div key={brand.name} className={brand.className}>
            <Image src={brand.src} alt={`${brand.name} brand identity`} fill sizes="220px" className="brand-logo" />
            <span>{brand.name}</span>
          </div>
        ))}
      </div>
      <div className="brand-preview__caption">Identity systems · colour · typography · digital applications</div>
    </div>
  );
}
