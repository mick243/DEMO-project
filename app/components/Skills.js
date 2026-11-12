import Reveal from "./Reveal";
import { skillGroups, skillsIntro } from "../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">기술 스택</h2>
          <p className="section-desc">{skillsIntro.desc}</p>
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <Reveal
              key={g.title}
              delay={i * 80}
              className={`skill-card card${g.primary ? " skill-card-primary" : ""}`}
            >
              <div className="skill-card-title">
                {g.title}
                {g.sub && <span className="skill-card-sub">{g.sub}</span>}
              </div>
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
