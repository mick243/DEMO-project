"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { profile } from "../data/portfolioData";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // 데모용 폼입니다. 실제 서비스에서는 API 라우트나 이메일 서비스로 연결하세요.
    setSent(true);
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* <Reveal>
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title">프로젝트를 문의해 주세요</h2>
          <p className="section-desc">간단한 요구사항만 남겨주셔도 좋습니다. 24시간 내 회신합니다.</p>
        </Reveal> */}

        <div className="contact-grid">
          <Reveal>
            <div className="contact-info-item">
              <div className="contact-info-label">Email</div>
              <div className="contact-info-value">{profile.email}</div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">위치</div>
              <div className="contact-info-value">{profile.location}</div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">가능 여부</div>
              <div className="contact-info-value">{profile.availability}</div>
            </div>
          </Reveal>

          {/* <Reveal delay={100}>
            <form className="form-card card" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">이름</label>
                  <input id="name" type="text" placeholder="홍길동" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">이메일</label>
                  <input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="budget">예산 / 일정</label>
                <input id="budget" type="text" placeholder="예: 500만원 내외, 6주 이내" />
              </div>
              <div className="form-field">
                <label htmlFor="message">프로젝트 설명</label>
                <textarea id="message" rows={5} placeholder="어떤 프로젝트를 준비 중이신가요?" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {sent ? "전송 완료 ✓" : "문의 보내기"}
              </button>
              <p className="form-note">
                * 데모 폼입니다. 실제 배포 시 API 라우트나 이메일 서비스와 연결해 주세요.
              </p>
            </form>
          </Reveal> */}
        </div>
      </div>
    </section>
  );
}
