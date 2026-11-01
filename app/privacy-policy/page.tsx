export const metadata = {
  title: "Privacy & Cookie Policy | Bisacom",
  alternates: {canonical: "/privacy-policy"},
  description:
    "Read the Privacy & Cookie Policy for Bisacom, a UK-based product design and digital creative brand.",
};

export default function PrivacyPolicyPage() {
  return (
      <div className="min-h-screen px-6 py-12 text-muted md:px-16 lg:px-32">
        <div className="mx-auto max-w-5xl rounded-xl border border-line p-8 md:p-14">
        
        {/* Header */}
          <div className="mb-12">
          <p className="mb-4 eyebrow">
            Bisacom
          </p>

 <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
 Privacy &{" "}
 <span className=" to-cyan-400 ">
              Cookie Policy
            </span>
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            At <strong>Bisacom</strong>, we are committed to protecting your
            privacy and handling your personal information transparently and
            responsibly in accordance with the UK General Data Protection
            Regulation (UK GDPR) and the Privacy and Electronic Communications
            Regulations (PECR).
          </p>
        </div>

        {/* Section 1 */}
 <section className="mb-10">
 <h2 className="mb-4 text-2xl font-bold text-foreground">
            1. Who We Are
          </h2>

 <p className="leading-relaxed text-muted">
            Bisacom is a UK-based product design and digital creative brand
            specialising in UI/UX design, branding, front-end development and
            digital product experiences.
          </p>

 <div className="mt-5 space-y-2 text-muted">
            <p>
              <strong>Brand:</strong> Bisacom
            </p>
            <p>
              <strong>Email:</strong> hello@bisacom.dev
            </p>
          </div>
        </section>

        {/* Section 2 */}
 <section className="mb-10">
 <h2 className="mb-4 text-2xl font-bold text-foreground">
            2. Information We Collect
          </h2>

 <ul className="list-disc space-y-3 pl-6 leading-relaxed text-muted">
            <li>Contact form submissions (name, email address, message)</li>
            <li>Project enquiry information</li>
            <li>Free planner signups (email address and your agreement to receive the planner plus occasional Product Design and book updates). These are sent through Resend and retained in the Bisacom email inbox to manage delivery and consent records. You can unsubscribe at any time by emailing hello@bisacom.dev.</li>
            <li>
              Technical information such as browser type, IP address and device
              information
            </li>
            <li>Website usage analytics (only where consent is provided)</li>
            <li>Cookie preferences and site interaction data</li>
          </ul>
        </section>

        {/* Section 3 */}
 <section className="mb-10">
 <h2 className="mb-4 text-2xl font-bold text-foreground">
            3. How Your Information Is Used
          </h2>

 <ul className="list-disc space-y-3 pl-6 leading-relaxed text-muted">
            <li>To respond to enquiries and project requests</li>
            <li>To improve website performance and user experience</li>
            <li>To maintain website security and functionality</li>
            <li>
              To analyse website traffic and engagement (with consent)
            </li>
            <li>To communicate updates or services where appropriate</li>
          </ul>
        </section>

        {/* Section 4 */}
 <section className="mb-10">
 <h2 className="mb-4 text-2xl font-bold text-foreground">4. Cookies</h2>

 <p className="mb-5 leading-relaxed text-muted">
            Bisacom uses cookies to improve functionality, enhance performance
            and personalise user experience.
          </p>

 <div className="space-y-4 text-muted">
            <div>
 <h3 className="mb-1 font-semibold text-foreground">
                Essential Cookies
              </h3>
              <p>Necessary for core website functionality and security.</p>
            </div>

            <div>
 <h3 className="mb-1 font-semibold text-foreground">
                Preference Cookies
              </h3>
              <p>
                Used to remember settings such as theme preferences or cookie
                choices.
              </p>
            </div>

            <div>
 <h3 className="mb-1 font-semibold text-foreground">
                Analytics Cookies
              </h3>
              <p>
                Used to understand website traffic and improve the overall
                experience. These are only enabled after user consent.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
 <div className="mt-12 border-t border-line pt-8">
 <p className="text-sm text-muted">
            Last updated: May 2026
          </p>
        </div>
      </div>
    </div>
  );
}