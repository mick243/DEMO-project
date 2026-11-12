// 이력서 PDF(강정민_이력서_v9.pdf)의 내용을 그대로 옮긴 데이터입니다.
// PDF 를 새로 받으면 public/resume.pdf 와 이 파일을 함께 갱신해 주세요.
// 공개 페이지라 전화번호는 싣지 않습니다.

export const resume = {
  name: "강정민",
  role: "Frontend Developer",
  // 내려받기용 PDF. 원본에서 전화번호와 증명사진을 가리고 public/resume.pdf 로 올렸습니다.
  pdf: "/resume.pdf",

  contacts: [
    { label: "Email", value: "kjm3746@gmail.com", href: "mailto:kjm3746@gmail.com" },
    { label: "GitHub", value: "github.com/mick243", href: "https://github.com/mick243" },
    { label: "Portfolio", value: "demo-project-gamma-brown.vercel.app", href: "https://demo-project-gamma-brown.vercel.app" },
    { label: "solved.ac", value: "solved.ac/profile/mick243", href: "https://solved.ac/profile/mick243" },
    {
      label: "Notion",
      value: "app.notion.com/p/18458dde847f82b8a88b811ec6238245",
      href: "https://app.notion.com/p/18458dde847f82b8a88b811ec6238245",
    },
  ],

  // 첫머리 두 줄. 배열 한 칸이 한 줄입니다.
  headline: [
    "화면이 느린 이유를 직접 재서 찾고,",
    "원인이 서버에 있으면 거기까지 따라가 고치는 프론트엔드 개발자입니다.",
  ],
  path: [
    {
      label: "걸어온 길",
      text: "데브코스에서 풀스택 기초를, 외주 쇼핑몰에서 실무 퍼블리싱과 일정 공유를 익혔습니다. 2026년에는 개인 프로젝트 3건과 6인 팀 프로젝트로 성능 개선 · 배포 · AI 활용까지 넓혔습니다.",
    },
    {
      label: "나아갈 길",
      text: "실제 사용자가 있는 서비스에서 화면의 속도와 편함을 측정으로 개선하는 개발자가 되겠습니다.",
    },
  ],

  // 핵심역량 — 채용 공고에서 찾는 역량과 제 사례
  competencies: [
    {
      skill: "React · TypeScript 개발",
      example:
        "키 입력 · GPS 갱신마다 부모와 함께 다시 그려지던 목록 · 상세 패널을, 콜백 11개를 useCallback으로 고정한 뒤 memo로 분리해 막음",
      ref: "오락실 파인더",
    },
    {
      skill: "웹 성능 최적화",
      example: "지도가 느리다는 체감을 DevTools로 재어 원인을 마커 동기화로 특정하고, 뷰포트 컬링으로 초기 마커 동기화 622 → 156ms",
      ref: "오락실 파인더",
    },
    {
      skill: "테스트와 품질 검증",
      example:
        "자동 테스트 1,400건(웹 71건)을 CI로 돌리고, 가입자 1만 규모 시드로 다시 재어 빈 DB에선 안 보이던 지연(p95 22 → 152ms)을 찾고 원인이 응답 크기임을 확인",
      ref: "한 줄 데스크 · 오락실 파인더",
    },
    {
      skill: "협업과 코드 통합",
      example:
        "6인 팀에서 공통 타입 · DB · 배포를 맡아 팀원 PR의 테스트 12장면을 SQL로 옮겨 두 구현을 맞췄고, main 머지 자동 배포 28번 모두 성공",
      ref: "BANDIT",
    },
    {
      skill: "AI 도구 활용",
      example: "AI를 붙이기 전에 규칙부터 고쳐 담당 부서 오답 5건 → 0건(검증 문장 32개), AI는 해석만 맡기고 쓰기는 사람이 확인",
      ref: "한 줄 데스크",
    },
    {
      skill: "커뮤니케이션",
      example: "외주에서 페이지당 1~2일 기준으로 일정을 세우고 클라이언트 · 디자이너와 먼저 소통해 기한 안에 오픈",
      ref: "외주 쇼핑몰",
    },
  ],

  // 성장 과정 — 학교 · 교육 · 외주 · 프로젝트를 한 흐름으로
  growth: [
    { stage: "CS 기초", period: "2014.02 ~ 2021.02", name: "청주대학교", desc: "컴퓨터 · 정보전공 졸업" },
    {
      stage: "풀스택 기초 · 협업",
      period: "2024.04 ~ 2024.10",
      name: "프로그래머스 데브코스",
      desc: "팀원 이탈 속 업무 재분담으로 팀 프로젝트 완주",
      stack: "TypeScript · Node.js · MySQL · Docker",
    },
    {
      stage: "실무 · 일정 공유",
      period: "2025.09 / 2026.02 ~ 03",
      name: "외주 쇼핑몰 2곳",
      desc: "Deeto · RANGE 퍼블리싱, 두 곳 모두 기한 안에 오픈",
      stack: "카페24 · Figma",
    },
    {
      stage: "측정 기반 성능",
      period: "2026.07 ~ 2026.09",
      name: "AI 캠프 입과",
      desc: "개인 프로젝트 오락실 파인더 · PetMediSearch 성능 개선",
      stack: "Next.js · React · PostgreSQL · k6",
    },
    {
      stage: "팀 통합 · AI 서비스",
      period: "2026.10 ~ 2026.11",
      name: "BANDIT · 한 줄 데스크",
      desc: "6인 팀 공통 기반과 배포, AI를 안전하게 붙인 서비스 완성",
      stack: "React · Vite · PWA · MCP",
    },
  ],
  reached: "화면 성능 개선을 중심으로 서버 병목 추적 · 팀 배포 · AI 결과 검증까지 해 본 단계",

  skillGroups: [
    { title: "주력 기술", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML · CSS", "Vite", "Vitest"] },
    {
      title: "함께 쓴 기술",
      items: [
        "Styled-components",
        "Redux",
        "Node.js",
        "Express",
        "Fastify",
        "PostgreSQL · Prisma",
        "MySQL",
        "Supabase",
        "Docker",
        "k6",
        "MCP",
        "Figma",
      ],
    },
  ],

  // detail 은 이 사이트의 프로젝트 상세 페이지, shot 은 public/resume/ 의 실행 화면(2:1)입니다.
  projects: [
    {
      name: "오락실 파인더",
      detail: "/projects/arcade-finder",
      kind: "개인 프로젝트 · 1인 개발",
      period: "2026.08 ~ 진행 중",
      strength: "측정으로 병목을 찾아 고치는 성능 개선",
      link: { label: "github.com/mick243/PrivateProject", href: "https://github.com/mick243/PrivateProject" },
      task: "리듬게임 유저가 지금 갈 오락실을 고르는 지도 · 실시간 제보 서비스를 혼자 기획 · 개발",
      action:
        "화면 밖 마커는 만들지 않고 빠진 마커는 숨겨 두었다 다시 써서 지도 렌더 부담을 줄였으며, 가입자 1만 규모 시드로 다시 재어 진짜 병목이던 압축 안 된 API 응답에 brotli 적용",
      result: "초기 마커 동기화 622ms → 156ms, 지도 API 응답 1.2MB → 90KB(LTE 기준 전송 약 0.5초 단축)",
      stack: "Next.js 16, React 19, TypeScript, PostgreSQL 18 · Prisma, Vitest, k6, Naver Maps",
      shot: { src: "/resume/arcade.jpg", alt: "오락실 파인더 지도 화면", caption: "지도 화면 : 화면 안에 들어온 마커만 표시" },
    },
    {
      name: "한 줄 데스크",
      detail: "/projects/one-line-desk",
      kind: "개인 프로젝트 · 1인 개발(AI 에이전트 팀 활용)",
      period: "2026.10 ~ 2026.11",
      strength: "AI를 안전하게 붙인 업무 화면을 끝까지 완성하는 힘",
      link: { label: "one-line-desk.vercel.app", href: "https://one-line-desk.vercel.app" },
      task: "회의실 · 탕비실 · 문의를 한 줄로 묻고 실행 전 확인 화면으로 받는 사내 안내 데스크를 17일간 개발",
      action:
        "AI는 문장 해석과 항목 고르기만 맡기고 실제 쓰기는 사람이 확인한 뒤에만 실행하며, 역할별 화면을 나눠 불러오고(코드 분할) 설계 결정을 ADR 29건으로 기록",
      result: "테스트 1,400건(웹 71건) 통과, 첫 JS 372kB → 334kB, 담당 팀 안내 오답 5건 → 0건(검증 문장 32개)",
      stack: "React 19, TypeScript, Vite, Fastify 5, PostgreSQL · PGlite, Vitest, MCP, Fly.io",
      shot: {
        src: "/resume/one-line-desk.jpg",
        alt: "한 줄 데스크 회의실 후보 화면",
        caption: "회의실 화면 : 후보 카드에서 예약 전 한 번 더 확인",
      },
    },
    {
      name: "PetMediSearch",
      detail: "/projects/petmedisearch",
      kind: "개인 프로젝트 · 1인 재작성",
      period: "2026.09",
      strength: "실제 규모에서 재고 고치는 품질 점검",
      link: {
        label: "github.com/mick243/PetMediSearch-rebuild",
        href: "https://github.com/mick243/PetMediSearch-rebuild",
      },
      task: "2024년 4인 팀으로 만든 반려동물 병원 · 약국 찾기 앱을 혼자 처음부터 다시 구현",
      action:
        "전국을 한 번에 받던 지도를 화면 범위 조회 · 서버 격자 집계로 바꾸고 목록 응답을 줄였으며, 값이 없으면 통과하던 로그인 state 검증(CSRF 방지)과 시각 9시간 오차를 바로잡음",
      result: "게시글 목록 응답 30.7MB → 4.6KB(글 2만 건 시드), k6 200 VU 부하에서 실패 0건(로컬 한 대)",
      stack: "React 18, TypeScript, Vite, Redux, Express, MySQL 8, k6, Kakao Map",
      shot: {
        src: "/resume/petmedisearch.jpg",
        alt: "PetMediSearch 홈과 지도 화면",
        caption: "홈 · 지도 화면 : 화면 범위 안 시설을 묶어 표시",
      },
    },
    {
      name: "BANDIT",
      detail: "/projects/bandit",
      kind: "팀 프로젝트 · 6인 · 공통 기반 담당",
      period: "2026.10",
      strength: "팀원 기능이 실제로 돌게 붙이는 통합과 배포",
      link: { label: "bandit-lovat.vercel.app", href: "https://bandit-lovat.vercel.app" },
      task: "팀 결정을 AI 코딩 도구가 MCP(AI 도구 연결 표준)로 조회하고, 바뀌면 담당자에게만 알리는 팀 위키",
      action:
        "오프라인으로 처음 열면 빈 화면이 뜨던 PWA 서비스 워커 버그를 고치고, 공통 타입 · DB · MCP 서버를 만들었으며, Cloud Run 배포 실패를 한글 파일 이름 깨짐까지 추적해 해결한 뒤 자동 배포 구성",
      result: "서버 · DB 코드 157개 파일 PR 머지, 깨진 파일 이름 5개 → 0개, 자동 배포 28번 모두 성공",
      stack: "TypeScript, Node.js 24, MCP SDK, Supabase(PostgreSQL 17), Cloud Run, React · Vite PWA",
      shot: {
        src: "/resume/bandit.jpg",
        alt: "BANDIT 터미널 실행 화면",
        caption: "Claude Code 터미널 : 작업 전 확인할 변경 안내",
      },
    },
  ],

  // 외주 경험
  experience: [
    {
      name: "외주 쇼핑몰 구축",
      sub: "카페24 · 2곳",
      period: "Deeto 2025.09 · RANGE 2026.02 ~ 2026.03",
      strength: "일정 리스크를 숨기지 않고 먼저 공유하는 태도",
      points: [
        "Deeto : 초기 화면 퍼블리싱 담당, 낙관적 일정 리스크를 바로 공유해 인력 추가를 이끌고 기한 안에 출시",
        "RANGE : 디자이너와 소통하며 UI/UX 구현과 쇼핑몰 전체 스타일을 구축해 기한 안에 오픈",
      ],
    },
  ],

  // 교육
  training: [
    {
      name: "AI 네이티브 커리어 캠프",
      period: "2026.07 ~ 2026.11",
      strength: "AI에게 일을 맡기고 결과를 직접 검증하는 개발 방식",
      points: [
        "프롬프트 설계(Few-shot · 단계별 사고 · 반복 개선)와 템플릿 · 체이닝으로 반복 작업 자산화",
        "데이터 보안 · 환각 검증을 익혀 AI 결과를 테스트와 측정으로 확인하는 습관으로 연결",
        "개인 프로젝트 오락실 파인더 제작, 6인 팀 프로젝트 BANDIT 공통 기반 담당",
      ],
    },
    {
      name: "프로그래머스 데브코스",
      sub: "TypeScript · Node.js · MySQL · Docker",
      period: "2024.04 ~ 2024.10",
      strength: "팀이 흔들려도 일정을 끝까지 맞추는 협업",
      points: [
        "CS 지식 및 프론트엔드 · 백엔드 개념 학습과 실습, 풀스택 실습",
        "8월 개인 미니 프로젝트(2주), 9~10월 팀 프로젝트 PetMediSearch(반려동물 병원 · 약국 찾기)",
        "팀원 한 명이 초기에 이탈하자 업무 재분담과 데일리 워크타임으로 일정 완주, Swagger · JWT 구현",
      ],
    },
  ],
};
