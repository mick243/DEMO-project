// 실제 이력서(v2.2) 기반 데이터입니다.

export const profile = {
  handle: "강정민",
  role: "Frontend Developer",
  tagline: "렌더 성능을 측정으로 검증합니다.",
  location: "서울, 대한민국",
  email: "kjm3746@gmail.com",
  availability: "채용 지원 가능",
  stats: [
    { label: "렌더 최적화", value: "75", suffix: "%↓" },
    { label: "자동 테스트", value: "522", suffix: "건" },
    { label: "컴포넌트", value: "35", suffix: "개" },
  ],
};

export const profileJson = `{
  "role": "Frontend Developer",
  "focus": ["렌더 성능", "접근성", "React / Next.js"],
  "stack": {
    "frontend": ["React 19", "Next.js 16", "TypeScript"]
  },
  "status": "구직 중",
  "response_time": "< 24h"
}`;

export const skillGroups = [
  {
    title: "Frontend",
    items: ["React 19", "Next.js 16 App Router", "TypeScript", "Styled-components", "반응형 CSS"],
  },
  {
    title: "렌더 성능 · 접근성",
    items: ["뷰포트 컬링", "DOM 풀링", "translate3d 오버레이", "IntersectionObserver lazy", "ARIA 속성", "DevTools Performance"],
  },
  {
    title: "Backend · DB",
    items: ["Node.js", "RESTful API", "PostgreSQL", "MySQL", "Zod", "JWT"],
  },
  {
    title: "Tool & Test",
    items: ["Git", "Docker", "Figma", "Swagger", "Vitest", "k6"],
  },
];

export const careers = [
  {
    period: "2026.08",
    company: "오락실 파인더 · 개인 프로젝트(1인)",
    tags: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "k6"],
  },
  {
    period: "2026.02 — 2026.03",
    company: "RANGE 쇼핑몰 구축 · 외주",
    desc: "페이지당 1~2일이라는 현실적인 일정 산정 기준을 세우고 클라이언트·디자이너와 선제적으로 소통해 기한 내 차질 없이 오픈했습니다.",
    tags: ["UI/UX", "카페24", "Figma"],
  },
  {
    period: "2025.09",
    company: "Deeto 쇼핑몰 구축 · 외주",
    desc: "낙관적인 일정 산정으로 프로젝트가 무산될 위기를 겪었지만, 상황과 리스크를 투명하게 공유해 추가 인력 투입을 이끌어내고 마감 기한 내 출시했습니다. 이 경험으로 실수를 인정하고 현재 상황을 그대로 빠르게 공유하는 태도를 배웠습니다.",
    tags: ["카페24", "퍼블리싱"],
  },
  {
    period: "2024.04 — 2024.10",
    company: "Programmers Dev-Course",
    desc: "팀원 한 명이 초기에 이탈한 상황에서 업무를 재분담하고 데일리 워크타임으로 일정을 완주했습니다. JWT 인증 구현, Swagger API 문서화를 경험했습니다.",
    tags: ["TypeScript", "Node.js", "MySQL", "Docker"],
  },
];

export const projects = [
  {
    name: "오락실 파인더",
    period: "2026.08",
    tags: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "k6", "Vitest"],
    role: "기획 · 프론트엔드 · 백엔드 · 성능 측정 전 과정 (1인 개발)",
    github: "https://github.com/mick243",
  },
];

export const process = [
  { step: "01", title: "짐작 대신 측정", desc: "체감으로 판단하지 않고 성능 계기판부터 붙여 원인을 숫자로 확인합니다." },
  { step: "02", title: "작게 만들고 크게 재보기", desc: "실제 규모로 부하를 걸어 데이터가 적을 때는 보이지 않던 문제를 미리 찾습니다." },
  { step: "03", title: "상황은 먼저 공유", desc: "일정이 흔들리면 숨기지 않고 리스크와 현재 상태를 그대로 빠르게 전달합니다." },
];
