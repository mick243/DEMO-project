import Link from "next/link";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">진행한 프로젝트</h2>
          <p className="section-desc">
            개인 프로젝트와 외주 프로젝트입니다. 카드를 누르면 상세 내용을 볼 수 있습니다.
          </p>
        </Reveal>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <Link href={`/projects/${p.slug}`} className="project-card card">
                <div className="project-media">
                  <img src={p.thumbnail} alt="" />
                </div>
                <div className="project-body">
                  <div className="project-name">{p.name}</div>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
