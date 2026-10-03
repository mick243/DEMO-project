import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import ScrollStrip from "./ScrollStrip";
import { projects } from "../data/projects";

// 딥다이브 페이지의 몸통입니다. 프로젝트 상세(/projects/<slug>)의 성능 표 제목에서 들어옵니다.
// 페이지 파일은 metadata 와 데이터(app/data/*.js)만 넘기고, 그리는 일은 여기서 합니다.
// 블록 종류는 다섯입니다 — text · list · code · table · note.

function Block({ block }) {
  if (block.kind === "text") return <p className="dd-text">{block.text}</p>;

  if (block.kind === "note") return <p className="star-note">{block.text}</p>;

  if (block.kind === "list") {
    return (
      <ul className="star-points dd-list">
        {block.items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    );
  }

  if (block.kind === "code") {
    return (
      <figure className="dd-code">
        {block.caption && <figcaption>{block.caption}</figcaption>}
        <pre>
          <code>{block.code}</code>
        </pre>
      </figure>
    );
  }

  if (block.kind === "table") {
    return (
      <div className="dd-table-wrap">
        <table className="dd-table">
          <thead>
            <tr>
              {block.head.map((h, i) => (
                <th key={h || `col${i}`} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((cell, i) => (
                  <td key={`${row[0]}-${i}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

export default function DeepDive({ dd }) {
  const project = projects.find((p) => p.slug === dd.slug);
  /** 상세 페이지에서 이 페이지로 링크한 성능 표(href === dd.path)를 그대로 다시 씁니다 — 수치를 두 곳에 적지 않습니다. */
  const perf = (Array.isArray(project?.perf) ? project.perf : [project?.perf])
    .filter(Boolean)
    .find((p) => p.href === dd.path);

  return (
    <>
      <Header />
      <main>
        <article className="section detail" style={{ borderTop: "none" }}>
          <div className="container">
            <Link href={`/projects/${dd.slug}#star`} className="detail-back">
              {project?.name ?? "프로젝트"} 상세
            </Link>

            <span className="section-eyebrow">{dd.eyebrow}</span>
            <h1 className="detail-title">{dd.title}</h1>
            <p className="detail-lede">{dd.lede}</p>

            <dl className="detail-meta">
              {dd.meta.map((m) => (
                <div key={m.dt}>
                  <dt>{m.dt}</dt>
                  <dd>{m.dd}</dd>
                </div>
              ))}
            </dl>

            {/* 상세 페이지에서 보던 그 표를 먼저 다시 보여 줍니다 — 어디서 온 페이지인지 바로 알도록. */}
            {perf && (
              <div className="perf dd-summary">
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
              </div>
            )}

            <p className="star-note dd-lead-note">{dd.summaryNote}</p>

            {/* 절이 열 개 남짓이라 접히게 두면 세 줄이 됩니다. 커뮤니티 게임 탭과 같은 장치로
                한 줄에 고정하고, 넘치는 쪽에만 화살표를 띄웁니다. */}
            <ScrollStrip
              as="nav"
              className="dd-toc"
              wrapClassName="dd-toc-wrap"
              ariaLabel="이 페이지의 목차"
            >
              {dd.sections.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.title}
                </a>
              ))}
            </ScrollStrip>

            {dd.sections.map((s) => (
              <section key={s.id} className="dd-section">
                <header id={s.id} className="dsec-head">
                  <span className="dsec-eyebrow">{s.eyebrow}</span>
                  <h2 className="dsec-title">{s.title}</h2>
                  {s.desc && <p className="dsec-desc">{s.desc}</p>}
                </header>
                {s.blocks.map((b, i) => (
                  <Block key={`${s.id}-${i}`} block={b} />
                ))}
              </section>
            ))}

            <Link href={`/projects/${dd.slug}#star`} className="detail-back dd-back-bottom">
              {project?.name ?? "프로젝트"} 상세로 돌아가기
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
