"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 한 줄로 두고 옆으로 스크롤하는 줄 — 넘치는 쪽에만 화살표가 붙습니다.
 *
 * 오락실 파인더의 커뮤니티 게임 탭(components/ScrollStrip.tsx)에서 그대로 옮겨 온
 * 장치입니다. 항목이 많은 줄을 접히게 두면 화면 폭에 따라 두 줄·세 줄이 되면서 그 아래
 * 내용이 오르내립니다. 줄 높이가 고정되어야 아래가 늘 같은 자리에 있습니다.
 *
 * 대신 옆으로 넘긴 자리는 보이지 않으므로, 스크롤 막대를 숨긴 자리에 화살표를 띄웁니다 —
 * 마우스에는 가로로 미는 손쉬운 방법이 없어서 이게 안내이자 조작 수단입니다.
 *
 * 줄의 생김새(여백·경계선·칩 모양)는 `className` 으로 받은 클래스가 정하고,
 * 여기서는 넘침만 다룹니다.
 */

/** 화살표 한 번에 옮기는 거리 — 보이는 폭에 대한 비율. 1 이면 보던 것이 전부 사라집니다 */
const PAGE_RATIO = 0.8;

/**
 * 끝에 닿았는지 볼 때 두는 여유(px).
 *
 * scrollLeft · scrollWidth 는 소수로 옵니다(브라우저 확대 · 고DPI). 0 과 최대값에
 * 정확히 맞춰 비교하면 끝까지 밀어도 1px 이 남아 화살표가 사라지지 않습니다.
 */
const EDGE_SLACK = 2;

export default function ScrollStrip({
  children,
  className,
  wrapClassName,
  as: Track = "div",
  /** nav 로 쓸 때 줄 자체가 무엇인지 알리는 이름 (낭독기가 읽습니다) */
  ariaLabel,
  remeasureKey,
}) {
  const trackRef = useRef(null);

  /** 넘치지 않으면 양쪽 다 true — 화살표가 하나도 안 뜹니다 */
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= EDGE_SLACK);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - EDGE_SLACK);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();

    // 창 크기는 그대로인 채 이 줄만 좁아지는 경우(글꼴 로드 등)를 놓치지 않도록
    // window 의 resize 가 아니라 요소를 직접 지켜봅니다.
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [measure, remeasureKey]);

  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * PAGE_RATIO, behavior: "smooth" });
  };

  /*
    화살표는 마우스용 보조 장치라 키보드 · 낭독기에서는 감춥니다. 키보드로 항목을 넘기면
    브라우저가 focus 를 따라 알아서 줄을 밀어 주므로, 여기 focus 를 한 칸 더 세우면
    같은 일을 하는 버튼을 두 번 지나게 됩니다.
  */
  const arrow = (dir, show) =>
    show ? (
      <button
        type="button"
        className={dir === -1 ? "scroll-strip-arrow is-left" : "scroll-strip-arrow is-right"}
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => nudge(dir)}
      >
        {dir === -1 ? "‹" : "›"}
      </button>
    ) : null;

  return (
    <div className={wrapClassName ? `scroll-strip ${wrapClassName}` : "scroll-strip"}>
      {arrow(-1, !atStart)}
      <Track
        className={`scroll-strip-track ${className}`}
        ref={trackRef}
        aria-label={ariaLabel}
        onScroll={measure}
      >
        {children}
      </Track>
      {arrow(1, !atEnd)}
    </div>
  );
}
