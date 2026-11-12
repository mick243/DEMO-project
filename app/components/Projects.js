"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

/**
 * 프로젝트 섹션. 왼쪽 목록에서 고르거나, 오른쪽 무대를 스크롤하면 카드가 한 장씩 넘어갑니다.
 * 카드를 모두 펼쳐 두지 않으니 섹션 높이가 카드 한 장 높이로 묶입니다.
 *
 * 묶음은 projects.js 의 `group` 이 정하고, 순서는 아래 GROUPS 가 정합니다.
 * group 이 없거나 GROUPS 에 없는 값인 항목은 빠지지 않고 개인 프로젝트로 들어갑니다 —
 * 새 프로젝트를 추가할 때 group 을 빠뜨리거나 잘못 적어도 화면에서 사라지지 않게.
 *
 * 넓은 화면: 무대가 세로로 스냅됩니다(휠 한 번에 한 장). 좁은 화면: 목록은 위쪽 칩 줄,
 * 무대는 가로로 넘깁니다 — 휴대폰에서 세로 안쪽 스크롤은 페이지 스크롤과 엉키기 때문입니다.
 */
const GROUPS = [
  { key: "personal", title: "개인 프로젝트", desc: "기획부터 배포까지 혼자 맡았어요." },
  { key: "team", title: "팀 프로젝트", desc: "팀에서 맡은 부분을 끝까지 붙여 실제로 돌게 만들었어요." },
  { key: "outsourcing", title: "외주 프로젝트", desc: "클라이언트, 디자이너와 함께 기한 안에 납품했어요." },
];

const groupOf = (p) => (GROUPS.some((g) => g.key === p.group) ? p.group : "personal");

const grouped = GROUPS.map((g) => ({
  ...g,
  items: projects.filter((p) => groupOf(p) === g.key),
})).filter((g) => g.items.length > 0);

// 무대에 놓이는 순서. 목록과 같은 순서여야 번호가 맞습니다.
const ordered = grouped.flatMap((g) => g.items.map((p) => ({ ...p, groupTitle: g.title })));

const pad = (n) => String(n).padStart(2, "0");

// 무대가 지금 가로로 넘어가는지(좁은 화면) 세로로 넘어가는지.
const isHorizontal = (el) => el.scrollWidth > el.clientWidth + 1;

function scrollToIndex(el, i) {
  const slide = el.children[i];
  if (!slide) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollTo({ top: slide.offsetTop, left: slide.offsetLeft, behavior: reduce ? "auto" : "smooth" });
}

export default function Projects() {
  const stageRef = useRef(null);
  const navRef = useRef(null);
  const [active, setActive] = useState(0);
  // 휠 처리기는 한 번만 붙으므로, 지금 몇 번째인지는 ref 로 읽습니다.
  const activeRef = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const i = isHorizontal(el)
          ? Math.round(el.scrollLeft / el.clientWidth)
          : Math.round(el.scrollTop / el.clientHeight);
        const next = Math.max(0, Math.min(ordered.length - 1, i));
        activeRef.current = next;
        setActive(next);
      });
    };

    // 넓은 화면에서 휠 한 번 = 카드 한 장. 브라우저 스냅에만 맡기면 휠 한 칸이 작을 때
    // 제자리로 되돌아가거나, 트랙패드 관성에 여러 장을 건너뜁니다.
    // 첫 장에서 위로 · 끝 장에서 아래로 굴리면 막지 않고 페이지가 이어서 스크롤됩니다.
    let lockUntil = 0;
    const onWheel = (e) => {
      if (isHorizontal(el) || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const now = performance.now();
      const dir = Math.sign(e.deltaY);
      const from = now < lockUntil ? target.current : activeRef.current;
      const next = from + dir;
      if (dir === 0 || next < 0 || next >= ordered.length) {
        if (now >= lockUntil) return;
      }
      e.preventDefault();
      if (now < lockUntil) {
        // 같은 몸짓의 나머지(관성)는 삼키고, 몸짓이 이어지는 동안 잠금을 늘립니다.
        lockUntil = Math.max(lockUntil, now + 180);
        return;
      }
      if (Math.abs(e.deltaY) < 4) return;
      lockUntil = now + 650;
      target.current = next;
      // 휠 이벤트 처리 중에 바로 부드러운 스크롤을 걸면 브라우저가 휠 뒤처리로 취소하는 때가 있어
      // 다음 프레임에 겁니다.
      requestAnimationFrame(() => scrollToIndex(el, next));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(frame);
    };
  }, []);

  // 좁은 화면의 칩 줄은 가로로 넘치므로, 지금 카드의 칩이 보이게 따라갑니다.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth + 1) return;
    const chip = nav.querySelector(`[data-index="${active}"]`);
    if (chip) nav.scrollTo({ left: chip.offsetLeft - 24, behavior: "smooth" });
  }, [active]);

  const goTo = (i) => {
    const el = stageRef.current;
    if (!el || !el.children[i]) return;
    scrollToIndex(el, i);
    activeRef.current = i;
    setActive(i);
  };

  let index = -1;

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">진행한 프로젝트</h2>
          <p className="section-desc">
            목록을 누르거나 스크롤해서 한 장씩 넘겨 보세요. 카드를 누르면 만든 과정과 바뀐 숫자를 자세히 볼 수 있어요.
          </p>
        </Reveal>

        <Reveal>
          <div className="pj">
            <nav className="pj-nav" aria-label="프로젝트 목록" ref={navRef}>
              {grouped.map((group) => (
                <div key={group.key} className="pj-nav-group">
                  <p className="pj-nav-group-title">
                    {group.title}
                    <span className="pj-nav-group-count">{group.items.length}</span>
                  </p>
                  <ul className="pj-nav-list">
                    {group.items.map((p) => {
                      index += 1;
                      const i = index;
                      return (
                        <li key={p.slug}>
                          <button
                            type="button"
                            className="pj-nav-item"
                            data-index={i}
                            aria-current={active === i ? "true" : undefined}
                            onClick={() => goTo(i)}
                          >
                            <span className="pj-nav-no">{pad(i + 1)}</span>
                            <span className="pj-nav-name">{p.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="pj-main">
              <div className="pj-stage" ref={stageRef}>
                {ordered.map((p, i) => (
                  <article
                    key={p.slug}
                    className="pj-slide"
                    aria-label={`${ordered.length}개 중 ${i + 1}번째: ${p.name}`}
                  >
                    <Link href={`/projects/${p.slug}`} className="pj-card card">
                      <div className="pj-media">
                        <img src={p.thumbnail} alt={`${p.name} 화면`} loading={i === 0 ? "eager" : "lazy"} />
                      </div>
                      <div className="pj-body">
                        <p className="pj-meta">
                          <span>{p.groupTitle}</span>
                          {p.period && <span>{p.period}</span>}
                        </p>
                        <div className="project-name">{p.name}</div>
                        {p.cardSummary && <p className="project-summary">{p.cardSummary}</p>}
                        {p.cardHighlight && (
                          <p className="project-highlight">
                            {/* 대표 성과는 " · " 마다 한 줄씩 끊습니다. 외주는 한 문장이라 그대로 둡니다. */}
                            {groupOf(p) === "outsourcing"
                              ? p.cardHighlight
                              : p.cardHighlight.split(" · ").map((line) => (
                                  <span key={line} className="project-highlight-line">
                                    {line}
                                  </span>
                                ))}
                          </p>
                        )}
                        <div className="project-tags">
                          {p.tags.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="pj-more" aria-hidden="true">
                          자세히 보기 →
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="pj-pager">
                <button
                  type="button"
                  className="pj-pager-btn"
                  onClick={() => goTo(active - 1)}
                  disabled={active === 0}
                  aria-label="이전 프로젝트"
                >
                  ‹
                </button>
                <span className="pj-count" aria-live="polite">
                  <strong>{pad(active + 1)}</strong> / {pad(ordered.length)}
                </span>
                <span className="pj-progress" aria-hidden="true">
                  <span style={{ width: `${((active + 1) / ordered.length) * 100}%` }} />
                </span>
                <button
                  type="button"
                  className="pj-pager-btn"
                  onClick={() => goTo(active + 1)}
                  disabled={active === ordered.length - 1}
                  aria-label="다음 프로젝트"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
