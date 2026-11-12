# 강정민 포트폴리오 (Next.js)

이력서(v2.2) 내용을 기반으로 실제 경력·프로젝트 정보를 채운 개인 포트폴리오입니다.

## 페이지 구조

### `/` — 메인 (`app/page.js`)

한 페이지에 섹션을 쌓은 구조입니다. 순서는 히어로 → 소개 → 기술 스택 → 프로젝트
→ 교육 → 문의이고, 각 섹션은 `app/components/` 의 같은 이름 컴포넌트입니다.

- `Hero.js` — 히어로 + `profile.json` 터미널 패널(시그니처 요소)
- `About.js` — 소개. 큰 카드 ‘이력서 전문 보기’(`/resume`) + 작은 카드 Github · Notion. 카드 문구와 주소는 `portfolioData.js` 의 `aboutCards`
- `Skills.js` — 기술 스택 카드 그리드
- `Projects.js` — 프로젝트 카드 그리드 (썸네일 · 이름 · 한 줄 설명 · 대표 성과 · 기술 스택)
- `Education.js` — 교육 타임라인
- `Contact.js` — 문의 폼 (데모, 실제 전송 없음)
- `Process.js` — 진행 방식 3단계. `page.js` 에서 주석 처리돼 지금은 안 보입니다

### `/resume` — 이력서 전문 (`app/resume/page.js`)

이력서 PDF(v6)를 그대로 옮긴 한 장짜리 페이지입니다. 첫머리(걸어온 길 · 나아갈 길) ·
핵심역량 표 · 성장 과정 · 스킬 · 프로젝트 4건(Task · Action · Result · Stack) · 기타 경험 ·
교육 이수 순으로 싣고, 하단에서 `public/resume.pdf` 를 열 수 있습니다. 공개
페이지라 연락처 줄과 PDF 양쪽에서 전화번호를 빼고, PDF 에서는 증명사진도 뺐습니다.

### 없는 주소 — `app/not-found.js`

Next.js 기본 영어 404 대신, 같은 머리글 · 바닥글에 한국어 안내와 [홈으로] [프로젝트 보기]
버튼을 보여 줍니다. 문구는 `portfolioData.js` 의 `notFound` 에 있습니다.

### `/projects/<slug>` — 프로젝트 상세 (`app/projects/[slug]/page.js`)

`app/data/projects.js` 의 항목마다 정적 생성합니다 (현재 `arcade-finder`,
`petmedisearch`, `one-line-desk`, `bandit`, `outsourcing`). STAR · 진행한 작업 ·
작동 화면 · 트러블슈팅 · 배운 것 중 데이터가 있는 블록만 그리고, 목차도 그에 맞춰 만듭니다. STAR 는 단계마다 제목 한 줄과
두 줄 이내 본문만 둡니다. 작업 기록(`timeline`)은 데이터는 남기고 페이지에서 주석 처리해
두었습니다.

### `/projects/arcade-finder/viewport-culling` · `/projects/arcade-finder/server` — 딥다이브

오락실 파인더 상세의 Result 단계에서 성능 표 제목 옆 배지로 들어오는 페이지입니다.
클라이언트(뷰포트 컬링)와 서버(부하 시험 · 보안 · 출시 감사 · Prisma 이관 · 실서버)
두 편이고, 둘 다 `app/components/DeepDive.js` 가 그립니다. 맨 위에는 상세 페이지에서
그 페이지로 링크한 성능 표(`perf[].href` 가 데이터의 `path` 와 같은 표)를 다시 싣습니다.

### 페이지 밖

- `app/layout.js` — 루트 레이아웃, 메타데이터
- `app/globals.css` — 컬러 토큰 · 타이포 · 전 섹션 스타일
- `app/components/Header.js` · `Footer.js` — 모든 페이지 공통
- `app/components/Reveal.js` — 스크롤 시 등장하는 공용 애니메이션 래퍼
- `public/projects/<slug>/` — 카드 썸네일 · 작동 화면 스크린샷

## 내용을 고치는 곳

- **프로필 · 기술 스택 · 교육**: `app/data/portfolioData.js`
  - 히어로의 `profile.json` 터미널에 나오는 `stack` 은 기술 스택 섹션과
    같은 `skillGroups` 에서 생성됩니다. 한 곳만 고치면 둘 다 바뀝니다.
- **이력서 페이지**: `app/data/resume.js`
  - 내려받기용 PDF 는 `public/resume.pdf` 입니다. 이력서를 새로 쓰면 두 곳을
    같이 맞추세요.
- **프로젝트**: `app/data/projects.js`
  - `group` 이 프로젝트 섹션의 묶음을 정합니다: `personal`(개인) · `team`(팀) ·
    `outsourcing`(외주). 빠뜨리거나 모르는 값이면 개인 프로젝트로 들어갑니다.
  - `star` 는 Situation · Task · Action · Result 네 단계입니다.
  - `gallery[].tech` 는 작동 화면마다 붙는 기술 설명이고, 상세 페이지에서
    접이식 ‘구현 메모’ 로 렌더합니다.
  - 이미지는 `public/projects/<slug>/` 에 두고 경로만 적습니다.
  - `troubles` 는 트러블슈팅입니다. 한 건이 `title` · `problem` · `cause` · `fix` · `result`
    이고, 상세 페이지에서 문제 · 원인 · 해결 · 결과 순서로 렌더합니다(빈 칸은 건너뜁니다).
    내용은 Notion 의 회고 · 작업 기록에서 옮겼습니다.
    `visual` 은 그 아래 시각 자료입니다(`app/components/TroubleVisual.js`). `type: "compare"` 는
    `rows[]`(label · before · after · beforeText · afterText) 를 전 · 후 막대로, `type: "flow"` 는
    `before[]` · `after[]` 단계를 화살표 흐름으로 그립니다. 변화율은 자동 계산하고, 본문 숫자와
    반올림이 어긋나면 행에 `change` 를 적어 덮어씁니다.
- **딥다이브**: `app/data/viewportCulling.js` · `app/data/arcadeServer.js`
  - 절(`sections`)마다 블록을 쌓습니다. 블록 종류는 text · list · code · table · note 입니다.
  - 오락실 파인더 수치는 원본 저장소(`Desktop/claude/개인 프로젝트`)의 문서에서 옮긴
    값입니다. 여기서 다시 재지 말고, 파일 머리 주석의 출처를 확인하세요.

## 남은 작업

1. **`app/components/Contact.js`**: 지금은 제출해도 아무 데도 전송되지 않는 데모
   폼입니다. 실제 배포 시 API 라우트(`app/api/contact/route.js`)나 이메일 서비스
   (예: Resend, EmailJS)와 연결하세요.
2. **오락실 파인더 저장소 공개**: 현재 GitHub 링크는 프로필 페이지로 연결됩니다.
   저장소를 공개하면 `projects.js` 의 `links` 를 실제 저장소 URL로 바꾸세요.
3. **프로젝트 썸네일**: 외주 프로젝트 카드는 아직 SVG 플레이스홀더
   (`public/projects/outsourcing.svg`)입니다. 실제 이미지로 교체하세요.
4. **컬러/폰트**: `app/globals.css` 최상단 `:root` 변수만 바꾸면 전체 톤이
   바뀝니다 (`--bg-base`, `--accent-blue`, `--accent-cyan` 등).

## 디자인 컨셉

- **타이포**: 제목 · 본문 Pretendard(한글 · 라틴) / 코드 · 태그 · 날짜 Geist Mono (한글은 Pretendard 로 대체)
- **시그니처 요소**: 히어로의 `profile.json` 터미널 패널. 개발자 프로필을
  코드 형태로 보여주는 장치입니다.
