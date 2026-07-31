import { profile, profileJson } from "../data/portfolioData";

function renderJson(json) {
  // 아주 단순한 하이라이팅: 키는 cyan, 문자열 값은 amber 톤
  return json.split("\n").map((line, i) => {
    const match = line.match(/^(\s*)"([^"]+)":\s*(.*)$/);
    if (match) {
      const [, indent, key, rest] = match;
      return (
        <div key={i}>
          {indent}
          <span className="k">&quot;{key}&quot;</span>: {renderValue(rest)}
        </div>
      );
    }
    return <div key={i}>{line}</div>;
  });
}

function renderValue(rest) {
  if (rest.startsWith('"')) {
    return <span className="s">{rest}</span>;
  }
  return rest;
}

export default function Hero() {
  return (
    <section id="top" className="section hero" style={{ borderTop: "none" }}>
      <div>
        <div className="hero-eyebrow">{profile.availability}</div>
        <h1 className="hero-title">
          {profile.role}
          <br />
          <span className="accent">{profile.tagline}</span>
        </h1>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            문의하기
          </a>
          <a href="#projects" className="btn btn-ghost">
            둘러보기
          </a>
        </div>
        <div className="hero-stats">
          {profile.stats.map((s) => (
            <div key={s.label}>
              <div className="hero-stat-value">
                {s.value}
                <span>{s.suffix}</span>
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal">
        <div className="terminal-bar">
          <span className="terminal-dot r" />
          <span className="terminal-dot y" />
          <span className="terminal-dot g" />
          <span className="terminal-filename">profile.json</span>
        </div>
        <div className="terminal-body">
          {renderJson(profileJson)}
          <span className="terminal-cursor" />
        </div>
      </div>
    </section>
  );
}
