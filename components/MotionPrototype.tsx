export default function MotionPrototype() {
  return (
    <section data-reveal="section" id="motion" className="scroll-mt-24 bg-[#050914] py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:px-8">
        <div>
          <p className="eyebrow text-blue-300">Motion & interaction</p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">I design how products behave, not only how they look.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
            A short interaction study from Mobile Mechanic showing system feedback from request confirmation through mechanic matching and live tracking.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
            <span className="motion-meta">State change</span>
            <span className="motion-meta">Progress feedback</span>
            <span className="motion-meta">Live-tracking transition</span>
            <span className="motion-meta">Reduced-motion friendly</span>
          </div>
          <a href="/projects/mobile-mechanic-app" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-300 hover:text-white">
            View the full Mobile Mechanic case study <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="motion-demo-shell" aria-label="Looping Mobile Mechanic interaction prototype">
          <div className="motion-demo-glow" aria-hidden="true" />
          <div className="motion-phone" aria-hidden="true">
            <div className="motion-phone__top"><span>9:41</span><span>● ● ●</span></div>
            <div className="motion-phone__content">
              <div className="motion-live-badge"><i /> Live prototype</div>
              <h3>Roadside help</h3>
              <p className="motion-phone__sub">We&apos;re getting the right mechanic to you.</p>

              <div className="motion-route">
                <span className="motion-route__origin">You</span>
                <span className="motion-route__line" />
                <span className="motion-route__car">◆</span>
                <span className="motion-route__destination">Mechanic</span>
              </div>

              <div className="motion-sequence">
                <div className="motion-step motion-step--one">
                  <span className="motion-step__icon">✓</span>
                  <div><b>Request received</b><small>Your location and issue are secure.</small></div>
                </div>
                <div className="motion-step motion-step--two">
                  <span className="motion-step__icon">↗</span>
                  <div><b>Mechanic matched</b><small>James accepted · ETA 8 min</small></div>
                </div>
                <div className="motion-step motion-step--three">
                  <span className="motion-step__icon">◎</span>
                  <div><b>Live tracking</b><small>Follow progress without losing context.</small></div>
                </div>
              </div>
            </div>
          </div>
          <div className="motion-demo-label">12s looping interaction study</div>
        </div>
      </div>
    </section>
  );
}
