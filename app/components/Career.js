import Reveal from "./Reveal";
import { careers } from "../data/portfolioData";

export default function Career() {
  return (
    <section id="career" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Career</span>
          <h2 className="section-title">경력</h2>
          <p className="section-desc">개인 프로젝트와 외주 프로젝트를 함께 정리했습니다.</p>
        </Reveal>
        <div className="timeline">
          {careers.map((c, i) => (
            <Reveal key={c.company} delay={i * 100} className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-period">{c.period}</span>
              <div className="timeline-company">{c.company}</div>
              <p className="timeline-desc">{c.desc}</p>
              <div className="timeline-tags">
                {c.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
