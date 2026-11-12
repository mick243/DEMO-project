// 데이터 흐름의 "흐름도" 보기입니다. 목록 보기(DataFlow.js)와 같은 데이터(projects.js 의 dataflow)를 씁니다.
// 고전적인 데이터 흐름도(DFD) 표기를 따릅니다.
//  - 외부 요소(사람 · 바깥 서비스) : 네모
//  - 처리 : 번호가 붙은 원
//  - 저장소 : 위아래 선만 있는 열린 네모
// 노드 모양은 node.kind 로 정하고, 없으면 칸(lane)으로 정합니다 : 첫 칸 = 외부 요소, 가운데 = 처리, 마지막 = 저장소.
// 화살표는 paths 의 "구성 요소 → 데이터 → 구성 요소" 를 한 번씩 이어 그리고, 같은 방향 화살표는 이름을 합칩니다.

const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

const W = 960;
const TOP = 56;
const ROW = 150;
const R = 50;
const BOX = { entity: [156, 56], store: [172, 46] };

/** 한글은 글자 폭이 넓어 따로 셉니다. 라벨 배경 상자 크기를 어림하는 데만 씁니다. */
function textWidth(s, size) {
  let w = 0;
  for (const ch of s) w += /[ㄱ-힝]/.test(ch) ? size * 0.95 : size * 0.56;
  return w;
}

/** 원이나 상자 안에 들어가게 띄어쓰기 기준으로 두 줄까지 나눕니다. */
function wrap(label, max) {
  if (textWidth(label, 13) <= max) return [label];
  const words = label.split(" ");
  let best = [label];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const diff = Math.abs(textWidth(a, 13) - textWidth(b, 13));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = [a, b];
    }
  }
  return best;
}

function kindOf(node, laneIdx, laneCount) {
  if (node.kind) return node.kind;
  if (laneIdx === 0) return "entity";
  if (laneIdx === laneCount - 1) return "store";
  return "process";
}

/** 중심에서 다른 노드 쪽으로 그은 선이 이 노드의 테두리와 만나는 점 */
function edgePoint(n, tx, ty) {
  const dx = tx - n.x;
  const dy = ty - n.y;
  const len = Math.hypot(dx, dy) || 1;
  if (n.kind === "process") return [n.x + (dx / len) * (R + 3), n.y + (dy / len) * (R + 3)];
  const [w, h] = BOX[n.kind];
  const t = Math.min((w / 2 + 3) / Math.abs(dx || 1e-6), (h / 2 + 3) / Math.abs(dy || 1e-6));
  return [n.x + dx * t, n.y + dy * t];
}

/** 노드가 차지하는 상자(겹침 검사용) */
function nodeBox(n, pad = 6) {
  const [w, h] = n.kind === "process" ? [R * 2, R * 2] : BOX[n.kind];
  return { x1: n.x - w / 2 - pad, y1: n.y - h / 2 - pad, x2: n.x + w / 2 + pad, y2: n.y + h / 2 + pad };
}
const hit = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;

/** 점 p 에서 선분 ab 까지의 거리 */
function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

const quad = (p0, c, p1, t) => (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * c + t * t * p1;

export function layout(flow) {
  const laneIndex = Object.fromEntries(flow.lanes.map((l, i) => [l.key, i]));
  const colW = W / flow.lanes.length;

  // 같은 방향 화살표는 하나로 합치고 이름을 모읍니다.
  const edgeMap = new Map();
  for (const path of flow.paths) {
    for (let i = 0; i + 2 < path.steps.length; i += 2) {
      const [from, label, to] = [path.steps[i], path.steps[i + 1], path.steps[i + 2]];
      const key = `${from}>${to}`;
      const e = edgeMap.get(key) ?? { from, to, labels: [] };
      if (!e.labels.includes(label)) e.labels.push(label);
      edgeMap.set(key, e);
    }
  }
  const rawEdges = [...edgeMap.values()];

  const byLane = flow.lanes.map((l) => Object.keys(flow.nodes).filter((id) => flow.nodes[id].lane === l.key));
  const rows = Math.max(...byLane.map((ns) => ns.length));
  const H = TOP + rows * ROW + 8;
  const slotY = (count, ri) => TOP + ((rows - count) * ROW) / 2 + ri * ROW + ROW / 2;

  // 처음 자리는 데이터 순서, 그다음 이웃 노드들의 평균 높이로 몇 번 다시 줄 세워 선이 덜 엇갈리게 합니다.
  const y = {};
  byLane.forEach((ids) => ids.forEach((id, ri) => (y[id] = slotY(ids.length, ri))));
  for (let pass = 0; pass < 4; pass++) {
    byLane.forEach((ids) => {
      const score = (id) => {
        const ys = rawEdges.filter((e) => e.from === id || e.to === id).map((e) => y[e.from === id ? e.to : e.from]);
        return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : y[id];
      };
      const order = [...ids].sort((a, b) => score(a) - score(b) || ids.indexOf(a) - ids.indexOf(b));
      order.forEach((id, ri) => (y[id] = slotY(ids.length, ri)));
    });
  }

  const nodes = {};
  let processNo = 0;
  byLane.forEach((ids, li) => {
    [...ids].sort((a, b) => y[a] - y[b]).forEach((id) => {
      const n = flow.nodes[id];
      const kind = kindOf(n, li, flow.lanes.length);
      nodes[id] = { id, label: n.label, kind, lane: li, no: kind === "process" ? ++processNo : null, x: colW * li + colW / 2, y: y[id] };
    });
  });
  const boxes = Object.values(nodes).map((n) => ({ id: n.id, ...nodeBox(n) }));

  const placed = [];
  const edges = rawEdges.map((e) => {
    const a = nodes[e.from];
    const b = nodes[e.to];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const px = -dy / len;
    const py = dx / len;
    // 반대 방향 짝이 있으면 양옆으로 띄웁니다.
    const twin = edgeMap.has(`${e.to}>${e.from}`) ? 10 : 0;
    // 곧은 선이 다른 노드를 지나가면 비켜 가는 곡선으로 바꿉니다.
    const others = Object.values(nodes).filter((n) => n.id !== a.id && n.id !== b.id);
    const blocked = (bend) =>
      others.some((n) => {
        const cx = (a.x + b.x) / 2 + px * bend;
        const cy = (a.y + b.y) / 2 + py * bend;
        for (let t = 0.1; t < 0.95; t += 0.05) {
          const qx = quad(a.x, cx, b.x, t);
          const qy = quad(a.y, cy, b.y, t);
          if (Math.hypot(qx - n.x, qy - n.y) < (n.kind === "process" ? R + 10 : 96)) return true;
        }
        return false;
      });
    let bend = twin;
    if (blocked(bend)) {
      const tries = [70, -70, 120, -120, 170, -170, 230, -230];
      bend = tries.find((b2) => !blocked(b2 + twin)) ?? 120;
      bend += twin;
    }
    const cx = (a.x + b.x) / 2 + px * bend;
    const cy = (a.y + b.y) / 2 + py * bend;
    const [x1, y1] = edgePoint(a, cx, cy);
    const [x2, y2] = edgePoint(b, cx, cy);
    // 합쳐진 이름은 한 줄에 하나씩 둡니다.
    const lines = e.labels;
    const label = lines.join(" / ");
    const lh = 15;
    const half = (lines.length * lh + 4) / 2;

    // 라벨은 선 위에서 다른 라벨 · 노드와 겹치지 않는 자리를 앞에서부터 찾습니다.
    const lw = Math.max(...lines.map((l) => textWidth(l, 11.5))) + 10;
    // 겹침 넓이가 가장 작은 자리를 고릅니다(0 이면 바로 씁니다).
    const area = (a, b) => Math.max(0, Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1)) * Math.max(0, Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1));
    let spot = null;
    let bestCost = Infinity;
    for (const t of [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74, 0.18, 0.82]) {
      for (const shift of [0, 14, -14, 28, -28, 44, -44]) {
        const lx = quad(x1, cx, x2, t) + px * shift;
        const ly = quad(y1, cy, y2, t) + py * shift;
        const box = { x1: lx - lw / 2, y1: ly - half, x2: lx + lw / 2, y2: ly + half };
        const cost =
          placed.reduce((sum, b2) => sum + area(b2, box) * 3, 0) +
          boxes.reduce((sum, nb) => sum + area(nb, box), 0) +
          Math.abs(shift) * 0.5 + Math.abs(t - 0.5) * 20;
        if (cost < bestCost) {
          bestCost = cost;
          spot = { lx, ly, box };
        }
      }
    }
    placed.push(spot.box);
    return { ...e, label, lines, half, d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, lx: spot.lx, ly: spot.ly, lw };
  });

  return { nodes, edges, H, colW, laneIndex };
}

function Node({ n, fixes }) {
  const lines = wrap(n.label, n.kind === "process" ? 84 : BOX[n.kind][0] - 20);
  const badge = fixes?.length ? fixes.map((f) => CIRCLED[f]).join("") : null;
  const lineH = 16;
  const firstY = n.y - ((lines.length - 1) * lineH) / 2 + 4.5;
  let shape;
  let badgeX;
  let badgeY;
  if (n.kind === "process") {
    shape = <circle cx={n.x} cy={n.y} r={R} className="dfd-shape" />;
    badgeX = n.x + R * 0.72;
    badgeY = n.y - R * 0.72;
  } else if (n.kind === "entity") {
    const [w, h] = BOX.entity;
    shape = <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx={4} className="dfd-shape" />;
    badgeX = n.x + w / 2;
    badgeY = n.y - h / 2;
  } else {
    const [w, h] = BOX.store;
    shape = (
      <g className="dfd-store">
        <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} className="dfd-store-fill" />
        <line x1={n.x - w / 2} y1={n.y - h / 2} x2={n.x + w / 2} y2={n.y - h / 2} className="dfd-shape" />
        <line x1={n.x - w / 2} y1={n.y + h / 2} x2={n.x + w / 2} y2={n.y + h / 2} className="dfd-shape" />
      </g>
    );
    badgeX = n.x + w / 2;
    badgeY = n.y - h / 2;
  }
  return (
    <g className={`dfd-node ${n.kind} lane-${n.lane}`}>
      {shape}
      <text className="dfd-label" textAnchor="middle">
        {lines.map((l, i) => (
          <tspan key={l} x={n.x} y={firstY + i * lineH - (n.no ? 8 : 0)}>
            {l}
          </tspan>
        ))}
        {n.no && (
          <tspan className="dfd-no" x={n.x} y={firstY + lines.length * lineH - 6}>
            {n.no}
          </tspan>
        )}
      </text>
      {badge && (
        <text x={badgeX} y={badgeY} className="dfd-badge" textAnchor="middle">
          {badge}
        </text>
      )}
    </g>
  );
}

export default function DataFlowDiagram({ flow, id }) {
  if (!flow) return null;
  const { nodes, edges, H, colW } = layout(flow);
  const fixesByNode = {};
  (flow.fixes ?? []).forEach((f, i) => (fixesByNode[f.node] ??= []).push(i));
  const markerId = `dfd-arrow-${id}`;

  return (
    <figure className="df dfd">
      <p className="dfd-hint">옆으로 밀면 흐름도 전체를 볼 수 있어요.</p>
      <div className="dfd-scroll">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="dfd-svg"
          role="img"
          aria-label={`데이터 흐름도. 구성 요소 ${Object.keys(nodes).length}개, 흐름 ${edges.length}개. 같은 내용을 목록 보기에서 글로 읽을 수 있어요.`}
        >
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="dfd-arrowhead" />
            </marker>
          </defs>
          {flow.lanes.map((l, i) => (
            <text key={l.key} x={colW * i + colW / 2} y={24} textAnchor="middle" className={`dfd-lane lane-${i}`}>
              {l.label}
            </text>
          ))}
          {edges.map((e) => (
            <path key={`${e.from}>${e.to}`} d={e.d} className="dfd-edge" markerEnd={`url(#${markerId})`} />
          ))}
          {Object.values(nodes).map((n) => (
            <Node key={n.id} n={n} fixes={fixesByNode[n.id]} />
          ))}
          {edges.map((e) => {
            return (
              <g key={`l-${e.from}>${e.to}`} className="dfd-edge-label">
                <rect x={e.lx - e.lw / 2} y={e.ly - e.half} width={e.lw} height={e.half * 2} rx={4} />
                <text textAnchor="middle">
                  {e.lines.map((l, i) => (
                    <tspan key={l} x={e.lx} y={e.ly - e.half + 14 + i * 15}>
                      {l}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="dfd-legend">
        <span>
          <i className="dfd-key entity" aria-hidden="true" />
          외부 요소
        </span>
        <span>
          <i className="dfd-key process" aria-hidden="true" />
          처리
        </span>
        <span>
          <i className="dfd-key store" aria-hidden="true" />
          저장소
        </span>
      </figcaption>
      {flow.fixes?.length > 0 && (
        <ol className="df-fixes">
          {flow.fixes.map((f, i) => (
            <li key={f.text}>
              <span className="df-fix-no">{CIRCLED[i]}</span>
              <span>
                <b>{flow.nodes[f.node].label}</b> : {f.text}
              </span>
            </li>
          ))}
        </ol>
      )}
      {flow.note && <p className="df-note">{flow.note}</p>}
    </figure>
  );
}
