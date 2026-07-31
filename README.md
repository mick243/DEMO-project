# 포트폴리오 템플릿 (Next.js)

`실명, 실제 경력, 사진은 전혀 사용하지 않았습니다.

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
│   ├── layout.js            # 루트 레이아웃, 메타데이터
│   ├── page.js               # 전체 페이지 조합
│   ├── globals.css           # 컬러 토큰 · 타이포 · 전 섹션 스타일
│   ├── data/
│   │   └── portfolioData.js  # ★ 더미 데이터 (이름/경력/프로젝트 등) — 여기만 고치면 됨
│   └── components/
│       ├── Header.js         # 상단 내비게이션 (모바일 햄버거 메뉴 포함)
│       ├── Hero.js           # 히어로 + profile.json 터미널 패널(시그니처 요소)
│       ├── About.js          # 소개
│       ├── Skills.js         # 기술 스택 카드 그리드
│       ├── Career.js         # 경력 타임라인
│       ├── Projects.js       # 프로젝트 카드 그리드
│       ├── Process.js        # 문의→납품 진행 프로세스 6단계
│       ├── Contact.js        # 문의 폼 (데모, 실제 전송 없음)
│       ├── Footer.js
│       └── Reveal.js         # 스크롤 시 등장하는 공용 애니메이션 래퍼
├── package.json
└── next.config.mjs
```

## 실제 사용 시 커스터마이징할 곳

1. **`app/data/portfolioData.js`** — 이름(alias), 소개 문구, 스킬, 경력, 프로젝트를
   실제 정보로 교체하세요.
2. **`app/components/Contact.js`** — 지금은 제출해도 아무 데도 전송되지 않는 데모
   폼입니다. 실제 배포 시 API 라우트(`app/api/contact/route.js`)나 이메일 서비스
   (예: Resend, EmailJS)와 연결하세요.
3. **프로젝트 이미지** — 지금은 이미지 없이 텍스트/태그 카드로만 구성했습니다.
   실제 스크린샷을 넣고 싶다면 `Projects.js`의 카드에 `<img>` 또는 `next/image`를
   추가하면 됩니다.
4. **컬러/폰트** — `app/globals.css` 최상단 `:root` 변수만 바꾸면 전체 톤이
   바뀝니다 (`--bg-base`, `--accent-blue`, `--accent-cyan` 등).

## 디자인 컨셉

- **컬러**: 딥네이비 배경(`#0B1120`) + 블루(`#4C7EFF`) · 시안(`#33D2C0`) · 앰버(`#FFB84D`) 포인트
- **타이포**: 제목 Space Grotesk / 본문 Inter / 코드·태그·날짜 JetBrains Mono
- **시그니처 요소**: 히어로의 `profile.json` 터미널 패널 — 개발자 프로필을
  코드 형태로 보여주는 장치
