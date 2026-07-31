import Reveal from "./Reveal";
import { skillGroups } from "../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">기술 스택</h2>
          <p className="section-desc">
            프로젝트 성격에 맞춰 백엔드부터 인프라까지 필요한 조합을 선택합니다.
          </p>
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="skill-card card">
              <div className="skill-card-title">{g.title}</div>
              <div className="skill-tags">
                {g.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
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
