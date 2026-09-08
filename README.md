# 강정민 포트폴리오 (Next.js)

이력서(v2.2) 내용을 기반으로 실제 경력·프로젝트 정보를 채운 개인 포트폴리오입니다.

## 실행 방법

```bash
npm install
npm run dev
```

http://localhost:3000 접속.

프로덕션 빌드로 검증 완료(정상 빌드 확인).

## 폴더 구조

```
nextjs-portfolio-v2/
├── app/
│   ├── layout.js             # 루트 레이아웃, 메타데이터
│   ├── page.js               # 메인 페이지 조합
│   ├── globals.css           # 컬러 토큰 · 타이포 · 전 섹션 스타일
│   ├── data/
│   │   ├── portfolioData.js  # ★ 프로필 · 기술 스택 · 교육 · 진행 방식
│   │   └── projects.js       # ★ 프로젝트 상세 (STAR · 수치 · 성능 · 갤러리)
│   ├── projects/
│   │   └── [slug]/page.js    # 프로젝트 상세 페이지 (정적 생성)
│   └── components/
│       ├── Header.js         # 상단 내비게이션 (모바일 햄버거 메뉴 포함)
│       ├── Hero.js           # 히어로 + profile.json 터미널 패널(시그니처 요소)
│       ├── About.js          # 소개
│       ├── Skills.js         # 기술 스택 카드 그리드
│       ├── Projects.js       # 프로젝트 카드 그리드 (썸네일 · 이름 · 기술 스택)
│       ├── Education.js      # 교육 타임라인
│       ├── Process.js        # 진행 방식 3단계 (page.js 에서 주석 처리됨)
│       ├── Contact.js        # 문의 폼 (데모, 실제 전송 없음)
│       ├── Footer.js
│       └── Reveal.js         # 스크롤 시 등장하는 공용 애니메이션 래퍼
├── public/
│   └── projects/             # 카드 썸네일 · 작동 화면 스크린샷
├── package.json
└── next.config.mjs
```

메인 페이지 섹션 순서: 히어로 → 소개 → 기술 스택 → 프로젝트 → 교육 → 문의.

## 내용을 고치는 곳

- **프로필 · 기술 스택 · 교육**: `app/data/portfolioData.js`
  - 히어로의 `profile.json` 터미널에 나오는 `stack` 은 기술 스택 섹션과
    같은 `skillGroups` 에서 생성됩니다. 한 곳만 고치면 둘 다 바뀝니다.
- **프로젝트**: `app/data/projects.js`
  - `star` 는 Situation · Task · Action · Result 네 단계입니다.
  - `gallery[].tech` 는 작동 화면마다 붙는 기술 설명이고, 온점 기준으로
    줄바꿈해 렌더합니다 (`app/projects/[slug]/page.js` 의 `sentences()`).
  - 이미지는 `public/projects/<slug>/` 에 두고 경로만 적습니다.

## 남은 작업

1. **`app/components/Contact.js`**: 지금은 제출해도 아무 데도 전송되지 않는 데모
   폼입니다. 실제 배포 시 API 라우트(`app/api/contact/route.js`)나 이메일 서비스
   (예: Resend, EmailJS)와 연결하세요.
2. **오락실 파인더 저장소 공개**: 현재 GitHub 링크는 프로필 페이지로 연결됩니다.
   저장소를 공개하면 `projects.js` 의 `links` 를 실제 저장소 URL로 바꾸세요.
3. **AI Native Career Camp**: `portfolioData.js` 의 `education` 에 임시 값
   (`2026.09 ~ 진행 중`)이 들어 있습니다. 실제 기간과 내용으로 바꾸세요.
4. **프로젝트 썸네일**: 외주 프로젝트 카드는 아직 SVG 플레이스홀더
   (`public/projects/outsourcing.svg`)입니다. 실제 이미지로 교체하세요.
5. **컬러/폰트**: `app/globals.css` 최상단 `:root` 변수만 바꾸면 전체 톤이
   바뀝니다 (`--bg-base`, `--accent-blue`, `--accent-cyan` 등).

## 디자인 컨셉

- **타이포**: 제목 Space Grotesk / 본문 Inter / 코드·태그·날짜 JetBrains Mono
- **시그니처 요소**: 히어로의 `profile.json` 터미널 패널. 개발자 프로필을
  코드 형태로 보여주는 장치입니다.
