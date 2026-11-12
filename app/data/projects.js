// 프로젝트 상세 데이터입니다.
//
// 오락실 파인더의 내용과 수치는 원본 저장소(Desktop/claude/개인 프로젝트)에서 가져왔습니다.
//   - 작업 기록: 저장소 git 로그 85커밋 (2026.08.18 ~ 2026.09.18) + 기획 메모(2026.08.14)
//   - 상태·수치: SSOT.md · PERFORMANCE.md 1~5부 · docs/QA-LAUNCH-READINESS.md · docs/SECURITY.md
//   - 데이터 건수: 개발 DB 직접 조회 (2026.09.18) — 문서마다 수가 달라서 DB 를 정본으로 삼았습니다
//   - 코드 수치: git 추적 파일 기준 집계, 테스트는 vitest 실제 실행 결과 (2026.09.18)
//
// PetMediSearch 의 내용과 수치는 원본 저장소(Desktop/claude/PetMediSearch-rebuild)에서 가져왔습니다.
//   - 기준 상태: origin/main (8c2de57, 2026.09.18) — 로컬 main 보다 2커밋 앞선 쪽입니다
//   - 작업 기록: git 로그 103커밋 (2026.09.04 ~ 09.18) · 병합 안 된 4커밋은 '남은 것' 으로 적었습니다
//     다만 화면에 적는 날짜는 묶어서 보여 줍니다 — 09.04 · 09.08 은 09.09 로, 09.18 은 09.17 로.
//     커밋 날짜 그대로가 아니므로, 저장소와 대조할 때는 위 실제 범위를 봅니다.
//   - 부하·전송량: docs/LoadTest-2026-09-15.md · CLAUDE.md 1장의 측정 표
//   - '오늘 실측' 으로 적은 값: 2026.09.22 에 origin/main 을 새로 띄워 직접 잰 것
//     (MySQL 새 컨테이너 · syncData.js 로 시설 재수집 · node --test · API 응답 바이트)
//   - 작동 화면: 같은 날 그 실행 화면을 390x844 로 찍었습니다
//
// BANDIT 의 내용과 수치는 본인이 쓴 회고록(BANDIT_프로젝트_회고록.pdf, 2026.10.16 작성)에서 가져왔습니다.
//   - 팀 저장소(AX-PJ3/BANDIT)는 여기서 다시 세지 않았습니다. PR · 결정 기록 · 검사 수는 회고록 값입니다
//   - 작동 화면: 2026.10.19 MCP 서버가 내려가 있어 기능은 실행하지 않고, 웹 앱 첫 화면만 찍었습니다
//     (로컬 Chrome 헤드리스 · 새 프로필 · 1600x810, 썸네일은 900x563 로 따로)
//
// 한 줄 데스크의 내용과 수치는 원본 저장소(Desktop/claude/One_line_desk, 공개 mick243/One_line_desk)에서 가져왔습니다.
//   - 기준 상태: main f8521c0 (PR #48, 2026.11.10) · 커밋 163개(병합 제외 106) · 병합한 PR 48개 · 2026.10.25 ~ 11.10
//   - 시험 수: 같은 커밋의 GitHub Actions 실행 결과(공용 179 · 서버 1,150 · 웹 71, 서버는 실제 PostgreSQL 에서도 1,150)
//   - 코드 수치: git 추적 파일 집계(시험 제외 TS/TSX 261개 44,147줄, 시험 102개 22,105줄) · ADR 29개(docs/ADR.md)
//   - 전후 비교: 각 줄의 원래 커밋 본문과 회의록에서 하나씩 다시 찾아 맞췄습니다(dc4dc12 · c1af39f · ace523a · ae77844 ·
//     7736ba9 · 배포준비회의 A1 · ADR-21)
//   - 정답률 표의 숫자는 AI 가 아니라 낱말 규칙이 맞힌 수입니다. AI 칸은 11.06 이후 다시 재지 않았습니다
//   - 작동 화면: 2026.11.10 로컬 개발 서버(가상 자료)에서 1600x810 로 찍었습니다. 예약 · 게시는 확정하지 않고
//     확인 시트 · 미리보기까지만 열었습니다. 공유 시연 서버는 쓰지 않았습니다
//   - 시연 링크: 가상 자료만 돌아가는 시연이라 2026.11.10 사용자 결정으로 실었습니다(웹 Vercel → API Fly.io)
//   - 싣지 않은 것: 시연의 보안 상태, 개발용 비밀 값, 검토 문서의 세부 약점
//
// group 은 프로젝트 섹션의 묶음입니다 — "personal" 은 개인, "team" 은 팀, "outsourcing" 은 외주.

export const projects = [
  {
    slug: "arcade-finder",
    name: "오락실 파인더",
    group: "personal",
    period: "2026.08.14 ~ 진행 중",
    updated: "2026.09.18",
    thumbnail: "/projects/arcade-finder/thumb.jpg",
    // 홈 프로젝트 카드에 쓰는 한 줄 설명과 대표 성과입니다.
    cardSummary: "리듬게임 유저를 위한 오락실 지도와 실시간 제보 서비스",
    cardHighlight: "지도 첫 렌더 −75% · 서버 응답 p95 −86%",
    hero: "/projects/arcade-finder/01-map.jpg",
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "k6", "Vitest", "Gemini"],
    type: "개인 프로젝트 (1인 개발)",
    role: "기획 · 프론트엔드 · 백엔드 · 데이터 수집 · 성능 측정 전 과정",
    summary:
      "리듬게임 유저가 지금 갈 만한 오락실을 찾는 지도에서 시작해, 제보로 실시간 대기 상황, 기체 컨디션, 체감 난이도 서열표와 커뮤니티까지 한 앱에 담은 서비스",
    links: [{ label: "GitHub 저장소", href: "https://github.com/mick243/Private_Project" }],

    star: [
      {
        key: "S",
        label: "Situation",
        title: "오락실 위치는 검색되지만, 기기 상태는 검색되지 않았습니다",
        body: "지도 앱은 위치까지만 알려줍니다. 내 게임이 있는지, 기체가 멀쩡한지, 대기가 얼마인지는 커뮤니티와 트위터에 흩어져 있었습니다.",
      },
      {
        key: "T",
        label: "Task",
        title: "‘지금 어디로 갈까’에 점수 하나로 답하는 서비스",
        body: "발표까지 11일, 그 뒤 4주 동안 전 과정을 혼자 맡았습니다. 변하는 정보는 따로 두고, 낡은 정보는 남기지 않고, 성능은 목표 사용자 수로 판단하는 것이 조건이었습니다.",
      },
      {
        key: "A",
        label: "Action",
        title: "규칙은 스키마에 박고, 성능은 목표를 세운 뒤 측정해서 고쳤습니다",
        body: "제보는 덮어쓰지 않고 쌓고, 대기 제보는 240분 뒤 만료되게 했습니다. 서버 병목은 k6 로 찾아 고쳤고, 로그인 제한 우회 · 신원 위조 · 오픈 리다이렉트를 막고 세션 회수를 넣었습니다.",
      },
      {
        key: "R",
        label: "Result",
        title: "발표까지 11일, 그 뒤 4주: 숫자로 남은 것",
        body: "클라이언트는 DevTools Performance, 서버는 k6 로 같은 조작 · 같은 부하에서 전후를 비교한 값입니다.",
      },
    ],

    // 2026.09.18 기준. 데이터 건수는 개발 DB 조회, 코드 수치는 git 추적 파일 집계입니다.
    // dataflow : 목록 보기와 흐름도 보기가 함께 씁니다. node.kind(entity · process · store)가 없으면 칸으로 모양을 정합니다.
    dataflow: {
      desc: "지도 마커를 읽는 길, 제보를 쓰는 길, AI와 데이터 수집 길을 나눠 그렸습니다. 번호는 성능을 고친 자리입니다.",
      lanes: [
        { key: "client", label: "화면 (브라우저)" },
        { key: "server", label: "서버 (Next.js)" },
        { key: "store", label: "저장소 · 외부" },
      ],
      nodes: {
        map: { label: "지도 화면", lane: "client", note: "목록을 받아 마커를 그리고, 제보 · 리뷰를 입력" },
        api: { label: "API 라우트", lane: "server", note: "조회 · 제보 처리, 응답 압축" },
        pool: { label: "Prisma · pg 풀", lane: "server", note: "커넥션 풀, 참조 데이터는 5분 메모리 캐시" },
        collector: { label: "수집 스크립트", lane: "server", note: "사람이 직접 실행하는 적재 배치" },
        db: { label: "PostgreSQL", lane: "store", note: "오락실 · 기종 · 제보" },
        naver: { label: "Naver Maps", lane: "store", kind: "entity", note: "지도 타일과 SDK" },
        gemini: { label: "Gemini API", lane: "store", kind: "entity", note: "챗봇 · 리뷰 요약 · 기종 추정" },
        sources: { label: "외부 원천 API", lane: "store", kind: "entity", note: "네이버 지역검색 · 지오코딩, 공공데이터포털" },
      },
      paths: [
        { name: "마커 읽기", steps: ["map", "좌표 · 반경 · 검색어", "api", "목록 쿼리", "pool", "반경 검색(TypedSQL)", "db"] },
        { name: "응답", steps: ["api", "brotli 압축 JSON", "map"] },
        { name: "지도 그리기", steps: ["naver", "지도 타일 · SDK", "map"] },
        { name: "제보 쓰기", steps: ["map", "제보 JSON", "api", "제보 · 보유 기종 한 트랜잭션", "db"] },
        { name: "AI", steps: ["map", "기종 추정 · 챗 질문", "api", "요청(하루 한도)", "gemini"] },
        { name: "데이터 수집", steps: ["sources", "오락실 목록 · 좌표", "collector", "upsert", "db"] },
      ],
      fixes: [
        {
          node: "map",
          text: "화면 범위(여백 20%) 안 마커만 그리고 빠진 마커는 최대 200개까지 숨겨 두었다 다시 써서 초기 마커 동기화 622ms → 156ms",
        },
        {
          node: "api",
          text: "가입자 1만 규모 시드로 다시 재어 찾은 진짜 병목, 압축 안 된 1.2MB 응답에 brotli 적용 → 90KB",
        },
      ],
      note: "화면 범위는 브라우저에서만 자릅니다. 서버는 좌표 · 반경 기준 목록을 보내고, 지도에 필요한 칸만 보내도록 줄이는 일은 남아 있습니다.",
    },
    metrics: [
      { value: "926", unit: "곳", label: "등록된 오락실", note: "네이버 526 · 공공데이터 398 · 수동 2" },
      { value: "24,413", unit: "개", label: "채보", note: "5기종 · 4,888곡 · 서열표는 3기종 운영" },
      { value: "710", unit: "건", label: "자동 테스트", note: "36개 파일 · 09.18 실행 · 전부 통과" },
      { value: "34", unit: "+뷰 2", label: "테이블 · 뷰", note: "마이그레이션 76개 · 인덱스 88개" },
      { value: "43", unit: "개", label: "API 라우트", note: "핸들러 48개" },
      { value: "39,565", unit: "줄", label: "TypeScript", note: "224개 파일 · 85커밋" },
    ],

    perf: [
      {
        title: "클라이언트: 뷰포트 컬링 전후",
        // 제목을 누르면 딥다이브로 갑니다 (app/projects/arcade-finder/viewport-culling).
        // badge 는 제목 옆에 붙어 "눌러 볼 것이 있다" 를 알립니다.
        href: "/projects/arcade-finder/viewport-culling",
        badge: "수정 내용 보기",
        rows: [
          { what: "초기 마커 동기화", sub: "단일 블로킹 작업", was: "622 ms", now: "156 ms", delta: "−75%" },
          { what: "draw() 호출", sub: "로드 시 누적", was: "1,449회 · 68 ms", now: "337회 · 20 ms", delta: "−77%" },
          { what: "강제 스타일 · 레이아웃", sub: "Forced synchronous layout", was: "6,445 ms", now: "2,397 ms", delta: "−63%" },
          { what: "JS 힙", sub: "Heap snapshot", was: "23.68 MB", now: "14.32 MB", delta: "−40%" },
          { what: "DOM 노드", sub: "문서 전체", was: "7,462", now: "1,902", delta: "−75%" },
        ],
        extra: "지도 라벨을 상시 렌더에서 호버 · 클릭 시 렌더로 바꾼 것만으로 Layout −14%, Recalculate Style −20%.",
      },
      {
        title: "서버: k6, 프로덕션 빌드",
        // 제목 옆 배지를 누르면 서버 작업 정리로 갑니다 (app/projects/arcade-finder/server).
        href: "/projects/arcade-finder/server",
        badge: "서버 작업 보기",
        rows: [
          { what: "20 VU p95", sub: "1부 · 풀 30 + 캐싱 + 총계 분리", was: "287 ms", now: "39 ms", delta: "−86%" },
          { what: "200 VU p95", sub: "2부 · 프로세스 1 → 8", was: "1.34 s", now: "87 ms", delta: "−94%" },
          { what: "/api/arcades 응답 크기", sub: "4부 · brotli 압축", was: "1,224,603 B", now: "90,434 B", delta: "−92.6%" },
          { what: "세션당 수신", sub: "목표 부하 ×10", was: "1,286 KB", now: "107 KB", delta: "−91.7%" },
          { what: "월 대역폭", sub: "DAU 3,000 · 실측 기반", was: "165 GB", now: "14 GB", delta: "−92%" },
          { what: "만료 제보 정리", sub: "읽기마다 전체 스캔 → 인덱스", was: "3.81 ms", now: "0.46 ms", delta: "−88%" },
          { what: "목표 부하 p95", sub: "1 → 2 프로세스 · 풀 10", was: "159 ms", now: "99 ms", delta: "−38%" },
        ],
        extra:
          "기준은 가입자 10,000 · DAU 3,000 → 평시 피크 3.4 req/s · 동시 54명입니다. 1프로세스가 목표의 20배(69.7 req/s)에서 실패 0% · p95 159ms 였고, 천장은 서버가 아니라 부하 생성기의 VU 가 먼저 바닥나 찾지 못했습니다.",
      },
    ],

    // 작업 기록 — 저장소 git 로그(85커밋)를 날짜순으로 묶었습니다. 날짜는 커밋 날짜입니다.
    timeline: [
      {
        phase: "발표까지 11일",
        range: "2026.08.14 ~ 08.24",
        summary: "기획 메모 한 장에서 시작해 파인더 · 서열표 · 커뮤니티 · 계정 · 챗봇이 도는 상태로.",
        entries: [
          {
            date: "08.14",
            title: "기획 메모 두 줄과 첫 마이그레이션",
            desc: "‘내 주변 오락실 지도’와 ‘리듬게임 커뮤니티’. 위치 · 보유 기종은 마스터로, 대기 · 컨디션은 제보 로그로 나누는 구조를 여기서 정했습니다.",
          },
          {
            date: "08.18",
            title: "초기 커밋 · 테스트 인프라",
            desc: "오락실 파인더 + 커뮤니티 골격. Vitest + v8 커버리지 기준선(52건). 대기 인원 ‘12명+’ 센티넬로 상한과 초과를 분리. 펌프 현행 수록곡 704곡.",
          },
          {
            date: "08.24",
            title: "실데이터 파이프라인",
            desc: "네이버 지역검색 + 공공데이터 수집 · 교차검증. 유령 데이터 약 700곳을 3차에 걸쳐 삭제, 좌표를 건물 중심으로 재설정.",
          },
          {
            date: "08.24",
            title: "계정 · 챗봇 · 서열표 · 커뮤니티",
            desc: "회원가입과 Google · 카카오 · 네이버 OAuth(PKCE). Gemini + 도구 호출 4종 챗봇. 펌프 서열표 S1~S6 실데이터와 전곡 채보 4,466. Tiptap 편집기와 사진 · 동영상 첨부(JSON 문서 저장).",
          },
          {
            date: "08.24",
            title: "모바일 동작 개편 · 뷰포트 컬링",
            desc: "860px 이하에서 세로 스택, 목록 탭은 지도 이동까지만. 화면 밖 마커는 만들지 않게 해 초기 동기화 622ms → 156ms.",
          },
          {
            date: "08.24",
            title: "PGlite → PostgreSQL 18 이관, 그리고 DB 사고",
            desc: "이관 도구를 만들고 같은 날 개발 DB 가 통째로 지워졌습니다(오락실 1,444 → 8). PGlite 백업에서 복구. 이후 작업 전 백업이 규칙이 됐습니다.",
          },
          {
            date: "08.24",
            title: "k6 부하테스트 · 발표",
            desc: "스모크 / 부하 / 한계 시나리오. 기준선 20 VU p95 287ms, 200 VU 천장 244 req/s. 이 상태로 발표.",
          },
        ],
      },
      {
        phase: "성능 1 ~ 3부",
        range: "2026.08.25 ~ 09.09",
        summary: "병목을 측정으로 짚고, 지표가 거짓말한 이유를 풀었습니다.",
        entries: [
          {
            date: "08.25",
            title: "조회 성능 1부: 풀 상한이 병목이었습니다",
            desc: "pg_stat_activity 에서 커넥션이 정확히 상한에 붙어 있었습니다. 풀 30 · 참조 데이터 캐싱 · listPosts 목록/총계 분리로 20 VU p95 287 → 39ms(−86%).",
          },
          {
            date: "08.26",
            title: "글 5만 건 대비",
            desc: "COUNT(*) OVER() 한 쿼리(141ms)를 되돌리고 목록 + 별도 COUNT(5.9ms) + 총계 캐시. 인기글 정렬 · 검색 인덱스 추가.",
          },
          {
            date: "09.03",
            title: "검색 · 지우기 버튼, dev 포트 autoPort",
            desc: "작은 UI 정리. 이 브랜치의 검색 기능은 뒤에 main 쪽 구현으로 대체됐습니다.",
          },
          {
            date: "09.09",
            title: "사운드 볼텍스 서열표",
            desc: "8단 등급 체계 · 난이도 축 · Lv17 채보 681개. 서열표 두 번째 기종.",
          },
          {
            date: "09.09",
            title: "계측(Pulse) · /api/health: 지표를 셋으로 쪼갰습니다",
            desc: "‘SELECT 1 하나짜리 라우트가 p95 3초’. 대기 · 실행 · 루프로 나눠 보니 DB 는 0.1ms, 범인은 22코어 중 1개만 쓰던 노드였습니다. 게다가 재고 있던 서버는 next dev 였습니다.",
          },
          {
            date: "09.09",
            title: "성능 2 · 3부: 프로세스와 왕복",
            desc: "프로세스 1 → 8 로 200 VU p95 1.34s → 87ms. 글 상세 3왕복을 CTE + json_agg 로 1왕복에. 고정 공지는 UNION ALL 로 목록과 한 번에. 풀 상한 30 은 재측정 뒤 유지.",
          },
        ],
      },
      {
        phase: "목표를 세우고 다시 재다",
        range: "2026.09.10 ~ 09.11",
        summary: "‘좋아 보이는 숫자’를 버리고 사용자 수 기준으로 전부 다시 깔았습니다.",
        entries: [
          {
            date: "09.10",
            title: "프로젝트 SSOT",
            desc: "브랜치 7개 · 개발 DB · 문서 전수를 한 문서로. 병합 안 된 perf 브랜치 12커밋을 main 에 올리고, 빈 워크트리와 브랜치를 정리.",
          },
          {
            date: "09.11",
            title: "부하 기준을 목표 사용자 수 위에",
            desc: "가입자 10,000 · DAU 3,000 → 평시 피크 3.4 req/s · 동시 54명. 8프로세스 · 풀 88 권고는 목표의 162배였고, 2프로세스 · 풀 10 으로 내렸습니다. p95 SLO 도 500 → 200ms 로 조였습니다.",
          },
          {
            date: "09.11",
            title: "API 응답이 압축되지 않고 있었습니다",
            desc: "/api/arcades 1.2MB 가 헤더 없이 나가고 있었습니다. 비동기 brotli(q4) 로 90KB, 월 대역폭 165GB → 14GB. localhost 에서 지연만 재느라 한 달 동안 아무도 못 본 병목.",
          },
          {
            date: "09.11",
            title: "빈 DB 기준선 무효 · 쿼리 전수 점검",
            desc: "목표 규모 시드를 별도 DB 에 깔고 재니 같은 부하에서 p95 22 → 152ms. /api/arcades 한 쿼리가 44,042 버퍼(나머지 합보다 큼). 집계를 오락실마다 하지 않고 한 번만. 만료 제보 정리 3.81 → 0.46ms.",
          },
          {
            date: "09.11",
            title: "보안 2건: 있는 줄 알았던 방어",
            desc: "로그인 시도 제한이 위조 가능한 X-Forwarded-For 로 세어져 무력했습니다. 쓰기 경로 18곳의 신원을 본문 playerId 에서 세션 쿠키로. 지침서(GUIDELINES.md)에 판단 규칙과 근거를 남겼습니다.",
          },
        ],
      },
      {
        phase: "점검",
        range: "2026.09.13 ~ 09.15",
        summary: "읽기 전용 QA 감사로 Blocker 9개를 찾아 닫고, 홈 · 인증 · PWA 를 얹었습니다.",
        entries: [
          {
            date: "09.13",
            title: "QA: Blocker 9",
            desc: "약관 · 처리방침 · 탈퇴, advisory lock 마이그레이션, 폴백 시 /api/health 503, 챗봇 · 제보 사용량 한도, 에러 화면 4종, 지도 SDK 인증 실패 폴백.",
          },
          {
            date: "09.13",
            title: "보안 헤더 · 세션 회수 · PWA",
            desc: "CSP 와 보안 헤더 5종, 오픈 리다이렉트 차단, 업로드 구간 요청을 스트림으로, 참조 데이터 ETag. token_epoch 로 세션 회수(라우트 19곳 · 호출 31곳 await). 매니페스트 · 서비스 워커 · 오프라인 안내. 전체 점검 API 72건 · 화면 10개 · 500 응답 0건.",
          },
          {
            date: "09.14",
            title: "다크 테마 · EZ2DJ 서열표",
            desc: "커뮤니티 탭 UI 와 다크 테마. EZ2DJ 6th · 7th TRAX 서열표: 버전 · 난이도(EZ · NM · HD · SHD) · 미상 레벨 축을 스키마에 추가. 서열표 세 번째 기종.",
          },
          {
            date: "09.15",
            title: "홈 신설 · 이메일 인증 · CSP 가 지도를 막고 있었다",
            desc: "/ 를 소식 배너 + 갈림길로, 파인더는 /finder 로. 가입 이메일 인증과 로그인 실패 잠금. CSP 가 네이버 지도 SDK 를 막고 있었습니다. 스킴과 도메인 둘 다 틀렸습니다.",
          },
          {
            date: "09.15",
            title: "AI 기종 추정: 제보의 마중물",
            desc: "926곳 중 기종이 등록된 곳이 3곳. 추정을 별도 테이블에 두고 점선 상자로 ‘확정 아님’을 형태로 표시. responseSchema 와 googleSearch 를 함께 주면 검색이 조용히 안 돈다는 걸 발견해 2단계로 나눴습니다.",
          },
          {
            date: "09.15",
            title: "운영: 소식 동기화 · 클러스터 · CI",
            desc: "펌프 · 사볼 공식 공지를 매일 갱신하는 스케줄러. 2인스턴스 클러스터 기동 스크립트, systemd 유닛, 백업 타이머, GitHub Actions(typecheck → test → build). 이모티콘 등록.",
          },
        ],
      },
      {
        phase: "그 뒤",
        range: "2026.09.16 ~ 진행 중",
        summary: "공개 저장소로 옮기고, 데이터와 편의 기능을 계속 채우고 있습니다.",
        entries: [
          {
            date: "09.16",
            title: "GitHub 공개 저장소 동기화",
            desc: "첨부 원본(uploads/)을 무시 규칙 최상위에 고정(공개 저장소 사고 방지). 빠져 있던 uploads API 라우트 복구.",
          },
          {
            date: "09.17",
            title: "리뷰 AI 요약 · 채보 영상 링크",
            desc: "후기 5개 이상이면 좋은 점 · 아쉬운 점 · 기체 상태 세 칸으로 요약해 목록 위에. 결과는 저장하고 리뷰가 바뀌면 다음 열람 때 다시 만듭니다. 채보마다 영상 링크.",
          },
          {
            date: "09.18",
            title: "EZ2DJ 7th 1.5 · 2.0 · CV 서열표",
            desc: "버전마다 쌓는 방식이 다릅니다: 1.5 는 1.0 을 잇고 더한 것만, 2.0 은 표를 통째로, CV 는 곡이 줄어드는 첫 버전. EZ2DJ 5개 버전 채보 6,063개.",
          },
        ],
      },
    ],

    // tech 는 저장소의 실제 구현(lib/ · db/ · components/)을 확인해서 적었습니다.
    gallery: [
      {
        src: "/projects/arcade-finder/01-map.jpg",
        caption: "전국 900곳 넘는 오락실. 화면 안에 들어온 마커만 그립니다.",
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
        tech: "라벨은 DOM에 항상 있고 CSS로 접어 둡니다. .mk .mk-label { display: none } 이 기본이고 :hover · :focus-visible · .mk-on 일 때만 펼칩니다. 펼쳐진 이름이 옆 마커 아래로 깔리지 않도록 그 순간만 z-index를 올리는데, 자식의 hover로 부모의 z-index를 바꿀 수 없어 오버레이 쪽에서 함께 처리합니다. 검색은 통짜 부분 일치가 아니라 낱말 단위입니다. searchTokens()가 공백으로 쪼개(최대 8개) text[]로 넘기고, Postgres에서 unnest() 위로 bool_and(name ILIKE '%'||t||'%' OR address ILIKE '%'||t||'%')를 돌립니다. 낱말마다 이름 또는 주소 어느 쪽에 걸려도 되고 전부 걸려야 매치라서, ‘서울대’는 주소에 ‘짱’은 상호에 각각 걸려 ‘짱오락실 서울대입구점’이 나옵니다. 전문 검색(to_tsvector)이나 pg_trgm 유사도가 아니라, 토큰별 부분 일치를 AND로 묶은 방식입니다.",
      },
      {
        src: "/projects/arcade-finder/04-assistant.jpg",
        caption: "오락실 도우미. 앱 안쪽 데이터로 답하고, 범위 밖 질문에는 답하지 않습니다.",
        tech: "Gemini 한 요청에 함수 선언과 내장 googleSearch 도구를 같이 물립니다. search_arcades · search_reports 같은 함수 선언을 주고 모델이 고르면 서버가 앱 DB를 직접 조회해 결과를 돌려줍니다. 범위 밖 질문은 systemInstruction이 고정 문구로 끊습니다. API 키는 서버 라우트에만 있고 클라이언트로 나가지 않습니다. 로그인 필수 · 사람당 하루 40회 · 전체 하루 2,000회 한도를 붙였습니다. 기종 추정 기능에서 알게 된 것 하나: responseSchema와 googleSearch를 함께 주면 검색이 아예 돌지 않고 모델이 기억으로 답합니다. 그래서 검색으로 자유 문장을 받고, 그 문장을 스키마로 훑는 2단계로 나눕니다.",
      },
      {
        src: "/projects/arcade-finder/05-report.jpg",
        caption: "기체 1대가 1행. 1호기 · 2호기 · 3호기의 컨디션을 따로 제보합니다.",
        tech: "arcade_cabinets (arcade_id, machine_id, cabinet_no) UNIQUE로 기체마다 행을 두고, 컨디션 제보는 기종이 아니라 그 기체의 id를 가리킵니다. 화면 값은 cabinet_condition 뷰가 만듭니다. 등록 컨디션을 제보 한 건처럼 함께 평균 내고 ROUND()로 1~5 정수로 되돌립니다(다섯 칸짜리 눈금에 ‘4.67’은 없는 정밀도를 주장하는 값이라서). 집계 창은 report_settings.condition_window_days이고, ‘제보 N건’ 카운트에는 등록값을 세지 않습니다. 그 숫자는 사람 N명이 확인했다는 뜻이어야 합니다. 대기는 기종 단위(machine_live)입니다. 줄은 게임 앞에 서고, 몇 호기 줄인지까지 고르게 하면 제보가 흩어져 집계가 설 자리가 없습니다.",
      },
      {
        src: "/projects/arcade-finder/06-live-feed.jpg",
        caption: "실시간 제보 피드. 30초마다 자동 갱신됩니다.",
        tech: "setInterval(load, 30_000) 폴링입니다. WebSocket이나 SSE를 쓰지 않은 이유는 제보가 초 단위로 쏟아지는 데이터가 아니라, 연결을 붙잡는 비용이 이득보다 크기 때문입니다. 검색 입력은 300ms 디바운스로 묶고 버튼 조작은 디바운스를 기다리지 않게 따로 즉시 반영합니다. 대기 제보는 machine_live 뷰가 report_settings.queue_ttl_minutes(240분) 안의 행만 모으므로, 낡은 제보는 아무 갱신 없이도 목록에서 빠집니다. 만료 행 정리는 읽기 경로에서 돕니다. 처음엔 읽기마다 테이블 전체를 훑고 있어서(3.81ms · 버퍼 398) 인덱스를 넣어 0.46ms · 버퍼 5로 내렸습니다.",
      },
      {
        src: "/projects/arcade-finder/07-tier.jpg",
        caption: "서열표. 클리어한 사람의 투표 평균으로 같은 레벨 안의 체감 난이도를 배치합니다.",
        tech: "‘클리어한 사람만 투표’를 코드 검사가 아니라 복합 외래키로 강제했습니다. difficulty_votes (player_id, chart_id)가 clear_records (player_id, chart_id)를 참조합니다. 클리어 기록 행이 없으면 INSERT 자체가 실패해서, API를 우회해도 자격 없는 표가 들어갈 수 없습니다. 투표가 들어오면 recalc_chart_stats()가 charts의 vote_count · avg_vote · convergence · tier_code 캐시 컬럼을 다시 씁니다. 읽기가 압도적으로 많고 쓰기는 드물어서 조회마다 재계산하지 않습니다. 등급 배치는 tier_grades.anchor 중 abs(anchor - avg_vote)가 가장 작은 것으로 정하고, 정확히 두 anchor의 중간이면 0에 가까운 안쪽 등급을 고릅니다. 지금은 펌프(7단) · 사운드 볼텍스(8단) · EZ2DJ(5단, 버전 5개) 세 기종이 돌고, EZ2DJ는 (기종, 버전, 모드, 레벨)이 한 보드입니다.",
      },
      {
        src: "/projects/arcade-finder/08-tier-special.jpg",
        caption: "투표가 갈리면 ‘개인차’, 특수 패턴 표시가 3명 이상이면 ‘특수패턴’ 칸으로 옮겨집니다.",
        tech: "수렴도는 GREATEST(0, 1 − 투표 표준편차 / tier_settings.tier_step)이고 표본이 2개 미만이면 NULL입니다. tier_code는 한 CASE 식에서 결정됩니다. 표가 min_votes보다 적으면 ‘미정’, 수렴도가 min_convergence보다 낮으면 ‘개인차’, 그 밖에는 가까운 등급입니다. 특수패턴은 투표와 별개로 special_marks (player_id, chart_id) 표시를 세고, 그 수가 tier_settings.special_min(3) 이상이면 등급보다 앞서 그 칸으로 옮깁니다. 임계값을 min_votes와 따로 둔 이유는 ‘난이도 표본이 충분한가’와 ‘기믹 채보라는 데 합의가 됐나’가 다른 판단이라, 한쪽을 올릴 때 다른 쪽이 끌려가면 안 되기 때문입니다. 표시가 3명 아래로 줄면 원래 등급으로 돌아갑니다.",
      },
      {
        src: "/projects/arcade-finder/09-community.jpg",
        caption: "게임 탭 10개 + ‘전체’. 탭은 테이블이 아니라 컬럼입니다.",
        tech: "게임 탭을 테이블로 나누지 않고 posts.machine_id 컬럼 하나로 뒀습니다. ‘전체’ 탭은 그 조건을 걸지 않은 조회입니다. 게임이 하나 늘어도 machines에 한 줄이 늘 뿐 테이블은 늘지 않습니다. 말머리도 CHECK 제약이 아니라 board_categories 테이블이라 배포 없이 늘립니다. 목록은 글 20 · 댓글 10으로 페이지네이션하고, 댓글 수 · 추천 수는 조회마다 세지 않도록 recalc_post_stats()가 바뀌는 순간에만 다시 씁니다. 총계는 COUNT(*) OVER()로 목록에 합치면 5만 건에서 141ms 라, 목록과 별도 COUNT(5.9ms)로 나누고 총계는 캐시합니다. 고정 공지는 UNION ALL 로 목록과 한 왕복에 가져옵니다.",
      },
      {
        src: "/projects/arcade-finder/10-post-image.jpg",
        caption: "이미지를 본문 안 원하는 위치에 5장까지 넣습니다.",
        tech: "편집은 Tiptap(ProseMirror)으로 하지만 저장물은 HTML이 아니라 JSON 문서 트리(posts.body_doc)입니다. HTML을 저장하면 출력마다 sanitizer를 통과해야 하고 sanitizer 자체가 계속 구멍이 나는 표면이라서, 렌더러가 JSON을 React 요소로 바꿉니다. dangerouslySetInnerHTML이 없고 문서 모델에 없는 노드 · 속성은 normalizeDoc이 통째로 버립니다. 첨부가 본문 어디에 붙는지의 근거는 평문 투영본(posts.body)의 [[image:N]] 마커이고, 그 평문이 목록 미리보기 · 본문 검색 · 챗봇에 그대로 쓰입니다. 상한은 MAX_ATTACHMENTS_PER_POST = 5로 사진과 동영상을 합쳐 셉니다. 따로 세면 ‘사진 5장 + 동영상 5개’가 되어 한 글의 무게가 예측되지 않습니다. 글자색 · 크기 · 서체도 자유 CSS가 아니라 닫힌 목록에서만 고르게 해서, 어두운 배경에 검정 글씨 같은 읽을 수 없는 글을 막았습니다. 글을 읽기만 하는 사람은 편집기 번들을 받지 않도록 dynamic(ssr:false)로 글쓰기를 열 때만 내려받습니다.",
      },
      {
        src: "/projects/arcade-finder/11-post-video.jpg",
        caption: "영상 첨부와 유튜브 링크 임베드.",
        tech: "동영상 첨부는 [[video:N]] 마커로 사진과 같은 경로를 타고, 유튜브 링크는 youtube 노드로 저장해 youtube-nocookie.com/embed iframe으로 그립니다. 본문에 영상 하나 넣었다고 추적 쿠키가 깔리지 않게 nocookie 도메인을 씁니다. 임베드 하나가 플레이어 JS와 이미지로 1MB 이상을 받아서 loading=‘lazy’를 걸었고, .post-embed가 CSS로 16:9 자리를 미리 잡아 주므로 lazy를 걸어도 레이아웃이 무너지지 않습니다. 첨부 동영상의 구간 요청은 처음엔 28MB 파일을 통째로 메모리에 올린 뒤 잘라 보냈는데, createReadStream 으로 구간만 스트림하고 크기는 stat 으로만 확인하도록 고쳤습니다.",
      },
    ],

    // 트러블슈팅 — Notion 회고 · 작업 기록에서 옮겼습니다. 문제 · 원인 · 해결 · 결과 순서입니다.
    troubles: [
      {
        title: "지도를 축소할 때마다 화면이 끊김",
        problem: "오락실 900여 곳을 지도에 다 올리자 축소할 때마다 화면이 크게 끊겼습니다.",
        cause: "처음에는 지점 이름표가 너무 많아서라고 보고 이름표를 호버 · 클릭 때만 띄웠습니다. 렉은 줄었지만 모바일에서는 오히려 불편해졌습니다. 진짜 원인은 화면 밖 마커까지 전부 DOM 으로 만들어 그리던 것이었습니다.",
        fix: "지도가 멈춘 뒤 뷰포트 안의 마커만 그리게 했습니다. 화면에서 빠진 마커는 버리지 않고 풀에 넣어 다시 쓰고, 위치는 transform 으로 옮깁니다.",
        result: "초기 마커 동기화 622ms → 156ms(−75%), DOM 노드 7,462 → 1,902, JS 힙 23.68MB → 14.32MB.",
        visual: {
          type: "compare",
          rows: [
            {
              label: "초기 마커 동기화",
              before: 622,
              after: 156,
              beforeText: "622ms",
              afterText: "156ms"
            },
            {
              label: "DOM 노드",
              before: 7462,
              after: 1902,
              beforeText: "7,462개",
              afterText: "1,902개"
            },
            {
              label: "JS 힙",
              before: 23.68,
              after: 14.32,
              beforeText: "23.68MB",
              afterText: "14.32MB"
            }
          ]
        },
      },
      {
        title: "아이폰에서 챗봇을 열면 화면이 밀림",
        problem: "아이폰에서 챗봇을 열면 화면이 확대되며 위로 밀렸고, 키보드 위에 검은 띠가 생겼습니다.",
        cause: "원인이 둘이었습니다. 입력칸이 13px 이라 iOS 가 확대한 뒤 풀지 않았습니다. 또 패널이 화면 아래에 fixed 로 붙어 있었는데, iOS 키보드는 레이아웃 높이를 줄이지 않아 입력칸이 키보드 밑으로 들어가고 iOS 가 페이지를 밀어 올렸습니다.",
        fix: "터치 화면에서는 입력칸을 16px 로 키우고 열 때 자동 포커스를 껐습니다. visualViewport 의 위치와 높이를 CSS 변수로 넘겨 패널을 키보드 바로 위에 붙이고, iOS 가 민 스크롤은 원래 자리로 되돌립니다.",
        result: "키보드 336px · 밀림 250px 을 흉내 낸 모바일 환경에서 패널이 보이는 영역에 정확히 맞는 것을 확인했습니다.",
        visual: {
          type: "flow",
          before: [
            "입력칸 13px · 하단 fixed",
            "iOS 가 확대하고 밀어 올림",
            "키보드 위 검은 띠"
          ],
          after: [
            "입력칸 16px · visualViewport",
            "패널을 키보드 바로 위에",
            "화면이 제자리"
          ]
        },
      },
      {
        title: "API 응답이 압축되지 않음",
        problem: "지도 데이터 API 한 번의 응답이 1.2MB 였습니다.",
        cause: "Next 는 HTML 과 정적 파일만 압축하고 API 응답은 그대로 내보냅니다. localhost 에서 지연만 재다 보니 크기는 한 달 동안 보지 못했고, 목표 사용자 수(DAU 3,000)를 정해 대역폭을 계산하면서 드러났습니다.",
        fix: "API 응답을 비동기 brotli(q4)로 압축하고, 1,400바이트 미만은 그대로 보냅니다.",
        result: "응답 1,224,603B → 90,434B(−92.6%), 월 대역폭 추정 165GB → 14GB.",
        visual: {
          type: "compare",
          rows: [
            {
              label: "지도 데이터 응답 크기",
              before: 1224603,
              after: 90434,
              beforeText: "1.22MB",
              afterText: "90.4KB",
              change: "−92.6%"
            },
            {
              label: "월 대역폭 추정",
              before: 165,
              after: 14,
              beforeText: "165GB",
              afterText: "14GB"
            }
          ]
        },
      },
      {
        title: "부하를 걸면 응답이 줄을 섬",
        problem: "가상 사용자 20명 부하에서 서버 응답 p95 가 287ms 까지 올라갔습니다.",
        cause: "pg_stat_activity 를 보니 커넥션이 기본 상한 10 에 그대로 붙어 있었습니다. 요청이 연결을 기다리며 줄을 서고 있었고, 몇 달째 안 바뀌는 기종 목록 같은 참조 데이터도 요청마다 DB 에 다시 묻고 있었습니다.",
        fix: "풀을 30 으로 늘렸습니다. 50 도 재 봤지만 평균은 같고 흔들림만 커서 30 을 골랐습니다. 참조 데이터는 5분 캐시하고 동시 요청이 와도 DB 에는 한 번만 묻게 했으며, 글 목록과 총계 쿼리를 나눴습니다.",
        result: "20 VU p95 287ms → 39ms(−86%).",
        visual: {
          type: "compare",
          rows: [
            {
              label: "서버 응답 p95 · 20 VU",
              before: 287,
              after: 39,
              beforeText: "287ms",
              afterText: "39ms"
            }
          ]
        },
      },
      {
        title: "로그인 시도 제한이 막지 못함",
        problem: "로그인 시도 제한을 넣어 두었는데 실제로는 막히지 않았습니다.",
        cause: "실패 횟수를 X-Forwarded-For 헤더의 첫 값으로 세고 있었는데, 이 헤더는 클라이언트가 마음대로 바꿀 수 있습니다. 횟수도 프로세스 메모리에만 있어서 프로세스가 여러 개면 따로 셌습니다.",
        fix: "실패 기록을 DB 표로 옮겨 계정 단위로 세고, IP 는 신뢰할 수 있는 프록시 홉이 있을 때만 씁니다. 같은 주에 쓰기 API 18곳의 신원도 본문의 playerId 대신 서명된 세션 쿠키로 바꿨습니다.",
        result: "헤더를 바꿔 가며 틀린 비밀번호를 넣어도 9번째부터 429 가 돌아오는 것을 실서버에서 확인했습니다.",
        visual: {
          type: "flow",
          before: [
            "X-Forwarded-For 첫 값으로 셈",
            "헤더를 바꾸면 새 사람",
            "제한이 걸리지 않음"
          ],
          after: [
            "DB 표에 계정 단위로 셈",
            "헤더를 바꿔도 같은 계정",
            "9번째부터 429"
          ]
        },
      },
      {
        title: "실서버에서만 SNS 로그인 실패",
        problem: "실서버에 올린 뒤 SNS 로그인 마지막 단계에서 연결 실패가 났고, 일부 제공자는 설정 오류 화면을 띄웠습니다.",
        cause: "원인이 두 겹이었습니다. 리다이렉트를 request.url 기준으로 만들었는데 리버스 프록시 뒤에서는 이 값이 공개 도메인이 아니라 내부 주소였습니다. 개발 서버는 안팎 주소가 같아 드러나지 않았습니다. 여기에 제공자 콘솔의 콜백 등록이 빠졌거나 http 로 들어가 있었습니다.",
        fix: "리다이렉트를 설정값(APP_URL) 기준으로 만드는 함수 하나로 모아 OAuth 시작 · 콜백 · 인증 메일에 썼습니다. redirect_uri 만 바꾼 대조 요청으로 콘솔 등록 여부를 가려낸 뒤 고쳤습니다.",
        result: "수정 전 코드에서 실패하던 3건을 포함해 테스트 4건을 더했고, 인가 단계가 8회 연속 통과했습니다.",
        visual: {
          type: "flow",
          before: [
            "request.url 로 리다이렉트",
            "프록시 뒤 내부 주소",
            "브라우저 연결 실패"
          ],
          after: [
            "APP_URL 로 리다이렉트",
            "공개 도메인 주소",
            "인가 단계 8회 연속 통과"
          ]
        },
      },
    ],
    learned: [
      {
        kind: "learned",
        title: "목표가 없는 최적화는 방향이 없다",
        desc: "‘200 VU 에서 p95 90ms’ 같은 숫자를 쌓았지만 그 200 VU 가 우리 서비스로 몇 명인지 몰랐습니다. 가입자 · DAU 를 정하자 8프로세스 권고는 162배 과했고, 한 달 내내 못 본 병목(무압축 응답)이 그제야 보였습니다.",
      },
      {
        kind: "learned",
        title: "재기 전에 ‘지금 무엇을 재고 있는가’를 확인한다",
        desc: "next dev 를 프로덕션으로 착각해 측정 4개가 틀렸고, 빈 DB 위의 기준선은 7배 낙관적이었고, 부하 생성기가 서버보다 먼저 바닥났습니다. 서버가 프로덕션 빌드인지 · 데이터가 목표 규모인지 · 생성기가 서버보다 빠른지, 이 셋을 확인하기 전의 숫자는 숫자가 아닙니다.",
      },
      {
        kind: "learned",
        title: "‘방어가 있는 줄 알았던 자리’를 먼저 본다",
        desc: "로그인 시도 제한은 위조 가능한 헤더로 세어져 무력했고, API 는 본문의 playerId 를 그대로 믿고 있었습니다. 없는 방어를 더하는 것보다 있다고 착각하던 것을 고치는 쪽이 먼저입니다.",
      },
      {
        kind: "learned",
        title: "되돌릴 수 없는 작업을 맡길 때는 되돌릴 방법을 먼저 만들어 둔다",
        desc: "DB 가 통째로 날아간 사건에서 가장 비싸게 배운 것입니다. 지금은 파괴적 명령 전 pg_dump 가 지침서의 첫 규칙입니다.",
      },
      {
        kind: "learned",
        title: "AI 가 자신 있게 말하는 외부 사실은 검증한다",
        desc: "네이버 검색 API 가 NCP 로 이전된 것이 모델의 지식 시점 이후라, 있는 줄 알고 붙인 엔드포인트가 전부 죽어 있었습니다. responseSchema 와 googleSearch 를 함께 주면 검색이 조용히 꺼지는 것도 모델은 알려주지 않았습니다.",
      },
      {
        kind: "open",
        title: "크라우드소싱 계층이 아직 비어 있습니다",
        desc: "오락실 위치는 926곳이 실데이터인데 그 위에 얹히는 제보는 0건, 보유 기종은 4행입니다. 버그가 아니라 설계대로지만, 처음 보는 사람에게는 필터가 고장난 것으로 읽힙니다. AI 기종 추정으로 마중물을 놓았고 첫 제보를 기다리고 있습니다.",
      },
      {
        kind: "open",
        title: "허위 제보 방어가 아직 닫히지 않았습니다",
        desc: "‘서로 다른 2명 · 익명 제외’ 임계값에 제보 10분 창 제한과 가입 24시간 미만 계정 제외를 더했습니다. 신고 · 차단은 아직 없습니다.",
      },
      {
        kind: "open",
        title: "첨부가 이 서비스에서 가장 큰 인프라 항목입니다",
        desc: "DB 전체가 176MB 인데 글 3개분 첨부가 34MB 입니다. 구간 요청은 스트림으로 고쳤지만 썸네일과 트랜스코딩은 미구현입니다. 목표 규모에서 대역폭을 먹는 것은 API 가 아니라 파일입니다.",
      },
      {
        kind: "open",
        title: "모바일에서 지점 이름을 보려면 한 번 눌러야 합니다",
        desc: "라벨 상시 렌더를 걷어내면서 받은 트레이드오프입니다. 세로 스택 개편으로 보완했지만, 호버가 없는 환경의 근본 해법은 아직입니다.",
      },
      {
        kind: "open",
        title: "영업시간은 결국 채우지 못했습니다",
        desc: "네이버 지역검색 API 응답에 영업시간 필드가 없습니다. 926곳 중 채워진 곳은 1곳이고, 데이터 출처의 한계입니다.",
      },
    ],
  },
  {
    slug: "petmedisearch",
    name: "PetMediSearch",
    group: "personal",
    period: "2026.09.09 ~ 09.16",
    updated: "2026.09.22",
    thumbnail: "/projects/petmedisearch/thumb.jpg",
    cardSummary: "팀으로 만든 반려동물 병원 · 약국 찾기 앱을 2년 뒤 혼자 다시 만든 프로젝트",
    cardHighlight: "업종 전환 시 지도 재조회 6 → 0 · 목록 응답 30.7MB → 4.6KB",
    // 세로로 긴 모바일 화면을 상세 상단에 그대로 쓰면 히어로가 3천 픽셀이 됩니다.
    // 실제 화면 두 장을 16:10 으로 세워 둔 같은 이미지를 씁니다.
    hero: "/projects/petmedisearch/thumb.jpg",
    galleryPortrait: true,
    tags: ["React", "TypeScript", "Vite", "Express", "MySQL", "k6", "Kakao Map"],
    type: "개인 프로젝트 (1인 재작성)",
    role: "기획 재정리 · 프론트엔드 · 백엔드 · 데이터 수집 · 성능 측정",
    summary:
      "2024년 부트캠프에서 4인 팀으로 만든 반려동물 병원·약국 찾기 앱을 2년 뒤 혼자 처음부터 다시 만들었습니다. 같은 기능을 다시 쓰는 것이 목적이 아니라, 그때 넘어갔던 것들을 측정과 점검으로 닫는 것이 목적이었습니다.",
    links: [
      { label: "GitHub 저장소", href: "https://github.com/mick243/PetMediSearch-rebuild" },
      { label: "2024년 팀 프로젝트 원본", href: "https://github.com/mick243/PetMediSearch" },
    ],

    star: [
      {
        key: "S",
        label: "Situation",
        title: "2024년에 만든 것은 돌아갔지만, 왜 돌아가는지 설명할 수 없었습니다",
        body: "부트캠프 4인 팀 프로젝트에서 제 몫은 248커밋 중 18커밋이었습니다. 실제 규모로 재 본 적도, 보안을 따져 본 적도 없어 처음부터 다시 쓰는 편이 빨랐습니다.",
      },
      {
        key: "T",
        label: "Task",
        title: "같은 제품을 혼자, 2주 안에, 규모 가정을 세우고 다시",
        body: "기획과 화면은 원본을 따르고 구현은 전부 새로 썼습니다. 가입자 1만 · DAU 2,000 을 기준으로 실제 규모 시드에서 재고, 고친 것은 화면에서 확인하는 것이 조건이었습니다.",
      },
      {
        key: "A",
        label: "Action",
        title: "재서 나온 것만 고쳤고, 고친 것은 화면에서 확인했습니다",
        body: "전국을 한 번에 받던 지도를 화면 범위 조회로 바꾸고, 목록 응답이 싣고 있던 불필요한 데이터를 걷어냈습니다(30.7MB → 4.6KB). 200 VU 부하 시험과 보안 · 시간대 점검도 돌렸습니다.",
      },
      {
        key: "R",
        label: "Result",
        title: "2주 동안 숫자로 남은 것",
        body: "'오늘 실측'은 2026.09.22 에 다시 잰 값이고, 나머지는 저장소의 부하 시험 기록(09.15)과 지침서의 값입니다. 지연은 모두 localhost 에서 잰 서버 시간입니다.",
      },
    ],

    dataflow: {
      desc: "지도 검색, 게시판, 소셜 로그인, 시설 데이터 적재 길을 나눠 그렸습니다. 번호는 다시 만들며 고친 자리입니다.",
      lanes: [
        { key: "client", label: "화면 (React)" },
        { key: "server", label: "서버 (Express)" },
        { key: "store", label: "저장소 · 외부" },
      ],
      nodes: {
        map: { label: "지도 검색 화면", lane: "client", note: "지도가 멈추면 화면 범위 · 줌을 읽어 조회" },
        board: { label: "게시판 · 홈", lane: "client", note: "page · limit 단위로 글 요청 (홈은 3건)" },
        login: { label: "로그인 화면", lane: "client", note: "OAuth state 발급과 대조" },
        store: { label: "Redux 스토어", lane: "client", kind: "store", note: "검색 결과 · 로그인 토큰" },
        api: { label: "Express API", lane: "server", note: "/facilities · /facilities/clusters · /category · /auth" },
        job: { label: "시설 적재 잡", lane: "server", note: "공공데이터 동기화 · 좌표 변환 · 주소 지오코딩" },
        db: { label: "MySQL 8", lane: "store", note: "시설(lat · lng 인덱스) · 글 · 사용자" },
        kakao: { label: "Kakao Map", lane: "store", kind: "entity", note: "지도 렌더링과 화면 범위 · 줌 레벨" },
        oauth: { label: "소셜 로그인", lane: "store", kind: "entity", note: "카카오 · 네이버 · 구글" },
      },
      paths: [
        { name: "지도 넓게", steps: ["map", "bbox + 정밀도", "api", "범위 조회 + 격자 GROUP BY", "db"] },
        { name: "지도 확대", steps: ["map", "bbox + limit", "api", "범위 안 시설만", "db"] },
        { name: "결과 표시", steps: ["api", "격자 집계 · 시설 목록", "map", "검색 결과 저장", "store"] },
        { name: "지도 그리기", steps: ["kakao", "지도 타일 · 화면 범위", "map"] },
        { name: "게시판", steps: ["board", "category · page · limit", "api", "LIMIT / OFFSET + 총계", "db"] },
        {
          name: "소셜 로그인",
          steps: ["login", "인가 요청 + state", "oauth", "code + state(대조)", "login", "인가 code", "api", "소셜 ID 조회 · 가입", "db"],
        },
        { name: "시설 적재", steps: ["job", "변경분 시설 + 좌표", "db"] },
      ],
      fixes: [
        { node: "map", text: "전국을 한 번에 받던 지도를 화면 범위 조회로 바꾸고, 넓게 볼 때는 서버가 격자로 묶어 보냄" },
        { node: "api", text: "게시글 목록을 페이지 단위로 바꿔 응답 30.7MB → 4.6KB(글 2만 건 시드)" },
        { node: "login", text: "저장된 값이 없어도 통과하던 state 검증을 거부하도록 고치고, 한 번 쓴 값은 지움(CSRF 방지)" },
        { node: "db", text: "DB · 서버 · 연결의 시간대를 +09:00으로 맞춰 시각 9시간 오차를 바로잡음" },
      ],
      note: "state 대조는 화면에서 합니다. 시설 적재 잡은 사람이 실행하거나 cron으로 돌립니다(주기 예시는 README).",
    },
    metrics: [
      { value: "103", unit: "커밋", label: "8일간 1인 작업", note: "2026.09.09 ~ 09.16 · 원본 팀 프로젝트에서는 248커밋 중 18" },
      { value: "7,120", unit: "곳", label: "시설 데이터", note: "병원 2,238 · 약국 4,882 · 오늘 실측" },
      { value: "78", unit: "건", label: "서버 자동 테스트", note: "node --test · 오늘 전부 통과" },
      { value: "24,251", unit: "줄", label: "TypeScript · JS", note: "184개 파일" },
      { value: "0", unit: "건", label: "200 VU 실패", note: "요청 49,101건 · 전체 p95 42ms" },
      { value: "14", unit: "개", label: "테이블", note: "스키마 + alter 18개 파일" },
    ],

    perf: [
      {
        title: "목록이 싣고 있던 것 (실제 규모 시드에서)",
        rows: [
          { what: "GET /category", sub: "전체를 주고 화면은 3건만 씀", was: "30.7 MB", now: "4.6 KB", delta: "−99.9%" },
          { what: "시설 후기 목록", sub: "페이지네이션 없음 · 사진이 목록에", was: "14.4 MB", now: "725 B", delta: "−99.9%" },
          { what: "전국 시설 검색", sub: "LIMIT 없음", was: "933 KB", now: "47.8 KB", delta: "−95%" },
          { what: "댓글 300건짜리 글", sub: "스레드 전체를 한 번에", was: "68,081 B", now: "1,363 B", delta: "−98%" },
          { what: "/mypage/reviews", sub: "사진 2장짜리 후기 1건 보유 계정", was: "214,370 B", now: "289 B", delta: "−99.9%" },
        ],
        extra:
          "전부 눈으로 보면 멀쩡한 화면이었습니다. 시드가 100건일 때는 어느 쪽도 느리지 않았고, 규모를 목표치로 올린 뒤에야 보였습니다.",
      },
      {
        title: "0 → 200 VU 램프 (10분 36초 · 2026.09.15)",
        rows: [
          { what: "처리량", sub: "50 → 100 → 200 VU", was: "33.1 req/s", now: "129.5 req/s", delta: "선형" },
          { what: "전체 p95", sub: "요청 49,101건", was: "없음", now: "42 ms", delta: "실패 0" },
          { what: "요청당 CPU", sub: "버퍼 풀이 데워지며", was: "6.42 ms", now: "4.79 ms", delta: "−25%" },
          { what: "가장 느린 화면", sub: "login · 예산 2,000ms", was: "없음", now: "340 ms", delta: "예산 안" },
          { what: "429 응답", sub: "X-Forwarded-For 분리 뒤", was: "측정 오염", now: "0 건", delta: "없음" },
        ],
        extra:
          "꺾이는 지점을 찾지 못했습니다. 200 VU 는 이 서버의 한계가 아니라 그 한참 앞입니다. 대신 CPU 의 74%를 로그인이 쓰고 있었습니다. 전체 요청의 1.7%(834건)가 CPU 318.5초 중 236초를 썼고, 이 기계에서 bcrypt cost 12 는 283ms 입니다. 낮추면 무차별 대입이 그만큼 쉬워지므로 고칠 것이 아니라, 용량을 늘릴 때 볼 것이 동시 접속이 아니라 로그인 빈도라는 뜻으로 읽었습니다.",
      },
      {
        title: "오늘 다시 잰 것 (2026.09.22 · origin/main)",
        rows: [
          { what: "GET /facilities", sub: "limit 300 · 컬럼 10개", was: "16개 컬럼", now: "99,487 B", delta: "332 B/건" },
          { what: "GET /facilities/clusters", sub: "서울 전역 한 화면", was: "없음", now: "1,221 B", delta: "13칸" },
          { what: "GET /mypage/reviews", sub: "images 대신 image_count", was: "없음", now: "612 B", delta: "2건" },
          { what: "GET /mypage/posts", sub: "content 없음", was: "없음", now: "326 B", delta: "3건" },
          { what: "응답 압축", sub: "gzip · br 요청에도", was: "없음", now: "적용 안 됨", delta: "미해결" },
        ],
        extra:
          "문서가 '고쳤다'고 적은 세 건은 실제로 그렇게 되어 있었습니다: /facilities 응답에 뺐다고 한 여섯 컬럼이 없고, 마이페이지 두 칸도 무거운 것을 싣지 않습니다. 대신 재면서 새로 하나를 찾았습니다. 압축 미들웨어가 아예 없어서 99,487 B 가 헤더 없이 그대로 나갑니다. 같은 응답을 gzip 으로 묶으면 13,802 B(−86%)입니다.",
      },
    ],

    timeline: [
      {
        phase: "다시 세우고, 지도를 화면 범위로",
        range: "2026.09.09 ~ 09.10",
        summary:
          "물려받은 것 가운데 남길 수 없는 것부터 걷어낸 뒤, 전국을 한 번에 받던 구조를 고치고 게시판과 반려동물 기능을 올렸습니다.",
        entries: [
          {
            date: "09.09",
            title: "초기 커밋",
            desc: "React 18 + TypeScript + Vite 화면과 Express + mysql2 서버, MySQL 8 스키마. 원본 저장소를 참고하되 구현은 새로 썼습니다.",
          },
          {
            date: "09.09",
            title: "저작권 확인이 안 된 외부 이미지 제거 · 디자인 토큰",
            desc: "출처를 확인할 수 없는 이미지와 애니메이션을 먼저 지웠습니다. 낡은 스타일을 정리하고 색·간격을 토큰으로 묶었습니다. 서버 포트를 환경변수로 분리.",
          },
          {
            date: "09.09",
            title: "화면 범위 조회와 서버 격자 집계",
            desc: "응답 13MB · 마커 2만 개를 지도의 idle 시점 뷰포트 조회로 바꿨습니다. 줌이 넓을 때는 서버가 격자로 집계한 숫자 풍선을 씁니다. 조회 결과는 지도 중심 근접순으로 정렬.",
          },
          {
            date: "09.09",
            title: "검색 렉 제거 · 지역명 검색어 확장",
            desc: "검색할 때의 렉과 프레임 드랍 원인을 걷어내고, 검색하면 지도를 첫 결과로 옮기게 했습니다. 지역명 검색어를 실제 저장 표기로 확장. 좌표 없는 시설을 주소로 보완하는 geocode 명령 추가.",
          },
          {
            date: "09.10",
            title: "게시판 개편 · 반려동물과 접종 일정 API",
            desc: "카테고리 9개 정리(통합 탭은 조건을 걸지 않은 조회), 대표글·썸네일 목록, 글 작성·수정 에디터 공용화. 반려동물 · 접종 일정 · 단골 시설 API 와 반려동물 카드 홈.",
          },
        ],
      },
      {
        phase: "계정과 목록",
        range: "2026.09.11",
        summary: "소셜만 있던 로그인에 일반 가입을 더하고, 목록 전반에 페이지네이션과 인덱스를 넣었습니다.",
        entries: [
          {
            date: "09.11",
            title: "일반 회원가입 · 로그인 · 관리자 계정",
            desc: "JWT 기반 가입과 로그인, 관리자 계정 생성 스크립트. soft delete 와 관리자 글 삭제.",
          },
          {
            date: "09.11",
            title: "목록 페이지네이션과 인덱스",
            desc: "글 목록과 댓글 스레드에 페이지네이션. 후기 사진을 목록에서 떼어 여러 장 첨부·수정과 지연 로딩으로. 조회 인덱스를 넣고 신규 설치 스키마와 동기화.",
          },
          {
            date: "09.11",
            title: "개발 지침서",
            desc: "규모 가정(가입자 1만 · DAU 2,000)과 '추측하지 말고 잰다 · 고쳤다고 말하기 전에 화면에서 본다'를 규약으로 적었습니다. 이후 판단의 근거가 됩니다.",
          },
        ],
      },
      {
        phase: "점검",
        range: "2026.09.13 ~ 09.14",
        summary: "전체를 한 번 훑어 보안·법적 고지·시간대를 닫았습니다. 하루에 26커밋이 여기서 나왔습니다.",
        entries: [
          {
            date: "09.13",
            title: "보안: 있다고 착각하던 자리",
            desc: "소셜 로그인 state 검증이 값이 없으면 통과하고 있었습니다. 로그에 쿼리 전문·개인정보·시크릿이 남던 것, 관리자 계정의 기본 비밀번호, 운영 환경의 Swagger 공개를 함께 닫고 보안 헤더와 요청 제한을 붙였습니다.",
          },
          {
            date: "09.13",
            title: "약관 · 탈퇴 · 토큰 만료",
            desc: "이용약관·개인정보처리방침 화면, 가입 동의 항목과 기록, 회원 탈퇴. 토큰이 만료되면 로그인 화면으로 보냅니다. 쓰기 요청 입력값 검증과 DB 커넥션 풀·상태 확인·정상 종료.",
          },
          {
            date: "09.13",
            title: "ESLint · Vitest · CI · 구성",
            desc: "서버 ESLint 를 들이고 그로 잡힌 것들을 고쳤습니다(logError 를 쓰면서 require 를 빠뜨린 곳 포함). 화면 쪽 Vitest, CI 워크플로, Dockerfile · compose · 환경변수 본보기, 백업 스크립트.",
          },
          {
            date: "09.14",
            title: "모든 시각이 9시간 어긋나던 것 (P0)",
            desc: "MySQL 의 time_zone 이 SYSTEM 이면 컨테이너가 뜬 시점의 UTC 로 굳어, CURRENT_TIMESTAMP 가 UTC 벽시계로 들어갑니다. 세션 시간대를 +09:00 으로 못박았습니다. 이름 있는 시간대는 표를 미리 적재해야 해서 쓰지 않았습니다.",
          },
          {
            date: "09.14",
            title: "접종·검진 알림",
            desc: "일정에 시각을 더하고 수정할 수 있게. node-cron + web-push 로 발송(서버)과 알림 켜기(화면). 넘치는 탭 줄을 화살표로 넘기게.",
          },
        ],
      },
      {
        phase: "부하 시험과 최적화, 그 뒤",
        range: "2026.09.15 ~ 09.17",
        summary:
          "200 VU 까지 걸어 보고 거기서 나온 전송량 문제 셋을 같은 날 고쳤습니다. 이어서 후기 AI 요약을 붙였고, QA 에서 나온 나머지는 아직 병합을 기다리고 있습니다.",
        entries: [
          {
            date: "09.15",
            title: "k6 부하 시험: 200 VU, 실패 0",
            desc: "복사본 DB 에 목표 규모 시드를 깔고 인원을 올려 가며 쟀습니다. 129.5 req/s · p95 42ms · 실패 0. 꺾이는 지점은 찾지 못했고, 대신 CPU 의 74%를 로그인(전체 요청의 1.7%)이 쓰고 있었습니다.",
          },
          {
            date: "09.15",
            title: "/facilities 가 쓰지 않는 컬럼 여섯 개를 보내던 것",
            desc: "SELECT * 로 16개 컬럼이 나갔고 그중 여섯 개는 화면이 쓰지 않았습니다. x·y 는 받자마자 위경도로 덮어쓰고 있었습니다. 열 개만 골라 보내면서 클라이언트 타입도 같이 정리했습니다.",
          },
          {
            date: "09.15",
            title: "마이페이지 두 칸이 무거운 것을 싣던 것",
            desc: "/mypage/reviews 는 후기 사진을, /mypage/posts 는 글 본문을 통째로 싣고 있었습니다. 둘 다 화면이 쓰지 않는 값이라 목록에서 뺐습니다. 정렬에 동점 처리(post_id DESC)도 함께 붙였습니다.",
          },
          {
            date: "09.15",
            title: "댓글 이모티콘 · 로딩 화면 · 세션 회수",
            desc: "관리자가 등록하고 댓글에 넣는 이모티콘(지운 자리는 번호를 당겨 메움). 첫 진입·느린 로딩·연결 끊김에만 뜨는 로딩 화면. 비밀번호를 바꾸거나 탈퇴하면 남아 있던 토큰을 끊습니다.",
          },
          {
            date: "09.17",
            title: "시설 후기 AI 요약",
            desc: "후기가 5건 이상이면 요약을 만들어 목록 위에 올립니다. 제공자는 Gemini · Claude · OpenAI 중에서 고르고, 키가 없으면 기능이 꺼진 채 나머지가 정상 동작합니다.",
          },
          {
            date: "09.17",
            title: "QA 수정 9건: 아직 main 밖에 있습니다",
            desc: "실패를 '없음'으로 말하던 것, 무한 로딩, 쓰던 글 유실, 검증 구멍 셋, 글 본문의 외부 이미지, 댓글 이중 등록, 즐겨찾기 거짓 성공, 화면 가운데가 크게 비던 것. 네 커밋이 병합 대기 브랜치에 남아 있어 이 페이지의 화면에는 반영되지 않았습니다.",
          },
        ],
      },
    ],

    gallery: [
      {
        src: "/projects/petmedisearch/01-home.jpg",
        caption: "홈. 아이 카드와 다음 접종 D-day, 즐겨찾기 수, 커뮤니티 최신 글을 한 화면에.",
        tech: "홈은 여러 곳의 요약을 모아 보여주는 자리라, 각 칸이 자기 API 를 따로 부릅니다. 접종 D-day 는 화면에서 계산합니다. 서버가 남은 날짜를 내려주면 자정을 넘긴 사용자에게 어제 값이 남고, 캐시가 끼면 더 오래 남습니다. 일정은 due_date 와 due_time 두 컬럼입니다. 처음에는 날짜만 있었는데 '오후 2시 반 예약'을 적을 자리가 없어 시각을 더했습니다. 로그인하지 않았을 때는 같은 자리에 로그인 안내가 들어가고, 아래 검색창은 그대로 둡니다. 병원을 찾는 것은 계정이 없어도 되는 일이라서입니다.",
      },
      {
        src: "/projects/petmedisearch/02-map.jpg",
        caption: "지도. 화면에 들어온 범위만 조회하고, 줌이 넓으면 서버가 집계한 숫자 풍선을 그립니다.",
        tech: "처음 구현은 시설 전체를 한 번에 받았습니다(응답 13MB, 마커 2만 개). 지금은 지도의 idle 이벤트(끌기·줌이 멈춘 뒤 한 번) 때 뷰포트 상자를 서버에 넘겨 그 안만 받습니다. bounds_changed 로 받으면 끄는 중 프레임마다 다시 붙습니다. 줌이 넓을 때는 마커를 만들지 않고 GET /facilities/clusters 가 격자로 세어 준 숫자만 그립니다. 오늘 재 보니 서울 전역 한 화면이 13칸 1,221 B 입니다. 같은 화면을 마커로 그리면 수천 개를 만들어야 합니다. 응답에는 열 개 컬럼만 실립니다. 예전에는 SELECT * 로 16개가 나갔고 그중 x·y(원본 TM 좌표)는 화면이 받자마자 위경도로 덮어쓰고 있었습니다.",
      },
      {
        src: "/projects/petmedisearch/03-map-filter.jpg",
        caption: "업종 필터. 병원만, 약국만, 또는 전체.",
        tech: "필터는 서버에 다시 묻지 않고 이미 받은 목록에서 걸러냅니다. 같은 뷰포트의 같은 데이터라 왕복할 이유가 없습니다. 집계 풍선의 배경색도 고른 업종에 맞춰 바뀝니다. 업종을 빠르게 연달아 바꾸면 지도가 요동치는 문제가 있었습니다. 필터가 바뀔 때마다 조회가 새로 날아가고 늦게 온 응답이 먼저 온 것을 덮어썼기 때문입니다. 시설 데이터에는 폐업·말소·휴업도 함께 들어 있어(오늘 기준 정상 3,887 · 폐업 3,205) 영업 상태를 상세에 함께 표시합니다. 원본 데이터가 인허가 기록이라 폐업한 곳도 남아 있습니다.",
      },
      {
        src: "/projects/petmedisearch/04-search.jpg",
        caption: "지역명이나 지점명으로 검색하면 지도가 첫 결과로 옮겨 갑니다.",
        tech: "검색은 지역명과 지점명을 함께 봅니다. 검색어를 실제 저장 표기로 확장하는 처리가 있는데, 사용자가 '강남'이라고 쓰고 데이터는 '서울특별시 강남구'로 적혀 있기 때문입니다. 검색 로직은 server/search.js 로 떼어 내고 테스트를 붙였습니다: 상호에 그대로 맞는 쪽에 더 큰 점수를 주고, 한 글자 토큰은 느슨한 항을 빼고, 검색어가 없으면 조건을 아예 만들지 않습니다. 검색어가 남아 있으면 지도를 옮겨도 목록이 갱신되지 않던 버그를 따로 고쳤습니다. 검색 결과 상태와 뷰포트 상태가 서로를 덮어쓰고 있었습니다.",
      },
      {
        src: "/projects/petmedisearch/05-facility.jpg",
        caption: "마커를 누르면 상호 · 영업 상태 · 지번과 도로명 주소 · 즐겨찾기가 열립니다.",
        tech: "지번 주소와 도로명 주소를 둘 다 보여줍니다. 공공데이터에 둘이 따로 들어오고, 내비게이션에 넣을 때 어느 쪽이 통하는지가 곳마다 다릅니다. 상호를 누르면 클립보드로 복사됩니다. 전화번호가 없는 곳은 빈칸으로 두지 않고 '준비되지 않은 정보입니다'를 명시적으로 그립니다. 빈칸은 화면이 덜 그려진 것처럼 보입니다. 후기 버튼은 고른 시설을 Redux 의 selectedPlace 에 넣고 이동합니다. 예전에는 <a href> 여서 페이지가 통째로 새로 뜨며 store 가 비워졌고, 그래서 후기 화면에서 시설을 처음부터 다시 고르게 했습니다.",
      },
      {
        src: "/projects/petmedisearch/06-review.jpg",
        caption: "후기. 별점과 사진 5장까지. 목록에는 사진을 싣지 않습니다.",
        tech: "이 화면 위쪽이 크게 빈 것은 Layout 의 space-between 때문이고, 고친 커밋이 아직 병합 대기 브랜치에 있어 여기 화면에는 반영되지 않았습니다. 목록 응답에는 사진이 들어가지 않습니다. COALESCE(JSON_LENGTH(images), 0) 으로 장수만 보내고, 실제 사진은 펼친 사람만 따로 받아갑니다. 페이지네이션이 없고 사진이 목록에 실려 있을 때 같은 목록이 14.4MB 였고 지금은 725 B 입니다. 상한은 사진 5장이고, 후기가 5건 이상 쌓이면 AI 요약이 목록 위에 붙습니다(제공자 키가 없으면 그 기능만 꺼진 채 나머지는 그대로 돕니다).",
      },
      {
        src: "/projects/petmedisearch/07-community.jpg",
        caption: "커뮤니티. 카테고리 탭 9개와 '통합'. 탭은 테이블이 아니라 컬럼입니다.",
        tech: "카테고리를 테이블로 나누지 않고 posts.category_id 컬럼 하나로 뒀습니다. '통합' 탭은 그 조건을 걸지 않은 조회입니다. 카테고리가 하나 늘어도 테이블은 늘지 않습니다. 탭이 화면보다 넓어지면 화살표로 넘깁니다. 목록은 페이지네이션이 붙어 있고, 지우기는 물리 삭제가 아니라 deleted_at 을 채우는 soft delete 입니다. 신고 처리나 오삭제 복구가 필요한 자리인데 행을 지우면 되돌릴 수 없습니다. 목록 조회에는 전용 인덱스를 넣고 신규 설치 스키마와 맞췄습니다.",
      },
      {
        src: "/projects/petmedisearch/08-post-detail.jpg",
        caption: "글 상세와 댓글. 댓글에는 관리자가 등록한 이모티콘을 넣을 수 있습니다.",
        tech: "댓글 300건이 달린 글은 스레드를 한 번에 주면 68,081 B 입니다. 페이지네이션을 붙여 1,363 B 로 내렸습니다. 이모티콘은 관리자만 등록하고, 지운 자리는 번호를 당겨 메웁니다. 번호에 구멍이 남으면 목록이 들쭉날쭉해지고, 지운 번호를 재사용하면 그 번호의 옛 그림이 나오는 문제가 있어 파일 해시를 같이 봅니다. 이모티콘 목록 캐시는 5분에서 1분으로 줄였습니다. 관리자가 등록하고 바로 확인하는 흐름에서 5분은 '안 올라갔다'로 읽힙니다. 댓글이 이중 등록되던 것과 쓰던 글이 유실되던 것은 09.17 에 고쳤고, 그 커밋은 아직 병합 대기 중입니다.",
      },
      {
        src: "/projects/petmedisearch/09-post-write.jpg",
        caption: "글쓰기. 작성과 수정이 같은 편집기를 씁니다.",
        tech: "작성 화면과 수정 화면이 서로 다른 편집기를 쓰고 있었습니다. 한쪽만 고쳐지는 일이 반복돼 공용 컴포넌트로 합쳤습니다. 서버 검증도 한 함수(validatePost)에서 제목·본문을 같은 규약으로 봅니다. 가입 검증도 같은 방식으로, 가입에서 막히는 값이 마이페이지 수정으로는 들어가는 일을 막았습니다. 본문에 붙인 사진이 저장되지 않던 버그가 있었고, 본문의 외부 이미지를 막은 것은 09.17 커밋(병합 대기)에 있습니다. 모바일에서는 헤더를 고정하고 당겨서 새로고침을 붙였습니다.",
      },
      {
        src: "/projects/petmedisearch/10-vaccinations.jpg",
        caption: "접종·검진 일정. 남은 날짜와 시각, 기기별 알림 켜기.",
        tech: "일정은 pet_vaccinations 에 due_date · due_time 으로 두고, 남은 날짜는 화면에서 셉니다. 알림은 node-cron 이 scripts/sendReminders.js 를 돌려 web-push 로 보내고, 3일·2일·1일 전에 한 번씩입니다. 구독은 기기마다 다르므로(push_subscriptions) 알림 토글이 '이 기기로'라고 말합니다. 계정 단위로 적으면 폰에서 켠 것이 PC 에서도 켜진 것으로 보입니다. 알림을 보냈는지는 vaccination_reminders 에 남겨 같은 일정으로 두 번 보내지 않게 합니다. 시각을 더할 때 인덱스도 함께 잡았습니다.",
      },
      {
        src: "/projects/petmedisearch/11-favorites.jpg",
        caption: "즐겨찾기. 지도에서 누른 별이 여기 모입니다.",
        tech: "favorite_facilities 는 (user_id, facility_id) 를 UNIQUE 로 두어 중복을 스키마가 막습니다. 별을 두 번 눌렀을 때 행이 두 개 생기지 않는 근거를 코드 검사에 두지 않았습니다. 목록에는 업종 배지와 도로명 주소만 싣고, 주소가 길면 말줄임으로 자릅니다. 후기 화면에서 주소가 칸 밖으로 새던 것을 고칠 때 같이 정리했습니다. 즐겨찾기가 실패했는데도 성공한 것처럼 보이던 문제는 09.17 에 고쳤고, 그 커밋은 아직 병합 대기 중입니다.",
      },
      {
        src: "/projects/petmedisearch/12-mypage.jpg",
        caption: "마이페이지. 내가 쓴 글 · 댓글 · 후기. 목록에는 제목과 날짜만 싣습니다.",
        tech: "이 화면이 전송량 최적화가 가장 잘 보이는 자리입니다. '내가 작성한 게시판 글'은 제목과 작성일만 받습니다. 예전에는 SELECT * 라 본문이 따라왔는데, 이 칸은 누르면 상세로 이동하고 본문을 펼치지 않습니다. 오늘 재 보니 글 3건에 326 B 입니다. '내가 작성한 후기 글'도 사진 대신 장수만 받습니다(2건 612 B). 사진 2장짜리 후기 하나를 가진 계정이 214,370 B 를 받던 자리입니다. 화면 쪽 타입은 진작 image_count 를 받기로 적어 두었고, 서버만 그렇게 하지 않고 있었습니다. 비밀번호를 바꾸거나 탈퇴하면 남아 있던 토큰을 끊습니다.",
      },
    ],

    // 트러블슈팅 — Notion 회고 · 작업 기록에서 옮겼습니다. 문제 · 원인 · 해결 · 결과 순서입니다.
    troubles: [
      {
        title: "업종을 바꿀 때마다 지도가 요동침",
        problem: "전체 · 병원 · 약국을 짧은 간격으로 바꿔 누르면 지도가 결과 사이를 튀어 다니며 크게 흔들렸습니다. 지도를 움직이지 않아도 조회가 계속 나갔습니다.",
        cause: "원인이 넷이었습니다. 지도 SDK 가 onCreate 를 useLayoutEffect 의존성으로 부르는데 매 렌더 새 함수를 넘겨 첫 조회가 렌더마다 다시 나갔고, 결과가 바뀔 때마다 지도를 옮겨 다시 조회하는 순환이 생겼습니다. 늦게 온 응답이 마지막에 고른 업종의 화면을 덮었고, 클러스터 스타일 배열도 매 렌더 새로 만들어졌습니다.",
        fix: "첫 조회를 onCreate 에서 빼고, 지도 이동은 '검색을 실행했다' 는 신호에만 반응하게 했습니다. 요청에 순번을 매겨 최신 응답만 반영하고, 클러스터 스타일은 한 번만 만들게 했습니다.",
        result: "업종 6번 클릭에 나가던 조회 6번 → 0번, 클러스터 다시 그리기 18번 → 0번, 검색어 네 글자를 치는 동안의 조회 4번 → 0번.",
        visual: {
          type: "compare",
          rows: [
            { label: "업종 6번 클릭 · 불필요한 조회", before: 6, after: 0, beforeText: "6번", afterText: "0번" },
            { label: "업종 6번 클릭 · 클러스터 다시 그리기", before: 18, after: 0, beforeText: "18번", afterText: "0번" },
            { label: "검색어 4글자 입력 중 조회", before: 4, after: 0, beforeText: "4번", afterText: "0번" }
          ],
          note: "브라우저에서 지도 API 호출과 네트워크 요청을 가로채 횟수를 셌습니다."
        },
      },
      {
        title: "글 3건을 보여 주려고 30.7MB 를 받음",
        problem: "홈은 글 3건만 보여 주는데, 분류별 목록 API 가 그 분류의 글을 전부 본문째 내려주고 있었습니다. 시드가 100건일 때는 느리지 않아 보이지 않았습니다.",
        cause: "목록 API 에 페이지네이션도 서버 쪽 상한도 없었습니다. 가입자 1만 · 글 2만 규모의 복사본 DB 를 깔고 나서야 드러났습니다.",
        fix: "page · limit 을 붙이고 상한은 서버가 정하게 했습니다. 작성 시각만으로 정렬하면 초 단위 동점에서 같은 글이 두 번 나오거나 빠져서 동점 처리 키를 함께 넣었습니다.",
        result: "30.7MB → 4.6KB. 같은 점검에서 시설 후기 목록 14.4MB → 725B, 댓글 300건짜리 글 68,081B → 1,363B.",
        visual: {
          type: "compare",
          rows: [
            {
              label: "홈 목록 응답",
              before: 30700000.0,
              after: 4600.0,
              beforeText: "30.7MB",
              afterText: "4.6KB"
            },
            {
              label: "시설 후기 목록",
              before: 14400000.0,
              after: 725,
              beforeText: "14.4MB",
              afterText: "725B"
            },
            {
              label: "댓글 300건짜리 글",
              before: 68081,
              after: 1363,
              beforeText: "68,081B",
              afterText: "1,363B"
            }
          ],
          note: "가입자 1만 · 글 2만 규모 복사본 DB 기준입니다. 막대는 같은 줄 안에서만 비교합니다."
        },
      },
      {
        title: "지운 이모티콘 자리에 옛 그림이 나옴",
        problem: "이모티콘을 지우고 새로 올리면 같은 번호 자리에 예전 그림이 나왔습니다.",
        cause: "지운 번호를 당겨 재사용하면서 같은 주소가 시점에 따라 다른 그림을 가리키게 됐고, 브라우저는 주소만 보고 캐시해 둔 옛 사본을 내놓았습니다.",
        fix: "이미지 주소에 파일 해시를 실었습니다. 해시가 맞으면 1년 immutable, 어긋나면 no-store 로 응답하고, 해시를 나르는 목록은 no-cache 로 바꿨습니다.",
        result: "같은 주소에서 캐시를 허용하면 옛 PNG(1,524B), 무시하면 새 GIF(4,715B)가 오는 것을 재현해 원인을 확인했고, 고친 뒤에는 주소마다 그림 하나만 가리킵니다.",
        visual: {
          type: "flow",
          before: [
            "지운 번호 재사용",
            "같은 주소 · 다른 그림",
            "브라우저가 옛 사본"
          ],
          after: [
            "주소에 파일 해시",
            "그림마다 다른 주소",
            "1년 캐시도 안전"
          ]
        },
      },
      {
        title: "에러 없이 모든 시각이 9시간 어긋남",
        problem: "23:39 에 쓴 글이 14:39 로 보였고, 방금 쓴 글이 목록에서 '9시간 전' 으로 떴습니다. 에러는 어디서도 나지 않았습니다.",
        cause: "MySQL 컨테이너가 UTC 로 돌고 있었고 원인은 두 갈래였습니다. CURRENT_TIMESTAMP 로 들어간 값은 순간은 맞고 표시만 틀렸고, Node 의 new Date() 로 들어간 값은 순간 자체가 9시간 미래였습니다. 한 표 안에 두 기준이 섞여 있었습니다.",
        fix: "같은 순간을 두 방식으로 임시 표에 넣어 차이를 잰 뒤, DB 세션 · 드라이버 · 화면 세 곳을 +09:00 으로 고정했습니다. 이미 들어간 값은 보정 SQL 로 한 번 맞췄습니다.",
        result: "같은 순간에 쓴 두 시각의 차이가 32,400초 → 0.05초가 됐고, 목록 표시도 '방금' 으로 바로잡혔습니다.",
        visual: {
          type: "compare",
          rows: [
            {
              label: "같은 순간에 쓴 두 시각의 차이",
              before: 32400,
              after: 0.05,
              beforeText: "32,400초",
              afterText: "0.05초",
              change: "오차 해소"
            }
          ]
        },
      },
      {
        title: "아무 계정으로나 로그인되는 소셜 로그인",
        problem: "소셜 로그인의 state 검증이 저장된 값이 없으면 그냥 통과했습니다. 전체 점검에서는 본문의 소셜 ID 만 믿고 아무 계정의 토큰이나 내주는 경로도 찾았습니다.",
        cause: "검증 코드는 있었지만 '값이 없을 때' 를 실패로 다루지 않았습니다. 문제의 경로는 화면에서 쓰지 않는데도 열려 있었고, 소셜 ID 는 숫자라 차례로 넣어 볼 수 있었습니다.",
        fix: "빈 state 를 실패로 막고, 쓰지 않는 경로는 지웠습니다. 같은 PR 에서 DB 오류 한 건에 프로세스가 죽던 분기 누락도 고쳤습니다.",
        result: "가짜 ID 로 200 과 토큰을 받는 상황을 고치기 전에 재현해 두고, 수정 뒤 막히는 것을 확인했습니다.",
        visual: {
          type: "flow",
          before: [
            "소셜 ID 만 보냄",
            "서버가 토큰 발급",
            "아무 계정으로 로그인"
          ],
          after: [
            "state 가 없으면 실패",
            "안 쓰는 경로 삭제",
            "가짜 ID 거절"
          ]
        },
      },
      {
        title: "성공 응답을 실패로 읽던 데이터 갱신",
        problem: "공공데이터 API 로 시설 데이터를 갱신하는 스크립트가 모든 호출을 실패로 처리했습니다. 로그에는 'API 오류 [0] 정상' 이라는 앞뒤가 맞지 않는 메시지가 찍혔습니다.",
        cause: "문서대로 \"00\" 만 성공으로 처리했는데 실제 응답은 \"0\" 이었고, 목 서버로는 통과했습니다. 날짜 형식도 문서와 실제가 달랐고, 증분 기준 시각은 드라이버가 UTC 로 해석해 9시간 밀렸습니다.",
        fix: "두 성공 코드를 모두 받고, 기준 시각은 Date 로 바꾸지 않고 문자열 그대로 다루게 했습니다. 1건씩 넣던 INSERT 는 500건 배치 upsert 와 트랜잭션으로 바꿨습니다.",
        result: "시설 데이터를 6,122건에서 7,093건으로 갱신했고(신규 971), 지금은 명령 한 줄로 다시 받습니다.",
        visual: {
          type: "flow",
          before: [
            "\"00\" 만 성공으로 처리",
            "실제 응답은 \"0\"",
            "모든 호출이 실패"
          ],
          after: [
            "\"0\" · \"00\" 모두 성공",
            "500건 배치 upsert",
            "시설 6,122 → 7,093건"
          ]
        },
      },
    ],
    learned: [
      {
        kind: "learned",
        title: "'데이터가 적어서 그렇다'는 진단이 아니라 미룸이었다",
        desc: "2024년에는 느린 화면을 보고도 규모 탓으로 넘겼습니다. 이번에는 가입자 1만 · DAU 2,000 을 먼저 못박고 그 규모의 시드를 복사본 DB 에 깔았습니다. 그러자 30.7MB 를 내려주고 3건만 쓰는 목록, 사진이 실린 후기 목록, LIMIT 이 없는 전국 검색이 한꺼번에 드러났습니다. 전부 100건일 때는 빠른 화면이었습니다.",
      },
      {
        kind: "learned",
        title: "주석이 맞는 말을 하고 있어도 코드가 그걸 하는지는 따로 봐야 한다",
        desc: "/mypage/reviews 에는 '후기에는 사진이 붙어 있어 더더욱 전부 내려보내면 안 됩니다'라는 주석이 달려 있었습니다. 바로 아래 쿼리는 LIMIT 20 으로 건수만 줄이고 SELECT * 였습니다. 의도는 적혀 있었고 구현만 따라오지 않았습니다. 화면 쪽 타입도 image_count 를 받기로 이미 적어 둔 상태였습니다.",
      },
      {
        kind: "learned",
        title: "재기 전에 '지금 무엇을 재고 있는가'를 확인한다",
        desc: "한 대에서 200 VU 를 돌리면 요청 제한이 전부 같은 주소로 묶여 30초 만에 429 만 돌아옵니다. 그 상태로 잰 숫자는 서버 성능이 아니라 요청 제한 미들웨어의 처리 속도입니다. 처음 k6 요약도 '체크 97.5% 통과'라고만 말해 무엇이 깨졌는지 알 수 없었고, 깨진 이름을 찍는 줄을 넣고 나서야 원인이 앱이 아니라 복사본 DB 의 뒤처진 스키마인 것을 알았습니다.",
      },
      {
        kind: "learned",
        title: "고치지 않는 것도 측정 결과다",
        desc: "CPU 의 74%를 로그인이 쓰고 있었습니다. 원인은 bcrypt cost 12 의 283ms 였고, 낮추면 그만큼 무차별 대입이 쉬워집니다. 그래서 고치지 않기로 하고, 대신 용량을 늘릴 때 볼 것이 동시 접속이 아니라 로그인 빈도라는 결론을 남겼습니다. 읽기는 요청당 1.71ms 로 거의 공짜입니다.",
      },
      {
        kind: "learned",
        title: "시간대는 조용히 틀린다",
        desc: "모든 시각이 9시간 어긋나 있었는데 아무것도 에러를 내지 않았습니다. MySQL 의 time_zone 이 SYSTEM 이면 컨테이너가 뜬 시점의 UTC 로 굳어, CURRENT_TIMESTAMP 가 UTC 벽시계로 들어갑니다. 한글이 깨지는 문제도 같았습니다: .sql 을 넣을 때 문자셋을 빼면 조용히 깨져서, 파일이 스스로 문자셋을 선언하게 했습니다.",
      },
      {
        kind: "open",
        title: "응답 압축이 아직 없습니다",
        desc: "이 페이지를 쓰면서 origin/main 을 다시 띄워 재다가 찾았습니다. 압축 미들웨어가 아예 없어서 /facilities 응답 99,487 B 가 헤더 없이 그대로 나갑니다. gzip 으로 묶으면 13,802 B(−86%)입니다. 부하 시험이 localhost 에서 돌아 지연에 잡히지 않았고, 전송량을 컬럼 단위로 줄이면서도 압축은 아무도 보지 않았습니다.",
      },
      {
        kind: "open",
        title: "QA 수정 9건이 main 밖에 있습니다",
        desc: "09.17 에 고친 것들(실패를 '없음'으로 말하던 것, 무한 로딩, 쓰던 글 유실, 댓글 이중 등록, 즐겨찾기 거짓 성공, 화면 가운데가 크게 비던 것)이 네 커밋으로 병합 대기 브랜치에 남아 있습니다. 이 페이지의 화면은 origin/main 기준이라 그중 여백 문제가 후기 화면에 그대로 보입니다.",
      },
      {
        kind: "open",
        title: "AI 요약 경로는 부하 시험에 포함되지 않았습니다",
        desc: "부하 시험은 09.15 이고 후기 AI 요약은 09.17 에 들어왔습니다. 외부 LLM 을 호출하는 경로라 지연 특성이 나머지와 전혀 다른데, 그 경로로는 아직 부하를 걸어 보지 않았습니다.",
      },
      {
        kind: "open",
        title: "화면 쪽 테스트가 거의 없습니다",
        desc: "서버는 node --test 78건이 전부 통과합니다. 화면은 Vitest 를 들이고 유틸 테스트를 붙인 데서 멈췄고, package.json 에 test 스크립트가 없습니다. 지도·검색처럼 상태가 서로를 덮어쓰기 쉬운 자리가 정작 테스트 없이 남아 있습니다.",
      },
      {
        kind: "open",
        title: "시설 데이터가 서울에 한정돼 있습니다",
        desc: "오늘 공공데이터포털에서 다시 받아 보니 서울 25개 자치구 7,120곳(병원 2,238 · 약국 4,882)이고, 좌표가 붙은 곳은 6,649 입니다. README 는 전국 31,493건이라고 적고 있는데 지금 저장소의 수집 명령이 도는 범위는 서울입니다. 저장소의 SSOT 문서도 이 수치를 '문서 값이며 DB 실측이 아니다'로 표시해 두었습니다.",
      },
    ],
  },
  {
    slug: "one-line-desk",
    name: "한 줄 데스크",
    group: "personal",
    period: "2026.10.25 ~ 11.10",
    updated: "2026.11.10",
    thumbnail: "/projects/one-line-desk/thumb.jpg",
    // 홈 카드 한 줄 설명과 대표 성과(열린 PR #35 의 칸). 그 PR 이 병합되기 전에는 화면에 쓰이지 않습니다.
    cardSummary: "회의실 · 탕비실 · 문의를 한 줄로 묻고 확인 카드로 받는 사내 안내 데스크",
    cardHighlight: "확인 카드로만 실행되는 화면 · 담당 카드 오답 5 → 0 · 자동 테스트 1,400건",
    hero: "/projects/one-line-desk/01-home.jpg",
    tags: ["TypeScript", "React", "Fastify", "PostgreSQL", "PGlite", "Vitest", "MCP", "Fly.io"],
    type: "개인 프로젝트 (1인 개발 · 에이전트 팀)",
    role: "기획 · 설계 결정(ADR) · 프론트엔드 · 백엔드 · 보안 · 배포 전 과정",
    summary:
      "회의실 잡기, 탕비실 채우기, 누구에게 물을지. 한 줄로 쓰면 확인 카드로 돌려주는 사내 안내 데스크입니다. AI 는 문장을 해석만 하고, 쓰기는 사람이 확인한 카드로만 일어나게 만들었습니다.",
    links: [
      { label: "시연 사이트", href: "https://one-line-desk.vercel.app/" },
      { label: "GitHub 저장소", href: "https://github.com/mick243/One_line_desk" },
    ],

    star: [
      {
        key: "S",
        label: "Situation",
        title: "가끔 하는 회사 일은 '어느 부서 일이지?'부터 찾아야 했습니다",
        body: "법인카드 분실 · 명함처럼 담당 부서부터 찾아야 하고, 회의실은 조건을 하나씩 골라 잡습니다. 탕비실 요청은 말할 곳이 없어 같은 상품이 사람마다 다른 이름으로 흩어졌습니다.",
      },
      {
        key: "T",
        label: "Task",
        title: "한 줄로 묻고, 쓰기는 사람이 확인한 카드로만",
        body: "17일 동안 기획부터 배포까지 혼자 맡았습니다. AI 와 MCP 에는 쓰기 도구를 주지 않고, 질문 원문은 어디에도 남기지 않고, 그룹웨어를 대체하지 않고 옆에 붙는 것이 조건이었습니다.",
      },
      {
        key: "A",
        label: "Action",
        title: "규칙이 먼저 읽고, AI 는 고르기만, 서버가 다시 확인합니다",
        body: "AI 는 분장표 행 ID 나 공지 문장 번호만 고르고 화면은 원문을 그립니다. 쓰기는 확인 시트를 거쳐 실행 순간 다시 검사해 한 번만 일어나고, 법정 접속기록을 먼저 넣었습니다.",
      },
      {
        key: "R",
        label: "Result",
        title: "17일, PR 48개: 숫자로 남은 것",
        body: "수치는 저장소 main(f8521c0, 11.10) 기준이고, 시험 수는 그 커밋의 CI 실행 결과입니다. 정답률 표의 숫자는 AI 가 아니라 낱말 규칙이 맞힌 수입니다.",
      },
    ],

    // 2026.11.10 main f8521c0 기준. 시험 수는 CI, 코드 수치는 git 추적 파일 집계입니다.
    dataflow: {
      desc: "AI는 문장을 해석만 하고, 실제 쓰기는 사람이 확인한 카드로만 일어나도록 길을 나눴습니다. 번호는 설계에서 지킨 자리입니다.",
      lanes: [
        { key: "client", label: "화면" },
        { key: "server", label: "서버 (Fastify)" },
        { key: "store", label: "저장소 · 외부" },
      ],
      nodes: {
        web: { label: "웹 화면", lane: "client", note: "한 줄 입력 · 후보 카드 · 확인 시트 (React)" },
        aiapp: { label: "바깥 AI 앱", lane: "client", note: "Claude 등이 OAuth로 붙어 읽기 도구만 호출" },
        api: { label: "API", lane: "server", note: "/api/ask 는 읽기만, 쓰기는 /api/plans 로만" },
        rules: { label: "규칙 엔진", lane: "server", note: "낱말 규칙과 날짜 · 인원 슬롯 해석" },
        gateway: { label: "AI 게이트웨이", lane: "server", note: "자료 등급 · 하루 상한 · 응답 구조 검증, 쓰기 도구 없음" },
        plan: { label: "확인 카드", lane: "server", note: "사람이 확인하면 한 번만 실행" },
        mcp: { label: "읽기 전용 MCP", lane: "server", note: "도구 전부 읽기, 예약자 · 본문 칸은 내보내지 않음" },
        llm: { label: "LLM", lane: "store", kind: "entity", note: "분류와 슬롯 추출만 (시연은 Gemini Flash)" },
        db: { label: "PostgreSQL · PGlite", lane: "store", note: "예약 · 확인 카드 · 감사 로그 · AI 사용량(본문 없이)" },
      },
      paths: [
        { name: "묻기", steps: ["web", "한 줄 문장", "api", "빈 방 · 행 읽기", "db"] },
        { name: "AI 해석", steps: ["api", "문장 + 오늘 날짜", "gateway", "분류 요청", "llm"] },
        { name: "AI 없을 때", steps: ["api", "낱말 · 슬롯", "rules", "후보 카드 + 제안 토큰", "web"] },
        { name: "확인 후 쓰기", steps: ["web", "확인 누름", "plan", "예약 · 요청 한 번 쓰기", "db"] },
        { name: "바깥 읽기", steps: ["aiapp", "읽기 요청(OAuth)", "mcp", "빈 방 · 공지 조회", "db"] },
      ],
      fixes: [
        { node: "rules", text: "AI를 붙이기 전에 규칙부터 고쳐 담당 팀 안내 오답 5건 → 0건(검증 문장 32개)" },
        {
          node: "gateway",
          text: "모델 응답은 정해진 JSON 구조로 검증하고, 상한 · 실패 · 꺼짐이면 규칙 결과로 돌아가 카드를 그대로 보여 줍니다.",
        },
        {
          node: "plan",
          text: "쓰기는 확인한 카드로만 일어납니다. 예외는 회의실 채팅에서 직접 시킨 예약 · 장비 대여뿐이고, 운영 스위치와 하루 상한 안에서 규칙과 모델 해석이 같을 때만 서버가 계산한 값으로 실행합니다.",
        },
      ],
      note: "시연 배포 기준 : 웹은 Vercel, API는 Fly.io 한 대, DB는 PGlite입니다. MCP는 운영자 스위치로 열며 시연에서는 꺼 두었습니다.",
    },
    metrics: [
      { value: "48", unit: "개", label: "병합한 PR", note: "커밋 163개 · 2026.10.25 ~ 11.10" },
      { value: "1,400", unit: "건", label: "자동 테스트", note: "서버 1,150 · 공용 179 · 웹 71 · 11.10 CI 전부 통과" },
      { value: "29", unit: "개", label: "설계 결정(ADR)", note: "회의록 14편 → 사용자 결정 → ADR 개정" },
      { value: "6", unit: "개", label: "서버 모듈", note: "문의 · 공지 · 회의실 · 탕비실 · 카페 · MCP" },
      { value: "44,147", unit: "줄", label: "TypeScript", note: "261개 파일 · 시험 102개 파일 22,105줄 별도" },
      { value: "9", unit: "개", label: "마이그레이션", note: "23개를 7개로 합친 뒤 · DB 구조 차이 0 확인" },
    ],

    perf: [
      {
        title: "고치기 전과 후 (원래 커밋 · 회의록에서 다시 찾은 값)",
        rows: [
          { what: "담당 카드가 틀린 팀을 고름", sub: "골든 32문장 · 분장표 밖 15문장, 규칙 보강", was: "5건 · 9건", now: "0건 · 2건", delta: "AI 없이" },
          { what: "서버 시험 전체 시간", sub: "마이그레이션 끝낸 PGlite 스냅숏", was: "약 10분", now: "약 3분 20초", delta: "−67%" },
          { what: "웹 첫 JS", sub: "역할 화면 나눠 불러오기", was: "372.23 kB", now: "334.34 kB", delta: "−10%" },
          { what: "운영 설치 크기", sub: "웹 전용 패키지를 개발 의존성으로", was: "174 MB", now: "97 MB", delta: "−44%" },
          { what: "마이그레이션 파일", sub: "모듈마다 하나 · pg_dump 비교 차이 0", was: "23개", now: "7개", delta: "−70%" },
          { what: "디자인 검사(Hallmark)", sub: "바닥 위반 · 습관", was: "48 · 141", now: "0 · 0", delta: "리디자인" },
          { what: "기록 보관", sub: "보낸 문의 · 앱 안 알림", was: "90일 · 30일", now: "7일 · 7일", delta: "최소 보관" },
        ],
        extra:
          "담당 카드 줄은 AI 를 붙이기 전에 규칙부터 고친 결과입니다. 마이그레이션은 실제 PostgreSQL 17 에 옛 23개와 새 7개를 각각 적용해 표 46 · 칸 399 · 제약 185 · 인덱스 112 가 같은지 비교한 뒤 합쳤습니다.",
      },
    ],

    // 작업 기록 — 저장소 git 로그와 PR 을 날짜순으로 묶었습니다. 날짜는 커밋 날짜입니다.
    timeline: [
      {
        phase: "기획과 네 기능",
        range: "2026.10.25 ~ 10.26",
        summary: "기획 문서(PRD · ADR)에서 시작해 모듈 에이전트 다섯을 병렬로 돌려 네 기능을 올렸습니다.",
        entries: [
          {
            date: "10.25",
            title: "기획과 초반틀",
            desc: "기존 제품 판정에서 회의실 · 공지는 그룹웨어가 하니 얇게, 탕비실 합치기와 공정 주문안은 없는 것이라 좁게 만들기로. 공통 바닥(DB · AI 게이트웨이 · 감사 로그 · plan)부터 깔았습니다.",
          },
          {
            date: "10.26",
            title: "네 기능 구현과 화면 개편",
            desc: "담당 찾기 · 공지, 회의실, 같이 채워요, 읽기 전용 MCP. 리드가 바닥과 통합을, 모듈 에이전트가 자기 폴더와 마이그레이션 번호 구간만 맡았습니다. 기능마다 페이지를 나누고 문의 · 앱 안 알림 · 회의 초대(임시 IdP)를 더했습니다.",
          },
        ],
      },
      {
        phase: "출시 준비와 QA",
        range: "2026.10.27 ~ 10.31",
        summary: "출시 준비 회의에서 나온 P0 를 닫고, 외부 QA 를 가정한 실행 시험으로 결함을 고쳤습니다.",
        entries: [
          {
            date: "10.27",
            title: "출시 1주 차 P0 · 남은 연차",
            desc: "PM · 백엔드 · 프론트 · 보안 · DevOps · QA 6역할 회의의 P0 를 고치고, 연차는 '서버 규칙 계산 + AI 는 질문 해석만 + 본인 것만'으로 정했습니다.",
          },
          {
            date: "10.28",
            title: "규칙 버그 · 회의실 채팅 · 접속기록",
            desc: "AI 를 붙이기 전에 규칙의 오답부터(담당 카드 틀린 카드 5 → 0). 회의실 입력 칸 하나로 찾기와 예약, 장비 대여. 법정 접속기록 표(고칠 수 없음 · 1년)와 쉬는 시간 끊기. 64케이스 실행 시험의 높음 · 보통 결함을 같은 날 고쳤습니다.",
          },
          {
            date: "10.29",
            title: "웹 배포 준비 회의 · 운영 이미지 · CI",
            desc: "8역할 회의의 P0 바닥부터. 다단계 · 비루트 이미지 하나가 화면과 보안 머리까지 주고, 상태 확인을 live · ready 로 나눴습니다. CI 를 처음 붙였습니다(지금은 서식 · 타입 · 시험, 실제 PostgreSQL, 이미지 연기 시험 세 잡).",
          },
          {
            date: "10.30",
            title: "시연 배포",
            desc: "웹은 Vercel, API 는 Fly.io 도쿄 한 대(안 쓸 때 재움)로 올렸습니다. 이후 배포는 두 곳에 같은 전체 커밋 SHA 로 올렸습니다.",
          },
        ],
      },
      {
        phase: "AI 와 기능 넓히기",
        range: "2026.11.01 ~ 11.05",
        summary: "홈 AI 채팅과 MCP 도구를 넓히고, AI 를 어디에 쓸지는 정답률 표로 재서 정했습니다.",
        entries: [
          {
            date: "11.02",
            title: "MCP 연결 방식 개정",
            desc: "동적 등록이 없으면 Claude Code 가 붙지 못했습니다. 우리 서버가 인가 서버가 되어 PKCE S256 · resource · aud 를 검사하고, CLI 용 공개 클라이언트는 루프백 포트를 허용했습니다.",
          },
          {
            date: "11.03",
            title: "하루 PR 여섯 개",
            desc: "병가, 읽기 전용 MCP 도구 9개, 홈 AI 채팅, AI 공급자 Anthropic · Gemini 중 하나, 같은 팀 일정, 반차. 마이그레이션 14 → 7 과 시험 DB 스냅숏으로 서버 시험이 약 10분에서 약 3분 20초로.",
          },
          {
            date: "11.05",
            title: "AI 정답률 표 · 홈 개선 · 문의함",
            desc: "정답을 단 가상 문장으로 규칙과 AI 를 따로 세는 표와 운영자 화면. 첫 측정 뒤 '빔프로젝터' 해석 실패를 고쳤습니다. 처음 쓰는 직원 점검으로 홈에서 바로 답하기 · 반복 예약 · PC 두 칸 화면.",
          },
        ],
      },
      {
        phase: "정확도 · 디자인 · 마무리",
        range: "2026.11.06 ~ 11.10",
        summary: "휴가는 그룹웨어 옆에 붙는 쪽으로 정하고, 정확도를 다듬은 뒤 화면을 새로 입혔습니다.",
        entries: [
          {
            date: "11.06",
            title: "휴가 A안 · 마이그레이션 23 → 7",
            desc: "결재는 그룹웨어가, 앱은 신청 전 카드와 승인 뒤 반영만. 그룹웨어 역할 회의(법 · 보안 · 아키텍처 · 시장)가 모두 '옆에 붙기'를 권했습니다. 마이그레이션은 모듈마다 하나로 합치고 구조 차이 0 을 확인했습니다.",
          },
          {
            date: "11.07",
            title: "휴가 정확도 · 공지 대상 알림",
            desc: "공휴일 · 회사 휴일, 시간 단위 연차, 5인 미만 사업장 · 주말 근무자. 새 공지는 AI 가 받을 사람 조건을 제안하고 총무가 확인한 뒤에만 알림을 보냅니다.",
          },
          {
            date: "11.08",
            title: "Hallmark 리디자인",
            desc: "디자인 검사 바닥 위반 48 → 0 · 습관 141 → 0, 웹 시험 71개. 이어서 색을 차갑고 밝은 푸른 회색으로 다시 맞췄습니다.",
          },
          {
            date: "11.10",
            title: "결재 차례 알림",
            desc: "가상 그룹웨어에서 휴가 기안이 올라가면 팀장에게, 팀장이 승인하면 인사팀에게 '결재할 휴가 신청서가 왔어요'만 알립니다.",
          },
        ],
      },
    ],

    gallery: [
      {
        src: "/projects/one-line-desk/01-home.jpg",
        caption: "홈에서 한 줄로 물으면 담당 카드가 바로 나옵니다. 질문 원문은 저장하지 않습니다.",
        tech: "AI 는 분장표 후보 가운데 행 ID 하나나 '없음'만 고르고, 카드에 보이는 업무 이름 · 창구 · 지금 할 일은 서버가 그 행 원문을 그대로 그립니다(ADR-09). 그래서 모델이 틀려도 없는 내용을 지어내지는 못합니다. 규칙이 먼저 읽어 내면 모델을 부르지 않습니다. 카드에는 담당자 이름 대신 팀 창구만 나옵니다. 질문 원문은 요청 본문과 메모리에서만 다루고 DB · 로그 · URL · 브라우저 저장소에는 남기지 않습니다(ADR-10).",
      },
      {
        src: "/projects/one-line-desk/02-rooms-preview.jpg",
        caption: "보내기 전에 '찾기만 해요 / 바로 예약돼요'를 먼저 알려 줍니다.",
        tech: "공용 패키지의 isCommand · roomChatPreview 가 브라우저와 서버에서 같은 규칙으로 문장을 나눕니다. 묻는 말이면 버튼이 [찾기]이고 찾기만 하며, '잡아 줘 · 빌려 줘'처럼 시키는 말이어야 [예약하기] · [빌리기]로 바뀝니다. 서버도 이 판정이 명령일 때만 자동 실행을 허용하고, 다른 페이지에서 옮겨 온 문장은 자동 실행하지 않습니다. 자동 실행에는 요청 ID 멱등 키와 사람별 하루 상한이 붙습니다.",
      },
      {
        src: "/projects/one-line-desk/03-rooms-candidates.jpg",
        caption: "후보 회의실과 맞은 조건. 카드마다 '아직 예약되지 않았어요'를 적습니다.",
        tech: "길이를 말하지 않으면 1시간으로 보고 그렇게 했다고 답에 적습니다. 인원 · 내 층 · 장비 조건으로 후보를 내고, 읽은 조건은 아래 칩으로 보여 줘서 고치면 다시 찾습니다. '다음 달 30일' · '3시 90분' · '3층 말고' 같은 말은 AI 를 붙이기 전에 규칙에서 먼저 고쳤습니다. 시각 없는 '7시'는 되묻습니다.",
      },
      {
        src: "/projects/one-line-desk/04-rooms-confirm.jpg",
        caption: "확인 시트. [예약하기]를 누르는 순간 빈 회의실인지 다시 확인합니다.",
        tech: "쓰기는 제안 토큰 → plan 저장 → 확인 시트 → 실행 순서입니다(core/plans.ts). 확인은 plan_id 만 받아 '제안 상태일 때만 실행 중으로' 바꾸므로, 같은 확인이 두 번 와도 한 번만 실행됩니다. 겹치는 예약은 코드가 아니라 PostgreSQL 제약(exclude using gist — 같은 회의실에 시간 구간이 겹치면 거절)이 막습니다. 다른 사람에게는 예약자 이름 대신 '예약됨'만 보입니다.",
      },
      {
        src: "/projects/one-line-desk/05-rooms-now.jpg",
        caption: "지금 빈 회의실 현황. 내 층을 먼저, 점검 중인 설비도 함께 보여 줍니다.",
        tech: "읽기만 하는 질문이라 확인 없이 바로 답합니다. 회의실 표 옆에 장비 · 대여 · 설비 점검 표(room_equipment · room_equipment_loans · room_facility_status)를 따로 두어, 총무가 점검 중으로 바꾸면 카드에 바로 나옵니다. 줄을 누르면 07~22시 30분 단위 하루 일정이 열리고, 남의 예약은 '예약됨'만, 취소는 내 예약만 됩니다.",
      },
      {
        src: "/projects/one-line-desk/06-notices.jpg",
        caption: "공지는 제목 · 게시일 · 원문 한 줄만. 본문은 원문에서 봅니다.",
        tech: "공지 본문은 우리 DB 에 두지 않습니다. 물을 때 게시판 사본에서 그 공지 본문만 읽고, 질문에 맞는 문장 하나를 고쳐 쓰지 않고 그대로 보여 줍니다(notices/quote.ts). AI 는 문장 번호만 고르고 문장은 서버가 원문 그대로 그립니다. 요약이나 새 문장은 만들지 않고, 계약 전이거나 모델이 실패하면 낱말 규칙으로 고릅니다. 바깥 AI(MCP)로 가는 공지 검색은 제목 · 게시일 · 원문 링크만 돌려줍니다.",
      },
      {
        src: "/projects/one-line-desk/07-pantry-preview.jpg",
        caption: "올리기 전 공개 미리보기. 우리 층 모두에게 보일 이름을 먼저 보여 주고, 내 이름은 안 보입니다.",
        tech: "미리보기 카드 자체가 확인입니다. [올리지 않기]는 서버를 부르지도 않고, [올리기]는 제안 토큰 ID 를 멱등 키로 한 번만 게시합니다. 게시 직전에 이름을 다시 검사해 올릴 수 없는 글자(사람 이름 · 연락처 같은 것)를 막고, 방금 같은 품목이 올라왔으면 +1 로 돌립니다. 1인 1표에 표 상한이 있고, 누가 표를 줬는지는 화면 어디에도 나오지 않습니다. 같은 상품 합치기는 AI 가 제안하고 총무가 확정합니다.",
      },
      {
        src: "/projects/one-line-desk/08-leave.jpg",
        caption: "휴가 신청 전 카드. 남은 연차 · 소멸일 · 규정 한 줄을 보여 주고, 신청은 그룹웨어로 보냅니다.",
        tech: "앱은 결재를 맡지 않습니다(휴가 A안, 11.06). 결재 원본을 맡으면 3년 보존 같은 의무가 7일 보관 원칙과 부딪혀서, 그룹웨어 옆에 붙는 쪽을 골랐습니다. 남은 연차는 근태 기록의 숫자가 있으면 그것을 쓰고, 없을 때만 서버가 입사일 기준 · 개근 가정으로 세며 그 사실을 카드에 적습니다. AI 는 날짜 · 종류 같은 해석만 하고 연차 숫자는 모델에 보내지 않습니다. 공휴일 · 회사 휴일과 5인 미만 사업장 · 주말 근무자 운영 값을 반영합니다.",
      },
      {
        src: "/projects/one-line-desk/09-ai-eval.jpg",
        caption: "운영자 화면의 정답률 표. 정답을 단 가상 문장으로 낱말 규칙과 AI 를 따로 셉니다.",
        tech: "직원이 쓴 글은 쓰지 않고 정답을 단 가상 문장만 씁니다. 이 화면은 AI 공급자를 붙이지 않은 로컬이라 낱말 규칙 칸만 찼습니다(44/56, 79%). 모델을 붙이면 [AI 로 다시 재기]로 AI 칸과 'AI 만 맞힘' 칸이 채워져, 모델을 부를 값어치가 있는 문장이 보입니다. 첫 측정에서 '빔프로젝터' 문장이 매번 실패한 원인(모델이 목록 값을 줄여 보내고, 목록 제약이 API 에서 강제되지 않음)도 이 표로 찾았습니다. 새 공지 알림 대상도 같은 방식으로 재고, 자동 보내기는 놓친 사람이 0 이 되기 전까지 켜지 않습니다.",
      },
    ],

    // 트러블슈팅 — Notion 회고 · 작업 기록에서 옮겼습니다. 문제 · 원인 · 해결 · 결과 순서입니다.
    troubles: [
      {
        title: "묻기만 했는데 예약이 실행될 수 있음",
        problem: "회의실 채팅이 문장 끝 모양만 보고 실행 여부를 정해서, '찾아 줘' 같은 조회나 '잡지 마', '3시 말고' 같은 말도 실행 대상이 될 수 있었습니다.",
        cause: "명령 판별 함수가 끝말만 봤고 쓰기 동사 · 부정 · 고쳐 말하기를 따지지 않았습니다. 모델 해석이 규칙과 달라도 실행될 수 있었습니다.",
        fix: "쓰기 동사가 있고 조회 부탁 · 부정 · 고쳐 말하기가 없을 때만 명령으로 봅니다. 서버는 화면의 미리 보기와 같은 결과일 때만 실행하고, 모델은 실행을 낮출 수만 있습니다. 값이 둘이면 카드만 보여 줍니다.",
        result: "금지 40 · 허용 20 문장 표를 화면과 서버 시험이 함께 쓰고, 전체 시험(공유 149 · 서버 654 · 웹 19)을 통과했습니다.",
        visual: {
          type: "flow",
          before: [
            "문장 끝 모양만 봄",
            "'잡지 마' 도 명령",
            "잘못된 예약 위험"
          ],
          after: [
            "쓰기 동사 · 부정 · 고쳐 말하기 확인",
            "서버가 미리 보기와 대조",
            "금지 40 · 허용 20 통과"
          ]
        },
      },
      {
        title: "AI 가 '빔프로젝터' 를 줄여 보냄",
        problem: "정답률 표로 처음 쟀을 때 '빔프로젝터' 장비를 묻는 문장이 매번 실패했습니다.",
        cause: "모델이 목록 값 '빔프로젝터' 를 '프로젝터' 로 줄여 보냈습니다. 구조화 출력의 목록 제약이 API 에서 강제되지 않아 그대로 들어왔습니다.",
        fix: "모델 출력을 그대로 믿지 않고 서버의 낱말 사전으로 다시 맞추고, 실패 종류를 기록하게 했습니다.",
        result: "같은 52문장으로 다시 재니 낱말 규칙 39/52, AI 51/52 였습니다.",
        visual: {
          type: "flow",
          before: [
            "모델이 '프로젝터' 로 줄임",
            "목록 제약이 강제되지 않음",
            "장비 문장 매번 실패"
          ],
          after: [
            "서버 낱말 사전으로 다시 맞춤",
            "실패 종류 기록",
            "AI 51/52 정답"
          ]
        },
      },
      {
        title: "CI 가 돌기 전에 머지되어 main 실패",
        problem: "PR 을 머지한 뒤 main 의 CI 가 시험 하나에서 실패했습니다. 같은 날 Vercel 배포도 실패했습니다.",
        cause: "gh pr checks --watch 는 검사가 아직 등록되지 않았으면 바로 끝납니다. 이를 통과로 보고 CI 전에 머지했습니다. Vercel 은 커밋 짧은 번호로 올려서 실패했습니다.",
        fix: "다음 PR 로 시험을 고치고, 순서를 '검사 3개 등록 확인 → 통과 → 머지 → main CI 통과 → 배포' 로 정했습니다. 서버와 웹 모두 40자 전체 커밋 번호로 배포합니다.",
        result: "이후 PR 과 main 이 세 잡 모두 통과했고, 웹과 서버가 같은 커밋으로 배포됩니다.",
        visual: {
          type: "flow",
          before: [
            "검사 등록 전 --watch 종료",
            "통과로 보고 머지",
            "main CI 실패"
          ],
          after: [
            "검사 3개 등록 확인",
            "통과 뒤 머지",
            "main CI 통과 뒤 배포"
          ]
        },
      },
      {
        title: "시험끼리 마이그레이션 잠금을 기다림",
        problem: "서버 시험을 실제 PostgreSQL 에서 돌리자 시험이 10초 제한에 걸려 실패했습니다.",
        cause: "시험 파일마다 스키마를 따로 만들었는데, 마이그레이션 잠금 키가 스키마와 상관없이 하나라서 서로 다른 스키마끼리 줄을 섰습니다.",
        fix: "잠금 키에 스키마 이름을 더하고, CI 에 실제 PostgreSQL 로 도는 잡을 추가했습니다.",
        result: "실제 PostgreSQL 에서 서버 시험 654개가 통과했고, CI 세 잡(check · postgres · image)이 모두 성공했습니다.",
        visual: {
          type: "flow",
          before: [
            "잠금 키가 하나",
            "다른 스키마끼리 줄 섬",
            "10초 제한 실패"
          ],
          after: [
            "잠금 키 + 스키마 이름",
            "스키마마다 따로 잠금",
            "서버 시험 654개 통과"
          ]
        },
      },
    ],
    learned: [
      {
        kind: "learned",
        title: "AI 에게는 고르게만 하면, 틀려도 원문이 틀리지는 않는다",
        desc: "담당 카드는 분장표 행 ID, 공지는 문장 번호만 AI 가 고르고 화면은 원문을 그립니다. 모델이 틀리면 엉뚱한 행이 나올 뿐 없는 내용을 지어내지 못해서, 사람이 바로 알아보고 '틀렸어요'로 남길 수 있습니다.",
      },
      {
        kind: "learned",
        title: "AI 를 붙이기 전에 규칙의 오답부터 고친다",
        desc: "담당 카드가 틀린 팀을 고르던 것(골든 32문장 중 5, 분장표 밖 15문장 중 9)을 규칙 보강만으로 0 · 2 로 줄였습니다. 구조화 출력도 그대로 믿지 않고 서버 낱말 사전으로 다시 맞춰야 했습니다. 모델이 '빔프로젝터'를 '프로젝터'로 줄여 보냈기 때문입니다.",
      },
      {
        kind: "learned",
        title: "등급은 모듈이 정하지 않고 내용이 정한다",
        desc: "탕비실 모듈이 AI 호출 등급을 0 으로 박아 두는 바람에 계약 전 잠금이 뚫린 것을 검토에서 잡았습니다. 지금은 사람이 쓴 글이 섞이면 등급 1 로 계산해, 무보관 계약 전에는 모델로 가지 않습니다.",
      },
      {
        kind: "learned",
        title: "연결이 하나뿐인 시험 DB 는 경쟁 조건을 보지 못한다",
        desc: "PGlite 는 빠르지만 연결이 하나라 동시 실행 경쟁을 재현하지 못합니다. 같은 서버 시험을 실제 PostgreSQL 에서도 돌리는 CI 잡을 따로 두었고, 지금 1,150개가 두 DB 에서 모두 통과합니다.",
      },
      {
        kind: "learned",
        title: "MCP 는 기능보다 연결이 벽이었다",
        desc: "도구는 매끄러웠는데, 동적 등록이 없으면 Claude Code 가 아예 붙지 못했습니다. 우리 서버를 인가 서버로 두고 CLI 용 공개 클라이언트에 루프백 포트를 허용해 풀었습니다.",
      },
      {
        kind: "learned",
        title: "대체하지 말고 옆에 붙는다",
        desc: "휴가 결재까지 맡으면 3년 보존 · 고칠 수 없는 원본 같은 의무가 7일 보관 원칙과 부딪혔습니다. 그룹웨어 역할 회의(법 · 보안 · 아키텍처 · 시장)가 모두 같은 결론이었고, 앱은 신청 전 카드와 승인 뒤 반영만 맡았습니다.",
      },
      {
        kind: "open",
        title: "실제 그룹웨어 · IdP 연결과 현장 측정이 아직입니다",
        desc: "네 기능은 가상 자료와 모의 어댑터로 돌아갑니다. PRD 는 초안이고 사용자 확인 3개 · 보안팀 질문 2개가 남아 있으며, 10일 차 측정도 하지 않았습니다.",
      },
      {
        kind: "open",
        title: "정답률 표의 AI 칸이 비어 있습니다",
        desc: "11.06 이후 모델로 다시 재지 않아, 지금 보이는 숫자는 낱말 규칙의 값입니다. 공지 자동 보내기를 운영에서 켤 기준(놓친 사람 0, 40/40)도 아직 채우지 못했습니다.",
      },
      {
        kind: "open",
        title: "두 연결이 겹치는 경쟁 시험이 없습니다",
        desc: "실제 PostgreSQL 에서 시험을 돌리긴 하지만, 두 연결로 같은 회의실을 동시에 잡는 식의 경쟁 시험은 아직 '다음 일'로 남아 있습니다. 지금은 DB 제약이 겹침을 막는다는 데 기대고 있습니다.",
      },
      {
        kind: "open",
        title: "무보관 계약과 법률 확인이 남았습니다",
        desc: "AI 공급자의 무보관(ZDR) 계약을 확인하기 전에는 등급 0 만 모델로 가게 막아 두었습니다. 접속기록 · 쉬는 시간 끊기 같은 법정 조치는 문서상 '법률 자문 아님'이라, 실제 도입 전 확인이 필요합니다.",
      },
    ],
  },
  {
    slug: "bandit",
    name: "BANDIT",
    group: "team",
    period: "2026.10.08 ~ 10.15",
    updated: "2026.10.16",
    thumbnail: "/projects/bandit/thumb.jpg",
    cardSummary: "팀 결정 사항이 바뀌면 관련 담당자에게만 알리는 AI 에이전트용 팀 위키",
    cardHighlight: "6인 팀 통합환경 담당 · 자동 배포 28번 모두 성공",
    hero: "/projects/bandit/01-main.jpg",
    tags: ["TypeScript", "Node.js", "MCP", "Supabase", "PostgreSQL", "Cloud Run", "Vite", "PWA"],
    type: "팀 프로젝트 (통합환경 담당)",
    role: "저장소 구조 · 공통 타입 · DB 구조와 규칙 · MCP 서버 · 웹 앱(PWA) 뼈대 · 배포 파이프라인",
    summary:
      "팀이 정한 결정 사항이 바뀌면, 그 결정과 연결된 사람에게만 ‘확인할 변경’을 보내는 도구입니다. 팀원은 Claude Code 안에서 MCP 도구로 결정 사항을 다루고 웹 앱(PWA)에서 답하며, 저는 그 바탕인 공통 타입 · DB · MCP 서버 · 웹 앱(PWA) 뼈대 · 배포를 맡았습니다.",
    links: [{ label: "서비스 바로가기", href: "https://bandit-lovat.vercel.app/" }],

    star: [
      {
        key: "S",
        label: "Situation",
        title: "규칙은 바뀌는데, 바뀌었다는 사실은 전달되지 않았습니다",
        body: "결정 사항은 코드와 AI 대화 속에서 바뀌지만, 바뀌었다는 사실은 그 대화에만 남아 디자이너와 프론트엔드 개발자는 모릅니다. 각자의 AI 에이전트가 같은 결정을 동시에 덮어쓸 위험도 있었습니다.",
      },
      {
        key: "T",
        label: "Task",
        title: "팀원의 기능이 붙고 실제로 도는 바탕을, 8일 안에",
        body: "‘MVP 사일로’ 팀에서 통합환경을 맡았습니다. 공통 타입 · DB · MCP 서버 · 배포를 만들고, 어느 경로로 들어와도 같은 규칙이 지켜지게 하는 것이 조건이었습니다.",
      },
      {
        key: "A",
        label: "Action",
        title: "규칙은 DB 에 두고, 실제 환경에서 다시 확인했습니다",
        body: "쓰기는 SQL 함수로만 하고 버전 비교 · 트리거 · RLS 로 규칙을 강제했습니다. main 머지를 자동 배포에 잇고, 꼭 보여야 하는 카드는 Claude Code 훅이 그리게 했습니다.",
      },
      {
        key: "R",
        label: "Result",
        title: "8일 동안 남은 것",
        body: "회고 작성일(2026.10.16) 기준, 제가 올린 PR · 결정 기록 · 배포 기록에서 센 값입니다. 지금은 MCP 서버가 내려가 있어 작동 화면은 웹 앱 첫 화면 한 장만 실었습니다(10.19 촬영).",
      },
    ],

    dataflow: {
      desc: "팀 결정을 AI 도구가 MCP로 읽고, 결정이 바뀌면 담당자에게만 확인할 변경이 생기는 흐름입니다. 번호는 제가 맡은 자리입니다.",
      lanes: [
        { key: "client", label: "팀원 PC · 브라우저" },
        { key: "server", label: "서버 · 배포" },
        { key: "store", label: "DB (Supabase)" },
      ],
      nodes: {
        cc: { label: "Claude Code", lane: "client", note: "AI가 MCP 도구로 결정을 읽고 저장" },
        hooks: { label: "Claude Code hooks", lane: "client", note: "세션 이벤트를 서버로 보내고 알림 글을 띄움" },
        pwa: { label: "PWA 웹 앱", lane: "client", note: "공용 키로 DB에 바로 연결, 창이 열려 있으면 OS 알림" },
        cli: { label: "CLI", lane: "client", note: "team-wiki 결정을 미리 보고 DB에 넣음" },
        mcp: { label: "MCP 서버", lane: "server", note: "Cloud Run, /mcp · /hooks, 팀 토큰 확인" },
        core: { label: "공통 DB 계층", lane: "server", note: "모든 앱이 SQL 대신 부르는 함수 (@sil/core)" },
        deploy: { label: "Cloud Build", lane: "server", note: "main 머지마다 빌드해 Cloud Run에 올림" },
        fn: { label: "쓰기 함수 8개", lane: "store", kind: "process", note: "공용 키로 쓸 수 있는 유일한 통로, 트리거로 지우기 · 고치기 막음" },
        checks: { label: "확인할 변경", lane: "store", note: "결정이 바뀐 트랜잭션 안에서 담당자에게만 생성" },
      },
      paths: [
        { name: "결정 읽기", steps: ["cc", "결정 조회(MCP 도구)", "mcp", "읽기 함수", "core"] },
        { name: "결정 바꾸기", steps: ["cc", "변경 저장(허락 뒤)", "mcp", "save_standard", "fn", "같은 트랜잭션", "checks"] },
        { name: "터미널 알림", steps: ["checks", "내 확인할 변경", "mcp", "알림 글", "hooks"] },
        { name: "웹 알림", steps: ["checks", "Realtime 구독", "pwa", "답 저장(SQL 함수)", "fn"] },
        { name: "위키 가져오기", steps: ["cli", "--apply 일 때만", "core", "save_standard", "fn"] },
        { name: "배포", steps: ["deploy", "main 머지마다", "mcp"] },
      ],
      fixes: [
        { node: "core", text: "공통 타입과 DB 읽기 · 쓰기 함수를 만들어 팀원 앱이 모두 같은 함수를 쓰게 함" },
        { node: "fn", text: "쓰기 규칙을 SQL 함수와 트리거로 강제해 앱이 규칙을 건너뛸 수 없게 함" },
        { node: "mcp", text: "MCP 서버와 위키 도구(조회 · 검색 · 저장 · 되돌리기)" },
        { node: "pwa", text: "오프라인으로 처음 열면 빈 화면이 뜨던 서비스 워커를, 빌드 파일 목록을 설치 때 모두 저장하도록 고침" },
        { node: "deploy", text: "Cloud Run 배포 실패를 한글 파일 이름 깨짐(5개 → 0개)까지 추적해 풀고 자동 배포 구성, 28번 모두 성공" },
      ],
      note: "알림 대상은 DB 함수가 정합니다(바꾼 본인과 담당자 없는 결정은 제외). 웹 알림은 창이 열려 있을 때만 오고 웹 푸시는 아직 없습니다. 배포 트리거는 저장소가 아니라 GCP에 설정했습니다.",
    },
    metrics: [
      { value: "12", unit: "개", label: "올린 PR", note: "팀 전체 60개 중 · 10개 머지 · 2개 닫음" },
      { value: "211", unit: "개", label: "SQL 검사", note: "전부 ROLLBACK 으로 끝나 팀 DB 에도 흔적 없음" },
      { value: "61", unit: "건", label: "결정 기록", note: "D1 ~ D61 · 왜 그렇게 했는지를 코드 밖에" },
      { value: "41", unit: "개", label: "공통 타입", note: "세 기능이 함께 쓰는 타입 · 타입명세서" },
      { value: "28", unit: "번", label: "자동 배포", note: "Cloud Build 트리거 · 10.15 까지 모두 성공" },
      { value: "8", unit: "개", label: "MCP 도구", note: "Streamable HTTP 서버 하나를 팀이 함께 사용" },
    ],

    perf: [
      {
        title: "고치기 전과 후 (실제 환경에서 다시 확인한 것)",
        rows: [
          { what: "확인할 변경 카드", sub: "대화형 세션 자동 시험 · 대기 1건 / 2건", was: "요약되거나 오해", now: "카드만 3/3 · 2/2", delta: "hooks 로 그림" },
          { what: "확인할 변경 생성 규칙", sub: "팀원 PR 의 테스트 12장면을 SQL 로", was: "10번 장면 실패", now: "12장면 일치", delta: "두 구현 동기화" },
          { what: "Container import failed", sub: "이미지 안에서 깨진 한글 파일 이름", was: "5개", now: "0개 (업로드 157개)", delta: "배포 성공" },
          { what: "배포 방식", sub: "리비전 1 ~ 7 은 PC 에서 손으로", was: "손 배포", now: "main 머지 → 자동", delta: "28번 모두 성공" },
          { what: "비밀 값 위치", sub: "팀 토큰 · DB 주소 · 키", was: "환경 변수 평문", now: "Secret Manager", delta: "실행 계정만 읽기" },
          { what: "등록 확인 출력", sub: "Authorization 헤더", was: "토큰 그대로", now: "(가림, N자)", delta: "테스트 6개" },
        ],
        extra:
          "임시 PostgreSQL 에서는 전부 통과하던 것들입니다. Supabase 가 권한 오류에 붙이는 HINT, 빌드 중 깨지는 한글 파일 이름, 모델이 요약해 버리는 카드처럼 로컬에서 보이지 않던 차이는 실제 환경에서만 드러났습니다.",
      },
    ],

    // 작업 기록 — 저장소 커밋 로그가 아니라 회고록 2장 ‘진행 흐름’ 표와 3장 PR 목록을 날짜순으로 묶었습니다.
    timeline: [
      {
        phase: "설계와 첫 구현",
        range: "2026.10.08 ~ 10.09",
        summary: "직접 만들지부터 판정하고, DB 를 고르고, 확인 대기 흐름이 실제 CLI 에서 되는지 먼저 봤습니다.",
        entries: [
          {
            date: "10.08",
            title: "만들지, 기존 도구를 쓸지 · DB 선택",
            desc: "문제를 정의하고 직접 만들지 판정했습니다. DB 후보를 실시간 변경 받기 · 무료 범위 · 권한 관리로 비교해 PostgreSQL(Supabase)을 골랐고, 동시 수정은 버전 비교로 정했습니다. pnpm 모노레포 틀, 위키 표 마이그레이션, HTTP MCP 서버 첫 구현.",
          },
          {
            date: "10.09",
            title: "착수 안내 v2 로 범위 조정",
            desc: "표 7개와 저장 함수, sil import, 팀 위키 용어에 맞춘 이름. Figma 목업의 확인 대기 흐름을 실제 Claude Code CLI 에서 재현하는 동작 시험.",
          },
        ],
      },
      {
        phase: "팀 저장소에 합치기",
        range: "2026.10.10 ~ 10.12",
        summary: "실행 방식과 앱 형태를 정하고, 혼자 키운 코드를 팀 저장소에 올렸습니다.",
        entries: [
          {
            date: "10.10",
            title: ".ts 를 바로 실행 · Electron 에서 웹 + PWA 로",
            desc: "팀 PR 의 tsconfig 를 검토하고 Node 가 .ts 를 바로 실행하는 방식으로 정했습니다(D48). apps/ · packages/ 구조로 이동(D49), Electron 을 걷어내고 웹 + PWA 로 전환(D50). 실행 화면 · 기능 테스트 · CLI 동작 시험 문서를 PR #4 로 먼저 보여 줬습니다.",
          },
          {
            date: "10.11",
            title: "공통 타입과 타입명세서",
            desc: "세 기능이 함께 쓰는 타입 41개와, 착수 안내 · 코드 · DB 이름을 잇는 연결표(PR #6). MCP 입력 검사 문구를 한국어로, Supabase 연결 준비. PR #4 머지.",
          },
          {
            date: "10.12",
            title: "서버 코드 전체 업로드",
            desc: "157개 파일을 패키지별 7커밋으로(PR #12): 마이그레이션 8개와 SQL 검사 205개, MCP 서버, sil 명령 7개, PWA 뼈대, 결정 기록. 팀 피드백 반영(D51), PWA 오프라인 버그 수정(D52), 실제 Supabase 연결, 팀원 PR 과 DB 함수 규칙 일치(D53), ‘기준’을 ‘결정 사항’으로(D57).",
          },
        ],
      },
      {
        phase: "배포와 운영",
        range: "2026.10.13 ~ 10.15",
        summary: "Cloud Run 에 올리고, main 머지를 배포에 잇고, 비밀 값과 시연 DB 를 정리했습니다.",
        entries: [
          {
            date: "10.13",
            title: "Cloud Run 배포 실패를 풀다",
            desc: "빌드는 성공하는데 2초 만에 Container import failed. 이미지 레이어에서 깨진 한글 파일 이름을 찾아 .gcloudignore 로 뺐습니다. 팀 서버를 Claude Code 사용자 범위로 등록, 일반 세션에서도 질문 창으로 묻기(D60). PR #13 · #20 · #21.",
          },
          {
            date: "10.14",
            title: "main 머지 = 자동 배포",
            desc: "저장소 웹훅 + Cloud Build 트리거. 서버에만 있던 수정 복구, AI 가 찾은 변경의 저장 규칙(D61), 토큰 가리기, 배포 때 위키 자동 import. 실행 문서 따라 하기 시험과 hooks · 서버 안내문 비교 시험. PR #28 · #29 · #30 · #32 · #33 · #34.",
          },
          {
            date: "10.15",
            title: "비밀 값 이전 · 부하 점검 · 시연 DB",
            desc: "팀 토큰과 DB 키를 Secret Manager 로 옮겼습니다. 48시간 요청 기록에서 5분씩 열려 있는 연결을 찾았고, 발표용 시연 DB 를 팀 DB 와 분리해 원격 초기화 스크립트를 붙였습니다.",
          },
        ],
      },
    ],

    gallery: [
      {
        src: "/projects/bandit/01-main.jpg",
        caption:
          "웹 앱 첫 화면. 내 이름을 고르기 전에는 누구에게 온 변경인지 알 수 없다고 안내하고, 오른쪽 위에 DB 연결 상태와 결정 사항 수를 띄웁니다.",
        tech: "웹 앱은 Vite 7 + React 로 만든 PWA 입니다. 처음 설계는 Electron 데스크톱 앱이었는데 이슈 조건이 ‘웹 앱 배포 + PWA’로 바뀌어 걷어냈습니다(D50). DB 연결 코드가 Node 전용이었기 때문에 core 의 DB 연결을 @sil/core/data 로 떼어 내 브라우저와 Node 가 함께 쓰게 했습니다. Node 는 .env 로, 웹 앱은 Vite 가 넣어 주는 공용 키 두 값으로 연결하고, 값이 없으면 예시 데이터로 열립니다. 공용 키로는 읽기와 SQL 함수 실행만 됩니다. 쓰기 규칙은 DB 함수 · 트리거 · RLS 가 지키므로, 웹 앱이 MCP 서버를 거치지 않고 DB 에 바로 붙어도 같은 규칙이 적용됩니다. 그래서 MCP 서버가 내려가 있어도 이 첫 화면은 열립니다. 한 번 방문한 뒤 오프라인으로 열면 빈 화면이 나오던 문제가 있었습니다. 서비스 워커가 HTML 만 저장하고 JS · CSS 번들은 저장하지 않았고, vite preview 가 붙이는 Vary: Origin 때문에 모듈 스크립트 요청이 저장된 응답과 맞지 않았습니다. 빌드 뒤 단계에서 dist/sw.js 의 저장 목록과 내용 해시로 만든 캐시 이름을 채우고, 캐시 조회에 ignoreVary 를 켰습니다(D52). 사람이 캐시 버전 숫자를 올리는 규칙이 필요 없어졌습니다. 하위 경로 배포에 대비해 base: './' 와 manifest 상대 경로를 쓰고, 화면 이동은 경로 대신 상태와 ?check= 쿼리로 처리합니다. 알림을 누르면 열린 창에 메시지를 보내고, 창이 없으면 ?check= 로 새 창을 엽니다.",
      },
    ],

    // 트러블슈팅 — Notion 회고 · 작업 기록에서 옮겼습니다. 문제 · 원인 · 해결 · 결과 순서입니다.
    troubles: [
      {
        title: "오프라인에서 빈 화면이 뜨는 PWA",
        problem: "웹 앱을 한 번 방문한 뒤 오프라인으로 열면 빈 화면이 나왔습니다.",
        cause: "서비스 워커가 HTML 만 저장하고 JS · CSS 번들은 저장하지 않았습니다. 여기에 vite preview 가 붙이는 Vary: Origin 때문에 모듈 스크립트 요청이 저장된 응답과 맞지 않았습니다.",
        fix: "빌드 뒤 단계에서 sw.js 의 저장 목록과 내용 해시로 만든 캐시 이름을 채우고, 캐시 조회에 ignoreVary 를 켰습니다.",
        result: "오프라인에서도 화면이 열리고, 사람이 캐시 버전 숫자를 올리는 규칙이 필요 없어졌습니다.",
        visual: {
          type: "flow",
          before: [
            "HTML 만 캐시",
            "Vary: Origin 불일치",
            "오프라인 빈 화면"
          ],
          after: [
            "번들 목록 · 해시 캐시 이름",
            "ignoreVary",
            "오프라인에서도 열림"
          ]
        },
      },
      {
        title: "모델이 요약해 버리는 확인 카드",
        problem: "서버 안내문에 '그대로 보여 달라' 고 적어도 Claude 가 카드를 요약했습니다. 두 번째 카드부터는 한두 문장으로 줄었고, 이슈 번호나 이전 값이 틀리게 나온 적도 있습니다.",
        cause: "모델에게 주는 지시는 따를 가능성을 높일 뿐 보장하지 않습니다. 카드가 모델을 거쳐 출력되는 한 원문이 유지되지 않았습니다.",
        fix: "카드를 PostToolUse 훅의 systemMessage 로 보내 모델을 거치지 않고 Claude Code 가 직접 그리게 했습니다. 훅이 있을 때와 없을 때를 실제 세션으로 비교했습니다.",
        result: "훅이 있으면 3번 중 3번 카드가 글자 그대로 나왔고, 없으면 한 문단으로 줄거나 이슈 제목을 할 일로 오해했습니다.",
        visual: {
          type: "flow",
          before: [
            "카드를 모델이 출력",
            "지시는 보장이 아님",
            "요약 · 틀린 번호"
          ],
          after: [
            "PostToolUse 훅으로 전달",
            "모델을 거치지 않음",
            "3번 중 3번 원문 그대로"
          ]
        },
      },
      {
        title: "한글 파일 이름이 막은 Cloud Run 배포",
        problem: "빌드는 성공했는데 새 리비전이 2초 만에 'Container import failed' 로 켜지지 않았습니다.",
        cause: "이미지 레이어를 열어 보니 docs/ 아래 한글 이름 파일 5개의 이름이 UTF-8 이 아닌 바이트로 깨져 있었습니다. 올린 소스 zip 은 정상이라, 빌드 쪽에서 압축을 풀 때 깨진 것으로 판단했습니다.",
        fix: "서버는 위키를 DB 에서 읽으므로 docs/ · team-wiki/ · samples/ 를 .gcloudignore 로 업로드에서 뺐습니다. 루트에 start 스크립트가 없어 실행 명령도 빌드 환경 변수로 정했습니다.",
        result: "업로드 목록에서 ASCII 가 아닌 이름이 0개가 됐고 배포에 성공했습니다. 이후 자동 배포 28번이 모두 성공했습니다.",
        visual: {
          type: "flow",
          before: [
            "한글 이름 파일 업로드",
            "빌드에서 이름 깨짐",
            "리비전 2초 만에 실패"
          ],
          after: [
            "docs 등 업로드 제외",
            "ASCII 아닌 이름 0개",
            "자동 배포 28번 성공"
          ]
        },
      },
      {
        title: "Supabase 에서만 멈춘 SQL 검사",
        problem: "임시 PostgreSQL 에서 통과하던 SQL 검사 두 파일이 실제 Supabase 에서는 중간에 멈췄습니다.",
        cause: "Supabase 는 권한 오류(42501)에 안내 문장 HINT 를 붙입니다. 검사 도우미가 HINT 가 있으면 HINT 를 돌려주게 되어 있어, 오류 코드 대신 안내 문장을 비교하고 있었습니다.",
        fix: "직접 낸 오류(P0001)일 때만 HINT 를 쓰게 고쳤습니다. 한 요청을 한 트랜잭션으로 실행하는 점을 이용해 팀 DB 에서도 흔적 없이 검사했습니다.",
        result: "전부 통과했습니다. SQL 검사는 최종 211개이고 모두 ROLLBACK 으로 끝납니다.",
        visual: {
          type: "flow",
          before: [
            "42501 에 HINT 가 붙음",
            "도우미가 HINT 를 돌려줌",
            "코드 대신 문장 비교"
          ],
          after: [
            "P0001 일 때만 HINT",
            "오류 코드로 비교",
            "SQL 검사 211개 통과"
          ]
        },
      },
      {
        title: "두 곳에서 따로 만든 같은 규칙",
        problem: "'확인할 변경' 을 만드는 로직이 제 DB 함수와 팀원의 TypeScript 함수 두 곳에 생겼고, 마지막으로 본 버전을 고르는 규칙이 서로 조금씩 달랐습니다.",
        cause: "담당 범위가 겹쳤는데 이슈 단계에서 조율하지 않아, 같은 규칙을 두 언어로 따로 구현했습니다.",
        fix: "위키의 결정 사항을 기준으로 DB 함수를 팀원 구현과 같은 순서로 다시 썼고, 그쪽 테스트 12장면을 SQL 검사로 옮겼습니다.",
        result: "바꾸기 전 함수는 10번 장면에서 실패했고, 바꾼 뒤에는 12장면이 모두 일치합니다.",
        visual: {
          type: "flow",
          before: [
            "DB 함수 · TS 함수 따로",
            "버전 고르는 순서가 다름",
            "10번 장면 실패"
          ],
          after: [
            "위키 결정으로 한 순서",
            "TS 테스트를 SQL 검사로",
            "12장면 모두 일치"
          ]
        },
      },
      {
        title: "등록 확인 명령이 팀 토큰을 출력함",
        problem: "문서가 MCP 등록 확인 방법으로 안내하던 명령이 팀 토큰을 그대로 출력했습니다. 화면 공유나 AI 대화 기록으로 토큰이 샐 수 있었습니다.",
        cause: "그 명령은 Authorization 헤더 값을 가리지 않고, AI 에이전트도 같은 명령을 부를 수 있었습니다.",
        fix: "같은 명령을 대신 실행하면서 인증 헤더와 주소 속 비밀 값을 '(가림, N자)' 로 바꿔 보여 주는 pnpm mcp:status 를 만들고, 에이전트 지침에도 이 명령을 쓰도록 적었습니다.",
        result: "실제 등록 정보로 실행했을 때 출력에 토큰 글자가 0개였고, 테스트 6개를 더했습니다.",
        visual: {
          type: "flow",
          before: [
            "claude mcp get",
            "토큰을 그대로 출력",
            "공유 · 기록으로 샐 위험"
          ],
          after: [
            "pnpm mcp:status",
            "비밀 값을 '(가림, N자)'",
            "출력 속 토큰 글자 0개"
          ]
        },
      },
    ],
    learned: [
      {
        kind: "learned",
        title: "규칙은 데이터 가까이에 둘수록 경로마다 따로 지킬 필요가 없다",
        desc: "MCP 서버 · CLI · 웹 앱이 같은 DB 에 붙는 구조에서 규칙을 서버 코드에만 두면 다른 경로로 우회됩니다. DB 함수와 트리거로 강제하자 어느 경로로 들어와도 같은 규칙이 적용됐고, SQL 검사 211개가 그 근거가 됐습니다.",
      },
      {
        kind: "learned",
        title: "타입 검사와 테스트 통과는 실행을 보장하지 않는다",
        desc: ".js 확장자 import 는 tsc 와 vitest 를 모두 통과하고, Node 가 소스를 직접 실행할 때만 깨졌습니다. 실행 경로를 직접 돌려 보는 검사가 따로 필요했습니다.",
      },
      {
        kind: "learned",
        title: "모델에게 주는 지시는 확률을 높일 뿐이다",
        desc: "‘그대로 보여 달라’고 해도 Claude 는 카드를 요약했고, 이슈 번호나 이전 값이 틀리게 나온 적도 있었습니다. 사용자에게 반드시 보여야 하는 내용은 클라이언트가 직접 그리는 훅 경로로 보내야 했습니다.",
      },
      {
        kind: "learned",
        title: "배포 파이프라인이 생기는 순간 저장소가 유일한 원본이 된다",
        desc: "손으로 배포한 리비전에만 있던 수정이 자동 배포 다음 날 사라졌습니다. 손으로 한 배포는 언젠가 덮어써집니다. 같은 이유로 비밀 값은 처음부터 비밀 저장소에 두었어야 했습니다.",
      },
      {
        kind: "learned",
        title: "같은 규칙을 두 곳에서 구현하게 되면, 그건 담당 범위가 겹친다는 신호다",
        desc: "확인할 변경을 만드는 로직이 제 DB 함수와 팀원의 TypeScript 함수로 두 번 생겼습니다. 공통 시나리오를 양쪽 테스트로 옮겨 맞췄지만, 이슈 단계에서 먼저 조율했다면 규칙을 맞추는 일을 두 번 하지 않았을 것입니다.",
      },
      {
        kind: "learned",
        title: "코드를 오래 혼자 들고 있을수록 합치는 비용이 커진다",
        desc: "10.08 부터 만든 코드가 10.12 에야 PR 하나(157개 파일)로 올라갔고, 그사이 팀 저장소에는 다른 tsconfig · Prettier 폭 · 폴더 구조가 쌓였습니다. 작은 PR 로 자주 올렸어야 했습니다.",
      },
      {
        kind: "open",
        title: "CI 가 없습니다",
        desc: "커밋별 검사를 제 스크립트로만 돌려서, main 에 들어가는 코드를 자동으로 막는 장치가 없었습니다. main 에 pnpm check 를 필수 검사로 거는 CI 가 남아 있습니다.",
      },
      {
        kind: "open",
        title: "5분씩 열려 있던 MCP 연결은 아직 손대지 못했습니다",
        desc: "48시간 동안의 POST /mcp 2,251건 중 744건이 301초 동안 열려 있었습니다. Claude Code 가 연결할 때 보내는 subscriptions/listen 만 닫히지 않고 Cloud Run 제한 시간까지 붙잡혀, 인스턴스가 계속 깨어 있었습니다. listen 에 바로 응답하거나 닫기, hooks 세션 상태를 DB 로 옮기기 같은 개선안은 정리만 해 두었습니다.",
      },
      {
        kind: "open",
        title: "비밀 값 정리가 끝나지 않았습니다",
        desc: "Secret Manager 로 옮긴 뒤에도 팀 토큰 교체와 옛 리비전 정리, 빌드와 서버 전용 서비스 계정으로 권한을 줄이는 일이 남았습니다.",
      },
      {
        kind: "open",
        title: "main 에 없는 마이그레이션이 팀 DB 에 남아 있습니다",
        desc: "로컬에서만 쓰던 마이그레이션 하나가 팀 DB 에 먼저 올라가, main 기준으로 db push 를 하면 멈췄습니다. 그때는 별도 작업 폴더로 우회했고 정리는 남았습니다. 공유 DB 에 올리는 마이그레이션은 반드시 main 에도 있어야 한다는 규칙이 처음부터 필요했습니다.",
      },
    ],
  },
  {
    slug: "outsourcing",
    name: "외주 프로젝트",
    group: "outsourcing",
    period: "2025.09 ~ 2026.03",
    thumbnail: "/projects/outsourcing.svg",
    cardSummary: "카페24 기반 쇼핑몰 두 곳의 UI/UX 구현과 퍼블리싱",
    cardHighlight: "RANGE · Deeto 모두 기한 안에 오픈",
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
        link: { label: "range8.kr", href: "https://range8.kr/" },
      },
      {
        name: "Deeto 쇼핑몰 구축",
        period: "2025.09",
        desc: "낙관적인 일정 산정으로 프로젝트가 무산될 위기를 겪었지만, 상황과 리스크를 투명하게 공유해 추가 인력 투입을 이끌어내고 마감 기한 내 출시했습니다. 이 경험으로 실수를 인정하고 현재 상황을 그대로 빠르게 공유하는 태도를 배웠습니다.",
        tags: ["카페24", "퍼블리싱"],
        link: { label: "deeto.co.kr", href: "http://deeto.co.kr/" },
      },
    ],
  },
];
