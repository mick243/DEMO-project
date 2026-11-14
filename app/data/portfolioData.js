// 실제 이력서(v2.2) 기반 데이터입니다.

export const profile = {
  handle: "강정민",
  role: "Frontend Developer",
  // 히어로 한 줄입니다. 배열 한 칸이 화면의 한 줄입니다.
  tagline: ["강정민"],
  location: "서울, 대한민국",
  email: "kjm3746@gmail.com",
  availability: "지금 채용 지원을 받고 있어요",
};

// 히어로 버튼. 주 행동은 프로젝트 보기 하나입니다(DESIGN_PROMPT.md 1화면 1행동).
export const heroActions = {
  primary: "프로젝트 보기",
  secondary: "연락처 보기",
};

// 소개 섹션 제목입니다.
export const aboutIntro = {
  title: "소개",
};

// 연락처 섹션 제목과 안내입니다. 답장 시간은 profileJson 의 response_time 과 같습니다.
export const contactIntro = {
  title: "연락처",
  desc: "메일 주시면 하루 안에 답장해요.",
};

// 없는 주소로 들어왔을 때 보이는 화면(app/not-found.js)의 문구입니다.
export const notFound = {
  title: "찾는 페이지가 없어요",
  desc: "주소가 바뀌었을 수 있어요. 홈이나 프로젝트 목록에서 다시 찾아보세요.",
};

// 소개 섹션 카드. 이력서와 GitHub 두 장을 같은 크기로 나란히 둡니다(1:1).
// external 이 true 면 새 탭으로 엽니다.
export const aboutCards = [
  {
    href: "/resume",
    icon: "resume",
    eyebrow: "Resume",
    title: "이력서 전문 보기",
    desc: "핵심역량, 성장 과정, 프로젝트 4건의 과정과 결과를 한 페이지에 모았어요.",
  },
  {
    href: "https://github.com/mick243",
    external: true,
    icon: "github",
    eyebrow: "GitHub",
    title: "코드 저장소 보기",
    desc: "github.com/mick243 에서 프로젝트 코드와 커밋 기록을 볼 수 있어요.",
  },
];

// 기술 스택 섹션. 진행한 프로젝트에서 실제로 쓴 기술을 모았고, 버전은 적지 않습니다.
// 주력은 프론트엔드이고(primary), 나머지는 원인을 따라 서버 · 배포까지 내려가며 함께 다룬 기술입니다.
export const skillsIntro = {
  desc: "화면은 React와 Next.js로 만들어요. 느린 원인이 서버에 있으면 서버, DB, 배포까지 따라가요.",
};

export const skillGroups = [
  {
    key: "frontend",
    title: "Frontend",
    sub: "주력",
    primary: true,
    items: ["React", "Next.js", "TypeScript", "Styled-components", "Vite", "Vitest"],
  },
  {
    key: "backend",
    title: "Backend · DB",
    sub: "함께 다룬 기술",
    items: ["Node.js", "Express", "Fastify", "RESTful API", "PostgreSQL", "MySQL", "Supabase", "PGlite"],
  },
  {
    key: "infra_tools",
    title: "AI · Infra · Tool",
    sub: "함께 다룬 기술",
    items: ["MCP", "Gemini", "Docker", "Cloud Run", "Fly.io", "Vercel", "Git", "Figma", "Swagger", "k6"],
  },
];

// 기술 스택 섹션과 같은 데이터를 그대로 써서 terminal의 stack을 만듭니다.
const stackJson = skillGroups
  .map((g) => `    "${g.key}": [${g.items.map((i) => `"${i}"`).join(", ")}]`)
  .join(",\n");

export const profileJson = `{
  "role": "Frontend Developer",
  "focus": ["React / Next.js"],
  "stack": {
${stackJson}
  },
  "status": "구직 중",
  "response_time": "< 24h"
}`;

// desc 는 문장 하나(문자열)나 글머리표 목록(배열)입니다.
export const education = [
  {
    period: "2026.07 ~ 2026.11",
    name: "AI Native Career Camp",
    desc: [
      "프롬프트 설계, 반복 작업 템플릿화, MCP 스킬 사용 등 AI와 AX 활용 능력을 교육 받고 실습하였습니다",
      "교육 내용을 바탕으로 프로젝트를 진행하며 활용능력 강화",
    ],
    tags: ["AI Native", "생산성"],
  },
  {
    period: "2024.04 ~ 2024.10",
    name: "Programmers Dev-Course",
    desc: [
      "Swagger로 API 문서만들기, Docker 실습, React, TypeScript등 풀스택 과정 교육을 이수하였습니다.",
      "팀프로젝트 진행 중 팀원 한 명이 초기에 빠지는 위기를 팀원과 업무를 다시 나누고 매일 함께 일하는 시간을 정해 해결한 경험이 있습니다.",
    ],
    tags: ["TypeScript", "Node.js", "MySQL", "Docker"],
  },
];

export const process = [
  { step: "01", title: "짐작 대신 측정", desc: "체감으로 판단하지 않고 성능 계기판부터 붙여 원인을 숫자로 확인합니다." },
  { step: "02", title: "작게 만들고 크게 재보기", desc: "실제 규모로 부하를 걸어 데이터가 적을 때는 보이지 않던 문제를 미리 찾습니다." },
  { step: "03", title: "상황은 먼저 공유", desc: "일정이 흔들리면 숨기지 않고 리스크와 현재 상태를 그대로 빠르게 전달합니다." },
];
