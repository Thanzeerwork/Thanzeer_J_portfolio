import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { ContactScript } from "@/components/ContactScript";

export const metadata: Metadata = {
  title: "Contact Thanzeer J | Full-Stack Developer & Software Developer",
  description:
    "Connect with Thanzeer J, full-stack web and mobile developer based in Kerala, India. Reach out for projects, development inquiries, or collaborations.",
};

export default function Page_contact() {
  return (
    <>
      <ContactScript />

      {/* Hero Section */}
      <section className="hero wrap" data-hero data-astro-cid-6bfsojfh>
        <nav className="note crumbs" aria-label="Breadcrumb" data-astro-cid-6bfsojfh>
          <Link href="/" className="link" data-astro-cid-6bfsojfh>Home</Link> / <span className="note--ink" data-astro-cid-6bfsojfh>Contact</span>
        </nav>
        <p className="note" data-astro-cid-6bfsojfh>[Contact / 05]</p>
        <h1 className="hero__title" data-astro-cid-6bfsojfh>
          <span className="display hero__human" data-hero-human data-bp="h1.human" data-astro-cid-6bfsojfh>
            Let&apos;s Connect.
          </span>
          <span className="h2 hero__machine" data-hero-generate data-bp="h1.machine" data-astro-cid-6bfsojfh>
            Have a project or idea in mind? Reach out via email, phone, or LinkedIn.
          </span>
        </h1>
        <p className="note" data-hero-fade data-astro-cid-6bfsojfh>
          <span className="note--accent" data-astro-cid-6bfsojfh>◆</span> machine · generated · <span data-gen-tokens data-astro-cid-6bfsojfh>17</span> tokens · <span data-gen-ms data-astro-cid-6bfsojfh>1480</span> ms
        </p>
        <dl className="spec" data-hero-fade data-bp="dl.spec" data-astro-cid-6bfsojfh>
          <div className="spec__row" data-astro-cid-6bfsojfh>
            <dt className="note" data-astro-cid-6bfsojfh>Email</dt>
            <dd data-astro-cid-6bfsojfh>
              <a href="mailto:thanzeerwork@gmail.com" className="link" data-astro-cid-6bfsojfh>
                thanzeerwork@gmail.com
              </a>
              <button type="button" className="copy note" data-copy="thanzeerwork@gmail.com" aria-label="Copy email address" data-astro-cid-6bfsojfh>
                Copy
              </button>
              <span className="sr-only" role="status" data-copy-status data-astro-cid-6bfsojfh></span>
            </dd>
          </div>
          <div className="spec__row" data-astro-cid-6bfsojfh>
            <dt className="note" data-astro-cid-6bfsojfh>Reply</dt>
            <dd data-astro-cid-6bfsojfh>Within 24h · Mon–Fri</dd>
          </div>
          <div className="spec__row" data-astro-cid-6bfsojfh>
            <dt className="note" data-astro-cid-6bfsojfh>Local time</dt>
            <dd data-astro-cid-6bfsojfh>
              <span className="spec__live" data-desk aria-hidden="true" data-astro-cid-6bfsojfh></span>
              <span data-clock data-astro-cid-6bfsojfh>Kerala · IST (UTC+5:30)</span>
            </dd>
          </div>
          <div className="spec__row" data-astro-cid-6bfsojfh>
            <dt className="note" data-astro-cid-6bfsojfh>Status</dt>
            <dd data-astro-cid-6bfsojfh>
              <span className="spec__live" aria-hidden="true" data-astro-cid-6bfsojfh></span>
              Taking on new projects
            </dd>
          </div>
        </dl>
        <div className="hero__ctas" data-hero-fade data-astro-cid-6bfsojfh>
          <a href="#brief" className="btn" data-astro-cid-6bfsojfh id="btn-write-brief">
            Write a brief <span className="arrow" data-astro-cid-6bfsojfh>↓</span>
          </a>
          <a href="#call" className="btn btn--ghost" data-astro-cid-6bfsojfh id="btn-book-call">
            Book a 30-min call <span className="arrow" data-astro-cid-6bfsojfh>↓</span>
          </a>
        </div>
      </section>

      {/* [01] The Brief Section */}
      <section className="section wrap" id="brief" data-astro-cid-6bfsojfh>
        <header className="section-head" data-astro-cid-6bfsojfh>
          <span className="note note--ink" data-astro-cid-6bfsojfh>[01] The brief</span>
          <span className="note" data-astro-cid-6bfsojfh>≈ 2 min · 6 fields</span>
        </header>
        <h2 className="h2 brief__claim" data-reveal="lines" data-astro-cid-6bfsojfh>
          Tell me what you&apos;re building. I&apos;ll tell you what it takes.
        </h2>
        <div className="brief-wrap grid-12" data-astro-cid-j2wapkrq>
          <form action="/contact" className="brief" data-astro-cid-j2wapkrq data-brief method="POST" name="contact">
            <input type="hidden" name="form-name" value="contact" data-astro-cid-j2wapkrq />
            <p className="brief__hp" hidden data-astro-cid-j2wapkrq>
              <label data-astro-cid-j2wapkrq>
                Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" data-astro-cid-j2wapkrq />
              </label>
            </p>
            <div className="field" data-reveal="up" data-astro-cid-j2wapkrq>
              <label htmlFor="f-name" className="field__label" data-astro-cid-j2wapkrq>
                <span className="note note--accent" aria-hidden="true" data-astro-cid-j2wapkrq>01</span>{" "}
                <span className="note note--ink" data-astro-cid-j2wapkrq>Your name</span>{" "}
                <span className="note" data-astro-cid-j2wapkrq>Required</span>
              </label>
              <input id="f-name" name="name" className="field__input" autoComplete="name" required placeholder="e.g. Ada Lovelace" data-astro-cid-j2wapkrq />
              <p className="field__error note" id="f-name-error" data-error-htmlFor="f-name" hidden data-astro-cid-j2wapkrq>
                Please enter your name.
              </p>
            </div>
            <div className="field" data-reveal="up" data-astro-cid-j2wapkrq>
              <label htmlFor="f-email" className="field__label" data-astro-cid-j2wapkrq>
                <span className="note note--accent" aria-hidden="true" data-astro-cid-j2wapkrq>02</span>{" "}
                <span className="note note--ink" data-astro-cid-j2wapkrq>Email</span>{" "}
                <span className="note" data-astro-cid-j2wapkrq>Required</span>
              </label>
              <input id="f-email" name="email" type="email" className="field__input" autoComplete="email" required placeholder="e.g. ada@agency.studio" data-astro-cid-j2wapkrq />
              <p className="field__error note" id="f-email-error" data-error-htmlFor="f-email" hidden data-astro-cid-j2wapkrq>
                Please enter a valid email address, like ada@agency.studio.
              </p>
            </div>
            <div className="field" data-reveal="up" data-astro-cid-j2wapkrq>
              <label htmlFor="f-company" className="field__label" data-astro-cid-j2wapkrq>
                <span className="note note--accent" aria-hidden="true" data-astro-cid-j2wapkrq>03</span>{" "}
                <span className="note note--ink" data-astro-cid-j2wapkrq>Agency or company</span>{" "}
                <span className="note" data-astro-cid-j2wapkrq>Optional</span>
              </label>
              <input id="f-company" name="company" className="field__input" autoComplete="organization" placeholder="e.g. Analytical Engines Ltd." data-astro-cid-j2wapkrq />
            </div>
            <fieldset className="field" data-reveal="up" data-astro-cid-j2wapkrq>
              <legend className="field__label" data-astro-cid-j2wapkrq>
                <span className="note note--accent" aria-hidden="true" data-astro-cid-j2wapkrq>04</span>{" "}
                <span className="note note--ink" data-astro-cid-j2wapkrq>What do you need?</span>{" "}
                <span className="note" data-astro-cid-j2wapkrq>Pick any</span>
              </legend>
              <div className="chips" data-astro-cid-j2wapkrq>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="checkbox" name="needs[]" value="Web development" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>Web development</span>
                </label>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="checkbox" name="needs[]" value="Mobile App Development" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>Mobile App Development</span>
                </label>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="checkbox" name="needs[]" value="Backend &amp; Database" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>Backend &amp; Database</span>
                </label>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="checkbox" name="needs[]" value="Not sure yet" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>Not sure yet</span>
                </label>
              </div>
            </fieldset>
            <fieldset className="field" data-reveal="up" data-astro-cid-j2wapkrq>
              <legend className="field__label" data-astro-cid-j2wapkrq>
                <span className="note note--accent" aria-hidden="true" data-astro-cid-j2wapkrq>05</span>{" "}
                <span className="note note--ink" data-astro-cid-j2wapkrq>Timeline</span>{" "}
                <span className="note" data-astro-cid-j2wapkrq>Pick one</span>
              </legend>
              <div className="chips" data-astro-cid-j2wapkrq>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="radio" name="timeline" value="ASAP" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>ASAP</span>
                </label>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="radio" name="timeline" value="1–3 months" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>1–3 months</span>
                </label>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="radio" name="timeline" value="Later this year" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>Later this year</span>
                </label>
                <label className="chip" data-astro-cid-j2wapkrq>
                  <input type="radio" name="timeline" value="Just exploring" data-astro-cid-j2wapkrq />
                  <span data-astro-cid-j2wapkrq>Just exploring</span>
                </label>
              </div>
            </fieldset>
            <div className="field" data-reveal="up" data-astro-cid-j2wapkrq>
              <label htmlFor="f-message" className="field__label" data-astro-cid-j2wapkrq>
                <span className="note note--accent" aria-hidden="true" data-astro-cid-j2wapkrq>06</span>{" "}
                <span className="note note--ink" data-astro-cid-j2wapkrq>The brief</span>{" "}
                <span className="note" data-astro-cid-j2wapkrq>Required</span>
              </label>
              <textarea id="f-message" name="message" className="field__input field__input--area" rows={5} required placeholder="What are you building, for whom, and what makes it hard? Links to a deck or Figma are welcome." data-astro-cid-j2wapkrq></textarea>
              <p className="field__error note" id="f-message-error" data-error-htmlFor="f-message" hidden data-astro-cid-j2wapkrq>
                Please write a few words about the project.
              </p>
            </div>
            <div className="checks" data-reveal="up" data-astro-cid-j2wapkrq>
              <label className="check" data-astro-cid-j2wapkrq>
                <input type="checkbox" name="nda" value="yes" data-astro-cid-j2wapkrq />
                <span className="check__box" aria-hidden="true" data-astro-cid-j2wapkrq></span>
                <span data-astro-cid-j2wapkrq>Send me an NDA before we go into detail.</span>
              </label>
              <label className="check" data-astro-cid-j2wapkrq>
                <input type="checkbox" id="f-terms" name="terms" value="accepted" required data-astro-cid-j2wapkrq />
                <span className="check__box" aria-hidden="true" data-astro-cid-j2wapkrq></span>
                <span data-astro-cid-j2wapkrq>
                  I agree that my data is used only to reply to me, as described in the{" "}
                  <Link href="/privacy-policy" className="link link--inline" data-astro-cid-j2wapkrq>privacy policy</Link>.{" "}
                  <span className="note" data-astro-cid-j2wapkrq>Required</span>
                </span>
              </label>
              <p className="field__error note" id="f-terms-error" data-error-htmlFor="f-terms" hidden data-astro-cid-j2wapkrq>
                Please accept the privacy terms to send the brief.
              </p>
            </div>
            <div className="brief__submit" data-reveal="up" data-astro-cid-j2wapkrq>
              <button type="submit" className="btn" data-brief-send data-astro-cid-j2wapkrq>
                Send the brief <span className="arrow" data-astro-cid-j2wapkrq>→</span>
              </button>
              <p className="note" data-astro-cid-j2wapkrq>Reply within 24h · Mon–Fri</p>
            </div>
            <p className="brief__error" data-brief-error hidden role="alert" data-astro-cid-j2wapkrq>
              Something went wrong on the way. Nothing is lost: copy your text and write to{" "}
              <a href="mailto:thanzeerwork@gmail.com" className="link link--inline" data-astro-cid-j2wapkrq>
                thanzeerwork@gmail.com
              </a>.
            </p>
          </form>

          <div className="brief__done" data-brief-done hidden tabIndex={-1} data-astro-cid-j2wapkrq>
            <p className="note note--accent" data-astro-cid-j2wapkrq>200 OK · brief received</p>
            <p className="h2" data-astro-cid-j2wapkrq>
              Thanks<span data-done-name data-astro-cid-j2wapkrq></span>. I&apos;ll be in touch.
            </p>
            <p className="lead brief__done-body" data-astro-cid-j2wapkrq>
              Expect a reply at <strong data-done-email data-astro-cid-j2wapkrq>your inbox</strong> within 24 hours, Monday to Friday, usually with a couple of questions and a slot for a call.
            </p>
            <Link href="/blog" className="btn btn--ghost" data-astro-cid-j2wapkrq>
              Meanwhile, read the blog
            </Link>
          </div>

          <aside className="readout" aria-hidden="true" data-astro-cid-j2wapkrq>
            <div className="readout__sheet" data-astro-cid-j2wapkrq>
              <div className="readout__bar" data-astro-cid-j2wapkrq>
                <span className="note note--ink" data-astro-cid-j2wapkrq>brief.json</span>
                <span className="readout__status note" data-out-status data-astro-cid-j2wapkrq>draft</span>
              </div>
              <div className="readout__code" data-astro-cid-j2wapkrq>
                <div className="readout__ln" data-astro-cid-j2wapkrq>&#123;</div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>
                  &nbsp;&nbsp;<span className="readout__k" data-astro-cid-j2wapkrq>&quot;from&quot;</span>:{" "}
                  <span className="readout__v is-null" data-out="name" data-astro-cid-j2wapkrq>null</span>,
                </div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>
                  &nbsp;&nbsp;<span className="readout__k" data-astro-cid-j2wapkrq>&quot;email&quot;</span>:{" "}
                  <span className="readout__v is-null" data-out="email" data-astro-cid-j2wapkrq>null</span>,
                </div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>
                  &nbsp;&nbsp;<span className="readout__k" data-astro-cid-j2wapkrq>&quot;company&quot;</span>:{" "}
                  <span className="readout__v is-null" data-out="company" data-astro-cid-j2wapkrq>null</span>,
                </div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>
                  &nbsp;&nbsp;<span className="readout__k" data-astro-cid-j2wapkrq>&quot;needs&quot;</span>:{" "}
                  <span className="readout__v is-null" data-out="needs" data-astro-cid-j2wapkrq>null</span>,
                </div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>
                  &nbsp;&nbsp;<span className="readout__k" data-astro-cid-j2wapkrq>&quot;timeline&quot;</span>:{" "}
                  <span className="readout__v is-null" data-out="timeline" data-astro-cid-j2wapkrq>null</span>,
                </div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>
                  &nbsp;&nbsp;<span className="readout__k" data-astro-cid-j2wapkrq>&quot;nda&quot;</span>:{" "}
                  <span className="readout__v is-null" data-out="nda" data-astro-cid-j2wapkrq>null</span>,
                </div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>
                  &nbsp;&nbsp;<span className="readout__k" data-astro-cid-j2wapkrq>&quot;words&quot;</span>:{" "}
                  <span className="readout__v is-null" data-out="words" data-astro-cid-j2wapkrq>null</span>
                </div>
                <div className="readout__ln" data-astro-cid-j2wapkrq>&#125;</div>
              </div>
              <div className="readout__meter" data-astro-cid-j2wapkrq>
                <span data-out-meter data-astro-cid-j2wapkrq></span>
              </div>
              <p className="readout__foot note" data-astro-cid-j2wapkrq>
                <span data-astro-cid-j2wapkrq>
                  Required <span data-out-req data-astro-cid-j2wapkrq>0/4</span>
                </span>
                <span data-astro-cid-j2wapkrq>Compiled locally · sent only on submit</span>
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* [02] Prefer to Talk / 30-min Call Section */}
      <section className="section wrap" id="call" data-astro-cid-6bfsojfh>
        <header className="section-head" data-astro-cid-6bfsojfh>
          <span className="note note--ink" data-astro-cid-6bfsojfh>[02] Prefer to talk?</span>
          <span className="note" data-astro-cid-6bfsojfh>Video call · 30 min</span>
        </header>
        <div className="call grid-12" data-astro-cid-6bfsojfh>
          <div className="call__intro" data-astro-cid-6bfsojfh>
            <h2 className="h1 call__title" data-reveal="lines" data-astro-cid-6bfsojfh>
              Thirty minutes. Direct connect.
            </h2>
            <p className="lead call__lead" data-reveal="up" data-astro-cid-6bfsojfh>
              Bring the brief, or just the idea. By the end of the call you&apos;ll know whether I&apos;m the right developer for it, and when we could start.
            </p>
          </div>
          <div className="ticket" data-reveal="up" data-astro-cid-6bfsojfh>
            <div className="ticket__head" data-astro-cid-6bfsojfh>
              <span className="note note--ink" data-astro-cid-6bfsojfh>Call · 30 min</span>
              <span className="note" data-astro-cid-6bfsojfh>Google Meet / WhatsApp / Phone</span>
            </div>
            <ol className="ticket__agenda" data-astro-cid-6bfsojfh>
              <li data-astro-cid-6bfsojfh>
                <span className="note" data-astro-cid-6bfsojfh>01</span>
                <span>Your project requirements, timeline, and goals</span>
              </li>
              <li data-astro-cid-6bfsojfh>
                <span className="note" data-astro-cid-6bfsojfh>02</span>
                <span>Technical architecture, tech stack &amp; delivery roadmap</span>
              </li>
              <li data-astro-cid-6bfsojfh>
                <span className="note" data-astro-cid-6bfsojfh>03</span>
                <span>Next steps: scope estimate, kickoff date, NDA if needed</span>
              </li>
            </ol>
            <div className="ticket__foot" data-astro-cid-6bfsojfh style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="mailto:thanzeerwork@gmail.com?subject=Book%20a%2030-Minute%20Call%20with%20Thanzeer&body=Hi%20Thanzeer,%0A%0AI%20would%20like%20to%20schedule%20a%2030-minute%20call%20to%20discuss%20a%20project.%0A%0AAvailable%20times:%0AProject%20Overview:%0A"
                className="btn"
                target="_blank"
                rel="noopener"
                data-astro-cid-6bfsojfh
              >
                Book via Email <span className="arrow" data-astro-cid-6bfsojfh>↗</span>
              </a>
              <a
                href="https://wa.me/919895654031?text=Hi%20Thanzeer,%20I%20would%20like%20to%20schedule%20a%2030-minute%20call%20to%20discuss%20a%20project."
                className="btn btn--ghost"
                target="_blank"
                rel="noopener"
                data-astro-cid-6bfsojfh
              >
                WhatsApp (+91 98956 54031) <span className="arrow" data-astro-cid-6bfsojfh>↗</span>
              </a>
              <a
                href="tel:+919895654031"
                className="btn btn--ghost"
                data-astro-cid-6bfsojfh
              >
                Call <span className="arrow" data-astro-cid-6bfsojfh>↗</span>
              </a>
              <span className="note" data-astro-cid-6bfsojfh>Kerala · IST (UTC+5:30)</span>
            </div>
          </div>
        </div>
      </section>

      {/* [03] What Happens Next Section */}
      <section className="section wrap" id="next" data-astro-cid-6bfsojfh>
        <header className="section-head" data-astro-cid-6bfsojfh>
          <span className="note note--ink" data-astro-cid-6bfsojfh>[03] What happens next</span>
          <span className="note" data-astro-cid-6bfsojfh>4 steps</span>
        </header>
        <div className="next__line" data-draw data-astro-cid-6bfsojfh></div>
        <ol className="next grid-12" data-astro-cid-6bfsojfh>
          <li className="step" data-reveal="up" data-astro-cid-6bfsojfh>
            <span className="step__dot" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            <span className="step__meta note" data-astro-cid-6bfsojfh>
              <span data-astro-cid-6bfsojfh>01</span>
              <span className="note--accent" data-astro-cid-6bfsojfh>&lt; 24h · Mon–Fri</span>
            </span>
            <h3 className="step__title" data-astro-cid-6bfsojfh>Reply</h3>
            <p className="step__body" data-astro-cid-6bfsojfh>
              A human answer, usually with a couple of questions and a slot for a call.
            </p>
          </li>
          <li className="step" data-reveal="up" data-astro-cid-6bfsojfh>
            <span className="step__dot" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            <span className="step__meta note" data-astro-cid-6bfsojfh>
              <span data-astro-cid-6bfsojfh>02</span>
              <span className="note--accent" data-astro-cid-6bfsojfh>30 min</span>
            </span>
            <h3 className="step__title" data-astro-cid-6bfsojfh>Call</h3>
            <p className="step__body" data-astro-cid-6bfsojfh>
              We go through the brief. NDA first, if you prefer.
            </p>
          </li>
          <li className="step" data-reveal="up" data-astro-cid-6bfsojfh>
            <span className="step__dot" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            <span className="step__meta note" data-astro-cid-6bfsojfh>
              <span data-astro-cid-6bfsojfh>03</span>
              <span className="note--accent" data-astro-cid-6bfsojfh>≈ 2 weeks</span>
            </span>
            <h3 className="step__title" data-astro-cid-6bfsojfh>Proposal</h3>
            <p className="step__body" data-astro-cid-6bfsojfh>
              Scope, milestones, stack and a quote, in writing so your team can pass it on.
            </p>
          </li>
          <li className="step" data-reveal="up" data-astro-cid-6bfsojfh>
            <span className="step__dot" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            <span className="step__meta note" data-astro-cid-6bfsojfh>
              <span data-astro-cid-6bfsojfh>04</span>
              <span className="note--accent" data-astro-cid-6bfsojfh>Day 1</span>
            </span>
            <h3 className="step__title" data-astro-cid-6bfsojfh>Kick-off</h3>
            <p className="step__body" data-astro-cid-6bfsojfh>
              Access to your tools, a repo and staging from the first commit.
            </p>
          </li>
        </ol>
      </section>

      {/* [04] Elsewhere Section */}
      <section className="section wrap" id="elsewhere" data-astro-cid-6bfsojfh>
        <header className="section-head" data-astro-cid-6bfsojfh>
          <span className="note note--ink" data-astro-cid-6bfsojfh>[04] Elsewhere</span>
          <span className="note" data-astro-cid-6bfsojfh>4 channels</span>
        </header>
        <ul className="channels" data-astro-cid-6bfsojfh>
          <li className="channel" data-reveal="up" data-astro-cid-6bfsojfh>
            <a href="mailto:thanzeerwork@gmail.com" className="channel__link grid-12" data-fill data-astro-cid-6bfsojfh>
              <span className="channel__label note" data-astro-cid-6bfsojfh>Email</span>
              <span className="channel__handle h3" data-astro-cid-6bfsojfh>thanzeerwork@gmail.com</span>
              <span className="channel__body" data-astro-cid-6bfsojfh>Briefs, questions, NDAs. The fastest way to reach me.</span>
              <span className="channel__arrow" aria-hidden="true" data-astro-cid-6bfsojfh>→</span>
            </a>
          </li>
          <li className="channel" data-reveal="up" data-astro-cid-6bfsojfh>
            <a href="https://www.linkedin.com/in/thanzeer-j/" className="channel__link grid-12" data-fill target="_blank" rel="noopener noreferrer" data-astro-cid-6bfsojfh>
              <span className="channel__label note" data-astro-cid-6bfsojfh>LinkedIn</span>
              <span className="channel__handle h3" data-astro-cid-6bfsojfh>in/thanzeer-j</span>
              <span className="channel__body" data-astro-cid-6bfsojfh>Where I share new posts and work.</span>
              <span className="channel__arrow channel__arrow--ext" aria-hidden="true" data-astro-cid-6bfsojfh>↗</span>
            </a>
          </li>
          <li className="channel" data-reveal="up" data-astro-cid-6bfsojfh>
            <a href="https://github.com/Thanzeerwork" className="channel__link grid-12" data-fill target="_blank" rel="noopener noreferrer" data-astro-cid-6bfsojfh>
              <span className="channel__label note" data-astro-cid-6bfsojfh>GitHub</span>
              <span className="channel__handle h3" data-astro-cid-6bfsojfh>Thanzeerwork</span>
              <span className="channel__body" data-astro-cid-6bfsojfh>Open-source projects and experiments.</span>
              <span className="channel__arrow channel__arrow--ext" aria-hidden="true" data-astro-cid-6bfsojfh>↗</span>
            </a>
          </li>
          <li className="channel" data-reveal="up" data-astro-cid-6bfsojfh>
            <a href="https://ryphtech.in/" className="channel__link grid-12" data-fill target="_blank" rel="noopener noreferrer" data-astro-cid-6bfsojfh>
              <span className="channel__label note" data-astro-cid-6bfsojfh>Company</span>
              <span className="channel__handle h3" data-astro-cid-6bfsojfh>ryphtech.in</span>
              <span className="channel__body" data-astro-cid-6bfsojfh>Technology brand and digital solutions.</span>
              <span className="channel__arrow" aria-hidden="true" data-astro-cid-6bfsojfh>→</span>
            </a>
          </li>
        </ul>
      </section>

      {/* [05] FAQ Section */}
      <section className="section wrap" id="faq" data-astro-cid-6bfsojfh>
        <header className="section-head" data-astro-cid-6bfsojfh>
          <span className="note note--ink" data-astro-cid-6bfsojfh>[05] Before you write</span>
          <span className="note" data-astro-cid-6bfsojfh>Updated · <time dateTime="2026-10-21" data-astro-cid-6bfsojfh>Oct 2026</time></span>
        </header>
        <div className="faqs" data-astro-cid-6bfsojfh>
          <details className="faq" data-reveal="up" data-astro-cid-6bfsojfh>
            <summary data-astro-cid-6bfsojfh>
              <span className="h3" data-astro-cid-6bfsojfh>Can you sign an NDA before we talk?</span>
              <span className="faq__icon" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            </summary>
            <p data-astro-cid-6bfsojfh>
              Yes. Tick the box in the form or just ask by email: I&apos;ll sign yours or send mine before you share anything confidential.
            </p>
          </details>
          <details className="faq" data-reveal="up" data-astro-cid-6bfsojfh>
            <summary data-astro-cid-6bfsojfh>
              <span className="h3" data-astro-cid-6bfsojfh>Do you work with startups and businesses?</span>
              <span className="faq__icon" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            </summary>
            <p data-astro-cid-6bfsojfh>
              Yes, I collaborate with founders, product teams, and businesses on full-stack web applications, mobile builds, and backend architectures.
            </p>
          </details>
          <details className="faq" data-reveal="up" data-astro-cid-6bfsojfh>
            <summary data-astro-cid-6bfsojfh>
              <span className="h3" data-astro-cid-6bfsojfh>Can I get a quote without a call?</span>
              <span className="faq__icon" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            </summary>
            <p data-astro-cid-6bfsojfh>
              If the brief and scope are clear, yes: I can send a written estimate by email. For projects with architecture decisions or questions, a quick 30-minute call saves time.
            </p>
          </details>
          <details className="faq" data-reveal="up" data-astro-cid-6bfsojfh>
            <summary data-astro-cid-6bfsojfh>
              <span className="h3" data-astro-cid-6bfsojfh>What makes a good brief?</span>
              <span className="faq__icon" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            </summary>
            <p data-astro-cid-6bfsojfh>
              What you&apos;re building, the target users, key functionality, timelines, and any existing design assets or tech stack choices. A Figma file or architecture diagram is always great.
            </p>
          </details>
          <details className="faq" data-reveal="up" data-astro-cid-6bfsojfh>
            <summary data-astro-cid-6bfsojfh>
              <span className="h3" data-astro-cid-6bfsojfh>Which time zone are you in?</span>
              <span className="faq__icon" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            </summary>
            <p data-astro-cid-6bfsojfh>
              Kerala, India (IST / UTC+5:30). Available for remote software development across global time zones.
            </p>
          </details>
          <details className="faq" data-reveal="up" data-astro-cid-6bfsojfh>
            <summary data-astro-cid-6bfsojfh>
              <span className="h3" data-astro-cid-6bfsojfh>What happens to the data I send?</span>
              <span className="faq__icon" aria-hidden="true" data-astro-cid-6bfsojfh></span>
            </summary>
            <p data-astro-cid-6bfsojfh>
              Your contact details and brief are used strictly to reply to your inquiry. No marketing spam, no cookies.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
