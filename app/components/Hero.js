import { Fragment } from "react";
import { profile, profileJson, heroActions } from "../data/portfolioData";

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
        <h1 className="hero-title">
          {profile.role}
          <br />
          <span className="accent">
            {profile.tagline.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </span>
        </h1>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            {heroActions.primary}
          </a>
          <a href="#contact" className="btn btn-ghost">
            {heroActions.secondary}
          </a>
        </div>
        <p className="hero-note">{profile.availability}</p>
      </div>

      <figure className="terminal">
        <figcaption className="terminal-filename">profile.json</figcaption>
        <div className="terminal-body">{renderJson(profileJson)}</div>
      </figure>
    </section>
  );
}
