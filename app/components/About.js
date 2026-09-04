import Reveal from "./Reveal";
import { profile } from "../data/portfolioData";

  // { icon: "01", title: "설계부터 운영까지", desc: "요구사항 정의, 아키텍처 설계, 개발, 배포, 운영까지 전 과정을 책임집니다." },
  // { icon: "02", title: "투명한 커뮤니케이션", desc: "주 단위 진행 상황 공유와 명확한 문서화로 신뢰할 수 있는 협업을 지향합니다." },
  // { icon: "03", title: "확장을 고려한 구조", desc: "지금 당장의 요구뿐 아니라 이후 트래픽·기능 확장까지 고려해 설계합니다." },

const HIGHLIGHTS = [
  { icon: "", title: "", desc: "" },
  { icon: "", title: "", desc: "" },
  { icon: "", title: "", desc: "" },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">About</span>
          <h2 className="section-title">문제를 구조화하는 개발자</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={80}>
            <p className="about-text">
              {profile.summary}<br/> 
              {profile.location} 기준으로 활동
            </p>
          </Reveal>
          <Reveal delay={160} className="about-highlights">
            {HIGHLIGHTS.map((h) => (
              <div key={h.icon} className="about-highlight card">
                <div className="about-highlight-icon">{h.icon}</div>
                <div>
                  <div className="about-highlight-title">{h.title}</div>
                  <div className="about-highlight-desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
