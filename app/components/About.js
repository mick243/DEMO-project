import Link from "next/link";
import Reveal from "./Reveal";
import { aboutCards } from "../data/portfolioData";

export default function About() {
  const { resume, links } = aboutCards;
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">About</span>
        </Reveal>
        <div className="about-grid">
          {/* 큰 카드: 이력서 PDF 를 그대로 옮긴 /resume 페이지로 보냅니다. */}
          <Reveal delay={80}>
            <Link href={resume.href} className="about-card about-card-lg card">
              <span className="about-card-label">{resume.eyebrow}</span>
              <span className="about-card-title">{resume.title}</span>
              <span className="about-card-desc">{resume.desc}</span>
              <span className="about-card-arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
          {/* 작은 카드: 외부 링크 */}
          <Reveal delay={160} className="about-links">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="about-card card">
                <span className="about-card-label">{l.label}</span>
                <span className="about-card-value">{l.value}</span>
                <span className="about-card-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
