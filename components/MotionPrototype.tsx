export function MotionDemo() {
  return (
    <div className="motion-demo-shell" role="img" aria-label="Looping interaction study of the Mobile Mechanic app: request received, mechanic matched, then live tracking">
      <div className="motion-phone" aria-hidden="true">
        <div className="motion-phone__top"><span>9:41</span><span>● ● ●</span></div>
        <div className="motion-phone__content">
          <div className="motion-live-badge"><i /> Prototype</div>
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
      <div className="motion-demo-label">Interaction study · concept</div>
    </div>
  );
}

export default function MotionPrototype() {
  return (
    <section id="motion" className="scroll-mt-32 border-b border-line py-20">
      <div className="page-shell grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
        <div>
          <p className="eyebrow">Motion and interaction</p>
          <h2 className="section-title mt-4">How the product behaves, not only how it looks.</h2>
          <p className="mt-5 max-w-xl leading-7 text-muted">
            A short interaction study showing system feedback from request confirmation through mechanic matching and live tracking.
          </p>
        </div>
        <MotionDemo />
      </div>
    </section>
  );
}
