// 업로드한 이력서 PDF(강정민_이력서.pdf)의 내용을 그대로 옮긴 데이터입니다.
// PDF 를 새로 받으면 public/resume.pdf 와 이 파일을 함께 갱신해 주세요.

export const resume = {
  name: "강정민",
  role: "Frontend Developer",
  // 내려받기용 PDF. 공개 페이지라 원본에서 전화번호만 지우고 public/resume.pdf 로 올렸습니다.
  pdf: "/resume.pdf",

  contacts: [
    { label: "Email", value: "kjm3746@gmail.com", href: "mailto:kjm3746@gmail.com" },
    { label: "Github", value: "github.com/mick243", href: "https://github.com/mick243" },
  ],

  summary:
    "React·Next.js·TypeScript 기반 프론트엔드 개발을 익힌 신입 개발자입니다. 개인·팀 프로젝트와 쇼핑몰 구축을 거치며 다른 직무와 소통하고 기한 내에 문제를 해결해 왔습니다.",

  career: [
    {
      name: "Range 쇼핑몰 구축 참여",
      period: "2026.02 – 2026.03",
      points: [
        "Range 쇼핑몰 구축 프로젝트에 참여하여 디자이너와 커뮤니케이션하며 UI/UX 구현",
        "쇼핑몰 전체 스타일 구축",
      ],
      link: { label: "range8.kr", href: "https://range8.kr/" },
    },
    {
      name: "Deeto 쇼핑몰 구축 초기 참여",
      period: "2025.09 – 2025.09",
      points: ["초기 퍼블리싱에 참여하여 퍼블리싱 구축"],
      link: { label: "deeto.co.kr", href: "https://deeto.co.kr/" },
    },
    {
      name: "Programmers Dev-course",
      period: "2024.04 – 2024.10",
      points: [
        "CS 지식 및 프론트엔드·백엔드 개념 학습과 실습, 풀스택 실습",
        "8월 중반 2주간 개인 미니 프로젝트 진행",
        "9월 말 ~ 10월 중반까지 한 달간 팀 프로젝트 진행",
      ],
    },
  ],

  education: [
    {
      name: "청주대학교",
      period: "2014.02 – 2021.02",
      desc: "컴퓨터·정보전공 (졸업)",
    },
  ],

  links: [
    { label: "Github", value: "github.com/mick243", href: "https://github.com/mick243" },
    { label: "minslog", value: "minslog.com", href: "https://minslog.com" },
    { label: "solved.ac", value: "solved.ac/profile/mick243", href: "https://solved.ac/profile/mick243" },
  ],

  skillGroups: [
    {
      title: "보유 역량",
      items: [
        "React 19",
        "Next.js 16 App Router",
        "TypeScript",
        "Styled-components",
        "Node.js",
        "RESTful API",
        "PostgreSQL",
        "MySQL",
        "JWT",
      ],
    },
    {
      title: "Tools",
      items: ["Git", "Docker", "Figma", "Swagger", "Vitest", "k6", "VS Code"],
    },
  ],
};
