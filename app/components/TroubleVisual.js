// 트러블슈팅 한 건의 시각 자료입니다. 데이터의 visual.type 으로 모양을 고릅니다.
//  - compare: 같은 지표의 고치기 전 · 후 값을 막대 두 개로 비교합니다.
//  - flow   : 고치기 전 · 후의 흐름을 단계 칩과 화살표로 나란히 보여 줍니다.
// 문구는 전부 데이터(app/data/projects.js)에 있고, 여기에는 모양만 있습니다.

/** 전 · 후 변화를 한 줄로. 95% 넘게 줄면 "N분의 1" 이 퍼센트보다 읽기 쉽습니다. */
function changeLabel(before, after) {
  if (!before || before === after) return null;
  const ratio = after / before;
  if (ratio < 0.05) return `${Math.round(before / after).toLocaleString("ko-KR")}분의 1`;
  const pct = (ratio - 1) * 100;
  const digits = Math.abs(pct) < 10 ? 1 : 0;
  return `${pct > 0 ? "+" : "−"}${Math.abs(pct).toFixed(digits)}%`;
}

function CompareRow({ row }) {
  const max = Math.max(row.before, row.after);
  // 값이 아주 작아도 막대가 있다는 것은 보이게 최소 폭을 둡니다. 실제 값은 옆 숫자가 말합니다.
  const width = (v) => `${Math.max((v / max) * 100, 0.8)}%`;
  // 본문에 적힌 변화율과 반올림이 어긋나면 데이터의 change 로 맞춥니다.
  const change = row.change ?? changeLabel(row.before, row.after);
  return (
    <div className="tv-row">
      <div className="tv-row-head">
        <span className="tv-row-label">{row.label}</span>
        {change && <span className="tv-change">{change}</span>}
      </div>
      {[
        ["before", "이전", row.before, row.beforeText],
        ["after", "이후", row.after, row.afterText],
      ].map(([key, name, value, text]) => (
        <div key={key} className={`tv-bar-line ${key}`} title={`${row.label} ${name}: ${text}`}>
          <span className="tv-bar-name">{name}</span>
          <span className="tv-track">
            <span className="tv-bar" style={{ width: width(value) }} />
          </span>
          <span className="tv-bar-value">{text}</span>
        </div>
      ))}
    </div>
  );
}

function FlowLine({ kind, steps }) {
  const isAfter = kind === "after";
  return (
    <div className={`tv-flow-line ${kind}`}>
      <span className="tv-flow-name">{isAfter ? "이후" : "이전"}</span>
      <ol className="tv-flow-steps">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={s} className="tv-flow-item">
              <span className={`tv-step${last ? " end" : ""}`}>
                {last && (
                  <span className="tv-step-mark" aria-hidden="true">
                    {isAfter ? "✓" : "✕"}
                  </span>
                )}
                {s}
              </span>
              {!last && (
                <span className="tv-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function TroubleVisual({ visual }) {
  if (!visual) return null;
  if (visual.type === "compare") {
    return (
      <figure className="tv tv-compare">
        {visual.rows.map((row) => (
          <CompareRow key={row.label} row={row} />
        ))}
        {visual.note && <figcaption className="tv-note">{visual.note}</figcaption>}
      </figure>
    );
  }
  if (visual.type === "flow") {
    return (
      <figure className="tv tv-flow">
        <FlowLine kind="before" steps={visual.before} />
        <FlowLine kind="after" steps={visual.after} />
      </figure>
    );
  }
  return null;
}
