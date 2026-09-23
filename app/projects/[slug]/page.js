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
 * 기술 설명을 온점 기준으로 문장 단위로 끊습니다. 문장 사이는 CSS 가 빈 줄 하나로 띄웁니다.
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

/** 상세 페이지의 큰 섹션 머리. 눈썹(mono) · 제목 · 한 줄 설명을 같은 모양으로 맞춥니다. */
function SectionHead({ id, eyebrow, title, desc }) {
  return (
    <header id={id} className="dsec-head">
      <span className="dsec-eyebrow">{eyebrow}</span>
      <h2 className="dsec-title">{title}</h2>
      {desc && <p className="dsec-desc">{desc}</p>}
    </header>
  );
}

/**
 * 성능 표. `href` 가 있으면 제목 옆에 딥다이브로 가는 배지가 붙습니다.
 *
 * 누를 곳은 배지 하나입니다. 제목까지 링크로 묶으면 어디까지가 누르는 자리인지
 * 흐려지고, 표 제목을 읽는 동안에도 호버 표시가 따라붙습니다.
 */
function PerfTable({ perf }) {
  return (
    <div className="perf">
      <h3 className="star-group-title perf-title">
        {perf.title}
        {perf.href && (
          <Link href={perf.href} className="perf-title-badge">
            {perf.badge ?? "자세히"}
          </Link>
        )}
      </h3>
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
            {perf.rows.map((r) => (
              <tr key={r.what + r.sub}>
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
      {perf.extra && <p className="perf-extra">{perf.extra}</p>}
    </div>
  );
}

function StarBlock({ step, project }) {
  // perf 는 표 하나(객체)일 수도, 여러 개(배열)일 수도 있습니다.
  const perfs = Array.isArray(project.perf) ? project.perf : project.perf ? [project.perf] : [];

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
          <>
            {project.updated && <p className="metrics-asof">{project.updated} 기준</p>}
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
          </>
        )}

        {step.key === "R" && perfs.map((perf) => <PerfTable key={perf.title} perf={perf} />)}

        {step.note && <p className="star-note">{step.note}</p>}
      </div>
    </section>
  );
}

export default function ProjectDetail({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const commitCount = project.timeline?.reduce((n, ph) => n + ph.entries.length, 0) ?? 0;

  // 이 페이지에 실제로 있는 섹션만 목차에 올립니다.
  const toc = [
    project.star && { href: "#star", label: "STAR" },
    project.timeline?.length > 0 && { href: "#timeline", label: "작업 기록" },
    project.items?.length > 0 && { href: "#items", label: "진행한 작업" },
    project.gallery?.length > 0 && { href: "#screens", label: "작동 화면" },
    project.learned?.length > 0 && { href: "#lessons", label: "배운 것과 남은 것" },
  ].filter(Boolean);

  return (
    <>
      <Header />
      <main>
        <article className="section detail" style={{ borderTop: "none" }}>
          <div className="container">
            <Link href="/#projects" className="detail-back">
              프로젝트 목록
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
              {project.updated && (
                <div>
                  <dt>기준일</dt>
                  <dd>{project.updated}</dd>
                </div>
              )}
              <div className="detail-meta-wide">
                <dt>사용 기술</dt>
                <dd>
                  <div className="detail-tags">
                    {project.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              {project.links?.length > 0 && (
                <div>
                  <dt>링크</dt>
                  <dd>
                    <div className="detail-meta-links">
                      {project.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </dd>
                </div>
              )}
            </dl>

            <div className="detail-media">
              <img src={project.hero || project.thumbnail} alt={`${project.name} 미리보기`} />
            </div>

            {toc.length > 1 && (
              <nav className="detail-toc" aria-label="이 페이지의 목차">
                {toc.map((t) => (
                  <a key={t.href} href={t.href}>
                    {t.label}
                  </a>
                ))}
              </nav>
            )}

            {project.star && (
              <div className="star" id="star">
                {project.star.map((step) => (
                  <StarBlock key={step.key} step={step} project={project} />
                ))}
              </div>
            )}

            {project.timeline?.length > 0 && (
              <>
                <SectionHead
                  id="timeline"
                  eyebrow="Worklog"
                  title="작업 기록"
                  desc={`저장소 커밋 로그를 날짜순으로 묶었습니다. ${project.timeline.length}단계 · ${commitCount}개 항목.`}
                />
                <ol className="tl">
                  {project.timeline.map((ph, i) => (
                    <li key={ph.phase} className="tl-phase">
                      <div className="tl-phase-head">
                        <span className="tl-phase-no">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className="tl-phase-title">{ph.phase}</h3>
                          <span className="tl-phase-range">{ph.range}</span>
                          {ph.summary && <p className="tl-phase-summary">{ph.summary}</p>}
                        </div>
                      </div>
                      <ol className="tl-entries">
                        {ph.entries.map((e) => (
                          <li key={e.date + e.title} className="tl-item">
                            <time className="tl-date">{e.date}</time>
                            <div className="tl-body">
                              <h4 className="tl-title">{e.title}</h4>
                              <p className="tl-desc">{e.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {project.items?.length > 0 && (
              <>
                <SectionHead id="items" eyebrow="Work" title="진행한 작업" />
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
                <SectionHead
                  id="screens"
                  eyebrow="Screens"
                  title="작동 화면"
                  desc="화면마다 ‘구현 메모’를 펼치면 그 화면이 어떻게 만들어졌는지 적어 두었습니다."
                />
                <div className="shots">
                  {project.gallery.map((g) => (
                    <figure key={g.src} className={`shot${project.galleryPortrait ? " portrait" : ""}`}>
                      <img src={g.src} alt={g.caption} loading="lazy" />
                      <figcaption>
                        <p className="shot-caption">{g.caption}</p>
                        {g.tech && (
                          <details className="shot-more">
                            <summary>구현 메모</summary>
                            <div className="shot-tech">
                              {sentences(g.tech).map((line, i) => (
                                <p key={i}>{line}</p>
                              ))}
                            </div>
                          </details>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}

            {project.learned?.length > 0 && (
              <>
                <SectionHead
                  id="lessons"
                  eyebrow="Retrospective"
                  title="배운 것과 남은 것"
                  desc="비싸게 배운 것과, 아직 닫지 못한 것을 나눠 적었습니다."
                />
                <ul className="lessons">
                  {project.learned.map((l) => (
                    <li key={l.title} className={`lesson ${l.kind}`}>
                      <span className="lesson-flag">{l.kind === "open" ? "남은 것" : "배운 것"}</span>
                      <h3 className="lesson-title">{l.title}</h3>
                      <p className="lesson-desc">{l.desc}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {project.links?.length > 0 && (
              <div className="detail-links">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    {l.label}
                  </a>
                ))}
                <Link href="/#projects" className="btn btn-ghost">
                  프로젝트 목록
                </Link>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
