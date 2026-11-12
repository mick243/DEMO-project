"use client";

// 데이터 흐름을 "목록"(기본)과 "흐름도" 중 하나로 보여 주는 전환 버튼입니다.
// 스크립트가 없으면 버튼은 숨고 목록 보기만 보입니다.

import { useState } from "react";
import DataFlow from "./DataFlow";
import DataFlowDiagram from "./DataFlowDiagram";

const VIEWS = [
  { key: "list", label: "목록으로 보기" },
  { key: "diagram", label: "흐름도로 보기" },
];

export default function DataFlowViews({ flow, id }) {
  const [view, setView] = useState("list");
  if (!flow) return null;
  return (
    <div className="df-views">
      <div className="df-toggle" role="group" aria-label="데이터 흐름 보기 방식">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            type="button"
            className="df-toggle-btn"
            aria-pressed={view === v.key}
            onClick={() => setView(v.key)}
          >
            {v.label}
          </button>
        ))}
      </div>
      {view === "list" ? <DataFlow flow={flow} /> : <DataFlowDiagram flow={flow} id={id} />}
    </div>
  );
}
