// 프로젝트 상세 데이터입니다.
// 오락실 파인더 내용은 기획서(오락실파인더_기획서.html)와
// 발표 자료(오락실파인더_발표.html, 2026.08.24 기준)에서 가져왔습니다.
// 두 문서의 수치가 다른 항목은 더 최신인 발표 자료를 따랐습니다.

export const projects = [
  {
    slug: "arcade-finder",
    name: "오락실 파인더",
    period: "2026.08.14 ~ 2026.08.24",
    thumbnail: "/projects/arcade-finder/thumb.jpg",
    hero: "/projects/arcade-finder/01-map.jpg",
    tags: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "k6", "Vitest"],
    type: "개인 프로젝트 (1인 개발)",
    role: "기획 · 프론트엔드 · 백엔드 · 데이터 수집 · 성능 측정 전 과정",
    summary:
      "리듬게임 유저가 지금 갈 만한 오락실을 찾는 지도입니다. 위치는 지도가 알려주고, 기기 상태는 유저 제보가 채웁니다.",
    links: [{ label: "GitHub", href: "https://github.com/mick243" }],

    star: [
      {
        key: "S",
        label: "Situation",
        title: "오락실 위치는 검색되지만, 기기 상태는 검색되지 않았습니다",
        body: "지도 앱은 오락실이 어디에 있는지까지만 알려줍니다. 리듬게임 유저가 정작 알아야 하는 것은 그다음이었습니다.",
        points: [
          "그 오락실에 내가 하는 게임이 있는가. 기종 목록은 어디에도 없습니다",
          "기체 상태는 멀쩡한가. 발판 하나 죽은 걸 가서야 알게 됩니다",
          "지금 대기가 얼마나 있는가. 30분 걸려 갔는데 앞에 네 명이 서 있습니다",
        ],
        note: "이 정보는 커뮤니티 글과 트위터에 흩어져 있었습니다. 결국 갈 때마다 사람에게 물어보고, 물어본 답은 다음 사람에게 남지 않았습니다.",
      },
      {
        key: "T",
        label: "Task",
        title: "‘지금 어디로 갈까’에 점수 하나로 답하는 서비스를 11일 안에",
        body: "기획부터 프론트엔드 · 백엔드 · 데이터 수집 · 성능 측정까지 전 과정을 혼자 맡았습니다. 스스로 세운 조건은 셋이었습니다.",
        points: [
          "잘 안 변하는 정보(위치 · 보유 기종)와 계속 변하는 정보(대기 · 컨디션)를 구조로 분리할 것",
          "낡은 정보가 남아 있지 않게 할 것. 낡은 정보는 정보가 없는 것보다 나쁩니다",
          "전국 942곳 규모에서도 지도가 버벅이지 않을 것",
        ],
      },
      {
        key: "A",
        label: "Action",
        title: "규칙은 스키마에 박고, 성능은 측정해서 고쳤습니다",
        groups: [
          {
            title: "데이터 모델: 코드가 아니라 스키마가 규칙을 지키게",
            points: [
              "제보를 덮어쓰지 않고 append-only 로그로 쌓고, ‘지금 상태’는 뷰가 만들게 했습니다. 상세 · 목록 · 전국 피드가 같은 값을 봅니다.",
              "대기 제보에 유효기간 240분을 붙여 스스로 만료되게 했습니다. 아무도 손대지 않아도 낡은 제보가 사라집니다.",
              "기체 1대를 1행으로 두었습니다. 대수를 숫자 한 칸으로 두면 ‘2대 중 한쪽 발판만 죽은 오락실’을 담을 자리가 없습니다.",
              "소셜 신원을 계정 밖 별도 테이블에 두어, 나중에 제공자를 더 붙여도 계정이 갈라지지 않게 했습니다.",
              "유효기간 · 임계값 · 등급 단계 · 말머리를 상수가 아닌 설정 테이블에 두어 배포 없이 조정합니다.",
            ],
          },
          {
            title: "렌더 성능: 짐작 대신 DevTools로 재고 고쳤습니다",
            points: [
              "지도를 축소하면 렉이 걸렸습니다. 지점 이름이 지도 위에 얹힌 DOM이라 줌 한 번에 전부 다시 배치됐습니다. 이름을 항상 그리지 않고 호버 · 클릭했을 때만 띄웠습니다.",
              "상세 패널을 열면 다시 느려졌습니다. 원인은 라벨이 아니라 전국 마커를 전부 들고 있던 것이었습니다. 화면 밖 오락실은 애초에 만들지 않도록 뷰포트 컬링을 넣었습니다.",
            ],
          },
          {
            title: "데이터 정제: 제일 어려웠던 건 코드가 아니라 데이터였습니다",
            points: [
              "공공데이터포털 목록에 폐업했거나 좌표가 엉뚱한 유령 데이터가 섞여 있었습니다. 3차에 걸쳐 약 700곳을 삭제하고 네이버 지역검색으로 실제 존재를 교차검증했습니다.",
              "지오코딩 결과가 도로 중심선에 붙어 줌 레벨이 바뀌면 마커가 다른 동으로 넘어갔습니다. 건물 중심으로 좌표를 다시 잡고 anchor를 재설정해 고정했습니다.",
              "뽑기방과 오락실은 면적 · 기기 수 · 업종 코드가 모두 겹쳐 자동 분류가 불가능하다고 결론냈습니다. 판단보류 2,757곳은 수동 검수 대상으로 남겼습니다.",
            ],
          },
          {
            title: "사고 대응: DB가 통째로 날아갔습니다",
            points: [
              "AI에게 공지 기능 수정을 맡기던 중 DB가 통째로 지워졌습니다. 이관 전에 쓰던 PGlite 백업을 다시 불러와 재이관해서 복구했습니다.",
              "그 뒤로 작업마다 백업을 먼저 지시하는 규칙을 프롬프트에 박았습니다.",
            ],
          },
        ],
      },
      {
        key: "R",
        label: "Result",
        title: "11일 만에 전국 942곳이 도는 서비스와, 숫자로 남은 성능 개선",
        body: "아래 성능 수치는 Chrome DevTools Performance로 같은 조작을 전후 비교한 값입니다. 절대 시간이 아니라 동일 조작 기준의 상대 감소치입니다.",
        note: "DB는 PGlite(WASM Postgres)로 시작해 PostgreSQL 18로 이관했습니다. 둘 다 진짜 Postgres 엔진이라 DATABASE_URL 한 줄만 바뀌고 SQL은 한 글자도 바뀌지 않았습니다.",
      },
    ],

    metrics: [
      { value: "942", unit: "곳", label: "등록된 오락실", note: "네이버 526 · 공공데이터 414 · 수동 2" },
      { value: "4,481", unit: "개", label: "곡 · 채보", note: "848곡 · 전부 서열 배치" },
      { value: "481", unit: "건", label: "자동 테스트", note: "18개 파일 · 전부 통과" },
      { value: "23", unit: "+뷰 2", label: "테이블 · 뷰", note: "뷰 2개는 제보에서 파생" },
      { value: "32", unit: "개", label: "API 라우트", note: "핸들러 48개" },
      { value: "25,620", unit: "줄", label: "TypeScript", note: "142개 파일" },
    ],

    perf: {
      title: "뷰포트 컬링 전후",
      rows: [
        { what: "초기 마커 동기화", sub: "단일 블로킹 작업", was: "622 ms", now: "156 ms", delta: "−75%" },
        { what: "draw() 호출", sub: "로드 시 누적", was: "1,449회 · 68 ms", now: "337회 · 20 ms", delta: "−77%" },
        { what: "강제 스타일 · 레이아웃", sub: "Forced synchronous layout", was: "6,445 ms", now: "2,397 ms", delta: "−63%" },
        { what: "JS 힙", sub: "Heap snapshot", was: "23.68 MB", now: "14.32 MB", delta: "−40%" },
        { what: "DOM 노드", sub: "문서 전체", was: "7,462", now: "1,902", delta: "−75%" },
      ],
      extra:
        "지도 라벨을 상시 렌더에서 호버 · 클릭 시 렌더로 바꾼 것만으로 Layout −14%, Recalculate Style −20%.",
    },

    // tech 는 저장소의 실제 구현(lib/ · db/ · components/)을 확인해서 적었습니다.
    gallery: [
      {
        src: "/projects/arcade-finder/01-map.jpg",
        caption: "전국 942곳. 화면 안에 들어온 마커만 그립니다.",
        tech: "naver.maps.Marker 대신 naver.maps.OverlayView를 상속한 커스텀 오버레이를 씁니다. 기본 Marker는 DOM을 left/top으로 옮겨 움직일 때마다 레이아웃이 발생하는데, projection.fromCoordToOffset()으로 픽셀을 구해 transform: translate3d()로 옮기면 컴포지터에서만 갱신됩니다. 마커 목록은 지도의 idle 이벤트(끌기 · 줌이 멈춘 뒤 한 번) 때 읽은 뷰포트 박스로 걸러내고, 화면에서 빠진 오버레이는 풀에 넣어 재사용합니다. bounds_changed로 받으면 끄는 중 프레임마다 다시 붙습니다.",
      },
      {
        src: "/projects/arcade-finder/02-gps-filter.jpg",
        caption: "GPS 추적 기준점과 기종 AND 필터. 걸어가면 반경 · 거리 · 순위가 따라옵니다.",
        tech: "위치는 navigator.geolocation.watchPosition(enableHighAccuracy, maximumAge 3초)으로 붙잡고, 15m 미만 이동은 버려서 좌표가 흔들릴 때마다 순위가 요동치지 않게 했습니다. 순위 계산은 lib/recommend.ts의 순수 함수라 DB도 fetch도 없이 클라이언트에서 끝나고, 서버 재조회는 기준점이 크게 움직였을 때만 합니다. 기종 AND 필터는 arcade_machines를 GROUP BY arcade_id HAVING COUNT(DISTINCT machine_id) = array_length($1, 1) 로 물어 고른 기종을 전부 가진 곳만 남깁니다.",
      },
      {
        src: "/projects/arcade-finder/03-search.jpg",
        caption:
          "지점 이름은 항상 그리지 않고, 누르거나 호버했을 때만 띄웁니다. ‘서울대 짱’같이 유사 언어로 검색하면 DB에서 탐색해서 지점을 찾습니다.",
        tech: "라벨은 DOM에 항상 있고 CSS로 접어 둡니다. .mk .mk-label { display: none } 이 기본이고 :hover · :focus-visible · .mk-on 일 때만 펼칩니다. 펼쳐진 이름이 옆 마커 아래로 깔리지 않도록 그 순간만 z-index를 올리는데, 자식의 hover로 부모의 z-index를 바꿀 수 없어 오버레이 쪽에서 함께 처리합니다. 검색은 통짜 부분 일치가 아니라 낱말 단위입니다. searchTokens()가 공백으로 쪼개(최대 8개) text[]로 넘기고, Postgres에서 unnest() 위로 bool_and(name ILIKE '%'||t||'%' OR address ILIKE '%'||t||'%')를 돌립니다. 낱말마다 이름 또는 주소 어느 쪽에 걸려도 되고 전부 걸려야 매치라서, ‘서울대’는 주소에 ‘짱’은 상호에 각각 걸려 ‘짱오락실 서울대입구점’이 나옵니다. 어순과 붙임새가 달라도 됩니다. 전문 검색(to_tsvector)이나 pg_trgm 유사도가 아니라, 토큰별 부분 일치를 AND로 묶은 방식입니다.",
      },
      {
        src: "/projects/arcade-finder/04-assistant.jpg",
        caption: "오락실 도우미. 앱 안쪽 데이터로 답하고, 범위 밖 질문에는 답하지 않습니다.",
        tech: "Gemini(gemini-3.7-flash) 한 요청에 함수 선언과 내장 googleSearch 도구를 같이 물립니다. 이 둘을 섞는 건 Gemini 3 계열부터 되는 일입니다. search_arcades · search_reports 같은 함수 선언을 주고 모델이 고르면 서버가 앱 DB를 직접 조회해 결과를 돌려줍니다. 범위 밖 질문은 systemInstruction이 고정 문구로 끊습니다. API 키는 서버 라우트에만 있고 클라이언트로 나가지 않습니다.",
      },
      {
        src: "/projects/arcade-finder/05-report.jpg",
        caption: "기체 1대가 1행. 1호기 · 2호기 · 3호기의 컨디션을 따로 제보합니다.",
        tech: "arcade_cabinets (arcade_id, machine_id, cabinet_no) UNIQUE로 기체마다 행을 두고, 컨디션 제보는 기종이 아니라 그 기체의 id를 가리킵니다. 화면 값은 cabinet_condition 뷰가 만듭니다. 등록 컨디션을 제보 한 건처럼 함께 평균 내고 ROUND()로 1~5 정수로 되돌립니다(다섯 칸짜리 눈금에 ‘4.67’은 없는 정밀도를 주장하는 값이라서). 집계 창은 report_settings.condition_window_days이고, ‘제보 N건’ 카운트에는 등록값을 세지 않습니다. 그 숫자는 사람 N명이 확인했다는 뜻이어야 합니다. 반면 대기는 기종 단위(machine_live)입니다. 줄은 게임 앞에 서고, 몇 호기 줄인지까지 고르게 하면 제보가 흩어져 집계가 설 자리가 없습니다.",
      },
      {
        src: "/projects/arcade-finder/06-live-feed.jpg",
        caption: "실시간 제보 피드. 30초마다 자동 갱신됩니다.",
        tech: "setInterval(load, 30_000) 폴링입니다. WebSocket이나 SSE를 쓰지 않은 이유는 제보가 초 단위로 쏟아지는 데이터가 아니라, 연결을 붙잡는 비용이 이득보다 크기 때문입니다. 검색 입력은 300ms 디바운스로 묶고 버튼 조작은 디바운스를 기다리지 않게 따로 즉시 반영합니다. 대기 제보는 machine_live 뷰가 report_settings.queue_ttl_minutes(240분) 안의 행만 모으므로, 낡은 제보는 아무 갱신 없이도 목록에서 빠집니다.",
      },
      {
        src: "/projects/arcade-finder/07-tier.jpg",
        caption: "서열표. 클리어한 사람의 투표 평균으로 같은 레벨 안의 체감 난이도를 배치합니다.",
        tech: "‘클리어한 사람만 투표’를 코드 검사가 아니라 복합 외래키로 강제했습니다. difficulty_votes (player_id, chart_id)가 clear_records (player_id, chart_id)를 참조합니다. 클리어 기록 행이 없으면 INSERT 자체가 실패해서, API를 우회해도 자격 없는 표가 들어갈 수 없습니다. 투표가 들어오면 recalc_chart_stats()가 charts의 vote_count · avg_vote · convergence · tier_code 캐시 컬럼을 다시 씁니다. 읽기가 압도적으로 많고 쓰기는 드물어서 조회마다 재계산하지 않습니다. 등급 배치는 tier_grades.anchor 중 abs(anchor - avg_vote)가 가장 작은 것으로 정하고, 정확히 두 anchor의 중간이면 0에 가까운 안쪽 등급을 고릅니다.",
      },
      {
        src: "/projects/arcade-finder/08-tier-special.jpg",
        caption: "투표가 갈리면 ‘개인차’, 특수 패턴 표시가 3명 이상이면 ‘특수패턴’ 칸으로 옮겨집니다.",
        tech: "수렴도는 GREATEST(0, 1 − 투표 표준편차 / tier_settings.tier_step)이고 표본이 2개 미만이면 NULL입니다. tier_code는 한 CASE 식에서 결정됩니다. 표가 min_votes보다 적으면 ‘미정’, 수렴도가 min_convergence보다 낮으면 ‘개인차’, 그 밖에는 가까운 등급입니다. 특수패턴은 투표와 별개로 special_marks (player_id, chart_id) 표시를 세고, 그 수가 tier_settings.special_min(3) 이상이면 등급보다 앞서 그 칸으로 옮깁니다. 임계값을 min_votes와 따로 둔 이유는 ‘난이도 표본이 충분한가’와 ‘기믹 채보라는 데 합의가 됐나’가 다른 판단이라, 한쪽을 올릴 때 다른 쪽이 끌려가면 안 되기 때문입니다. 표시가 3명 아래로 줄면 원래 등급으로 돌아갑니다.",
      },
      {
        src: "/projects/arcade-finder/09-community.jpg",
        caption: "게임 탭 10개 + ‘전체’. 탭은 테이블이 아니라 컬럼입니다.",
        tech: "게임 탭을 테이블로 나누지 않고 posts.machine_id 컬럼 하나로 뒀습니다. ‘전체’ 탭은 그 조건을 걸지 않은 조회입니다. 게임이 하나 늘어도 machines에 한 줄이 늘 뿐 테이블은 늘지 않습니다. 말머리도 CHECK 제약이 아니라 board_categories 테이블이라 배포 없이 늘립니다. 목록은 글 20 · 댓글 10으로 페이지네이션하고, 댓글 수 · 추천 수는 조회마다 세지 않도록 recalc_post_stats()가 바뀌는 순간에만 다시 씁니다.",
      },
      {
        src: "/projects/arcade-finder/10-post-image.jpg",
        caption: "이미지를 본문 안 원하는 위치에 5장까지 넣습니다.",
        tech: "편집은 Tiptap(ProseMirror)으로 하지만 저장물은 HTML이 아니라 JSON 문서 트리(posts.body_doc)입니다. HTML을 저장하면 출력마다 sanitizer를 통과해야 하고 sanitizer 자체가 계속 구멍이 나는 표면이라서, 렌더러가 JSON을 React 요소로 바꿉니다. dangerouslySetInnerHTML이 없고 문서 모델에 없는 노드 · 속성은 normalizeDoc이 통째로 버립니다. 첨부가 본문 어디에 붙는지의 근거는 평문 투영본(posts.body)의 [[image:N]] 마커이고, 그 평문이 목록 미리보기 · 본문 검색 · 챗봇에 그대로 쓰입니다. 상한은 MAX_ATTACHMENTS_PER_POST = 5로 사진과 동영상을 합쳐 셉니다. 따로 세면 ‘사진 5장 + 동영상 5개’가 되어 한 글의 무게가 예측되지 않습니다. 글자색 · 크기 · 서체도 자유 CSS가 아니라 닫힌 목록에서만 고르게 해서, 어두운 배경에 검정 글씨 같은 읽을 수 없는 글을 막았습니다.",
      },
      {
        src: "/projects/arcade-finder/11-post-video.jpg",
        caption: "영상 첨부와 유튜브 링크 임베드.",
        tech: "동영상 첨부는 [[video:N]] 마커로 사진과 같은 경로를 타고, 유튜브 링크는 youtube 노드로 저장해 youtube-nocookie.com/embed iframe으로 그립니다. 본문에 영상 하나 넣었다고 추적 쿠키가 깔리지 않게 nocookie 도메인을 씁니다. 임베드 하나가 플레이어 JS와 이미지로 1MB 이상을 받아서 loading=‘lazy’를 걸었고, .post-embed가 CSS로 16:9 자리를 미리 잡아 주므로 lazy를 걸어도 레이아웃이 무너지지 않습니다.",
      },
    ],

    learned: [
      {
        kind: "learned",
        title: "되돌릴 수 없는 작업을 맡길 때는 되돌릴 방법을 먼저 만들어 둔다",
        desc: "DB가 통째로 날아간 사건에서 가장 비싸게 배운 것입니다. 지금은 작업 전 백업이 규칙입니다.",
      },
      {
        kind: "learned",
        title: "AI가 자신 있게 말하는 외부 사실은 검증한다",
        desc: "네이버 검색 API가 NCP로 이전된 것이 모델의 지식 시점 이후라, 있는 줄 알고 붙인 엔드포인트가 전부 죽어 있었습니다. 현행 문서를 직접 확인하고 다시 붙였습니다.",
      },
      {
        kind: "open",
        title: "모바일에서 지점 이름을 보려면 한 번 눌러야 합니다",
        desc: "라벨 상시 렌더를 걷어내면서 받은 트레이드오프입니다. 호버가 없는 환경에서 사용성이 조금 나빠졌고 아직 해결하지 못했습니다.",
      },
      {
        kind: "open",
        title: "허위 제보 방어가 아직 닫히지 않았습니다",
        desc: "지금은 ‘서로 다른 제보자 2명’ 임계값뿐이고, 한 사람이 여러 번 누르는 것을 막는 장치가 필요합니다.",
      },
      {
        kind: "open",
        title: "영업시간은 결국 채우지 못했습니다",
        desc: "네이버 지역검색 API 응답에 영업시간 필드가 없습니다. 스키마에 칼럼은 있지만 대부분 비어 있고, 데이터 출처의 한계입니다.",
      },
    ],
  },
  {
    slug: "outsourcing",
    name: "외주 프로젝트",
    period: "2025.09 ~ 2026.03",
    thumbnail: "/projects/outsourcing.svg",
    tags: ["UI/UX", "카페24", "Figma", "퍼블리싱"],
    type: "외주 프로젝트",
    role: "UI/UX · 퍼블리싱",
    summary:
      "카페24 기반 쇼핑몰 두 곳을 구축했습니다. 일정을 어떻게 산정하고 어떻게 공유하는지를 배운 프로젝트입니다.",
    items: [
      {
        name: "RANGE 쇼핑몰 구축",
        period: "2026.02 ~ 2026.03",
        desc: "페이지당 1~2일이라는 현실적인 일정 산정 기준을 세우고 클라이언트·디자이너와 선제적으로 소통해 기한 내 차질 없이 오픈했습니다.",
        tags: ["UI/UX", "카페24", "Figma"],
      },
      {
        name: "Deeto 쇼핑몰 구축",
        period: "2025.09",
        desc: "낙관적인 일정 산정으로 프로젝트가 무산될 위기를 겪었지만, 상황과 리스크를 투명하게 공유해 추가 인력 투입을 이끌어내고 마감 기한 내 출시했습니다. 이 경험으로 실수를 인정하고 현재 상황을 그대로 빠르게 공유하는 태도를 배웠습니다.",
        tags: ["카페24", "퍼블리싱"],
      },
    ],
  },
];
