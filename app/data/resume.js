// 이력서 PDF(강정민_이력서_v10_스크린샷제거.pdf)의 내용을 그대로 옮긴 데이터입니다.
// PDF 를 새로 받으면 public/resume.pdf 와 이 파일을 함께 갱신해 주세요.
// 공개 페이지라 전화번호는 싣지 않습니다.

export const resume = {
  name: "강정민",
  role: "Frontend Developer",
  // 내려받기용 PDF. 원본에서 전화번호와 증명사진을 가리고 public/resume.pdf 로 올렸습니다.
  pdf: "/resume.pdf",

  // 이력서 PDF 머리말과 같은 순서 · 이름입니다. note 는 링크 옆에 작게 붙는 설명입니다.
  contacts: [
    { label: "Email", value: "kjm3746@gmail.com", href: "mailto:kjm3746@gmail.com" },
    { label: "GitHub", value: "github.com/mick243", href: "https://github.com/mick243" },
    {
      label: "Algorithm",
      value: "solved.ac/profile/mick243",
      href: "https://solved.ac/profile/mick243",
      note: "Gold V · 197문제",
    },
    { label: "Portfolio", value: "demo-project-gamma-brown.vercel.app", href: "https://demo-project-gamma-brown.vercel.app" },
  ],

  // 첫머리 문장. 배열 한 칸이 한 줄입니다. 이력서 PDF의 첫머리는 새 문장을 쓰는 중이라 비워 둡니다.
  headline: [],
  path: [
    {
      label: "걸어온 길",
      items: [
        "프로그래머스 데브코스를 수강하며 풀스택 기본 지식과 역량을 키웠습니다.",
        "외주 쇼핑몰 작업을 하였습니다. 그 과정에서 디자이너, 클라이언트와 미팅을 갖고 메신저로 소통하며 협업 능력과 일정 조율, 실시간 수정 사항 반영, 문제점 공유 등 실무 경험을 하였습니다.",
        "AI 네이티브 커리어 캠프를 수행하며 AI/AX 활용 능력을 키웠습니다. 캠프 과정에서 개인 프로젝트 3건과 6인 팀 프로젝트를 진행하며 기능 구현, 성능 개선, 서비스 배포 등을 경험했습니다.",
      ],
    },
  ],

  // 역량 : 역량마다 프로젝트 이름과 사례 문장(한 칸이 한 문장)
  competencies: [
    {
      skill: "React · TypeScript 개발",
      project: { name: "오락실 파인더", sub: "위치 기반 탐색 앱" },
      lines: [
        "GPS 갱신할 때마다 부모요소와 같이 다시 그려지던 지점 목록과 상세 패널을 useCallback으로 고정한 뒤 memo로 분리해 막았습니다",
      ],
    },
    {
      skill: "웹 성능 최적화",
      project: { name: "오락실 파인더", sub: "위치 기반 탐색 앱" },
      lines: [
        "지도가 느리게 출력되는 문제를 파악하였고, 뷰포트 컬링으로 초기 마커 동기화하여 지연시간을 622 → 156ms로 줄였습니다.",
      ],
    },
    {
      skill: "테스트와 품질 검증",
      project: { name: "오락실 파인더", sub: "위치 기반 탐색 앱" },
      lines: [
        "K6를 이용하여 부하 테스트를 하였습니다.",
        "라우트 핸들러 JSON을 brotli 비동기 압축하여 세션당 전송량을 줄였습니다.",
        "상관 서브쿼리를 CTE 집계로 바꿔 쿼리 버퍼를 44,042 → 163으로 줄였습니다. K6 10배 부하에서 p95 98.9 → 51.8ms(−48%)로 줄였습니다.",
      ],
    },
    {
      skill: "협업과 코드 통합",
      project: { name: "BANDIT", sub: "결정 사항 변경 에이전트 MCP" },
      lines: [
        "팀 프로젝트를 진행하며 서버 배포, DB 구축, 타입 병합을 맡아 프로젝트 기반을 다지는 데 기여하였습니다.",
        "팀원이 앱 코드로 만든 알림 규칙과 제가 DB에 만든 같은 규칙이 서로 다르게 동작하지 않도록, 팀원의 테스트 12가지 상황을 DB 검사로 그대로 옮겨 두 쪽 결과를 맞췄습니다.",
        "Build 트리거를 적용시켜 main에 머지될 때마다 자동으로 배포되도록 설정했습니다.",
      ],
    },
    {
      skill: "AI 도구 활용",
      project: { name: "한 줄 데스크", sub: "사내 문의 및 안내 보조 MCP" },
      lines: [
        "AI를 연결하기 위해 규칙을 선언하여 오답을 최소화하였습니다. 검증 문장 40개를 테스트하여 담당 부서가 잘못 나오는 5건을 0건으로 줄였습니다.",
        "AI는 읽기와 해석만 하도록 제약을 두어 데이터의 임의 수정을 막았습니다. 쓰기 권한은 권한을 가진 직급만 가능하도록 규칙을 정하여 AI가 데이터를 변경하는 리스크를 줄였습니다.",
      ],
    },
    {
      skill: "커뮤니케이션",
      project: { name: "외주", sub: "쇼핑몰 2곳 : Deeto, RANGE" },
      lines: [
        "Deeto, RANGE 퍼블리싱 작업을 하였습니다.",
        "디자이너와 클라이언트랑 소통하면서 일정 조율, 의견 교환, 디자인 시안 변경 등 여러 협업을 진행한 경험이 있습니다.",
      ],
    },
  ],

  // 성장 과정. 이력서 PDF의 "공백기" 카드는 내용을 쓰는 중이라 사이트에는 아직 싣지 않습니다.
  growth: [
    { stage: "학부", period: "2014.02 ~ 2021.02", name: "청주대학교", lines: ["컴퓨터 정보공학 전공"] },
    {
      stage: "풀스택 기초 역량",
      period: "2024.04 ~ 2024.10",
      name: "프로그래머스 데브코스",
      lines: [
        "TypeScript, Node.js, Docker 등 풀스택 역량 기초 학습",
        "팀원 한 명이 이탈, 일정과 업무 재분담으로 팀 프로젝트 완수",
      ],
    },
    {
      stage: "외주 진행 및 실무 협업",
      period: "2025.09 ~ 2026.03",
      name: "외주 쇼핑몰 2곳",
      lines: ["디자이너와 클라이언트랑 미팅과 메신저로 소통하며 업무를 진행", "몰 오픈 이후 지속적인 요구 사항 반영 및 보수 작업"],
      stack: "카페24 · Figma",
    },
    {
      stage: "AI/AX 활용능력 학습, 구현능력 향상",
      period: "2026.07 ~ 2026.09",
      name: "AI 네이티브 커리어 캠프 입과",
      lines: ["AI 프롬프트 작성 요령 학습, AX 활용 역량 강화", "개인 프로젝트 2건 진행"],
    },
    {
      stage: "AI 서비스 구현",
      period: "2026.10 ~ 2026.11",
      name: "AI 네이티브 커리어 캠프",
      lines: [
        "BANDIT 프로젝트 : 6인 팀 프로젝트 DB 설계, 서버 연결 및 배포",
        "한 줄 데스크 : 서버 연결 및 배포, AI를 붙인 서비스 구현",
      ],
    },
  ],
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
  // task · action · result 는 한 칸이 한 줄입니다. result 의 [첫 줄, 이어지는 줄] 은 글머리표 없이 아래에 이어 씁니다.
  projects: [
    {
      name: "오락실 파인더",
      sub: "위치 기반 서비스",
      detail: "/projects/arcade-finder",
      kind: "개인 프로젝트",
      period: "2026.08 ~ 2026.09",
      link: { label: "github.com/mick243/PrivateProject", href: "https://github.com/mick243/PrivateProject" },
      task: [
        "실시간 제보를 받으며 제보의 내용을 토대로 리듬게임 플레이어가 가고 있는 오락실 현황과 2순위, 3순위로 갈 오락실을 탐색해 선택에 도움을 주는 위치 기반 서비스",
      ],
      action: [
        "현재 화면에 보이는 구간 밖에 있는 지점의 마커는 출력하지 않고 저장해 두었다가 화면이 움직일 때 불러와 지도 렌더 부담을 줄임",
        "API 응답에 brotli 압축을 적용하여 서버 전송 용량 감소",
      ],
      result: ["초기 마커 동기화로 렌더 속도 622ms → 156ms로 개선.", "지도 API 응답 1.2MB → 90KB로 감소"],
      stack: "Next.js, React, TypeScript, PostgreSQL, Prisma, Vitest, k6, Naver Maps, Naver Cloud Platform",
      shot: { src: "/resume/arcade.jpg", alt: "오락실 파인더 지도 화면", caption: "지도 화면 : 화면 안에 들어온 마커만 표시" },
    },
    {
      name: "한 줄 데스크",
      sub: "사내 업무 보조 MCP",
      detail: "/projects/one-line-desk",
      kind: "개인 프로젝트",
      period: "2026.10 ~ 2026.11",
      link: { label: "one-line-desk.vercel.app", href: "https://one-line-desk.vercel.app" },
      task: ["회의실, 탕비실, 문의를 한 문장으로 묻고 실행 전 확인 화면으로 최종 승인 받는 사내 안내 데스크 앱 프로그램"],
      action: [
        "AI는 문장 해석과 항목 고르기만 맡기고 실제 쓰기나 수정은 사람이 확인한 뒤에만 실행",
        "역할별 화면을 나눠 불러오고(코드 분할) 설계 결정을 ADR로 갱신 및 기록하면서 진행",
      ],
      result: [
        "1,400건(웹 71건)의 테스트 통과",
        "사이트를 처음 열 때 브라우저가 받는 JS 파일의 용량 372kB → 334kB로 감소",
        "호출되는 AI에게 규칙을 적용하여 담당 팀 안내의 오답을 5건 → 0건(검증 문장 40개)으로 감소",
      ],
      stack: "React, TypeScript, Vite, Fastify, PostgreSQL, PGlite, Vitest, MCP, Fly.io",
      shot: {
        src: "/resume/one-line-desk.jpg",
        alt: "한 줄 데스크 회의실 후보 화면",
        caption: "회의실 화면 : 후보 카드에서 예약 전 한 번 더 확인",
      },
    },
    {
      name: "PetMediSearch",
      sub: "위치 기반 서비스",
      detail: "/projects/petmedisearch",
      kind: "개인 프로젝트 - 이전 프로젝트 리팩토링",
      period: "2026.09",
      link: {
        label: "github.com/mick243/PetMediSearch-rebuild",
        href: "https://github.com/mick243/PetMediSearch-rebuild",
      },
      task: [
        "2024년 프로그래머스 데브코스 과정에서 4인 팀으로 만든 반려동물 병원과 약국 찾기 앱을 UI/UX 개선 및 디자인 리팩토링, 일부 기능 추가",
      ],
      action: [
        "전국을 한 번에 받던 지도 요청을 화면 범위 조회와 서버 격자 집계로 바꾸어 렌더 응답을 줄였으며, 값이 없으면 통과하던 로그인 state 검증(CSRF 방지)과 DB 시각이 9시간 오차가 나던 것을 바로잡음",
      ],
      result: [
        "지도 응답 13MB → 1,221B(서울 전역 한 화면, 격자 집계)로 감소",
        "서버가 글을 전부 보내고 화면이 필요한 만큼 잘라 쓰던 것을, 서버가 필요한 쪽만 잘라 보내게 바꿔 게시글 응답을 30.7MB → 4.6KB(글 2만 건 시드)로 줄였습니다.",
        "k6 200 VU 부하에서 실패 0건(로컬 한 대)",
      ],
      stack: "React, TypeScript, Vite, Redux, Express, MySQL, k6, Kakao Map",
      shot: {
        src: "/resume/petmedisearch.jpg",
        alt: "PetMediSearch 홈과 지도 화면",
        caption: "홈 · 지도 화면 : 화면 범위 안 시설을 묶어 표시",
      },
    },
    {
      name: "BANDIT",
      sub: "결정 사항 변경 에이전트 MCP",
      detail: "/projects/bandit",
      kind: "팀 프로젝트 기반이 되는 서버 생성, DB 구축, 배포 클라우드 담당",
      period: "2026.10",
      // 이력서 PDF 는 이 칸을 포트폴리오 상세 페이지(= 위 detail)로 잇습니다. 그래서 바깥 링크는 두지 않습니다.
      link: null,
      task: [
        "팀 위키 내에 결정 사항을 AI가 MCP로 조회하고, 바뀐 사항이 있다면 해당 사항에 포함되는 담당자에게만 알리는 팀 위키",
      ],
      action: [
        "타입 통합, DB, MCP 서버를 만들어 팀 프로젝트의 기반을 구성",
        "오프라인으로 처음 열면 빈 화면이 뜨던 PWA 서비스 워커 버그 수정",
        "한글 파일 이름 깨짐으로 생긴 Cloud Run 배포 실패를 해결, 트리거를 이용하여 main에 머지가 되면 자동 배포 구성",
      ],
      result: [
        "서버 & DB 코드 157개 파일 PR & 머지",
        "한글이 깨진 파일 이름 5개 → 0개로 해결",
        "자동 배포 28번 모두 성공",
        "토큰이 화면에 찍히는 경로를 막아 토큰 노출 차단",
        [
          "Cloud Run 운영 서버의 성능을 측정했습니다.",
          "48시간 요청 2,511건, 응답 p50 0.22초, hooks p95 0.65초, 메모리 최대 약 200MiB, CPU 최대 26%",
        ],
      ],
      stack: "TypeScript, Node.js, MCP SDK, Supabase, PostgreSQL, Cloud Run, React, Vite, PWA",
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
      period: "2025.09 ~ 2026.03",
      points: [
        "Deeto : 퍼블리싱 담당 디자이너와 Figma를 이용한 디자인 변경 사항을 반영해 나가며 디자이너와 첫 협업 경험",
        "RANGE : 디자이너, 클라이언트와 미팅 및 소통하며 의견 및 일정 조율, UI/UX 구현과 쇼핑몰 전체 스타일을 구축, 지속적인 디자인이나 퍼블리싱 요구 사항 작업 중",
      ],
    },
  ],

  // 교육
  training: [
    {
      name: "AI 네이티브 커리어 캠프",
      sub: "Claude, Claude Code, Codex, Gemini",
      period: "2026.07 ~ 2026.11",
      points: [
        "프롬프트 설계와 템플릿, 체이닝으로 반복 작업 자산화",
        "데이터 보안, 환각 검증을 익혀 AI가 추론해낸 결과를 테스트해 보고 한 번 더 확인하는 습관으로 연결",
        "개인 프로젝트로 위치 기반 서비스인 오락실 파인더 제작, PetMediSearch 리팩토링, MCP 앱인 한 줄 데스크 작업, 6인 팀 프로젝트 BANDIT 서버 기반 구축, DB 설계, 서버 배포 담당",
      ],
    },
    {
      name: "프로그래머스 데브코스",
      sub: "TypeScript, Node.js, MySQL, Docker 등",
      period: "2024.04 ~ 2024.10",
      points: [
        "CS 지식 및 프론트엔드, 백엔드 개념 학습, Swagger를 이용한 API 명세와 JWT 구축 등 풀스택 실습",
        "8월 개인 미니 프로젝트(2주), 9~10월 팀 프로젝트 PetMediSearch(반려동물 병원 · 약국 찾는 위치 기반 서비스)",
        "팀원 한 명이 초기에 이탈하자 업무 재분담과 데일리 워크타임을 가지며 팀원과 업무 및 일정을 조정하여 프로젝트 완성",
      ],
    },
  ],
};
