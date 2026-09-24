import { useEffect, useMemo, useRef, useState } from "react";
import {
  audience,
  authority,
  comparison,
  faq,
  heroes,
  lots,
  method,
  offer,
  result,
  scene,
  schedule,
} from "./content";

const appRoutes = ["/a1", "/a2", "/a3", "/obrigado"] as const;
const routeKeys = appRoutes.slice(0, 3).map((route) => route.slice(1)) as ["a1", "a2", "a3"];
type RouteKey = (typeof routeKeys)[number];

function currentRoute(): RouteKey | "obrigado" {
  const route = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (route === "obrigado") return "obrigado";
  return routeKeys.includes(route as RouteKey) ? (route as RouteKey) : "a1";
}

function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.setAttribute("data-visible", "true"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function CTA({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a className={`cta ${className}`} href="#oferta">
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}

function SignalBars({ stage }: { stage: number }) {
  const profiles = useMemo(
    () => [
      [25, 62, 32, 84, 18, 70, 44, 91, 28, 55, 20, 74, 34, 88, 41, 66, 24, 78, 47, 36],
      [36, 48, 58, 72, 44, 66, 76, 82, 52, 70, 48, 76, 58, 84, 62, 72, 46, 68, 54, 42],
      [48, 56, 64, 72, 60, 76, 68, 80, 64, 72, 62, 78, 66, 82, 70, 76, 58, 68, 60, 52],
    ],
    [],
  );
  return (
    <div className="signal-bars" aria-hidden="true">
      {profiles[stage].map((height, index) => (
        <i key={index} style={{ "--bar-height": `${height}%`, "--bar-index": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

function SignalDesk({ compact = false }: { compact?: boolean }) {
  const [stage, setStage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.toggleAttribute("data-in-view", entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const labels = ["Gravar", "Dirigir", "Comparar"];
  return (
    <div className={`signal-desk ${compact ? "signal-desk-compact" : ""}`} ref={ref}>
      <div className="signal-topline" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="signal-display">
        <div className="signal-grid" aria-hidden="true" />
        <SignalBars stage={stage} />
        <span className="signal-marker" aria-hidden="true" />
      </div>
      <div className="signal-controls" role="group" aria-label="Etapas do método">
        {labels.map((label, index) => (
          <button
            type="button"
            key={label}
            aria-pressed={stage === index}
            onClick={() => setStage(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Maestro Adeildo Lopes, início">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>Maestro Adeildo Lopes</span>
      </a>
      <CTA label="QUERO PARTICIPAR POR R$29,90" className="cta-small" />
    </header>
  );
}

function HeroSection({ route }: { route: RouteKey }) {
  const hero = heroes[route];
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        {hero.kicker && <p className="eyebrow hero-item">{hero.kicker}</p>}
        <h1 className="hero-item">{hero.title}</h1>
        <div className="hero-paragraphs hero-item">
          {hero.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="hero-action hero-item">
          <CTA label={hero.cta} />
          {hero.detail && <p>{hero.detail}</p>}
        </div>
      </div>
      <div className="hero-visual hero-item">
        <figure className="hero-photo">
          <img
            src="/assets/adeildo-hero-studio-v2.webp"
            width="1086"
            height="1448"
            alt="Maestro Adeildo Lopes com violão em um estúdio de gravação iluminado"
            fetchPriority="high"
          />
          <div className="hero-photo-signal" aria-hidden="true">
            <SignalBars stage={2} />
          </div>
        </figure>
      </div>
    </section>
  );
}

function SceneSection() {
  return (
    <section className="scene section" data-reveal>
      <div className="scene-heading">
        <p className="eyebrow">{scene.kicker}</p>
        <h2>{scene.title}</h2>
      </div>
      <div className="scene-body">
        {scene.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <blockquote>{scene.statement}</blockquote>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="comparison section" data-reveal>
      <div className="comparison-art" aria-hidden="true">
        <div className="phone-signal"><SignalBars stage={0} /></div>
        <div className="comparison-line"><span /></div>
        <div className="studio-signal"><SignalBars stage={2} /></div>
      </div>
      <div className="comparison-copy">
        <h2>{comparison.title}</h2>
        {comparison.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function MethodSection() {
  const [stage, setStage] = useState(0);
  return (
    <section className="method section" data-reveal>
      <div className="section-heading">
        <h2>{method.title}</h2>
      </div>
      <div className="method-layout">
        <ol className="method-steps">
          {method.steps.map((step, index) => {
            const separator = step.indexOf(": ");
            const label = step.slice(0, separator);
            const description = step.slice(separator + 2);
            return (
              <li key={step}>
                <button type="button" onClick={() => setStage(index)} aria-pressed={stage === index}>
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{label}:</strong> {description}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="method-signal">
          <div className="method-screen">
            <SignalBars stage={stage} />
          </div>
          <div className="method-dials" aria-hidden="true"><i /><i /><i /></div>
        </div>
      </div>
      <p className="method-closing">{method.closing}</p>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section className="schedule section" data-reveal>
      <div className="section-heading compact-heading"><h2>{schedule.title}</h2></div>
      <ol className="timeline">
        {schedule.items.map((item, index) => {
          const separator = item.indexOf(": ");
          const label = item.slice(0, separator);
          const description = item.slice(separator + 2);
          return (
            <li key={item} style={{ "--item-index": index } as React.CSSProperties}>
              <span className="timeline-dot" aria-hidden="true" />
              <div><strong>{label}:</strong> {description}</div>
            </li>
          );
        })}
      </ol>
      <CTA label="QUERO PARTICIPAR POR R$29,90" />
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="audience section" data-reveal>
      <div className="audience-column audience-for">
        <h2>{audience.forTitle}</h2>
        <ul>{audience.forItems.map((item) => <li key={item}><CheckIcon /><span>{item}</span></li>)}</ul>
      </div>
      <div className="audience-column audience-not">
        <h2>{audience.notTitle}</h2>
        <ul>{audience.notItems.map((item) => <li key={item}><span className="minus" aria-hidden="true" /><span>{item}</span></li>)}</ul>
      </div>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section className="authority section" data-reveal>
      <figure className="authority-photo">
        <img
          src="/assets/adeildo-authority-studio-v2.webp"
          width="1448"
          height="1086"
          loading="lazy"
          alt="Maestro Adeildo Lopes sentado diante de uma mesa de áudio em estúdio"
        />
        <span className="authority-years" aria-hidden="true">30+</span>
      </figure>
      <div className="authority-copy">
        <h2>{authority.title}</h2>
        {authority.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 1 ? "authority-proof" : ""}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section className="offer section" id="oferta" data-reveal>
      <div className="offer-main">
        <p className="eyebrow">Sua Voz do Jeito Certo</p>
        <h2>{offer.title}</h2>
        <ul>{offer.items.map((item) => <li key={item}><CheckIcon /><span>{item}</span></li>)}</ul>
        <p className="investment">{offer.investment}</p>
        <p className="offer-note">{offer.note}</p>
        <CTA label={offer.cta} />
      </div>
      <div className="lots" role="list" aria-label="Comparação de lotes">
        {lots.map((lot) => (
          <article role="listitem" key={lot.name} className={lot.current ? "lot lot-current" : "lot"} aria-current={lot.current ? "true" : undefined}>
            <div><p>{lot.name}</p><span>{lot.state}</span></div>
            <strong>{lot.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResultSection() {
  return (
    <section className="result section" data-reveal>
      <div className="result-signal" aria-hidden="true"><SignalBars stage={2} /></div>
      <div>
        <h2>{result.title}</h2>
        {result.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="faq section" data-reveal>
      <div className="section-heading compact-heading"><h2>{faq.title}</h2></div>
      <div className="faq-list">
        {faq.items.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary><span>{question}</span><i aria-hidden="true" /></summary>
            <div><p>{answer}</p></div>
          </details>
        ))}
      </div>
      <div className="final-cta"><CTA label={faq.cta} /></div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="brand footer-brand">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>Maestro Adeildo Lopes</span>
      </div>
      <a href="#top" aria-label="Voltar ao início"><ArrowIcon /></a>
    </footer>
  );
}

function SalesPage({ route }: { route: RouteKey }) {
  useReveal();
  useScrollProgress();
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <HeroSection route={route} />
        <SceneSection />
        <ComparisonSection />
        <MethodSection />
        <ScheduleSection />
        <AudienceSection />
        <AuthoritySection />
        <OfferSection />
        <ResultSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

function ThankYouPage() {
  return (
    <main className="thank-you">
      <div className="thank-you-card">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>Maestro Adeildo Lopes</span>
        </div>
        <SignalDesk compact />
        <p className="eyebrow">Sua Voz do Jeito Certo</p>
        <h1>Inscrição confirmada.</h1>
        <p>Obrigado por participar.</p>
      </div>
    </main>
  );
}

export default function App() {
  const route = currentRoute();
  return route === "obrigado" ? <ThankYouPage /> : <SalesPage route={route} />;
}
