import Reveal from "./Reveal";
import { education } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Education</span>
          <h2 className="section-title">교육</h2>
          <p className="section-desc">개발 역량을 쌓은 교육 과정입니다.</p>
        </Reveal>
        <div className="timeline">
          {education.map((e, i) => (
            <Reveal key={e.name} delay={i * 100} className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-period">{e.period}</span>
              <div className="timeline-company">{e.name}</div>
              <p className="timeline-desc">{e.desc}</p>
              <div className="timeline-tags">
                {e.tags.map((t) => (
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
