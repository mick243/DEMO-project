import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { resume } from "../data/resume";

export const metadata = {
  title: `이력서 | ${resume.name}`,
  description: resume.summary,
};

/** 프로젝트 상세와 같은 모양의 섹션 머리를 씁니다. */
function SectionHead({ id, eyebrow, title, desc }) {
  return (
    <header id={id} className="dsec-head">
      <span className="dsec-eyebrow">{eyebrow}</span>
      <h2 className="dsec-title">{title}</h2>
      {desc && <p className="dsec-desc">{desc}</p>}
    </header>
  );
}

export default function Resume() {
  return (
    <>
      <Header />
      <main>
        <article className="section detail resume" style={{ borderTop: "none" }}>
          <div className="container">
            <Link href="/#about" className="detail-back">
              ← 포트폴리오
            </Link>

            <span className="section-eyebrow">Resume</span>
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

            <SectionHead id="summary" eyebrow="Summary" title="자기소개" />
            <p className="detail-text">{resume.summary}</p>

            <SectionHead id="career" eyebrow="Career" title="경력" />
            <ol className="resume-list">
              {resume.career.map((c) => (
                <li key={c.name} className="resume-entry">
                  <span className="resume-entry-period">{c.period}</span>
                  <h3 className="resume-entry-name">{c.name}</h3>
                  <ul className="resume-points">
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {c.link && (
                    <a className="resume-entry-link" href={c.link.href} target="_blank" rel="noreferrer">
                      {c.link.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ol>

            <SectionHead id="education" eyebrow="Education" title="학력" />
            <ol className="resume-list">
              {resume.education.map((e) => (
                <li key={e.name} className="resume-entry">
                  <span className="resume-entry-period">{e.period}</span>
                  <h3 className="resume-entry-name">{e.name}</h3>
                  <p className="resume-entry-desc">{e.desc}</p>
                </li>
              ))}
            </ol>

            <SectionHead id="links" eyebrow="Links" title="링크" />
            <ul className="resume-links">
              {resume.links.map((l) => (
                <li key={l.label}>
                  <span className="resume-link-label">{l.label}</span>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.value} ↗
                  </a>
                </li>
              ))}
            </ul>

            <SectionHead id="skills" eyebrow="Skills" title="보유 역량과 도구" />
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

            <div className="detail-links">
              <a href={resume.pdf} target="_blank" rel="noreferrer" className="btn btn-ghost">
                PDF로 보기 ↗
              </a>
              <Link href="/#about" className="btn btn-ghost">
                ← 포트폴리오
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
