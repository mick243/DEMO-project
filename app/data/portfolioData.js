// 실제 이력서(v2.2) 기반 데이터입니다.

export const profile = {
  handle: "강정민",
  role: "Frontend Developer",
  tagline: "렌더 성능을 측정으로 검증합니다.",
  location: "서울, 대한민국",
  email: "kjm3746@gmail.com",
  availability: "채용 지원 가능",
};

export const skillGroups = [
  {
    key: "frontend",
    title: "Frontend",
    items: ["React 19", "Next.js 16 App Router", "TypeScript", "Styled-components", "반응형 CSS"],
  },
  {
    key: "performance",
    title: "렌더 성능 · 접근성",
    items: ["뷰포트 컬링", "DOM 풀링", "translate3d 오버레이", "IntersectionObserver lazy", "ARIA 속성", "DevTools Performance"],
  },
  {
    key: "backend",
    title: "Backend · DB",
    items: ["Node.js", "RESTful API", "PostgreSQL", "MySQL", "Zod", "JWT"],
  },
  {
    key: "tools",
    title: "Tool & Test",
    items: ["Git", "Docker", "Figma", "Swagger", "Vitest", "k6"],
  },
];

// 기술 스택 섹션과 같은 데이터를 그대로 써서 terminal의 stack을 만듭니다.
const stackJson = skillGroups
  .map((g) => `    "${g.key}": [${g.items.map((i) => `"${i}"`).join(", ")}]`)
  .join(",\n");

export const profileJson = `{
  "role": "Frontend Developer",
  "focus": ["렌더 성능", "접근성", "React / Next.js"],
  "stack": {
${stackJson}
  },
  "status": "구직 중",
  "response_time": "< 24h"
}`;

export const education = [
  {
    period: "2026.09 ~ 진행 중",
    name: "AI Native Career Camp",
    desc: "AI를 개발 흐름에 붙여 쓰는 방법을 익히고 있습니다.",
    tags: ["AI Native", "생산성"],
  },
  {
    period: "2024.04 ~ 2024.10",
    name: "Programmers Dev-Course",
    desc: "팀원 한 명이 초기에 이탈한 상황에서 업무를 재분담하고 데일리 워크타임으로 일정을 완주했습니다. JWT 인증 구현, Swagger API 문서화를 경험했습니다.",
    tags: ["TypeScript", "Node.js", "MySQL", "Docker"],
  },
];

export const process = [
  { step: "01", title: "짐작 대신 측정", desc: "체감으로 판단하지 않고 성능 계기판부터 붙여 원인을 숫자로 확인합니다." },
  { step: "02", title: "작게 만들고 크게 재보기", desc: "실제 규모로 부하를 걸어 데이터가 적을 때는 보이지 않던 문제를 미리 찾습니다." },
  { step: "03", title: "상황은 먼저 공유", desc: "일정이 흔들리면 숨기지 않고 리스크와 현재 상태를 그대로 빠르게 전달합니다." },
];
