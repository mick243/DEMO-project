import Link from "next/link";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

/**
 * 프로젝트 섹션. 개인 프로젝트를 위에, 외주 프로젝트를 아래에 따로 묶습니다.
 *
 * 묶음은 projects.js 의 `group` 이 정하고, 순서는 아래 GROUPS 가 정합니다.
 * group 이 없는 항목은 빠지지 않고 개인 프로젝트로 들어갑니다 — 새 프로젝트를
 * 추가할 때 group 을 빠뜨려도 화면에서 사라지지 않게.
 */
const GROUPS = [
  { key: "personal", title: "개인 프로젝트", desc: "기획부터 배포까지 혼자 맡은 것들입니다." },
  { key: "outsourcing", title: "외주 프로젝트", desc: "클라이언트·디자이너와 함께 기한 안에 납품한 것들입니다." },
];

export default function Projects() {
  const grouped = GROUPS.map((g) => ({
    ...g,
    items: projects.filter((p) =>
      g.key === "personal" ? p.group !== "outsourcing" : p.group === "outsourcing"
    ),
  })).filter((g) => g.items.length > 0);

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

        {grouped.map((group) => (
          <div key={group.key} className="project-group">
            <Reveal>
              <h3 className="project-group-title">
                {group.title}
                <span className="project-group-count">{group.items.length}</span>
              </h3>
              <p className="project-group-desc">{group.desc}</p>
            </Reveal>
            <div className="projects-grid">
              {group.items.map((p, i) => (
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
        ))}
      </div>
    </section>
  );
}
