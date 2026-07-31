import Reveal from "./Reveal";
import { process } from "../data/portfolioData";

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Process</span>
          <h2 className="section-title">DEMO</h2>
          <p className="section-desc">.</p>
        </Reveal>
        <div className="process-grid">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 60} className="process-card card">
              <div className="process-step">{p.step}</div>
              <div className="process-title">{p.title}</div>
              <div className="process-desc">{p.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
