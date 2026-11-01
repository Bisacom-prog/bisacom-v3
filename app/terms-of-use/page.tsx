export const metadata = {
  title: "Terms of Use | Bisacom",
  alternates: {canonical: "/terms-of-use"},
  description:
    "Read the Terms of Use for Bisacom, a UK-based product design and digital creative brand.",
};

export default function TermsOfUsePage() {
  return (
 <div className="px-6 py-10 text-muted md:px-16 lg:px-32">
 <div className=" mx-auto max-w-5xl rounded-xl border border-line p-8 md:p-14">

        {/* Header */}
        <header className="mb-12">
          <p className="mb-4 eyebrow">
            Bisacom
          </p>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Terms of{" "}
            <span className=" to-cyan-400 ">
              Use
            </span>
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            Please read these Terms of Use carefully before using the Bisacom
            website or engaging with any of our digital products, services or
            content.
          </p>
        </header>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            1. Acceptance of Terms
          </h2>

          <p className="leading-relaxed text-muted">
            By accessing or using the <strong>Bisacom</strong> website,
            portfolio or related services, you agree to comply with and be
            bound by these Terms of Use.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            2. About Bisacom
          </h2>

          <p className="leading-relaxed text-muted">
            Bisacom is a UK-based product design and digital creative brand
            specialising in UI/UX design, branding, front-end development,
            digital experiences and creative consultancy services.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            3. Intellectual Property
          </h2>

          <p className="mb-5 leading-relaxed text-muted">
            Unless otherwise stated, all content published on this website
            including designs, branding assets, UI concepts, graphics, layouts,
            code snippets, case studies, written content and visuals are the
            intellectual property of Bisacom.
          </p>

          <ul className="list-disc space-y-3 pl-6 leading-relaxed text-muted">
            <li>
              You may view and use the website for personal or business
              reference purposes only.
            </li>

            <li>
              You must not copy, reproduce, distribute or commercially exploit
              website content without prior written permission.
            </li>

            <li>
              You may share portfolio links or social media content provided
              proper credit is given to Bisacom.
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-line pt-8">
          <p className="text-sm text-muted">
            Last updated: May 2026
          </p>
        </footer>
      </div>
    </div>
  );
}