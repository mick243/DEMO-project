// 이력서 v4(2026.10.27, 강정민_이력서_v4.pdf)의 내용을 옮긴 데이터입니다.
// PDF 를 새로 받으면 public/resume.pdf 와 이 파일을 함께 갱신해 주세요.

export const resume = {
  name: "강정민",
  role: "Frontend Developer",
  // 내려받기용 PDF. 공개 페이지라 원본에서 전화번호와 증명사진을 빼고 public/resume.pdf 로 올렸습니다.
  pdf: "/resume.pdf",

  contacts: [
    { label: "이메일", value: "kjm3746@gmail.com", href: "mailto:kjm3746@gmail.com" },
    { label: "GitHub", value: "github.com/mick243", href: "https://github.com/mick243" },
  ],

  summary: "React · Next.js · TypeScript 기반의 프론트엔드 개발자(신입)입니다.",

  // 이력서의 [핵심역량] 다섯 줄입니다.
  strengths: [
    "기획부터 프론트엔드 · 백엔드 · 데이터 수집 · 성능 측정까지 혼자 끝까지 완성한 개인 프로젝트 2건",
    "6인 팀 프로젝트에서 통합환경을 맡아 팀원 기능이 실제로 도는 바탕을 만들고 실제 환경에서 검증",
    "짐작 대신 측정으로 개선: Chrome DevTools · k6로 병목을 짚어 지도 렌더 −75%, 서버 p95 −86%",
    "성능을 ‘좋아 보이는 숫자’가 아니라 목표 사용자 수(가입자 · DAU)를 기준으로 판단",
    "AI 에이전트가 쓰는 MCP 서버를 직접 만들었고, 개발에 AI를 쓸 때도 결과를 직접 재고 실제 환경에서 확인",
  ],

  projects: [
    {
      name: "BANDIT",
      period: "2026.10 – 진행 중",
      type: "팀 프로젝트 (6인, AI 네이티브 커리어 캠프) · 통합환경 담당",
      desc: "코드와 AI 대화 속에서 바뀌는 팀 규칙(결정 사항)을 버전이 남는 팀 위키에 저장하고, 바뀌면 관련 이슈 담당자에게만 확인을 요청하는 Claude Code용 MCP 서버와 웹 앱",
      points: [
        "팀원 기능이 붙을 공통 타입 · 데이터베이스 · MCP 서버 · 배포 파이프라인을 맡아 PR 12건 작성, 10건 머지",
        "MCP 서버 · CLI · 웹 앱이 같은 DB를 쓰는 구조에서 쓰기는 SQL 함수로만 열고 삭제와 지난 버전 수정은 트리거로 막아, 규칙을 데이터 가까이에서 강제",
        "팀원과 AI 에이전트가 같은 결정 사항을 동시에 고치는 경우, 읽은 버전을 비교해 늦은 쪽을 거절하고 보류로 남겨 사람이 고르게 설계",
        "Cloud Run 배포 실패를 한글 파일 이름 깨짐까지 추적해 해결하고, main 머지 시 자동 배포와 Secret Manager 비밀 관리를 구성",
      ],
      stack: "TypeScript, Node.js 24, MCP TypeScript SDK, Supabase(PostgreSQL 17), Google Cloud Run, React · Vite(PWA), Vitest",
      link: { label: "프로젝트 자세히", href: "/projects/bandit" },
    },
    {
      name: "오락실 파인더",
      period: "2026.08 – 진행 중",
      type: "개인 프로젝트 (1인 개발) · 기획 · 프론트엔드 · 백엔드 · 데이터 수집 · 성능 측정",
      desc: "리듬게임 유저가 지금 갈 만한 오락실을 찾는 지도에서 시작해, 제보로 실시간 대기 상황, 기체 컨디션, 체감 난이도 서열표와 커뮤니티까지 한 앱에 담은 서비스",
      points: [
        "화면 밖 마커는 만들지 않는 뷰포트 컬링으로 지도 렌더를 최적화해 초기 마커 동기화 622ms → 156ms(−75%)",
        "k6 부하 테스트로 병목을 DB 커넥션 풀 상한으로 특정, 풀 조정 · 캐싱 · 쿼리 분리로 서버 p95 287ms → 39ms(−86%)",
        "목표 사용자(가입자 1만 · DAU 3천) 기준으로 부하 기준을 다시 세워, 과했던 서버 구성 권고를 적정 규모로 축소",
        "위조 가능한 헤더로 우회되던 로그인 시도 제한 등 보안 취약점을 찾아 라우트 18곳을 세션 기반으로 통일",
      ],
      stack: "Next.js 16, React 19, TypeScript, PostgreSQL 18, Vitest, k6, Gemini API, Naver Maps",
      link: { label: "프로젝트 자세히", href: "/projects/arcade-finder" },
    },
    {
      name: "PetMediSearch",
      period: "2026.09",
      type: "개인 프로젝트 (1인 재작성) · 기획 재정리 · 프론트엔드 · 백엔드 · 성능 측정",
      desc: "2024년 부트캠프에서 4인 팀으로 만든 반려동물 병원 · 약국 찾기 앱을 2년 뒤 혼자 처음부터 다시 구현",
      points: [
        "전국 시설을 한 번에 받던 구조를 지도 화면 범위 조회와 서버 격자 집계로 전환",
        "실제 규모 시드를 깔고 목록 전송량을 점검해 게시글 목록 30.7MB → 4.6KB로 축소",
        "k6 0 → 200 VU 램프 테스트에서 요청 49,101건 실패 0",
        "소셜 로그인 state 검증 누락, 모든 시각이 9시간 어긋나던 문제 등 전수 점검으로 찾은 문제 수정",
      ],
      stack: "React 18, TypeScript, Vite, Express, MySQL 8, k6, Kakao Map",
      link: { label: "프로젝트 자세히", href: "/projects/petmedisearch" },
    },
  ],

  career: [
    {
      name: "RANGE 쇼핑몰 구축",
      period: "2026.02 – 2026.03",
      points: ["디자이너와 소통하며 UI/UX 구현과 쇼핑몰 전체 스타일 구축"],
      link: { label: "range8.kr", href: "https://range8.kr/" },
    },
    {
      name: "Deeto 쇼핑몰 구축",
      period: "2025.09",
      points: ["초기 화면 퍼블리싱 담당"],
      link: { label: "deeto.co.kr", href: "https://deeto.co.kr/" },
    },
  ],

  education: [
    {
      name: "AI 네이티브 커리어 캠프",
      period: "2026.07 – 진행 중",
      desc: "AI에게 일을 맡기고 결과를 검증하는 방식, 프롬프트 설계와 반복 작업의 템플릿화, AI 답변의 사실 검증 실습. 6인 팀 프로젝트 BANDIT에서 통합환경 담당",
    },
    {
      name: "Programmers Dev-Course",
      period: "2024.04 – 2024.10",
      desc: "CS 지식 및 프론트엔드 · 백엔드 개념 학습과 풀스택 실습. 팀원 한 명이 초기에 이탈한 상황에서 업무 재분담과 데일리 워크타임으로 일정 완주, Swagger API 문서화 · JWT 인증 구현",
    },
    {
      name: "청주대학교",
      period: "2014.02 – 2021.02",
      desc: "컴퓨터 · 정보전공 (졸업)",
    },
  ],

  links: [
    { label: "GitHub", value: "github.com/mick243", href: "https://github.com/mick243" },
    { label: "블로그", value: "minslog.com", href: "https://minslog.com" },
    { label: "solved.ac", value: "solved.ac/profile/mick243", href: "https://solved.ac/profile/mick243" },
  ],

  skillGroups: [
    {
      title: "보유 역량",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Styled-components",
        "Node.js",
        "RESTful API",
        "PostgreSQL",
        "MySQL",
        "Supabase",
        "MCP",
      ],
    },
    {
      title: "도구",
      items: ["Git", "Docker", "Figma", "Swagger", "Vitest", "k6", "Google Cloud Run", "Claude Code"],
    },
  ],
};
