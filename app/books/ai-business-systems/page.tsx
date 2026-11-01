import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { Manrope, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';
import { aiBusinessSystemsCheckout as checkout, aiBusinessSystemsPrice as PRICE, getBook, notifyHref } from '@/lib/books';
import { siteConfig } from '@/lib/site';
import styles from './page.module.css';

// Checkout links and the price live in lib/books.ts.
const book = getBook('ai-business-systems')!;
const onSale = checkout.length > 0;
const hasGumroad = checkout.some((option) => option.provider === 'gumroad');
const checkoutNames = checkout.map((option) => option.label).join(' or ');

const sans = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });
const serif = Source_Serif_4({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'], variable: '--font-serif' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const IMG = '/ai-business-systems';

export const metadata: Metadata = {
  title: 'AI Business Systems: The Small Business AI Operating System',
  description:
    'A 76-page practical workbook that helps small business owners build 20 AI-assisted business systems — with reusable prompts, worksheets and a 30-Day Implementation Plan.',
  alternates: { canonical: `${siteConfig.url}/books/ai-business-systems` },
  openGraph: {
    title: 'AI Business Systems — 2026 Edition',
    description: 'Build smarter systems. Save time. Market consistently. A practical AI workbook for small business owners.',
    url: `${siteConfig.url}/books/ai-business-systems`,
    siteName: 'Bisacom',
    images: [{ url: `${IMG}/og.jpg`, width: 1200, height: 630, alt: 'AI Business Systems workbook cover' }],
    type: 'website',
  },
};

const parts = [
  {
    name: 'Part 1 · Foundation',
    note: 'Give AI the context it needs.',
    systems: ['Welcome to Your AI Business System', 'The AI Business Advantage', 'Build Your AI Business Brain', 'Your Master Prompt'],
    start: 1,
  },
  {
    name: 'Part 2 · Growth Systems',
    note: 'Attract, nurture and convert.',
    systems: ['Content Creation System', 'Social Media System', 'Marketing System', 'Lead Generation System', 'Sales System'],
    start: 5,
  },
  {
    name: 'Part 3 · Operations Systems',
    note: 'Run the business with less friction.',
    systems: ['Customer Service System', 'Email Marketing System', 'Product Creation System', 'Research & Strategy System', 'Admin & Productivity System', 'Weekly CEO System'],
    start: 10,
  },
  {
    name: 'Part 4 · Implementation Toolkit',
    note: 'Put it all into practice.',
    systems: ['Your 30-Day Implementation Plan', 'AI Prompt Library', 'Your Business Automation Map', 'KPI Dashboard', 'Your AI Business Blueprint'],
    start: 16,
  },
];

const previews = [
  { src: 'contents.webp', page: 'p. 4', title: 'Twenty systems, four parts', text: 'A clear map of the whole workbook — and exactly what’s included.' },
  { src: 'ch02-four-terms.webp', page: 'p. 12', title: 'Plain-English foundations', text: 'AI-assisted, systemized, automated and optimized — defined with small-business examples.' },
  { src: 'master-prompt.webp', page: 'p. 21', title: 'The Master Prompt', text: 'One reusable instruction that gives your AI assistant the context of your business.' },
  { src: 'product-validation.webp', page: 'p. 41', title: 'Structured, copy-ready prompts', text: 'Role, context, task, output, constraints and quality checks — plus real-world validation steps.' },
  { src: '30-day-plan.webp', page: 'p. 53', title: 'The 30-Day Implementation Plan', text: 'A recommended order, one day at a time, with the page to work on for each step.' },
  { src: 'blueprint.webp', page: 'p. 68', title: 'Your AI Business Blueprint', text: 'Bring every decision together on one page you can keep revisiting.' },
];

const outcomes = [
  ['A Business Brain', 'One document that describes your business, customer and brand — pasted into every prompt so AI stops giving generic answers.'],
  ['A Master Prompt', 'A saved instruction that starts every AI conversation from your business context.'],
  ['A repeatable content engine', 'Turn one idea into several formats and post on a schedule you can actually sustain.'],
  ['Marketing, lead and sales assets', 'A marketing audit, a lead magnet, an objection library and honest sales copy.'],
  ['Calmer operations', 'Approved customer replies, a welcome email sequence and SOPs for your most repeated tasks.'],
  ['A weekly and monthly rhythm', 'A Weekly CEO System, a KPI dashboard and a monthly review that tie activity to outcomes.'],
];

const included = [
  'A 76-page practical workbook (A4 PDF)',
  '20 AI business systems',
  '30 reusable AI prompts',
  'Planning and implementation worksheets',
  'A 30-Day Implementation Plan',
  'A prompt library and index',
  'An automation planning toolkit',
  'A one-page AI Business Blueprint',
];

const faqs = [
  ['What format is it?', 'A 76-page A4 PDF. Read it on screen or print the worksheets and write on them.'],
  ['How do I receive it?', hasGumroad && checkout.length === 1
    ? 'Checkout is handled securely by Gumroad. Your download link appears straight after payment and is also emailed to you.'
    : onSale
      ? `Checkout is handled securely by ${checkoutNames}. Your PDF is delivered by email after payment.`
      : 'The workbook is not on sale just yet. Ask to be notified and you will hear when it is available.'],
  ['Do I need a paid AI tool?', 'No subscription is included or required by the book. The prompts are written to work with the AI assistant you choose; some features of your tool may depend on its plan.'],
  ['Is this software?', 'No. It’s a practical workbook. You build your own system — prompts, workflows, SOPs and reviews — around the tools you already use. It doesn’t include prebuilt automations or personal consulting.'],
  ['Do I need technical skills?', 'No. It’s written for small business owners with little or no technical background. Each system explains the idea, gives a prompt and walks you through a worksheet.'],
];

function BuyButton({ light = false }: { light?: boolean }) {
  if (!onSale) {
    return <a href={notifyHref(book)} className={`${styles.buy} ${light ? styles.buyLight : ''}`}>Tell me when it’s on sale</a>;
  }
  return (
    <span className={styles.buyGroup}>
      {checkout.map((option, index) => (
        <a
          key={option.provider}
          href={option.href}
          className={`${option.provider === 'gumroad' ? 'gumroad-button' : ''} ${styles.buy} ${index > 0 ? styles.buyAlt : ''}`}
          {...(option.provider === 'gumroad' ? { 'data-gumroad-overlay-checkout': 'true' } : {})}
        >
          {checkout.length > 1 ? `Buy with ${option.label}` : 'Buy the Workbook'} — {PRICE}
        </a>
      ))}
    </span>
  );
}

function Mark() {
  return (
    <span className={styles.mark} aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => <span key={i} className={i === 19 ? styles.markHot : undefined} />)}
    </span>
  );
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.title,
  alternateName: book.subtitle,
  author: { '@type': 'Person', '@id': `${siteConfig.url}/#person`, name: siteConfig.personName, url: siteConfig.url },
  description: book.description,
  inLanguage: 'en-GB',
  numberOfPages: 76,
  bookFormat: 'https://schema.org/EBook',
  image: `${siteConfig.url}${IMG}/cover.webp`,
  url: `${siteConfig.url}/books/${book.slug}`,
  offers: checkout.map((option) => ({ '@type': 'Offer', url: option.href, price: PRICE.replace('£', ''), priceCurrency: 'GBP', availability: 'https://schema.org/InStock' })),
};

export default function AiBusinessSystemsPage() {
  return (
    <div className={`${sans.variable} ${serif.variable} ${mono.variable} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {hasGumroad && <Script src="https://gumroad.com/js/gumroad.js" strategy="lazyOnload" />}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrowLight}>Bisacom Playbooks · 2026 Edition</span>
              <h1 className={styles.heroTitle}>
                <span className={styles.hot}>AI</span> Business Systems
              </h1>
              <p className={styles.heroSub}>The Small Business AI Operating System</p>
              <p className={styles.heroLead}>
                A practical workbook that helps you turn occasional AI use into 20 repeatable business systems — for content, marketing,
                sales, customer service, operations and planning.
              </p>
              <div className={styles.heroActions}>
                <BuyButton />
                <a href="#inside" className={styles.ghost}>See what’s inside</a>
              </div>
              <ul className={styles.heroFacts}>
                {hasGumroad && <li>Instant PDF download</li>}
                <li>76 pages · A4</li>
                {onSale ? <li>Secure checkout via {checkoutNames}</li> : <li>Launching soon</li>}
              </ul>
            </div>
            <div className={styles.heroCover}>
              <Image src={`${IMG}/cover.webp`} alt="AI Business Systems workbook cover, 2026 Edition, by Bismark Apenkwah" width={911} height={1287} priority sizes="(max-width: 860px) 70vw, 420px" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <span className={styles.eyebrow}>The problem</span>
            <h2 className={styles.h2}>Running a small business can feel like having ten different jobs.</h2>
          </div>
          <div className={styles.prose}>
            <p>You’re the CEO, the marketer, the salesperson, the customer-service team and the administrator — and sometimes the person making the coffee.</p>
            <p>The problem usually isn’t that you don’t work hard enough. It’s that too much of your business depends on you remembering, deciding and doing everything manually.</p>
            <p><strong>AI can help — but using an AI chatbot occasionally isn’t a system.</strong> Without context and a repeatable process, you get generic answers and inconsistent results.</p>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className={`${styles.section} ${styles.tint}`}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>The approach</span>
          <h2 className={styles.h2}>An operating system for your business — not another piece of software.</h2>
          <p className={styles.lead}>
            You build a practical framework around the AI tools you choose: your business context, reusable prompts, documented workflows,
            review routines and measurement. AI drafts, organises and accelerates. You provide the judgement and final approval.
          </p>
          <ol className={styles.sequence}>
            {['Clarify', 'Standardize', 'Systemize', 'Automate', 'Optimize'].map((s, i) => (
              <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>
            ))}
          </ol>
          <p className={styles.small}>The book’s golden rule: get the process right before you add tools. Don’t automate chaos.</p>
        </div>
      </section>

      {/* 20 systems */}
      <section className={styles.section} id="inside">
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>What’s inside</span>
          <h2 className={styles.h2}>20 systems in four parts</h2>
          <div className={styles.parts}>
            {parts.map((p) => (
              <div key={p.name} className={styles.part}>
                <div className={styles.partHead}><h3>{p.name}</h3><p>{p.note}</p></div>
                <ol>
                  {p.systems.map((s, i) => (
                    <li key={s}><span>{String(p.start + i).padStart(2, '0')}</span>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className={`${styles.section} ${styles.tint}`}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Look inside</span>
          <h2 className={styles.h2}>Pages, prompts and worksheets</h2>
          <div className={styles.previews}>
            {previews.map((p) => (
              <figure key={p.src} className={styles.preview}>
                <div className={styles.previewImg}>
                  <Image src={`${IMG}/${p.src}`} alt={`Sample page: ${p.title} (${p.page})`} width={911} height={1287} sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 340px" />
                </div>
                <figcaption><span>{p.page}</span><strong>{p.title}</strong>{p.text}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.twoCol}`}>
          <div className={styles.card}>
            <span className={styles.eyebrow}>Who it’s for</span>
            <ul className={styles.ticks}>
              <li>Solo founders, freelancers and creators</li>
              <li>Small business owners and small teams</li>
              <li>People new to AI who want a clear, structured starting point</li>
              <li>Anyone already using AI who wants consistent results, not one-off answers</li>
            </ul>
          </div>
          <div className={`${styles.card} ${styles.cardMuted}`}>
            <span className={styles.eyebrowMuted}>It isn’t</span>
            <ul className={styles.crosses}>
              <li>Software, an app or a set of prebuilt automations</li>
              <li>A subscription to any AI tool</li>
              <li>Personal consulting or done-for-you setup</li>
              <li>A promise of overnight results — it’s a practical workbook you put into action</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className={`${styles.section} ${styles.navy}`}>
        <div className={styles.wrap}>
          <span className={styles.eyebrowLight}>What you’ll build</span>
          <h2 className={`${styles.h2} ${styles.onDark}`}>What you’ll be able to put in place</h2>
          <div className={styles.outcomes}>
            {outcomes.map(([t, d], i) => (
              <div key={t} className={styles.outcome}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <p className={styles.noteDark}>Every system includes a human review step. Prompts are starting points — you review, verify and adapt the output before it reaches your business.</p>
        </div>
      </section>

      {/* Author */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <span className={styles.eyebrow}>About the author</span>
            <h2 className={styles.h2}>Bismark Apenkwah</h2>
            <Mark />
          </div>
          <div className={styles.prose}>
            <p>Bismark Apenkwah is the founder of Bisacom. His background spans graphic design, brand design, product design and front-end development — work that sits where business needs, design thinking and technology meet.</p>
            <p>Through Bisacom, he focuses on practical digital solutions that help businesses use technology more effectively. <em>AI Business Systems</em> applies that same design-led, systems-first approach to AI, so small business owners can use it responsibly, with their own judgement firmly in charge.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`${styles.section} ${styles.tint}`} id="buy">
        <div className={styles.wrap}>
          <div className={styles.pricing}>
            <div className={styles.priceCover}>
              <Image src={`${IMG}/cover.webp`} alt="" width={911} height={1287} sizes="220px" />
            </div>
            <div className={styles.priceBody}>
              <span className={styles.eyebrow}>Get the workbook</span>
              <h2 className={styles.h2}>AI Business Systems — 2026 Edition</h2>
              <p className={styles.price}>{PRICE}<span> one-off · PDF{onSale ? '' : ' · launching soon'}</span></p>
              <ul className={styles.included}>
                {included.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <BuyButton />
              {onSale && (
                <p className={styles.secure}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                Secure checkout by {checkoutNames}. Your PDF is delivered after payment.
              </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.narrow}`}>
          <span className={styles.eyebrow}>Questions</span>
          <h2 className={styles.h2}>Before you buy</h2>
          <div className={styles.faqs}>
            {faqs.map(([q, a]) => (
              <details key={q} className={styles.faq}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`${styles.section} ${styles.navy} ${styles.final}`}>
        <div className={`${styles.wrap} ${styles.narrow}`}>
          <h2 className={`${styles.h2} ${styles.onDark}`}>One system at a time. One process at a time.</h2>
          <p className={styles.finalLead}>Start with your Business Brain, then build the rest at a pace that fits your business.</p>
          <BuyButton light />
        </div>
      </section>
    </div>
  );
}
