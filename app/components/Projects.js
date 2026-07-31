import Reveal from "./Reveal";
import { projects } from "../data/portfolioData";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">진행한 프로젝트</h2>
          <p className="section-desc">
            실제 사진/사명 대신 더미 텍스트로 구성했습니다. 실제 배포 시 프로젝트별 스크린샷과
            링크로 교체하세요.
          </p>
        </Reveal>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 100} className="project-card card">
              <div className="project-top">
                <div className="project-name">{p.name}</div>
                <div className="project-period">{p.period}</div>
              </div>
              <div className="project-role">{p.role}</div>
              <p className="project-summary">{p.summary}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
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
