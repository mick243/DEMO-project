import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { resume } from "../data/resume";

export const metadata = {
  title: `이력서 | ${resume.name}`,
  description: resume.headline.join(" "),
};

/** 프로젝트 상세와 같은 모양의 섹션 머리를 씁니다. */
// eyebrow 는 예전 호출과 맞추려고 받기만 하고 그리지 않습니다(영문 머리말 대신 한글 제목이 섹션 이름입니다).
function SectionHead({ id, eyebrow, title, desc }) {
  return (
    <header id={id} className="dsec-head">
      <h2 className="dsec-title">{title}</h2>
      {desc && <p className="dsec-desc">{desc}</p>}
    </header>
  );
}

/** 외주 경험 · 교육처럼 "인정받고 싶은 점 + 점 목록" 모양의 항목 */
function PointEntry({ item }) {
  return (
    <li className="resume-entry">
      <span className="resume-entry-period">{item.period}</span>
      <h3 className="resume-entry-name">
        {item.name}
        {item.sub && <span className="resume-entry-sub">{item.sub}</span>}
      </h3>
      <p className="resume-strength">
        <b>인정받고 싶은 점</b> {item.strength}
      </p>
      <ul className="resume-points">
        {item.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </li>
  );
}

const STAR = [
  ["task", "Task"],
  ["action", "Action"],
  ["result", "Result"],
  ["stack", "Stack"],
];

export default function Resume() {
  return (
    <>
      <Header />
      <main>
        <article className="section detail resume" style={{ borderTop: "none" }}>
          <div className="container">
            <Link href="/#about" className="detail-back">
              포트폴리오
            </Link>

            <h1 className="detail-title">{resume.name}</h1>
            <p className="resume-role">{resume.role}</p>

            <dl className="detail-meta resume-contacts">
              {resume.contacts.map((c) => (
                <div key={c.label}>
                  <dt>{c.label}</dt>
                  <dd>
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="resume-headline">
              {resume.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <dl className="resume-path">
              {resume.path.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>{p.text}</dd>
                </div>
              ))}
            </dl>

            <SectionHead id="competencies" eyebrow="Competencies" title="핵심역량" desc="채용 공고에서 찾는 역량과 제 사례" />
            <div className="perf-table-wrap resume-table-wrap">
              <table className="perf-table resume-table">
                <thead>
                  <tr>
                    <th className="resume-comp-head">요구 역량</th>
                    <th>사례</th>
                  </tr>
                </thead>
                <tbody>
                  {resume.competencies.map((c) => (
                    <tr key={c.skill}>
                      <td className="resume-comp-cell">
                        <b className="resume-comp-skill">{c.skill}</b>
                      </td>
                      <td>
                        {c.example}
                        {c.ref && <span className="resume-comp-ref">{c.ref}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionHead id="growth" eyebrow="Growth" title="성장 과정" desc="학교 · 교육 · 외주 · 프로젝트를 한 흐름으로" />
            <ol className="resume-growth">
              {resume.growth.map((g) => (
                <li key={g.period}>
                  <span className="resume-growth-stage">{g.stage}</span>
                  <span className="resume-entry-period">{g.period}</span>
                  <b className="resume-growth-name">{g.name}</b>
                  <p className="resume-growth-desc">{g.desc}</p>
                  {g.stack && <p className="resume-growth-stack">{g.stack}</p>}
                </li>
              ))}
            </ol>
            <p className="star-note resume-reached">
              <b>지금 도달한 지점</b> : {resume.reached}
            </p>

            <SectionHead id="skills" eyebrow="Skills" title="스킬" />
            <div className="resume-skills">
              {resume.skillGroups.map((g) => (
                <div key={g.title} className="resume-skill-group">
                  <h3 className="resume-skill-title">{g.title}</h3>
                  <div className="detail-tags">
                    {g.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SectionHead id="projects" eyebrow="Projects" title="프로젝트" />
            <ol className="resume-list">
              {resume.projects.map((p) => (
                <li key={p.name} className="resume-entry">
                  <span className="resume-entry-period">{p.period}</span>
                  <h3 className="resume-entry-name">
                    {p.name}
                    <span className="resume-entry-sub">{p.kind}</span>
                  </h3>
                  <p className="resume-strength">
                    <b>보여 주는 역량</b> {p.strength}
                  </p>
                  <dl className="resume-star">
                    {STAR.map(([key, label]) => (
                      <div key={key}>
                        <dt>{label}</dt>
                        <dd>{p[key]}</dd>
                      </div>
                    ))}
                  </dl>
                  {p.shot && (
                    <figure className="resume-shot">
                      <img src={p.shot.src} alt={p.shot.alt} loading="lazy" width={1000} height={500} />
                      <figcaption>{p.shot.caption}</figcaption>
                    </figure>
                  )}
                  <div className="resume-entry-links">
                    <Link className="resume-entry-link" href={p.detail}>
                      프로젝트 자세히
                    </Link>
                    <a className="resume-entry-link" href={p.link.href} target="_blank" rel="noreferrer">
                      {p.link.label}
                    </a>
                  </div>
                </li>
              ))}
            </ol>

            <SectionHead id="experience" eyebrow="Experience" title="외주 경험" />
            <ol className="resume-list">
              {resume.experience.map((e) => (
                <PointEntry key={e.name} item={e} />
              ))}
            </ol>

            <SectionHead id="training" eyebrow="Training" title="교육" />
            <ol className="resume-list">
              {resume.training.map((t) => (
                <PointEntry key={t.name} item={t} />
              ))}
            </ol>

            <div className="detail-links">
              <a href={resume.pdf} target="_blank" rel="noreferrer" className="btn btn-primary">
                PDF로 보기
              </a>
              <Link href="/#about" className="btn btn-ghost">
                포트폴리오
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
