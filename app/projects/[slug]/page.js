import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.name} | 강정민`,
    description: project.summary,
  };
}

/**
 * 기술 설명을 온점 기준으로 끊어 한 문장씩 한 줄로 보여줍니다.
 *
 * "마침표 + 공백" 에서만 나눕니다. naver.maps.Marker 나 lib/recommend.ts,
 * .mk-label 처럼 식별자 안에 있는 점은 뒤에 공백이 없으므로 걸리지 않습니다.
 *
 * split 은 끊은 자리의 마침표를 함께 먹으므로, 마지막 조각을 뺀 각 조각에
 * 다시 붙여 줍니다 (마지막 조각의 마침표는 잘리지 않고 그대로 남습니다).
 */
function sentences(text) {
  const parts = text.split(/\.\s+/);
  return parts.map((part, i) => (i < parts.length - 1 ? part + "." : part)).filter(Boolean);
}

function StarBlock({ step, project }) {
  return (
    <section className="star-step">
      <div className="star-mark">
        <span className="star-key">{step.key}</span>
        <span className="star-label">{step.label}</span>
      </div>
      <div className="star-body">
        <h2 className="star-title">{step.title}</h2>
        {step.body && <p className="detail-text">{step.body}</p>}

        {step.points && (
          <ul className="star-points">
            {step.points.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        {step.groups?.map((g) => (
          <div key={g.title} className="star-group">
            <h3 className="star-group-title">{g.title}</h3>
            <ul className="star-points">
              {g.points.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Result 단계에서만 수치판과 성능 표를 함께 보여줍니다. */}
        {step.key === "R" && project.metrics && (
          <dl className="metrics">
            {project.metrics.map((m) => (
              <div key={m.label} className="metric">
                <dt>{m.label}</dt>
                <dd>
                  {m.value}
                  <span>{m.unit}</span>
                </dd>
                <p>{m.note}</p>
              </div>
            ))}
          </dl>
        )}

        {step.key === "R" && project.perf && (
          <div className="perf">
            <h3 className="star-group-title">{project.perf.title}</h3>
            <div className="perf-table-wrap">
              <table className="perf-table">
                <thead>
                  <tr>
                    <th scope="col">측정 항목</th>
                    <th scope="col">이전</th>
                    <th scope="col">이후</th>
                    <th scope="col">증감</th>
                  </tr>
                </thead>
                <tbody>
                  {project.perf.rows.map((r) => (
                    <tr key={r.what}>
                      <th scope="row">
                        {r.what}
                        <em>{r.sub}</em>
                      </th>
                      <td className="was">{r.was}</td>
                      <td className="now">{r.now}</td>
                      <td className="delta">{r.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {project.perf.extra && <p className="perf-extra">{project.perf.extra}</p>}
          </div>
        )}

        {step.note && <p className="star-note">{step.note}</p>}
      </div>
    </section>
  );
}

export default function ProjectDetail({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main>
        <article className="section detail" style={{ borderTop: "none" }}>
          <div className="container">
            <Link href="/#projects" className="detail-back">
              ← 프로젝트 목록
            </Link>

            <span className="section-eyebrow">{project.type}</span>
            <h1 className="detail-title">{project.name}</h1>
            <p className="detail-lede">{project.summary}</p>

            <dl className="detail-meta">
              <div>
                <dt>기간</dt>
                <dd>{project.period}</dd>
              </div>
              <div>
                <dt>역할</dt>
                <dd>{project.role}</dd>
              </div>
            </dl>

            <div className="detail-media">
              <img src={project.hero || project.thumbnail} alt={`${project.name} 미리보기`} />
            </div>

            {project.star && (
              <div className="star">
                {project.star.map((step) => (
                  <StarBlock key={step.key} step={step} project={project} />
                ))}
              </div>
            )}

            {project.items?.length > 0 && (
              <>
                <h2 className="detail-heading">진행한 작업</h2>
                <ul className="detail-items">
                  {project.items.map((item) => (
                    <li key={item.name} className="detail-item">
                      <span className="detail-item-period">{item.period}</span>
                      <h3 className="detail-item-name">{item.name}</h3>
                      <p className="detail-item-desc">{item.desc}</p>
                      <div className="detail-tags">
                        {item.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {project.gallery?.length > 0 && (
              <>
                <h2 className="detail-heading">작동 화면</h2>
                <div className="shots">
                  {project.gallery.map((g) => (
                    <figure key={g.src} className="shot">
                      <img src={g.src} alt={g.caption} loading="lazy" />
                      <figcaption>
                        {g.caption}
                        {g.tech && (
                          <span className="shot-tech">
                            {sentences(g.tech).map((line, i) => (
                              <span key={i}>{line}</span>
                            ))}
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}

            {project.learned?.length > 0 && (
              <>
                <h2 className="detail-heading">배운 것과 남은 것</h2>
                <ul className="lessons">
                  {project.learned.map((l) => (
                    <li key={l.title} className={`lesson ${l.kind}`}>
                      <span className="lesson-flag">
                        {l.kind === "open" ? "남은 것" : "배운 것"}
                      </span>
                      <h3 className="lesson-title">{l.title}</h3>
                      <p className="lesson-desc">{l.desc}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="detail-heading">사용 기술</h2>
            <div className="detail-tags">
              {project.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            {project.links?.length > 0 && (
              <>
                <h2 className="detail-heading">링크</h2>
                <div className="detail-links">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
