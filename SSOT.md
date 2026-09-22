# DEMO-project (강정민 포트폴리오) — 프로젝트 SSOT

> **기준 시각: 2026-09-22**
> 근거: git 브랜치 8개 · 워크트리 5개 전수 · 원격(`mick243/DEMO-project`) 동기 상태 · 트리 mtime · 콘텐츠 파일 실측.
>
> **2026-09-22 신설** — 이 문서를 처음 세웠습니다. 개인 프로젝트(오락실 파인더)의 SSOT 체계를 그대로 들여왔고, 갱신 규칙은 `.claude/rules/daily-ssot-update.md`(매일 18:50) 입니다. 전 절을 오늘 직접 재서 채웠습니다.
>
> 이 문서는 **지금 상태**의 단일 출처입니다. 페이지 구조와 컴포넌트 설명은 `README.md` 가 정본이고, 아래 §1 에 그 지도를 둡니다.

---

## 0. 30초 요약

- **무엇** — 이력서(v2.2)를 기반으로 실제 경력·프로젝트를 채운 개인 포트폴리오 사이트. Next.js 14.2.5 (App Router) + React 18, 빌드 도구·상태관리·CSS 프레임워크 없이 `app/globals.css` 하나로 갑니다. 저장소는 **공개**(`github.com/mick243/DEMO-project`, 기본 브랜치 `master`).
- **어디까지** — 메인 한 페이지(히어로 → 소개 → 기술 스택 → 프로젝트 → 교육 → 문의) + 이력서 전문(`/resume`) + 프로젝트 상세(`/projects/[slug]`) + 딥다이브 한 편(`/projects/arcade-finder/viewport-culling`). **콘텐츠가 곧 제품**이고, 코드는 그 콘텐츠를 싣는 틀입니다.
- **가장 중요한 현재 사실 3가지**
  1. **오늘도 움직였습니다.** `master` = `5a62349`(09-22), `origin/master` 와 **완전히 동기**(0 앞 · 0 뒤). 오늘 커밋 2개 — 뷰포트 컬링 딥다이브로 들어가는 길을 성능 표에 냈고(`23a794a`), PR #9 로 병합했습니다. 09-18 이후 닷새 연속 작업이 들어왔습니다. → §2
  2. **미커밋 작업은 없습니다.** 워크트리 5개(주 체크아웃 + `.claude/worktrees/` 4개)가 전부 깨끗하고, 주 체크아웃에 **미추적 파일 `.gitignore.txt` 한 개**만 있습니다. 내용이 `.claude/` 한 줄뿐인 **셸 리다이렉트 사고의 잔재**로 보입니다. → §2 · §8 R1
  3. **병합 대기로 보이는 3커밋은 실은 옛 이력입니다.** `claude/git-push-large-folder-836cf9` 의 3커밋은 전부 **2026-09-01**, 즉 node_modules 를 이력에서 걷어내기 전의 것입니다(`큰 폴더 업로드` 등). 살릴 작업이 아니라 정리 대상입니다. → §2 · §9
- **테스트는 없습니다** — `package.json` 에 `dev` · `build` · `start` 뿐이고 `test` · `lint` 스크립트가 없습니다. 품질은 **눈으로 보는 것**과 빌드 통과에 걸려 있습니다. → §7 · §8 R2
- **다음 한 걸음** — `.gitignore.txt` 를 지우고, 09-01 잔재 브랜치 1개를 정리할지 판정. → §9

---

## 1. 무엇의 정본이 어디에 있는가

| 알고 싶은 것 | 정본 | 위치 | 최신성 |
|---|---|---|---|
| **지금 상태 · 수치 · 미해결** | **이 문서** | `SSOT.md` (master 루트) | 2026-09-22 |
| **이 문서를 갱신하는 규칙** | `.claude/rules/daily-ssot-update.md` | master | 2026-09-22 |
| 페이지 구조 · 컴포넌트 역할 | `README.md` | master | 2026-09-21 |
| **화면에 뜨는 글·수치** | `app/data/*.js` (`projects.js` · `resume.js` · `viewportCulling.js`) | master | 항상 |
| 갤러리 캡션 ↔ 스크린샷 대응 | `app/data/projects.js` 의 `gallery[].caption` | master | 항상 |
| 스크린샷 다시 찍는 법 | (저장소 밖) Claude 메모리 `demo-project-screenshots` | — | 2026-09-21 |
| 원격 · PR 이력 | `github.com/mick243/DEMO-project` | 원격 | 항상 |

---

## 2. 지금 어디에 있나 — 브랜치와 워크트리

| 브랜치 | HEAD | 워크트리 | master 대비(앞/뒤) | 상태 |
|---|---|---|---|---|
| **`master`** | `5a62349` (09-22) | **주 체크아웃** (미추적 1) | — | **정본.** `origin/master` 와 동기(0/0) |
| `claude/git-push-large-folder-836cf9` | `2c67a58` (09-01) | 있음 (깨끗) | 3 앞 / 23 뒤 | ⚠ **옛 이력.** 3커밋 전부 09-01 · node_modules 정리 이전. 살릴 작업 아님 → **정리 후보** |
| `backup/master-with-node_modules-6361533` | `6361533` (09-07) | 없음 | 6 앞 / 21 뒤 | 🔒 **일부러 남긴 백업** — 정리 전 이력. `.git` 73MB 의 주된 이유 |
| `backup/pre-cleanup-5bf6fb2` | `5bf6fb2` (09-04) | 없음 | 5 앞 / 21 뒤 | 🔒 **일부러 남긴 백업** |
| `claude/git-push-rejected-error-c5d7bb` | `e3723b6` (09-04) | 있음 (깨끗) | 0 앞 / 20 뒤 | ✅ 병합 완료 — **삭제 후보** |
| `claude/outsourcing-projects-a82409` | `557627e` (09-08) | 있음 (깨끗) | 0 앞 / 16 뒤 | ✅ 병합 완료(PR #2) — **삭제 후보** |
| `claude/performance-dashboard-f6624d` | `a11150d` (09-07) | 없음 | 0 앞 / 18 뒤 | ✅ 병합 완료(PR #1) — **삭제 후보** |
| `claude/terminal-body-cleanup-e815e6` | `3c42c4a` (09-18) | 없음 | 0 앞 / 13 뒤 | ✅ 병합 완료(PR #3) — **삭제 후보** |

워크트리는 위 표의 것 넷에 더해 `.claude/worktrees/affectionate-poitras-14f106`(`3c234d5` detached)가 있어 **모두 5개**입니다. 전부 `git status --short` 가 비어 있습니다.

### 2026-09-22 상태

- **오늘 커밋 2개** — `23a794a`(성능 표에서 뷰포트 컬링 딥다이브로 들어가는 길) · `5a62349`(PR #9 병합). 둘 다 원격에 올라가 있습니다.
- **닷새 연속 작업** — 09-18 기술 스택 정리·오락실 파인더 상세 재작성(PR #3), 09-21 갤러리 12장 재촬영(PR #4) · 이력서 PDF 를 `/resume` 페이지로(PR #5) · README 를 페이지 구조로(PR #6) · 버튼/링크 화살표 제거(PR #7 · #8), 09-22 딥다이브 연결(PR #9).
- **작업 방식은 전부 PR** — 09-07 이후 `master` 직접 커밋이 없고 아홉 번 모두 브랜치 → PR → 병합입니다.
- **트리 mtime 은 2026-09-22 11:25** 로 뭉쳐 있습니다. 오늘 병합 후 체크아웃이 파일을 다시 쓴 흔적이고, 작업 시각이 아닙니다.

### ⚠ 여기서 나오는 함정

- **브랜치가 "3커밋 앞" 이라고 병합 대기인 것이 아닙니다.** `git-push-large-folder-836cf9` 는 이력 정리 이전 가지라 앞선 3커밋이 옛 파일(대용량 포함)입니다. 병합하면 걷어낸 것을 도로 들입니다.
- `backup/*` 두 개는 **지우면 안 되는 것**입니다. 정리 전 이력의 유일한 사본입니다.

---

## 3. 스택과 실행

| 항목 | 값 |
|---|---|
| 프레임워크 | Next.js **14.2.5** (App Router, `app/`) |
| 런타임 | React 18.3 · React DOM 18.3 |
| 스타일 | `app/globals.css` 한 장 (프레임워크 없음) |
| 의존성 | 위 셋이 전부. devDependencies 없음 |
| 실행 | `npm run dev` / `npm run build` / `npm run start` |
| 배포 | Vercel (원격 `master` 기준) |

---

## 4. 콘텐츠 실측 (2026-09-22)

이 저장소에는 DB 가 없습니다. **수치는 콘텐츠 파일을 직접 센 값**입니다.

| 축 | 값 | 근거 |
|---|---|---|
| 프로젝트 | **2개** — `arcade-finder` · `outsourcing` | `app/data/projects.js` 의 `slug` |
| 갤러리 이미지 | **12장** (`01-map` ~ `11-post-video` + `thumb`) | `public/projects/arcade-finder/` 파일 수 |
| 갤러리 캡션 | **11개** | `projects.js` 의 `caption` 수 — `thumb` 은 캡션 없음, 정상 |
| 라우트 | **4개** — `/` · `/resume` · `/projects/[slug]` · `/projects/arcade-finder/viewport-culling` | `app/**/page.js` |
| 데이터 파일 | 3개 — `projects.js` · `resume.js` · `viewportCulling.js` | `app/data/` |
| 저장소 크기 | `.git` **73MB** | `du -sh .git` — 백업 브랜치의 node_modules 이력 때문 |

---

## 5. 기능 현황

### 되는 것

- **메인** — 히어로(+`profile.json` 터미널 패널) · 소개 · 기술 스택 · 프로젝트 카드 · 교육 타임라인 · 문의 폼.
- **`/resume`** — 이력서 전문. 소개 섹션에서 연결됩니다. PDF 는 `public/resume.pdf`.
- **`/projects/[slug]`** — 프로젝트 상세 2종. 오락실 파인더는 09-18 에 **저장소 실제 기록 기준으로 다시 쓰였습니다**.
- **딥다이브** — `/projects/arcade-finder/viewport-culling`. 09-22 에 성능 표에서 들어가는 길이 났습니다.
- **갤러리** — 오락실 파인더 12장, 09-21 에 지금 실행 화면으로 전부 다시 찍었습니다.

### 반쪽인 것

- **문의 폼** — 데모입니다. 실제 전송이 없습니다(`README.md` 명시).
- **`Process.js`** — 진행 방식 3단계 컴포넌트가 `app/page.js` 에서 **주석 처리**돼 화면에 없습니다.

### 없는 것 (의도적)

- 테스트 · 린트 · 타입스크립트. 콘텐츠 사이트라 두지 않았습니다(§8 R2 에 그 대가를 적어 둡니다).

---

## 6. 성능

- **이 저장소에서는 재지 않습니다.** 정적 페이지 넷이고 외부 호출이 없습니다.
- 사이트에 실린 성능 수치(`viewportCulling.js` 등)는 **오락실 파인더 쪽 측정값을 옮겨 실은 콘텐츠**입니다. 그 정본은 개인 프로젝트의 `PERFORMANCE.md` 이고, 이 문서가 보증하지 않습니다. → §10

---

## 7. 품질

| 대상 | 명령 | 결과 |
|---|---|---|
| 테스트 | — | **없음** (`package.json` 에 `test` 스크립트 없음) |
| 린트 | — | **없음** |
| 빌드 | `npm run build` | 갱신 작업에서는 돌리지 않습니다 |

품질 확인은 지금 **브라우저로 보는 것**에 전적으로 걸려 있습니다.

---

## 8. 리스크와 미해결

| # | 내용 | 근거 | 상태 |
|---|---|---|---|
| **R1** | 주 체크아웃에 미추적 `.gitignore.txt` — 내용이 `.claude/` 한 줄. 셸 리다이렉트 사고의 잔재로 보입니다 | 2026-09-22 `git status --short` | 미해결 — 지우면 됩니다 |
| **R2** | 테스트·린트가 없어 회귀를 잡을 자동 장치가 전혀 없습니다. 콘텐츠 사이트라 감수한 것이지만, 페이지가 넷으로 늘었고 데이터 파일이 셋입니다 | `package.json` | 미해결 — 감수 중 |
| **R3** | `.git` 73MB. 백업 브랜치 둘이 node_modules 이력을 붙들고 있습니다. 공개 저장소라 클론 비용이 그대로 남습니다 | `du -sh .git` · 브랜치 표 | 미해결 — 백업을 언제 놓을지의 문제 |
| **R4** | 사이트에 실린 성능 수치의 정본이 **다른 저장소**에 있습니다. 그쪽이 바뀌어도 여기는 모릅니다 | §6 · §10 | 미해결 |

---

## 9. 다음 작업 (권장 순서)

1. **`.gitignore.txt` 삭제** — 미추적 잔재. (R1)
2. **`claude/git-push-large-folder-836cf9` 정리 판정** — 3커밋이 전부 09-01 정리 이전 것이라 병합 대상이 아닙니다. 워크트리와 함께 지울지 결정. (§2)
3. **병합 완료 브랜치 4개 정리 제안** — `git-push-rejected-error-c5d7bb` · `outsourcing-projects-a82409` · `performance-dashboard-f6624d` · `terminal-body-cleanup-e815e6`. 전부 자기 커밋 0.
4. **백업 브랜치 둘을 언제까지 둘지 결정** — 놓으면 `.git` 이 크게 줄고, 놓으면 정리 전 이력은 영영 없어집니다. (R3)
5. 오락실 파인더 쪽 수치가 바뀌면 `viewportCulling.js` · 프로젝트 상세를 따라 고치기. (R4)

> 2 · 3 · 4 는 **사용자 결정 사항**입니다. 이 문서의 갱신 규칙은 병합·삭제를 스스로 하지 않습니다.

---

## 10. 고쳐야 할 문서 진술 (드리프트 목록)

| 문서 | 진술 | 실제 |
|---|---|---|
| `README.md` | `Process.js` — 진행 방식 3단계 | 맞습니다. 주석 처리 상태라는 것까지 적혀 있습니다 |
| 사이트 콘텐츠(`app/data/`) | 오락실 파인더의 기능·성능 수치 | **다른 저장소의 값**을 옮겨 실은 것입니다. 이 문서가 보증하지 않습니다 → §6 · R4 |

---

## 부록 A. 지켜야 할 로컬 운용 규칙

- **`backup/*` 브랜치는 지우지 않습니다.** 정리 전 이력의 유일한 사본입니다.
- 다른 워크트리의 파일은 읽기만 합니다.
- 갱신 작업에서 빌드·배포는 하지 않습니다.
- 공개 저장소입니다. **커밋에 개인 정보·키가 섞이지 않는지** 매번 봅니다.

---

## 부록 B. 실측 재현 명령

브랜치·워크트리·원격 동기 상태:

```bash
git worktree list && git rev-list --left-right --count master...origin/master
```

브랜치마다 master 대비 앞뒤:

```bash
for b in $(git for-each-ref --format='%(refname:short)' refs/heads/); do printf "%-52s " "$b"; git rev-list --left-right --count master...$b; done
```

콘텐츠 수치:

```bash
grep -c "slug:" app/data/projects.js && ls public/projects/arcade-finder | wc -l && find app -name "page.js"
```
