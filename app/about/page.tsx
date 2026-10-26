import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { AgencyStats } from "@/components/AgencyStats";
import { ToolboxGrid } from "@/components/ToolboxGrid";
import { AgencyTestimonials } from "@/components/AgencyTestimonials";
import { AboutLanyard } from "@/components/AboutLanyard";

export const metadata: Metadata = {
  title: "About Thanzeer J | Full-Stack Developer & Software Developer",
  description: "Computer Science and Engineering graduate from Kerala, India, passionate about building responsive web applications, mobile apps, and useful digital products.",
};

export default function Page_about() {
  return (
    <>
      <AgencyStats />
<section className="hero wrap" data-hero data-astro-cid-ta2fbyqs><nav className="note crumbs" aria-label="Breadcrumb" data-astro-cid-ta2fbyqs><a href="/" className="link" data-astro-cid-ta2fbyqs>Home</a> / <span className="note--ink" data-astro-cid-ta2fbyqs>About</span></nav><p className="note" data-astro-cid-ta2fbyqs>[About / 03]</p><h1 className="hero__title" data-astro-cid-ta2fbyqs><span className="display hero__human" data-hero-human data-bp="h1.human" data-astro-cid-ta2fbyqs>Hi, I'm Thanzeer J.</span><span className="h2 hero__machine" data-hero-generate data-bp="h1.machine" data-astro-cid-ta2fbyqs>Full-Stack Developer | Web &amp; Mobile Application Developer based in Kerala, India.</span></h1><p className="note" data-hero-fade data-astro-cid-ta2fbyqs><span className="note--accent" data-astro-cid-ta2fbyqs>◆</span> machine · generated · <span data-gen-tokens data-astro-cid-ta2fbyqs>18</span> tokens · <span data-gen-ms data-astro-cid-ta2fbyqs>1520</span> ms</p><dl className="spec" data-hero-fade data-bp="dl.spec" data-astro-cid-ta2fbyqs><div className="spec__row" data-astro-cid-ta2fbyqs><dt className="note" data-astro-cid-ta2fbyqs>Based</dt><dd data-astro-cid-ta2fbyqs>Kerala, India</dd></div><div className="spec__row" data-astro-cid-ta2fbyqs><dt className="note" data-astro-cid-ta2fbyqs>Education</dt><dd data-astro-cid-ta2fbyqs>B.Tech in CSE</dd></div><div className="spec__row" data-astro-cid-ta2fbyqs><dt className="note" data-astro-cid-ta2fbyqs>Focus</dt><dd data-astro-cid-ta2fbyqs>Full-Stack & Mobile</dd></div><div className="spec__row" data-astro-cid-ta2fbyqs><dt className="note" data-astro-cid-ta2fbyqs>Status</dt><dd data-astro-cid-ta2fbyqs><span className="spec__live" aria-hidden="true" data-astro-cid-ta2fbyqs></span>Open for opportunities</dd></div><div className="spec__row" data-astro-cid-ta2fbyqs><dt className="note" data-astro-cid-ta2fbyqs>Resume</dt><dd data-astro-cid-ta2fbyqs><Link href="/resume" className="link" style={{ fontWeight: 600, color: "var(--accent-text)" }} data-astro-cid-ta2fbyqs>View Resume →</Link></dd></div></dl></section><section className="section wrap" id="story" data-astro-cid-ta2fbyqs><header className="section-head" data-astro-cid-ta2fbyqs><span className="note note--ink" data-astro-cid-ta2fbyqs>[01] Long story short</span><span className="note" data-astro-cid-ta2fbyqs>Kerala, IN</span></header><div className="story grid-12" data-astro-cid-ta2fbyqs><figure className="portrait" data-reveal="up" data-astro-cid-ta2fbyqs style={{ height: "auto" }}><AboutLanyard /></figure><div className="story__text" data-astro-cid-ta2fbyqs><p className="h3 story__lead" data-reveal="lines" data-astro-cid-ta2fbyqs>Turning Ideas Into Functional Digital Products.</p><div className="story__body" data-astro-cid-ta2fbyqs>
  <p data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="note story__note" data-astro-cid-ta2fbyqs>B.Tech CSE</span>
    I'm a Computer Science and Engineering graduate with a strong interest in software development and building meaningful digital experiences. My development journey focuses on understanding how applications work from the user interface to the underlying logic and data. I enjoy working with JavaScript-based technologies to create responsive websites, interactive interfaces, and mobile applications.
  </p>
  <p data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="note story__note" data-astro-cid-ta2fbyqs>Hands-On</span>
    Through my personal projects, I have explored different aspects of software development, including component-based frontend development, authentication, database integration, application workflows, and responsive user interfaces. I believe that good software is not just about writing code. It is about understanding a problem, designing an appropriate solution, and delivering something that people can use effectively.
  </p>
  <p data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="note story__note" data-astro-cid-ta2fbyqs>Real Problems</span>
    I am particularly interested in developing products that address practical challenges, such as reducing waiting times through digital prebooking, connecting customers with repair services, and helping organizations present their services online. My approach combines continuous learning, experimentation, and practical implementation.
  </p>
  <p data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="note story__note" data-astro-cid-ta2fbyqs>Continuous Growth</span>
    Alongside application development, I am interested in improving my understanding of the systems and technical concepts that support secure and reliable software, including Linux environments, networking fundamentals, and web application security.
  </p>
  <p className="story__quote" data-reveal="up" data-astro-cid-ta2fbyqs>
    <em data-astro-cid-ta2fbyqs>Good software is about understanding a problem, designing an appropriate solution, and delivering something that people can use effectively.</em>
  </p>
  <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }} data-reveal="up">
    <Link href="/resume" className="btn" data-astro-cid-ta2fbyqs>
      View Resume <span className="arrow" data-astro-cid-ta2fbyqs>↗</span>
    </Link>
    <a href="/resume.pdf" download="Thanzeer_J_Resume.pdf" className="btn btn--ghost" data-astro-cid-ta2fbyqs>
      Download PDF ↓
    </a>
  </div>
</div></div></div></section><section className="section wrap" id="changelog" data-astro-cid-ta2fbyqs><header className="section-head" data-astro-cid-ta2fbyqs><span className="note note--ink" data-astro-cid-ta2fbyqs>[02] Changelog</span><span className="note" data-astro-cid-ta2fbyqs>git log --reverse --oneline</span></header><div className="log__line" data-draw data-astro-cid-ta2fbyqs></div><ol className="log" data-astro-cid-ta2fbyqs>
  <li className="log__entry grid-12" data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="log__v note" data-astro-cid-ta2fbyqs>v1.0</span>
    <span className="log__year h3" data-astro-cid-ta2fbyqs>Foundation</span>
    <h2 className="log__title" data-astro-cid-ta2fbyqs>B.Tech in Computer Science and Engineering</h2>
    <div className="log__body" data-astro-cid-ta2fbyqs>
      <p data-astro-cid-ta2fbyqs>Academic foundation in software engineering, core data structures, algorithms, database systems, and object-oriented architecture.</p>
      <ul className="log__tags" data-astro-cid-ta2fbyqs><li className="note" data-astro-cid-ta2fbyqs>Algorithms</li><li className="note" data-astro-cid-ta2fbyqs>Data Structures</li><li className="note" data-astro-cid-ta2fbyqs>DBMS</li></ul>
    </div>
  </li>
  <li className="log__entry grid-12" data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="log__v note" data-astro-cid-ta2fbyqs>v2.0</span>
    <span className="log__year h3" data-astro-cid-ta2fbyqs>Frontend</span>
    <h2 className="log__title" data-astro-cid-ta2fbyqs>Modern Web &amp; Responsive UI</h2>
    <div className="log__body" data-astro-cid-ta2fbyqs>
      <p data-astro-cid-ta2fbyqs>Mastering JavaScript, HTML5, CSS3, React.js, Tailwind CSS, Vite, and component-based UI engineering for all screen viewports.</p>
      <ul className="log__tags" data-astro-cid-ta2fbyqs><li className="note" data-astro-cid-ta2fbyqs>React.js</li><li className="note" data-astro-cid-ta2fbyqs>Tailwind CSS</li><li className="note" data-astro-cid-ta2fbyqs>JavaScript</li></ul>
    </div>
  </li>
  <li className="log__entry grid-12" data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="log__v note" data-astro-cid-ta2fbyqs>v3.0</span>
    <span className="log__year h3" data-astro-cid-ta2fbyqs>Backend</span>
    <h2 className="log__title" data-astro-cid-ta2fbyqs>APIs, Databases &amp; Authentication</h2>
    <div className="log__body" data-astro-cid-ta2fbyqs>
      <p data-astro-cid-ta2fbyqs>Developing RESTful services with Node.js and Express.js, connecting persistent data stores in MongoDB, Cloud Firestore, and Supabase.</p>
      <ul className="log__tags" data-astro-cid-ta2fbyqs><li className="note" data-astro-cid-ta2fbyqs>Node.js</li><li className="note" data-astro-cid-ta2fbyqs>Express.js</li><li className="note" data-astro-cid-ta2fbyqs>MongoDB</li><li className="note" data-astro-cid-ta2fbyqs>Supabase</li></ul>
    </div>
  </li>
  <li className="log__entry grid-12" data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="log__v note" data-astro-cid-ta2fbyqs>v4.0</span>
    <span className="log__year h3" data-astro-cid-ta2fbyqs>Mobile</span>
    <h2 className="log__title" data-astro-cid-ta2fbyqs>Cross-Platform Mobile Development</h2>
    <div className="log__body" data-astro-cid-ta2fbyqs>
      <p data-astro-cid-ta2fbyqs>Building native-feeling mobile applications with React Native, React Navigation, mobile user authentication, and offline state handling.</p>
      <ul className="log__tags" data-astro-cid-ta2fbyqs><li className="note" data-astro-cid-ta2fbyqs>React Native</li><li className="note" data-astro-cid-ta2fbyqs>Navigation</li><li className="note" data-astro-cid-ta2fbyqs>Firebase</li></ul>
    </div>
  </li>
  <li className="log__entry grid-12" data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="log__v note" data-astro-cid-ta2fbyqs>v5.0</span>
    <span className="log__year h3" data-astro-cid-ta2fbyqs>Projects</span>
    <h2 className="log__title" data-astro-cid-ta2fbyqs>Live Production Applications</h2>
    <div className="log__body" data-astro-cid-ta2fbyqs>
      <p data-astro-cid-ta2fbyqs>Delivering the live RyphTech platform, the MealHub canteen prebooking system, Repairro doorstep repair logistics, and Student Management Portal.</p>
      <ul className="log__tags" data-astro-cid-ta2fbyqs><li className="note" data-astro-cid-ta2fbyqs>RyphTech</li><li className="note" data-astro-cid-ta2fbyqs>MealHub</li><li className="note" data-astro-cid-ta2fbyqs>Repairro</li></ul>
    </div>
  </li>
  <li className="log__entry grid-12 log__entry--head" data-reveal="up" data-astro-cid-ta2fbyqs>
    <span className="log__v note" data-astro-cid-ta2fbyqs>v6.0<span className="note--accent" data-astro-cid-ta2fbyqs> (HEAD)</span></span>
    <span className="log__year h3" data-astro-cid-ta2fbyqs>Now</span>
    <h2 className="log__title" data-astro-cid-ta2fbyqs>Full-Stack &amp; Systems Exploration</h2>
    <div className="log__body" data-astro-cid-ta2fbyqs>
      <p data-astro-cid-ta2fbyqs>Expanding technical depth across Linux environments, networking fundamentals, and web application security while developing practical software solutions.</p>
      <ul className="log__tags" data-astro-cid-ta2fbyqs><li className="note" data-astro-cid-ta2fbyqs>Linux</li><li className="note" data-astro-cid-ta2fbyqs>Networking</li><li className="note" data-astro-cid-ta2fbyqs>Web Security</li></ul>
    </div>
  </li>
</ol></section><section className="section wrap principles" data-wireframe data-astro-cid-ta2fbyqs><header className="section-head" data-astro-cid-ta2fbyqs><span className="note note--ink" data-astro-cid-ta2fbyqs>[03] Principles</span><span className="note" data-wf-note data-astro-cid-ta2fbyqs>fig. 02 · spec → build</span></header><div className="wf-row" data-astro-cid-ta2fbyqs><p className="wf-line" data-astro-cid-ta2fbyqs><span className="outline-text" aria-hidden="true" data-astro-cid-ta2fbyqs>Accessible.</span><span className="wf-solid" data-wf-solid data-astro-cid-ta2fbyqs><span className="wf-solid__inner" data-astro-cid-ta2fbyqs>Accessible.</span></span></p><span className="wf-dim note" data-wf-note aria-hidden="true" data-astro-cid-ta2fbyqs>WCAG 2.1 AA</span></div><div className="wf-row" data-astro-cid-ta2fbyqs><p className="wf-line" data-astro-cid-ta2fbyqs><span className="outline-text" aria-hidden="true" data-astro-cid-ta2fbyqs>Superfast.</span><span className="wf-solid" data-wf-solid data-astro-cid-ta2fbyqs><span className="wf-solid__inner" data-astro-cid-ta2fbyqs>Superfast.</span></span></p><span className="wf-dim note" data-wf-note aria-hidden="true" data-astro-cid-ta2fbyqs>LCP &lt; 2 s target · motion profiled</span></div><div className="wf-row" data-astro-cid-ta2fbyqs><p className="wf-line" data-astro-cid-ta2fbyqs><span className="outline-text" aria-hidden="true" data-astro-cid-ta2fbyqs>Just cool.</span><span className="wf-solid" data-wf-solid data-astro-cid-ta2fbyqs><span className="wf-solid__inner" data-astro-cid-ta2fbyqs>Just cool.</span></span></p><span className="wf-dim note" data-wf-note aria-hidden="true" data-astro-cid-ta2fbyqs>…when it serves the idea</span></div><div className="principles__body grid-12" data-astro-cid-ta2fbyqs><p className="lead" data-reveal="up" data-astro-cid-ta2fbyqs>When a design file opens, the first thing I notice is how it makes me feel. The second is the modules I can already see in it. The rest of the job is keeping both alive in a browser: on a phone, with a keyboard, with motion turned off.</p></div></section><ToolboxGrid />
      <AgencyTestimonials />
<section className="section wrap" id="off-the-clock" data-astro-cid-ta2fbyqs><header className="section-head" data-astro-cid-ta2fbyqs><span className="note note--ink" data-astro-cid-ta2fbyqs>[05] Current Learning Journey</span><a href="/blog" className="note link" data-astro-cid-ta2fbyqs>All posts →</a></header><ul className="off grid-12" data-astro-cid-ta2fbyqs><li className="off__item" data-reveal="up" data-astro-cid-ta2fbyqs><a href="/blog/how-to-buld-a-desktop-kubernetescluster-with-turing-pi2-part-1" className="off__link" data-astro-cid-ta2fbyqs><span className="note note--accent" data-astro-cid-ta2fbyqs>01</span><h2 className="off__title" data-astro-cid-ta2fbyqs>Modern Application Architecture</h2><p className="off__body" data-astro-cid-ta2fbyqs>Deepening component-based design, state management, and reliable backend integrations.</p><span className="note off__more" data-astro-cid-ta2fbyqs>Read on the blog →</span></a></li><li className="off__item" data-reveal="up" data-astro-cid-ta2fbyqs><a href="/blog/freelance-and-full-remote-a-guide-to-surviving-part-1" className="off__link" data-astro-cid-ta2fbyqs><span className="note note--accent" data-astro-cid-ta2fbyqs>02</span><h2 className="off__title" data-astro-cid-ta2fbyqs>Linux & Networking Fundamentals</h2><p className="off__body" data-astro-cid-ta2fbyqs>Building command-line fluency, server provisioning, permissions, and network protocols.</p><span className="note off__more" data-astro-cid-ta2fbyqs>Read on the blog →</span></a></li><li className="off__item" data-reveal="up" data-astro-cid-ta2fbyqs><a href="/blog/hidden-potential-by-adam-grant-review" className="off__link" data-astro-cid-ta2fbyqs><span className="note note--accent" data-astro-cid-ta2fbyqs>03</span><h2 className="off__title" data-astro-cid-ta2fbyqs>Web Application Security</h2><p className="off__body" data-astro-cid-ta2fbyqs>Books on learning and growth, starting with Adam Grant&#39;s Hidden Potential.</p><span className="note off__more" data-astro-cid-ta2fbyqs>Read on the blog →</span></a></li></ul></section><section className="section wrap" id="faq" data-astro-cid-ta2fbyqs><header className="section-head" data-astro-cid-ta2fbyqs><span className="note note--ink" data-astro-cid-ta2fbyqs>[06] FAQ</span><span className="note" data-astro-cid-ta2fbyqs>Updated · <time dateTime="2026-09-30" data-astro-cid-ta2fbyqs>30 Sep 2026</time></span></header><div className="faqs" data-astro-cid-ta2fbyqs><details className="faq" data-reveal="up" data-astro-cid-ta2fbyqs><summary data-astro-cid-ta2fbyqs><span className="h3" data-astro-cid-ta2fbyqs>Where are you based? Do you work remotely?</span><span className="faq__icon" aria-hidden="true" data-astro-cid-ta2fbyqs></span></summary><p data-astro-cid-ta2fbyqs>I am based in Kerala, India, and open to remote full-stack and mobile application development opportunities worldwide.</p></details><details className="faq" data-reveal="up" data-astro-cid-ta2fbyqs><summary data-astro-cid-ta2fbyqs><span className="h3" data-astro-cid-ta2fbyqs>Do you work white-label for agencies?</span><span className="faq__icon" aria-hidden="true" data-astro-cid-ta2fbyqs></span></summary><p data-astro-cid-ta2fbyqs>When the project needs it, yes. I work under NDA, inside your tools and processes, and your client can deal only with your agency.</p></details><details className="faq" data-reveal="up" data-astro-cid-ta2fbyqs><summary data-astro-cid-ta2fbyqs><span className="h3" data-astro-cid-ta2fbyqs>What kind of projects do you take on?</span><span className="faq__icon" aria-hidden="true" data-astro-cid-ta2fbyqs></span></summary><p data-astro-cid-ta2fbyqs>Web applications, business and brand websites, cross-platform mobile apps with React Native, and database-driven management platforms.</p></details><details className="faq" data-reveal="up" data-astro-cid-ta2fbyqs><summary data-astro-cid-ta2fbyqs><span className="h3" data-astro-cid-ta2fbyqs>Are you available for new projects?</span><span className="faq__icon" aria-hidden="true" data-astro-cid-ta2fbyqs></span></summary><p data-astro-cid-ta2fbyqs>Yes, I&#39;m taking on new projects. A 30-minute call is enough to tell you whether I&#39;m the right fit and when I could start.</p></details></div></section><section className="section wrap cta" data-astro-cid-ta2fbyqs><header className="section-head" data-astro-cid-ta2fbyqs><span className="note note--ink" data-astro-cid-ta2fbyqs>[07] Next</span><span className="note" data-astro-cid-ta2fbyqs>30 minutes</span></header><h2 className="display cta__title" data-reveal="lines" data-astro-cid-ta2fbyqs>Let's Build Something Useful.</h2><div className="cta__actions" data-reveal="up" data-astro-cid-ta2fbyqs><a href="mailto:thanzeerwork@gmail.com" className="btn" target="_blank" rel="noopener" data-astro-cid-ta2fbyqs>Get in Touch <span className="arrow" data-astro-cid-ta2fbyqs>↗</span></a><Link href="/resume" className="btn btn--ghost" data-astro-cid-ta2fbyqs>View Resume</Link><a href="https://github.com/Thanzeerwork" target="_blank" rel="noopener noreferrer" className="btn btn--ghost" data-astro-cid-ta2fbyqs>GitHub Profile</a></div></section>
    </>
  );
}
