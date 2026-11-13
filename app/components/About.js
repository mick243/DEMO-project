import Link from "next/link";
import Reveal from "./Reveal";
import Icon from "./Icons";
import { aboutCards, aboutIntro } from "../data/portfolioData";

/** 카드 안쪽. 두 카드가 같은 모양이라 링크 종류(사이트 안 · 밖)만 다릅니다. */
function CardBody({ card }) {
  return (
    <>
      <span className="about-card-icon">
        <Icon name={card.icon} />
      </span>
      <span className="about-card-label">{card.eyebrow}</span>
      <span className="about-card-title">{card.title}</span>
      <span className="about-card-desc">{card.desc}</span>
    </>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{aboutIntro.title}</h2>
        </Reveal>
        {/* 이력서 · GitHub 두 카드를 같은 크기로 나란히 둡니다(1:1). */}
        <div className="about-grid">
          {aboutCards.map((card, i) => (
            <Reveal key={card.href} delay={80 * (i + 1)}>
              {card.external ? (
                <a href={card.href} target="_blank" rel="noreferrer" className="about-card card">
                  <CardBody card={card} />
                </a>
              ) : (
                <Link href={card.href} className="about-card card">
                  <CardBody card={card} />
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
