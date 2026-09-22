// 「클라이언트 — 뷰포트 컬링 전후」 표의 딥다이브 내용입니다.
//
// 상세 페이지(app/projects/[slug]/page.js)의 성능 표 제목에서 링크로 들어옵니다.
// 수치와 코드는 원본 저장소(Desktop/claude/개인 프로젝트)에서 직접 가져왔습니다.
//   - 원본 측정 기록: Notion 「개인 프로젝트 5」 (2026.08.25)
//   - 구현: 커밋 57f74f1 (2026.08.24) · 계측 장치: 커밋 8e8de80 (2026.08.25)
//   - 코드: components/NaverMap.tsx · components/ArcadeFinder.tsx · lib/geo.ts · lib/map-perf.ts
//   - 서버 SQL: 커밋 5b9bf06 (2026.09.11) · lib/arcades.ts · PERFORMANCE.md 4부
//
// 블록 종류는 다섯입니다 — text · list · code · table · note.
// 페이지는 이 배열을 그대로 훑어 그립니다. 내용을 고칠 때 JSX 를 건드릴 일이 없습니다.

export const viewportCulling = {
  slug: "arcade-finder",
  eyebrow: "Deep dive",
  title: "클라이언트 — 뷰포트 컬링 전후",
  lede: "전국 마커 1,449개를 화면 안 337개로 줄인 작업입니다. 무엇을 고쳤고, 왜 그만큼 줄었는지를 코드와 함께 정리했습니다.",

  meta: [
    { dt: "측정 환경", dd: "Chrome · 1280×720 · 서울 zoom 12 · dev 빌드" },
    { dt: "원본 기록", dd: "Notion 「개인 프로젝트 5」 (2026.08.25)" },
    { dt: "구현 커밋", dd: "57f74f1 (2026.08.24)" },
    { dt: "계측 커밋", dd: "8e8de80 (2026.08.25)" },
  ],

  // 표 자체는 projects.js 의 perf[0].rows 를 그대로 다시 씁니다 (수치를 두 곳에 적지 않습니다).
  summaryNote:
    "먼저 짚어 둘 것 — 이 표의 수치는 SQL 을 고쳐서 나온 것이 아닙니다. 서버 쿼리는 이때 한 줄도 건드리지 않았고, 바뀐 것은 클라이언트가 이미 받아 둔 배열에서 무엇을 그릴지 고르는 필터 한 줄입니다. SQL 을 고쳐 낸 수치는 아래 ‘서버’ 절에 따로 있습니다.",

  sections: [
    {
      id: "records",
      eyebrow: "01 · Records",
      title: "어디에 남아 있는 기록인가",
      desc: "수치의 출처를 먼저 밝힙니다. 표의 다섯 줄은 전부 한 장의 작업 메모에서 나왔습니다.",
      blocks: [
        {
          kind: "table",
          head: ["출처", "내용"],
          rows: [
            [
              "Notion 「개인 프로젝트 5」 (2026.08.25)",
              "원본 측정 기록. “detail-pane이 열려있을때 최적화 이슈 → 오락실 지점을 전부 출력이 아닌 화면 안에만 나오게 수정”",
            ],
            [
              "커밋 57f74f1 (2026.08.24)",
              "구현이 들어간 커밋. CULL_MARGIN · 커스텀 OverlayView · 마커 풀 · 2단계 디핑",
            ],
            [
              "커밋 8e8de80 (2026.08.25)",
              "계측 장치가 들어간 커밋. lib/map-perf.ts + MapPerfPanel (/?perf=1)",
            ],
            [
              "docs/PERF-A11Y-REPORT.md · README.md",
              "위 기록을 정리한 문서. README 쪽에 마커 1개당 단가까지 분해되어 있음",
            ],
          ],
        },
        {
          kind: "text",
          text: "서버 성능 기록(PERFORMANCE.md 1~4부)에는 이 표의 숫자가 한 번도 등장하지 않습니다. 계통이 다른 작업입니다.",
        },
      ],
    },

    {
      id: "predicate",
      eyebrow: "02 · The predicate",
      title: "실제로 바뀐 ‘질의’는 한 줄입니다",
      desc: "SQL 로 비유하면 WHERE 절을 DB 가 아니라 렌더러 바로 앞에 붙인 것입니다. 데이터는 여전히 전국을 다 받아 메모리에 들고 있고, 술어는 그리기 직전에만 적용됩니다.",
      blocks: [
        {
          kind: "code",
          caption: "components/NaverMap.tsx — 그릴 것을 고르는 술어",
          code: `const CULL_MARGIN = 0.2;

/** 지금 보이는 범위 + 여백. 'idle' 로 지도가 멈춘 뒤에 읽는다 */
function readViewport(map) {
  const bounds = map.getBounds();
  const sw = bounds.getSW(), ne = bounds.getNE();
  return padBox({ minLat: sw.lat(), maxLat: ne.lat(),
                  minLng: sw.lng(), maxLng: ne.lng() }, CULL_MARGIN);
}

// 'idle' 은 끌기·줌이 **멈춘 뒤** 한 번 온다.
// bounds_changed 로 받으면 끄는 중에 프레임마다 마커를 다시 붙이게 된다.
naver.maps.Event.addListener(map, 'idle', () => setViewport(readViewport(map)));

const inView = useMemo(() => {
  if (!viewport) return [];
  if (cullingOff) return arcades;        // 계측 패널이 컬링을 끈 상태 (/?perf=1)
  return arcades.filter((a) => a.id === selectedId || inBox(viewport, a));
}, [arcades, viewport, selectedId, cullingOff]);`,
        },
        {
          kind: "list",
          items: [
            "CULL_MARGIN 0.2 — 히스테리시스입니다. 이름표가 점의 오른쪽으로 뻗으므로 점이 화면 밖 1px 인 곳도 이름표는 보여야 하고, 경계에 걸친 마커가 붙었다 떨어졌다 하는 것도 이 여백이 흡수합니다.",
            "idle — 작업을 프레임 예산 밖으로 밀어냅니다. bounds_changed 로 받으면 지도를 끄는 동안 매 프레임 재동기화가 돕니다.",
            "a.id === selectedId — 필터의 정합성 예외입니다. 목록에서 먼 곳을 누르면 지도가 옮겨 가는데, 그 사이 한 프레임 마커가 없으면 선택 표시가 깜빡입니다.",
          ],
        },
        {
          kind: "note",
          text: "padBox · inBox 자체는 이 커밋에서 만든 것이 아닙니다. 한 커밋 전(fe2e1c1)에 테스트까지 갖춰 들어와 있었지만 아무도 쓰지 않던 함수였고, 컬링이 그 자리를 채웠습니다.",
        },
      ],
    },

    {
      id: "loop",
      eyebrow: "03 · Before / After",
      title: "마커 동기화 루프",
      desc: "한 이펙트 안에서 네 가지가 동시에 바뀌었습니다 — 순회 대상, 제거 방식, 갱신 판정, 마커 구현체.",
      blocks: [
        {
          kind: "code",
          caption: "이전 — 받은 것을 전부 그린다",
          code: `useEffect(() => {
  const markers = markersRef.current;
  const nextIds = new Set(arcades.map((a) => a.id));   // ← 전국 1,449곳

  // 사라진 마커 제거
  markers.forEach((marker, id) => {
    if (!nextIds.has(id)) {
      marker.setMap(null);                              // ← 개당 1.66ms
      markers.delete(id);
    }
  });

  // 추가 / 갱신
  for (const arcade of arcades) {                       // ← 1,449회 순회
    const selected = arcade.id === selectedId;
    const existing = markers.get(arcade.id);
    if (existing) {
      existing.setIcon(markerIcon(arcade, selected));   // ← 무조건 다시 그림
      existing.setZIndex(selected ? 200 : 100);
      continue;
    }
    const marker = new naver.maps.Marker({              // ← 기본 Marker (left/top)
      position: new naver.maps.LatLng(arcade.lat, arcade.lng),
      map, title: arcade.name,
      zIndex: selected ? 200 : 100,
      icon: markerIcon(arcade, selected),
    });
    naver.maps.Event.addListener(marker, 'click', () => onSelect(arcade.id));
    markers.set(arcade.id, marker);
  }
}, [arcades, selectedId, ready, onSelect]);`,
        },
        {
          kind: "code",
          caption: "이후 — 화면 안의 것만, 떼지 않고, 바뀐 것만",
          code: `useEffect(() => {
  const perfT0 = performance.now();                     // 계측 (lib/map-perf.ts)
  const perfDraw0 = drawTally.n;

  const markers = markersRef.current;
  const pool = poolRef.current;
  const nextIds = new Set(inView.map((a) => a.id));     // ← 화면 안 337곳

  // 화면에서 빠진 것은 **숨겨서 모아 둔다** (떼어내지 않는다)
  markers.forEach((marker, id) => {
    if (!nextIds.has(id)) {
      marker.hide();                                    // display:none — 1ms
      pool.push(marker);
      markers.delete(id);
      markerShapeRef.current.delete(id);
    }
  });

  for (const arcade of inView) {                        // ← 337회 순회
    const z = selected ? 200 : rank !== undefined ? 150 : 100;
    const existing = markers.get(arcade.id);

    if (existing) {
      const shown = markerShapeRef.current.get(arcade.id);
      // (1) 참조까지 같으면 HTML 문자열을 만들 이유조차 없다
      if (shown && shown.arcade === arcade && shown.z === z) continue;

      const icon = markerIcon(arcade, selected, rank);
      if (shown) {
        // (2) 값이 같으면 DOM 은 그대로 둔다. 바뀐 것만 골라 쓴다
        if (shown.content !== icon.content) existing.setContent(icon.content, icon.anchor);
        if (shown.z !== z) existing.setZIndexValue(z);
        markerShapeRef.current.set(arcade.id, { arcade, z, content: icon.content });
        continue;
      }
    }

    // 모아 둔 것이 있으면 갈아 끼운다. 없을 때만 새로 만든다
    const recycled = pool.pop();
    const marker = recycled ?? new HtmlOverlayCtor({ position, map, zIndex: z });
    if (recycled) recycled.reuse({ position, content: icon.content, anchor, zIndex: z, onClick });

    markers.set(arcade.id, marker);
    markerShapeRef.current.set(arcade.id, { arcade, z, content: icon.content });
  }

  // 풀이 화면 하나 분량(200)을 넘으면 그만큼은 진짜로 떼어낸다
  while (pool.length > MARKER_POOL_MAX) pool.pop()?.setMap(null);

  reportSync({ markers: markers.size, total: arcades.length,
               syncMs: performance.now() - perfT0, drawCalls: drawTally.n - perfDraw0 });
}, [inView, selectedId, ready, onSelect, rankById, arcades.length]);`,
        },
        {
          kind: "table",
          head: ["바뀐 것", "이전", "이후"],
          rows: [
            ["순회 대상", "arcades (1,449)", "inView (337) — 컬링"],
            ["화면에서 빠진 마커", "setMap(null) · 개당 1.66ms", "hide() 후 풀 반납 · 142개에 1ms"],
            ["갱신 판정", "무조건 setIcon", "참조 비교 → 값 비교 2단계"],
            ["마커 구현체", "naver.maps.Marker (left/top)", "커스텀 OverlayView (translate3d)"],
          ],
        },
      ],
    },

    {
      id: "overlay",
      eyebrow: "04 · Overlay",
      title: "기본 Marker 를 버리고 오버레이를 직접 만들었습니다",
      desc: "naver.maps.Marker 는 left/top 으로 위치를 잡아 팬·줌마다 리플로우가 납니다. OverlayView 를 상속해 transform 으로 바꾼 것이 강제 동기 레이아웃 6,445 → 2,397ms 의 구조적 근거입니다.",
      blocks: [
        {
          kind: "code",
          caption: "components/NaverMap.tsx — draw · hide · reuse",
          code: `draw() {
  if (!this.getMap() || this.isHidden) return;
  drawTally.n += 1;                                     // 계측 카운터
  const offset = this.getProjection().fromCoordToOffset(this.position);
  this.element.style.transform =
    \`translate3d(\${offset.x - this.anchor.x}px, \${offset.y - this.anchor.y}px, 0)\`;
}

hide() {                              // 떼지 않고 숨긴다
  this.isHidden = true;
  this.hovered = false;
  this.element.style.display = 'none';
  this.onClick = undefined;
}

reuse(o) {                            // 숨겨 둔 것을 다른 오락실로 갈아 끼운다
  this.position = o.position; this.anchor = o.anchor; this.onClick = o.onClick;
  this.element.innerHTML = o.content;
  this.baseZ = o.zIndex; this.element.style.zIndex = String(o.zIndex);
  this.isHidden = false; this.element.style.display = '';
  this.draw();
}`,
        },
        {
          kind: "list",
          items: [
            "리스너는 onAdd 에서 한 번만 답니다. onClick 은 갈아 끼울 수 있으므로(reuse) 핸들러가 그때그때 최신 값을 읽습니다 — 재활용마다 떼고 다시 달면 그게 비용입니다.",
            "will-change: transform 은 기본 false 입니다. 337개 전부 승격하면 순손실로 측정됐습니다. 좌표가 계속 바뀌는 ‘내 위치’ 마커만 true 입니다.",
            "앵커를 Point(12, 34) 에서 Point(0, 0) 으로 바꿨습니다. 순위 뱃지·알약 여부에 따라 점 앞에 붙는 것이 달라져 JS 상수로는 못 맞추므로, 되미는 일을 CSS 로 넘겼습니다.",
          ],
        },
      ],
    },

    {
      id: "sidebar",
      eyebrow: "05 · Consistency",
      title: "사이드바를 같은 술어에 물렸습니다",
      desc: "지도만 자르면 “지도엔 없는데 목록엔 있는” 줄이 생깁니다. 목록도 같은 inBox 를 쓰게 했습니다.",
      blocks: [
        {
          kind: "code",
          caption: "components/ArcadeFinder.tsx",
          code: `const [mapViewport, setMapViewport] = useState(null);

const inViewport = useMemo(
  () => mapViewport && !searching
    ? inRadius.filter((s) => s.arcade.id === selectedId || inBox(mapViewport, s.arcade))
    : inRadius,                    // 범위를 못 받았으면 거르지 않는다 (SDK 실패 대비)
  [inRadius, mapViewport, selectedId, searching],
);

const offscreen = inRadius.length - inViewport.length;   // "화면 안 N곳 중 M곳"

<MapPane … onViewportChange={setMapViewport} />`,
        },
        {
          kind: "text",
          text: "검색 중에는 일부러 거르지 않습니다. 검색의 요점이 “화면 밖이라도 찾는다” 인데 화면으로 거르면 그 요점이 사라집니다. 줄을 누르면 지도가 그리로 갑니다.",
        },
      ],
    },

    {
      id: "theory",
      eyebrow: "06 · Theory",
      title: "왜 이만큼 줄었나",
      desc: "핵심 전제는 하나입니다 — 비용은 ‘받은 행 수’가 아니라 ‘그린 노드 수’에 비례합니다.",
      blocks: [
        {
          kind: "table",
          head: ["실측 단가", "값"],
          rows: [
            ["마커 1개", "DOM 5노드 · JS 힙 8.6KB"],
            ["전국 1,449곳 JSON (/api/arcades)", "446KB → 파싱 후 힙 0.24MB"],
            ["그 1,449곳을 전부 마커로", "힙 +9.4MB · DOM +5,560노드"],
          ],
        },
        {
          kind: "text",
          text: "데이터를 들고 있는 값이 그리는 값의 1/39 입니다. 그래서 줄일 곳이 “무엇을 받는가”가 아니라 “무엇을 그리는가”로 정해졌습니다. 서울 zoom 12 에서 남은 것은 337개, 즉 1,112개가 아예 만들어지지 않았습니다. 표의 다섯 줄이 전부 이 1,112 에서 나옵니다.",
        },
        {
          kind: "list",
          items: [
            "DOM 7,462 → 1,902 — 1,112 × 5노드 = 5,560 감소. 산술이 정확히 맞습니다.",
            "힙 23.68 → 14.32MB — 1,112 × 8.6KB ≈ 9.36MB 감소. 이것도 맞습니다.",
            "초기 동기화 622 → 156ms — 마커 생성 루프는 O(N) 이고 한 덩어리의 블로킹 작업입니다. 4.0배 감소가 마커비 4.3배와 거의 같습니다. 622ms 는 60fps 기준 37프레임을 통째로 먹습니다.",
            "draw() 1,449회 → 337회 — OverlayView.draw() 는 마커마다 위경도를 화면 픽셀로 투영합니다. 호출 수가 곧 마커 수라 −77% 가 그대로 나옵니다.",
          ],
        },
        {
          kind: "text",
          text: "강제 스타일·레이아웃만 −63% 로 마커비(−77%)보다 덜 줄었습니다. 여기가 원리를 보여 주는 지점입니다. DOM 에 쓰기를 하면 레이아웃이 무효화되고, 그 직후 기하값을 읽으면 브라우저가 그 자리에서 레이아웃을 다시 계산합니다(layout thrashing). 마커마다 쓰기→읽기가 한 번씩 있으면 플러시가 N회 일어나고 플러시 1회의 비용도 트리 크기에 비례하므로, 이론상 −77%보다 더 줄어야 합니다. −63% 에서 멈춘 이유는 6,445ms 안에 마커 수와 무관한 몫(지도 SDK 자신의 타일·pane, 사이드바·상세 패널)이 섞여 있기 때문입니다. 줄어든 4,048ms 가 마커가 만들던 몫이고, 남은 2,397ms 는 원래부터 마커 것이 아니었습니다.",
        },
      ],
    },

    {
      id: "tradeoff",
      eyebrow: "07 · Trade-off",
      title: "공짜는 아니었습니다",
      desc: "컬링은 초기 비용을 조작 비용으로 옮기는 거래입니다. 시야가 바뀔 때마다 붙이고 떼는 일이 새로 생깁니다.",
      blocks: [
        {
          kind: "table",
          head: ["조작 1회", "전부 그리기", "화면 안만"],
          rows: [
            ["zoom 12→11", "draw() 2,898회 / 59ms · 동기화 없음", "draw() 821회 / 25ms · 동기화 46ms"],
            ["pan 0.05°", "0ms (지도가 레이어를 통째로 옮김)", "draw() 7회 · 동기화 31ms"],
          ],
        },
        {
          kind: "text",
          text: "이 30~70ms 를 감당하려고 뒤에 두 가지가 더 붙었습니다. 둘 다 실측 근거가 코드 주석에 남아 있습니다.",
        },
        {
          kind: "list",
          items: [
            "마커 풀링 — setMap(null) 이 개당 1.66ms(142개 제거 = 236ms 멈춤). 떼지 않고 모아 뒀다가 갈아 끼우면 1ms 입니다. 풀 상한 200 은 ‘화면 하나 분량’입니다.",
            "2단계 셰이프 디핑 — 목록을 다시 받으면 1,449개가 전부 새 객체가 되는데 내용은 대개 같습니다. 참조만 보면 화면에 붙은 전부의 innerHTML 을 헛되게 다시 씁니다(실측 200ms). 값 비교를 더해 동기화 64.6 → 30.8ms, draw() 474 → 7회.",
            "idle 한 번만 도는 설계라 이 작업은 끄는 동안의 프레임에는 들어가지 않습니다. 622ms 짜리 초기 블로킹을 없애는 값으로는 남는 거래라고 판단했습니다.",
          ],
        },
      ],
    },

    {
      id: "measure",
      eyebrow: "08 · Method",
      title: "이 숫자를 믿을 수 있는 이유",
      desc: "프로파일러 기록 두 개를 나란히 놓지 않았습니다. 지도 위치·줌·그 사이 브라우저 상태가 달라 조건이 같았는지 알 수 없기 때문입니다.",
      blocks: [
        {
          kind: "code",
          caption: "lib/map-perf.ts — 컬링을 런타임에 끄는 스위치",
          code: `let cullingOff = false;

export function setCullingOff(next) {
  cullingOff = next;
  for (const l of controlListeners) l();
}

export function useCullingOff() {
  return useSyncExternalStore(subscribe, () => cullingOff, () => false);
}`,
        },
        {
          kind: "text",
          text: "같은 화면에서 끄고 켜며 같은 자를 두 번 댔습니다. 스토어를 둘로 나눈 것이 요점입니다 — 지도가 계측값까지 구독하면 ‘동기화 → 값 갱신 → 재렌더 → 동기화’ 고리가 생겨 화면이 멈춥니다. 지도는 제어값만, 패널은 계측값만 봅니다.",
        },
      ],
    },

    {
      id: "sql",
      eyebrow: "09 · Server",
      title: "진짜 쿼리문을 고친 작업은 따로 있습니다",
      desc: "이쪽이 SQL 입니다. 위 표와는 무관하고, 별도 수치를 냈습니다 (커밋 5b9bf06).",
      blocks: [
        {
          kind: "text",
          text: "이전에는 보유 기종 집계가 SELECT 목록 안의 상관 서브쿼리였고, 마지막 줄이 WHERE am.arcade_id = b.id 였습니다. 오락실마다 한 번씩 939회 돌았고, 그 안의 machine_live · cabinet_condition 은 제보 테이블 전체를 집계하는 뷰라 전체 집계가 939번 재평가됐습니다.",
        },
        {
          kind: "code",
          caption: "이전 — 상관 서브쿼리 (loops=939 · 전체 버퍼의 98%)",
          code: `SELECT b.*, COALESCE((
  SELECT json_agg(json_build_object(… , 'cabinets', cab.cabinets, …))
  FROM arcade_machines am
  JOIN machines m ON m.id = am.machine_id
  LEFT JOIN machine_live ml ON ml.arcade_id = am.arcade_id
                           AND ml.machine_id = am.machine_id
  CROSS JOIN LATERAL (                       -- 기체를 다시 오락실×기종마다
    SELECT COUNT(c.id)::int AS cabinet_count, COALESCE(json_agg(…), '[]'::json) AS cabinets
    FROM arcade_cabinets c
    LEFT JOIN cabinet_condition cc ON cc.cabinet_id = c.id
    WHERE c.arcade_id = am.arcade_id AND c.machine_id = am.machine_id
  ) cab
  WHERE am.arcade_id = b.id                  -- ★ 이 한 줄이 상관(correlated)을 만든다
), '[]'::json) AS machines
FROM base b`,
        },
        {
          kind: "code",
          caption: "이후 — 집계를 미리 한 번만 하는 CTE 두 개",
          code: `cab_agg AS (
  SELECT c.arcade_id, c.machine_id, COUNT(c.id)::int AS cabinet_count, json_agg(…) AS cabinets
  FROM arcade_cabinets c
  LEFT JOIN cabinet_condition cc ON cc.cabinet_id = c.id
  WHERE c.arcade_id IN (SELECT id FROM base)     -- ★ scope
  GROUP BY c.arcade_id, c.machine_id
),
mach_agg AS (
  SELECT am.arcade_id, json_agg(json_build_object(…,
           'cabinetCount', COALESCE(cab.cabinet_count, 0),   -- GROUP BY 는 행이 아예 없으므로
           'cabinets',     COALESCE(cab.cabinets, '[]'::json), …)) AS machines
  FROM arcade_machines am
  JOIN machines m ON m.id = am.machine_id
  LEFT JOIN machine_live ml ON ml.arcade_id = am.arcade_id
                           AND ml.machine_id = am.machine_id
  LEFT JOIN cab_agg cab ON cab.arcade_id = am.arcade_id
                       AND cab.machine_id = am.machine_id
  WHERE am.arcade_id IN (SELECT id FROM base)    -- ★ scope
  GROUP BY am.arcade_id
)

SELECT b.*, COALESCE(ma.machines, '[]'::json) AS machines
FROM base b
LEFT JOIN mach_agg ma ON ma.arcade_id = b.id`,
        },
        {
          kind: "table",
          head: ["제보 행수", "이전", "이후"],
          rows: [
            ["25,619", "44,042버퍼 · 36.0ms", "163버퍼 · 20.0ms"],
            ["42,396", "42,836버퍼 · 34.6ms", "162버퍼 · 21.3ms"],
            ["65,072", "48,480버퍼 · 36.1ms", "163버퍼 · 22.0ms"],
          ],
        },
        {
          kind: "text",
          text: "부하(25.4 req/s) 아래에서 /api/arcades p95 가 130.0 → 70.1ms 였습니다. 단일 요청으로는 −15% 로만 보였습니다 — 44,042버퍼는 shared buffer 적중이라 혼자 돌 때는 거의 공짜지만, 20세션이 동시에 돌면 메모리 대역폭을 서로 빼앗습니다. 버퍼를 줄이는 최적화는 부하 아래에서 재야 한다는 기록이 남았습니다.",
        },
        {
          kind: "text",
          text: "중간에 한 번 잘못 만들었습니다. 그냥 CTE 로 바꾸니 반경 검색이 8ms → 26ms 로 3배 느려졌습니다. 원인은 CTE 가 아니라 반경 조건이 맨 바깥 WHERE 에 있었던 것이었습니다 — base 가 여전히 939곳이라 scope 가 아무것도 좁히지 못했습니다. 필터를 집계 앞으로 당겨 +246% → +44% 로 줄였습니다.",
        },
        {
          kind: "code",
          caption: "lib/arcades.ts — 필터 위치를 당기고, 정렬에 타이브레이커를 박았습니다",
          code: `  WITH scored AS (            -- 이름 검색 · 기종 AND 필터 · haversine 거리
    SELECT a.*, 6371 * acos(…) AS distance_km FROM arcades a WHERE …
  ),
+ -- 반경 필터를 **집계 앞으로** 당깁니다
+ base AS (
+   SELECT * FROM scored s
+   WHERE $5::float8 IS NULL OR s.distance_km IS NULL OR s.distance_km <= $5::float8
+ ),
  \${machinesCte((col) => \`\${col} IN (SELECT id FROM base)\`)}
  SELECT b.*, COALESCE(ma.machines, '[]'::json) AS machines
  FROM base b
  LEFT JOIN mach_agg ma ON ma.arcade_id = b.id
- WHERE $5::float8 IS NULL OR b.distance_km IS NULL OR b.distance_km <= $5::float8
- ORDER BY b.distance_km ASC NULLS LAST, b.name ASC
+ ORDER BY b.distance_km ASC NULLS LAST, b.name ASC, b.id ASC`,
        },
        {
          kind: "note",
          text: "덤으로 원래 있던 결함이 드러났습니다 — ORDER BY 에 타이브레이커가 없는데 같은 이름을 쓰는 오락실이 267곳(66종류) 있습니다. 사이드바가 10곳씩 페이지를 나누므로 같은 곳이 두 페이지에 나올 수 있었습니다. b.id 를 붙여 못 박았습니다.",
        },
      ],
    },

    {
      id: "wrap",
      eyebrow: "10 · Wrap-up",
      title: "정리",
      desc: "",
      blocks: [
        {
          kind: "table",
          head: ["", "클라이언트 (57f74f1)", "서버 (5b9bf06)"],
          rows: [
            [
              "고친 것",
              "arcades → inView 필터 · Marker → OverlayView · setMap(null) → 풀 · 2단계 디핑",
              "상관 서브쿼리 → CTE 2개 · 필터를 집계 앞으로 · ORDER BY 타이브레이커",
            ],
            ["SQL", "없음", "lib/arcades.ts 전면"],
            ["효과", "초기 블로킹 622→156ms · DOM −75% · 힙 −40%", "44,042→163버퍼 · p95 130→70ms"],
            ["남은 것", "—", "/api/arcades 가 아직 전국을 내려보냄 (446KB → 80KB 여지)"],
          ],
        },
        {
          kind: "text",
          text: "두 작업의 원리는 사실 같습니다. “많은 것 각각에 한 번씩”을 “한 번에 전부”로 바꾸거나, 아예 “대상을 먼저 줄이는” 것 — 컬링은 1,449개 렌더를 337개로 줄였고, CTE 는 939회 집계를 1회로 합쳤습니다.",
        },
      ],
    },
  ],
};
