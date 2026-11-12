// 프로젝트 상세의 "데이터 흐름" 그림입니다. 문구는 전부 데이터(app/data/projects.js 의 dataflow)에 있고,
// 여기에는 모양만 있습니다.
//  - 위 : 구성 요소를 자리(lanes)별 칸에 놓은 지도. 개선한 곳은 번호 배지로 표시합니다.
//  - 아래 : 실제로 데이터가 지나가는 길(paths)을 "구성 요소 → 오가는 데이터 → 구성 요소" 순서로 한 줄씩.
// 색만으로 읽지 않도록 자리 이름을 칸 머리와 칩 안에 글로도 적습니다.

const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

function NodeChip({ node, laneIndex }) {
  return <span className={`df-chip lane-${laneIndex}`}>{node.label}</span>;
}

export default function DataFlow({ flow }) {
  if (!flow) return null;
  const laneIndex = Object.fromEntries(flow.lanes.map((l, i) => [l.key, i]));
  const fixesByNode = {};
  (flow.fixes ?? []).forEach((f, i) => {
    (fixesByNode[f.node] ??= []).push({ ...f, no: i });
  });

  return (
    <figure className="df">
      <div className="df-lanes" style={{ "--df-cols": flow.lanes.length }}>
        {flow.lanes.map((lane, li) => (
          <section key={lane.key} className={`df-lane lane-${li}`}>
            <h3 className="df-lane-name">{lane.label}</h3>
            <ul className="df-nodes">
              {Object.entries(flow.nodes)
                .filter(([, n]) => n.lane === lane.key)
                .map(([id, n]) => (
                  <li key={id} className="df-node">
                    <b className="df-node-label">
                      {n.label}
                      {fixesByNode[id]?.map((f) => (
                        <span key={f.no} className="df-fix-badge" title={f.text}>
                          {CIRCLED[f.no]}
                        </span>
                      ))}
                    </b>
                    {n.note && <span className="df-node-note">{n.note}</span>}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="df-paths">
        {flow.paths.map((path) => (
          <div key={path.name} className="df-path">
            <span className="df-path-name">{path.name}</span>
            <ol className="df-path-steps">
              {path.steps.map((s, i) =>
                i % 2 === 0 ? (
                  <li key={i} className="df-path-node">
                    <NodeChip node={flow.nodes[s]} laneIndex={laneIndex[flow.nodes[s].lane]} />
                  </li>
                ) : (
                  <li key={i} className="df-path-edge">
                    <span className="df-edge-arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="df-edge-label">{s}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
        ))}
      </div>

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
      {flow.note && <figcaption className="df-note">{flow.note}</figcaption>}
    </figure>
  );
}
