// 전부 더미(가상) 데이터입니다. 실제 인물, 회사, 경력과 무관합니다.

export const profile = {
  handle: "DEMO",
  role: "Developer",
  tagline: "요구사항을 구조로, 구조를 서비스로.",
  summary:
    "DEMO",
  location: "Remote / Seoul, KR",
  email: "hello@example-dev.com",
  availability: "ㅇㅇ",
  stats: [
    { label: "경력 연차", value: "", suffix: "년" },
    // { label: "완료 프로젝트", value: "32", suffix: "건" },
    // { label: "협업 클라이언트", value: "19", suffix: "곳" },
    // { label: "평균 만족도", value: "4.9", suffix: "/5" },
  ],
};

export const profileJson = `{
  "role": "Developer",
  "focus": ["ㅇㅇ"],
  "stack": {
    "frontend": ["React", "Next.js", "TypeScript"]
  },
  "status": "available_for_project",
  "response_time": "< 24h"
}`;

export const skillGroups = [
  // {
  //   title: "Backend",
  //   items: ["Java", "Spring Boot", "Node.js", "NestJS", "REST API", "GraphQL"],
  // },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Redux", "TailwindCSS"],
  },
  // {
  //   title: "Cloud & Infra",
  //   items: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
  // },
  // {
  //   title: "Data & 협업",
  //   items: ["MySQL", "PostgreSQL", "Redis", "Jira", "Notion", "Slack"],
  // },
];

export const careers = [
  {
    period: "A",
    company: "ㅇㅇ",
    desc: "테스트",
    tags: ["기술", "기술", "기술"],
  },
  // {
  //   period: "2021 — 2023",
  //   company: "가상 회사 B · 백엔드 리드",
  //   desc: "사내 어드민 시스템과 외부 파트너 연동 API를 총괄. 3인 팀의 기술 리드로 코드 리뷰 및 배포 파이프라인을 정비했습니다.",
  //   tags: ["Node.js", "React", "CI/CD"],
  // },
  // {
  //   period: "2018 — 2021",
  //   company: "가상 회사 C · 풀스택 개발자",
  //   desc: "초기 스타트업 서비스의 MVP부터 정식 출시까지 프론트/백엔드 전 영역을 담당했습니다.",
  //   tags: ["React", "Java", "MySQL"],
  // },
];

export const projects = [
  // {
  //   name: "물류 관제 대시보드",
  //   period: "2024",
  //   summary:
  //     "실시간 배송 현황을 시각화하는 관제 대시보드. WebSocket 기반 실시간 갱신과 대용량 로그 처리를 구현했습니다.",
  //   tags: ["React", "Spring Boot", "WebSocket", "AWS"],
  //   role: "PM 겸 풀스택 개발",
  // },
];

export const process = [
  { step: "01", title: "문의 접수", desc: "요구사항과 목표를 간단히 남겨주세요. 24시간 내 회신합니다." }
];
