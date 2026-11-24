// 「서버: 부하 시험부터 실서버까지」 페이지 내용입니다.
//
// 상세 페이지(app/projects/[slug]/page.js) Result 단계의 서버 성능 표 제목에서 링크로 들어옵니다.
// 수치는 원본 저장소(Desktop/claude/개인 프로젝트)의 문서에서 옮겼고, 여기서 다시 측정하지 않았습니다.
//   - 성능: arcade-finder/PERFORMANCE.md 1~5부 (2026.08.25 ~ 09.15)
//   - 보안: arcade-finder/docs/SECURITY.md · 출시 감사: docs/QA-LAUNCH-READINESS.md · docs/DEBUG-SWEEP.md
//   - Prisma 이관: docs/PRISMA-MIGRATION.md · 실서버: deploy/ncp/README.md · 지금 상태: SSOT.md (2026.10.02)
//   - 배포 중 고친 것: 커밋 099cf0d · 79f4a6f · CSP 위반 263건: 커밋 de6da6a
//   - 10.03 이후(11절): github.com/mick243/PrivateProject PR #17 ~ #33 본문 (2026.11.23 대조)
//   - 11.24 재측정(12절): PERFORMANCE.md 6부 · 6-2 · 커밋 cdf6db37e · c3dba72 본문. health 코드는 c3dba72 의 lib/health.ts 에서 줄여 옮겼습니다.
//
// 블록 종류와 그리는 방식은 viewportCulling.js 와 같습니다 (components/DeepDive.js).
// code 블록은 원본 저장소(개인 프로젝트/arcade-finder, 커밋 5368176 · 2026.11.22)의 파일에서 줄 번호로 그대로 읽어 옮겼습니다.

export const arcadeServer = {
  slug: "arcade-finder",
  // 상세 페이지 성능 표의 href 와 같아야 그 표를 맨 위에 다시 싣습니다.
  path: "/projects/arcade-finder/server",
  eyebrow: "Deep dive",
  title: "서버 : 부하 시험부터 실서버까지",
  description:
    "오락실 파인더 서버에서 한 일. k6 로 다섯 번에 나눠 측정한 성능, 보안과 출시 전 감사, Prisma 이관과 실서버 기동, 그 뒤의 감시 · 보안 · 배포 보강과 출시 전 재측정 · 복구 리허설까지 원본 기록과 함께 정리했습니다.",
  lede: "8월 24일 발표 뒤 서버에서 한 일을 정리했습니다. 목표 사용자를 정하고 다섯 번에 나눠 측정한 성능, 있다고 믿었던 방어를 다시 본 보안, 출시를 막던 Blocker 9개, Prisma 이관과 실서버 기동, 10월 이후 더한 감시 · 보안 · 배포 보강, 그리고 11월 24일 출시 전에 다시 잰 부하와 복구 리허설까지입니다.",

  meta: [
    { dt: "기간", dd: "2026.08.24 ~ 11.24" },
    { dt: "구성", dd: "Next.js 16 라우트 핸들러 43개 · PostgreSQL 18 · Prisma 7" },
    { dt: "측정 도구", dd: "k6(부하 시험 도구) · pg_stat_*(DB 가 스스로 남기는 상태 표) · 이벤트 루프 지연 계측" },
    { dt: "원본 기록", dd: "PERFORMANCE.md 1~6부 · SECURITY.md · QA-LAUNCH-READINESS.md · SSOT.md · PrivateProject PR #17 ~ #33" },
  ],

  // 표 자체는 projects.js 에서 href 가 path 와 같은 성능 표를 그대로 다시 씁니다 (수치를 두 곳에 적지 않습니다).
  summaryNote:
    "위 표는 상세 페이지의 서버 성능 표를 그대로 다시 실은 것입니다. 전부 2026.09.11 까지 로컬 PostgreSQL 에서 측정한 값이고, Prisma 로 옮긴 09.29 와 실서버(서버 프로그램 1개 · DB 연결 5개)를 연 09.30 이후로는 같은 조건으로 다시 재지 않았습니다. 11.24 에 1GB 리허설 서버에서 다시 잰 부하는 12절에 따로 실었습니다. 각 절의 코드는 원본 저장소의 파일에서 그대로 옮겼고, 줄인 곳은 // … 로 표시했습니다.",

  // 처음 보는 용어를 한곳에 풀어 둡니다(components/DeepDive.js 가 요약표 아래에 그립니다).
  glossary: [
    {
      group: "측정",
      items: [
        { term: "부하 시험 · k6", plain: "가짜 사용자 여러 명이 동시에 접속하는 것처럼 요청을 보내 서버가 얼마나 버티는지 재는 시험입니다. k6 는 그 시험에 쓴 도구입니다." },
        { term: "VU", plain: "부하 시험에서 동시에 접속한 가상 사용자 한 명입니다. 200 VU 는 가상 사용자 200명입니다." },
        { term: "p95", plain: "요청 100번 중 95번이 이 시간 안에 끝난다는 뜻입니다. 평균보다 느린 쪽을 보여 줍니다." },
        { term: "req/s · 처리량", plain: "1초에 처리한 요청 수입니다. 한계 처리량을 ‘천장’이라고도 적었습니다." },
        { term: "이벤트 루프 지연", plain: "Node 는 일을 한 줄로 세워 하나씩 처리합니다. 앞 작업이 길어서 뒤 작업이 기다린 시간입니다." },
        { term: "병목", plain: "전체 속도를 가로막는 가장 좁은 구간입니다." },
      ],
    },
    {
      group: "서버와 DB",
      items: [
        { term: "라우트 핸들러", plain: "/api/… 같은 주소로 온 요청을 받아 답을 만드는 서버 코드 조각입니다." },
        { term: "커넥션 풀", plain: "DB 와의 연결을 미리 몇 개 열어 두고 돌려 쓰는 통입니다. 풀 상한은 동시에 열 수 있는 연결 수의 최대치입니다." },
        { term: "캐시", plain: "한 번 구한 답을 잠깐 저장해 두었다가, 같은 질문이 오면 다시 계산하지 않고 내주는 것입니다." },
        { term: "프로세스 · 인스턴스", plain: "서버 프로그램을 하나 실행한 것입니다. 여러 개를 띄우고 앞의 프록시가 요청을 돌아가며 나눠 주면 더 많이 처리할 수 있습니다." },
        { term: "brotli · gzip", plain: "응답을 줄여서 보내는 압축 방식입니다. 보내는 양이 줄어 느린 회선에서 특히 도움이 됩니다." },
        { term: "상관 서브쿼리", plain: "바깥 쿼리의 행 하나마다 다시 실행되는 안쪽 쿼리입니다. 행이 939개면 939번 돕니다." },
        { term: "CTE", plain: "쿼리 안에서 먼저 계산해 이름을 붙여 둔 임시 결과표입니다. 같은 계산을 한 번만 하게 해 줍니다." },
        { term: "뷰", plain: "자주 쓰는 조회 규칙을 이름 붙여 저장해 둔 가상의 표입니다." },
        { term: "인덱스", plain: "책의 찾아보기처럼, DB 가 원하는 행을 빨리 찾게 해 주는 색인입니다. 부분 인덱스는 조건에 맞는 행만 담습니다." },
        { term: "버퍼", plain: "DB 가 데이터를 읽는 덩어리(보통 8KB)입니다. 버퍼 수가 적을수록 읽는 양이 적습니다." },
        { term: "append-only", plain: "지우거나 덮어쓰지 않고 새 기록만 계속 덧붙이는 방식입니다." },
        { term: "외래키 · CHECK", plain: "표끼리 값이 어긋나거나 허용되지 않는 값이 들어오는 것을 DB 가 막아 주는 규칙입니다." },
        { term: "ORM · Prisma · TypedSQL", plain: "ORM 은 SQL 을 직접 쓰지 않고 코드로 DB 를 다루게 해 주는 도구이고, Prisma 가 그중 하나입니다. TypedSQL 은 직접 쓴 SQL 에 타입 검사를 붙여 주는 Prisma 기능입니다." },
        { term: "마이그레이션", plain: "DB 구조를 바꾸는 작업을 순서대로 기록해 두고 적용하는 것입니다." },
        { term: "폴백", plain: "문제가 생겼을 때 대신 쓰는 대체 경로입니다." },
      ],
    },
    {
      group: "보안",
      items: [
        { term: "해시", plain: "비밀번호를 원래 값을 알 수 없게 바꿔 저장하는 방식입니다. scrypt 가 그 방식의 이름입니다." },
        { term: "OAuth · PKCE", plain: "구글 같은 외부 계정으로 로그인하는 표준 방식입니다. state 와 PKCE 는 로그인 도중에 요청이 위조되거나 가로채이는 것을 막는 장치입니다." },
        { term: "X-Forwarded-For", plain: "프록시를 거쳐 온 요청에 원래 접속자 주소를 적어 주는 머리글입니다. 보내는 사람이 마음대로 바꿀 수 있어서 그대로 믿으면 안 됩니다." },
        { term: "오픈 리다이렉트", plain: "로그인 뒤 이동할 주소를 조작해 사용자를 엉뚱한 사이트로 보내는 취약점입니다." },
        { term: "CSP", plain: "브라우저가 허용된 출처의 스크립트와 자원만 쓰게 하는 보안 규칙입니다." },
        { term: "응답 번호 429 · 4xx · 500", plain: "서버가 돌려주는 상태 번호입니다. 429 는 요청이 너무 잦다는 뜻, 4xx 는 요청이 잘못됐다는 뜻, 500 은 서버 쪽 오류입니다." },
        { term: "프롬프트 인젝션", plain: "글 속에 숨긴 지시로 AI 챗봇을 엉뚱하게 움직이게 하는 공격입니다." },
        { term: "Blocker", plain: "출시 전에 반드시 고쳐야 하는 가장 심각한 등급입니다." },
      ],
    },
    {
      group: "배포와 운영",
      items: [
        { term: "systemd · Caddy", plain: "systemd 는 리눅스에서 프로그램을 켜 두고 꺼지면 다시 켜 주는 관리자입니다. Caddy 는 HTTPS 를 자동으로 처리해 주는 웹 서버입니다." },
        { term: "CI", plain: "코드를 올릴 때마다 타입 검사 · 테스트 · 빌드를 자동으로 돌려 주는 장치입니다." },
        { term: "Grafana · Prometheus", plain: "서버 상태를 숫자(지표)로 모아 그래프와 알림으로 보여 주는 도구입니다. 시계열은 시간에 따라 기록되는 숫자 한 줄입니다." },
        { term: "웹훅", plain: "어떤 일이 생기면 약속된 주소로 알림 요청을 자동으로 보내 주는 방식입니다." },
        { term: "하드링크", plain: "같은 파일에 이름을 두 개 붙인 것입니다. 한쪽을 지워도 다른 이름이 남아 있으면 공간이 비지 않습니다." },
        { term: "헬스체크", plain: "서버가 살아 있고 일할 수 있는지 알려 주는 주소(/api/health)입니다. 앞의 프록시와 배포 스크립트가 이 답을 보고 서버를 쓸지 정합니다." },
        { term: "복구 리허설", plain: "백업을 실제로 되살려 보는 연습입니다. 백업이 있어도 되살릴 수 없으면 소용이 없어서, 미리 풀어 보고 내용이 맞는지 확인합니다." },
        { term: "무중단 재기동", plain: "서버 프로그램을 한꺼번에 끄지 않고 하나씩 다시 띄워서, 그동안에도 서비스가 끊기지 않게 하는 방식입니다." },
        { term: "스테이징 · e2e 테스트", plain: "스테이징은 실서비스와 같은 구성으로 미리 시험해 보는 별도 환경입니다. e2e 테스트는 사용자가 쓰는 흐름을 처음부터 끝까지 눌러 보는 시험입니다." },
      ],
    },
  ],

  sections: [
    {
      id: "stack",
      eyebrow: "01 · Stack",
      title: "별도 서버 없이, 라우트 핸들러 43개",
      desc: "2026.10.02 기준 서버 구성입니다.",
      blocks: [
        {
          kind: "table",
          head: ["층", "지금"],
          rows: [
            ["실행 환경", "Next.js 16 의 라우트 핸들러(주소별로 요청을 받아 답을 만드는 코드) 43개. 전부 Node 에서 요청이 올 때마다 그 자리에서 답을 만듭니다"],
            ["DB", "PostgreSQL 18 · 테이블 34 + 뷰 2 · 외래키 42"],
            ["DB 접근 코드", "Prisma 7(코드로 DB 를 다루게 해 주는 도구, 09.29 이관). 직접 쓴 SQL 이 나은 쿼리 9개는 TypedSQL 로 남김"],
            ["인증", "scrypt 로 해시(원래 값을 알 수 없게 변환) · 서명한 세션 쿠키 · OAuth(외부 계정 로그인, state + PKCE 로 위조 방지) · 로그인을 한꺼번에 무효로 만드는 token_epoch"],
            ["프로세스", "얇은 프록시(요청을 돌아가며 나눠 주는 라운드로빈) 뒤에 next start 인스턴스(서버 프로그램) N개. 권고는 2개 × 풀 10, 실서버는 1개 × 풀 5"],
            ["배포", "네이버 클라우드 Micro 1대(1vCPU · 1GB) · Caddy(HTTPS 처리) · systemd(프로그램 실행 관리) · 월 약 4,400원"],
            ["백업 · 계측", "매일 04:00 DB 덤프와 첨부를 묶어 14일 보관(11.11 부터 7일) · /api/health(살아 있는지 확인하는 주소) 와 OpenTelemetry 스팬(요청이 구간별로 걸린 시간 기록)"],
          ],
        },
      ],
    },
    {
      id: "schema",
      eyebrow: "02 · Schema",
      title: "규칙은 DB 구조(스키마)에 두었습니다",
      desc: "제보로 굴러가는 서비스라, ‘지금 상태’를 어디서 만들지가 서버 설계의 중심이었습니다.",
      blocks: [
        {
          kind: "list",
          items: [
            "제보는 덮어쓰지 않고 쌓기만 합니다(append-only). ‘지금 대기’와 ‘기체 컨디션’은 뷰(저장해 둔 조회 규칙) 두 개가 그때그때 계산합니다.",
            "대기 제보는 240분이 지나면 기록(행)째 지웁니다. 기준 시각은 앱이 아니라 DB 의 now() 이고, 정해진 시간에 도는 청소 프로그램(스케줄러) 없이 제보를 쓸 때와 피드를 읽을 때 정리합니다. 정리 쿼리는 부분 인덱스(조건에 맞는 행만 담은 색인)를 써서 3.809 → 0.458ms.",
            "기체 1대를 1행으로 둡니다. 대수를 숫자 한 칸에 두면 ‘2대 중 한쪽 발판만 죽은 오락실’을 담을 자리가 없습니다.",
            "AI 가 추정한 보유 기종은 별도 테이블에 두고, 제보가 몇 건 모이면 정보를 바꿀지 정한 기준(반영 임계값)에도 세지 않습니다. 섞으면 기종 필터와 개수가 조용히 거짓이 됩니다.",
            "유효기간 · 임계값 · 등급 · 말머리는 코드에 박아 둔 값이 아니라 설정 테이블에 두어, 새로 배포하지 않고도 조정합니다.",
            "미클리어 투표는 복합 외래키(두 칸을 함께 맞춰 보는 연결 규칙)로, 제보 종류별 필드는 CHECK(허용된 값만 들어오게 하는 규칙)로 DB 가 막습니다. 규칙을 어기면 서버 오류(500)가 아니라 잘못된 요청(4xx)으로 바꿔 돌려줍니다.",
          ],
        },
      ],
    },
    {
      id: "pool",
      eyebrow: "03 · 1부 · 08.24 ~ 08.26",
      title: "커넥션이 정확히 풀 상한에 붙어 있었습니다",
      desc: "실서비스용으로 만든 빌드에 k6 로 가상 사용자 20명(20 VU)과 200명(200 VU)이 접속하는 부하를 걸었습니다.",
      blocks: [
        {
          kind: "text",
          text: "쿼리는 5~25ms 였고 Node CPU 와 Postgres 에는 여유가 있었습니다. pg_stat_activity(DB 에 지금 연결된 것을 보여 주는 표)를 보니 연결(커넥션) 수가 풀 상한(미리 열어 둔 연결 수의 최대치)에 정확히 붙어 있었습니다. 요청이 쿼리가 끝나길 기다린 것이 아니라 빈 연결이 나기를 기다리고 있었습니다.",
        },
        {
          kind: "list",
          items: [
            "풀 상한 10 → 30",
            "참조 데이터(게임 · 레벨처럼 잘 안 바뀌는 목록) 캐시 5분. 결과값이 아니라 ‘진행 중인 요청(Promise)’을 담아 두어, 동시에 들어온 같은 질문(캐시 미스)을 쿼리 하나로 합칩니다.",
            "게시글 목록과 총계(전체 글 수)를 나누고 인덱스(찾아보기 색인)를 더했습니다. 검색 416.2 → 1.5ms · 인기글 정렬 9.0 → 0.074ms.",
            "결과 : 20 VU 에서 p95(요청 100번 중 95번이 끝나는 시간) 287 → 39ms, 200 VU 에서 한계 처리량(천장) 약 244 → 약 380 req/s(초당 요청 수).",
          ],
        },
        {
          kind: "note",
          text: "되돌린 판단 : 목록과 총계를 창 함수(행을 합치지 않고 전체를 함께 보며 계산하는 함수) COUNT(*) OVER () 로 쿼리 한 번에 구하면 읽는 양이 늘지 않는다고 봤습니다. 글 5만 건에서 측정해 보니 141.4ms 로, 나눴을 때(5.9ms)보다 24배 느렸습니다. 되돌리고 총계는 캐시로 뺐습니다.",
        },
        {
          kind: "text",
          text: "어떻게 고쳤는지 코드로 보면 이렇습니다. 첫째, 풀 상한을 코드에 박아 두지 않고 환경변수(PG_POOL_MAX)로 뺐습니다. 서버마다 다른 값을 줄 수 있고, 값을 바꿔 가며 측정할 수 있습니다. 기본값은 30입니다.",
        },
        {
          kind: "code",
          caption: "lib/prisma.ts : 풀 상한을 환경변수로 (기본 30)",
          lang: "ts",
          code: `async function createPool(connectionString: string): Promise<import('pg').Pool> {
  const { default: pg } = await import('pg');
  const max = Number(process.env.PG_POOL_MAX) || 30;
  const pool = new pg.Pool({ connectionString, max, options: '-c timezone=UTC' });
  // 유휴 커넥션 오류를 받아 주지 않으면 프로세스가 죽습니다 (pg.Pool 은 'error' 를 그대로 던집니다).
  pool.on('error', (err) => console.error('[prisma] 유휴 커넥션 오류 —', err.message));
  return pool;
}`,
        },
        {
          kind: "text",
          text: "둘째, 참조 데이터 캐시입니다. 결과값이 아니라 ‘진행 중인 요청(Promise)’을 캐시에 넣는 것이 핵심입니다. 캐시가 빈 상태에서 요청 100건이 동시에 와도 DB 로 가는 쿼리는 하나이고, 나머지는 같은 Promise 를 기다립니다. 실패한 결과는 캐시에 남기지 않고 지웁니다. 남기면 TTL(유효 시간) 동안 같은 오류만 돌려주게 되기 때문입니다.",
        },
        {
          kind: "code",
          caption: "lib/cache.ts : 진행 중인 요청을 캐시에 담는 래퍼",
          lang: "ts",
          code: `export function cacheReference<A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  name: string,
  ttlMs: number = TTL_MS,
): (...args: A) => Promise<R> {
  return (...args: A): Promise<R> => {
    const key = args.length ? \`\${name}:\${JSON.stringify(args)}\` : name;

    const hit = store.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.value as Promise<R>;

    const value = fn(...args);
    store.set(key, { value, expiresAt: Date.now() + ttlMs });

    // 실패를 캐시에 남기면 TTL 동안 같은 오류만 돌려주게 됩니다. 그 사이 다른
    // 호출이 항목을 갈아끼웠을 수도 있으니, 내가 넣은 것일 때만 지웁니다.
    value.catch(() => {
      if (store.get(key)?.value === value) store.delete(key);
    });

    return value;
  };
}`,
        },
        {
          kind: "text",
          text: "셋째, 게시글 목록입니다. 목록과 총계를 한 쿼리로 합치지 않고 Promise.all 로 나란히 보냅니다. 총계(countPosts)만 30초 캐시하고, 글이 늘거나 줄어 총계가 달라질 때는 총계 캐시를 통째로 비웁니다.",
        },
        {
          kind: "code",
          caption: "lib/board.ts : 목록과 총계를 나눠 받고, 총계만 캐시",
          lang: "ts",
          code: `  const [pageRows, noticeRows, total] = await Promise.all([
    prisma.posts.findMany({
      where,
      orderBy: SORT_ORDER[sort],
      take: limit,
      skip: offset,
      include: postInclude(playerId),
    }),
// …
    countPosts(tab, category, term, minLikes, excluded),
  ]);
// …
const countPosts = cacheReference(countPostsUncached, 'post-count', 30_000);
// …
function invalidatePostCounts(): void {
  clearReferenceCache('post-count');
}`,
        },
      ],
    },
    {
      id: "queue",
      eyebrow: "04 · 2 · 3부 · 09.08 ~ 09.09",
      title: "느린 쿼리로 보인 것은 대기 줄이었습니다",
      desc: "성능을 재는 지표가 1부의 결론과 반대로 DB 를 범인으로 가리켰습니다.",
      blocks: [
        {
          kind: "text",
          text: "개발 서버에 동시 요청 40개를 걸자, SELECT 1(‘연결돼 있나’만 확인하는 가장 가벼운 쿼리) 하나뿐인 /api/health 가 p95 3,056ms 로 찍혔는데 Postgres 로그로는 0.1ms 였습니다. 지표가 await pool.query(쿼리를 보내고 답을 기다리는 호출) 전체를 재고 있어서, 빈 연결을 기다린 시간과 이벤트 루프 지연(Node 가 앞 작업이 끝나길 기다린 시간)까지 쿼리 시간에 섞여 있었습니다.",
        },
        {
          kind: "text",
          text: "지표를 풀 대기(빈 연결 기다림) · 실행 · 루프 지연 셋으로 쪼갰습니다. 체감 p95 1,004.9ms 가운데 906.7ms 가 풀 대기였고 실제 실행은 39.1ms 였습니다. 풀을 80 으로 늘려도 기다림이 Postgres 안으로 옮겨 갈 뿐이었고, node 는 CPU 코어 22개 중 1개만 쓰고 있었습니다(Node 프로세스 하나는 기본적으로 코어 하나로 일합니다). 그래서 프로세스를 늘렸습니다.",
        },
        {
          kind: "table",
          head: ["200 VU", "1 프로세스 × 풀 30", "8 프로세스 × 풀 11"],
          rows: [
            ["처리량 (2회 측정)", "332.9 · 338.4 req/s", "550.2 · 552.1 req/s"],
            ["p95 (2회 측정)", "1.34s · 1.28s", "104ms · 87ms"],
            ["풀 대기 p95", "약 880ms", "6.3ms"],
            ["node CPU", "1코어의 50%", "1.4코어 (22코어 중 6%)"],
          ],
        },
        {
          kind: "text",
          text: "3부에서는 글 상세 화면이 DB 에 세 번 다녀오던 것(3왕복)을 CTE(쿼리 안의 임시 결과표) 한 문장으로 합쳐, 200 VU 처리량을 418.9 → 543.3/s (+30.2%) 올렸습니다. 풀 상한을 30 · 35 · 50 으로 다시 측정해 보니 차이가 없어, 가장 작은 30을 남겼습니다.",
        },
        {
          kind: "note",
          text: "함정 : 전후를 순서대로 측정하자 같은 코드가 631 → 616 → 463 req/s 로 흘러내려 ‘고친 쪽이 19.6% 느리다’는 반대 결론이 나왔습니다. 원인은 OneDrive 같은 백그라운드 프로그램이었습니다. 그 뒤로는 두 서버를 동시에 띄워 번갈아 측정하고, 회차마다 구한 비율의 가운데 값(중앙값)을 씁니다.",
        },
        {
          kind: "text",
          text: "지표를 셋으로 쪼갠 코드입니다. 이전에는 ‘DB 를 부른 코드가 체감한 시간’ 하나만 있었습니다. 이제 순수 SQL 실행 시간(exec_p95), 빈 연결을 기다린 시간(wait_p95), 이벤트 루프 지연(loop)을 따로 내보내서 무엇이 느린지 가를 수 있습니다.",
        },
        {
          kind: "code",
          caption: "lib/telemetry.ts : 느림의 원인을 가르는 세 지표",
          lang: "ts",
          code: `  push('app.db.wait_p95_ms', p95(state.dbWait.samples));
  push('app.db.exec_p95_ms', p95(state.dbExecAll.samples));
  push('app.db.exec_slow', state.dbExecAll.slow);

  // 이벤트 루프 지연. 히스토그램은 nodejs 런타임에서만 만들어지므로(lib/telemetry-node.ts)
  // 없으면 건너뛴다 — edge 번들에서 node:perf_hooks 를 import 하지 않기 위한 우회다.
  const lag = globalForTelemetry.__pulseLoopLag;
  if (lag) {
    push('app.loop.p95_ms', lag.percentile(95) / 1e6);
    push('app.loop.max_ms', lag.max / 1e6);
    lag.reset();
  }`,
        },
        {
          kind: "text",
          text: "프로세스를 늘린 방법입니다. 서버 프로그램 여러 개 앞에 얇은 프록시를 두고, 요청을 살아 있는 인스턴스에 돌아가며 나눠 줍니다(라운드로빈). 죽었거나 교체 중인 인스턴스는 건너뜁니다.",
        },
        {
          kind: "code",
          caption: "scripts/start-cluster.mjs : 살아 있는 인스턴스에 돌아가며 나눠 주기",
          lang: "ts",
          code: `/** 라운드로빈 커서 — 살아 있고 교체 중이 아닌 인스턴스만 돕니다 */
let cursor = 0;
function pick() {
  for (let i = 0; i < instances.length; i += 1) {
    const inst = instances[(cursor + i) % instances.length];
    if (inst.up && !inst.draining) {
      cursor = (cursor + i + 1) % instances.length;
      return inst;
    }
  }
  return null;
}`,
        },
      ],
    },
    {
      id: "target",
      eyebrow: "05 · 4 · 5부 · 09.10 ~ 09.15",
      title: "목표를 먼저 정하고 다시 측정했습니다",
      desc: "그때까지 측정한 200 VU 가 우리 서비스 사용자로 몇 명인지 아무도 몰랐습니다.",
      blocks: [
        {
          kind: "table",
          head: ["목표 모델", "값"],
          rows: [
            ["가입자 · DAU(하루 접속자)", "10,000 · 3,000"],
            ["세션(한 번 접속해 쓰는 단위) / 일", "4,500 (세션당 요청 15)"],
            ["동시 사용자", "54명"],
            ["평소 가장 붐비는 때 · 순간 몰림(버스트)", "3.4 · 10.1 req/s"],
            ["성장 ×10(사용자가 10배가 되면)", "33.8 req/s"],
          ],
        },
        {
          kind: "text",
          text: "1 프로세스가 목표의 20배인 69.7 req/s 에서 실패 0% 였습니다. 그 위는 서버가 아니라 부하를 만드는 쪽의 VU 가 먼저 바닥나 한계를 찾지 못했고, 일부러 더 찾지 않았습니다.",
        },
        {
          kind: "table",
          head: ["200 VU · 한계까지 몰아붙인 구간", "처리량", "p95", "실패"],
          rows: [
            ["1 프로세스 × 풀 30", "773.2/s", "2.19s", "25.83%"],
            ["2 프로세스 × 풀 30", "887.3/s", "1.48s", "7.73%"],
            ["4 프로세스 × 풀 22", "1,212.1/s", "1.02s", "0%"],
            ["8 프로세스 × 풀 11", "1,525.8/s", "846ms", "0%"],
          ],
        },
        {
          kind: "text",
          text: "실제 사용에 가까운 구간(20 VU)에서는 프로세스 8개가 p95 를 84.84 → 15.40ms 로 줄였지만 처리량은 96.28 → 98.13/s 로 그대로였습니다. 그래서 권고는 프로세스 2개 × 풀 10 입니다. Postgres 메모리는 약 460MB 로 8 × 11(약 2,024MB)보다 훨씬 적고, 서버 프로그램 하나(인스턴스)를 강제로 꺼도 48/48 요청이 200(성공)이었습니다. 성장 ×10 부하에서는 압축에 드는 CPU 를 나눠 맡아 p95 가 159.1 → 98.9ms 로 내려갑니다.",
        },
        {
          kind: "note",
          text: "바로잡은 것 : 5부 초안의 수치 4개는 next dev(개발용 실행)를 실서비스용 실행으로 착각하고 측정한 값이었습니다. 20 VU p95 ‘2.19s’는 실제로 84.84ms, 천장(한계 처리량) ‘약 100 req/s’는 실제로 773 req/s 였습니다.",
        },
      ],
    },
    {
      id: "bytes",
      eyebrow: "06 · 4부 · 09.11",
      title: "병목은 바이트였습니다",
      desc: "내 컴퓨터(localhost)에서 응답 지연만 측정하고 있어서 한 달 동안 보이지 않았습니다.",
      blocks: [
        {
          kind: "text",
          text: "Next 는 HTML 과 정적 파일만 압축하고, API 의 JSON 응답은 그대로 내보냅니다. /api/arcades 는 1,224,603 B 가 압축 없이 나가고 있었습니다. 데이터를 읽어 가는 API(GET) 7곳에 brotli(q4, 압축 강도 4단계)를 우선 쓰고 안 되면 gzip 으로 되돌리도록(폴백) 압축을 붙였습니다. 압축하는 동안 서버가 다른 요청을 못 받는 일이 없게 비동기 압축만 쓰고, 1,400B 미만은 압축하지 않습니다.",
        },
        {
          kind: "table",
          head: ["항목", "압축 전", "압축 후"],
          rows: [
            ["/api/arcades", "1,224,603 B", "90,434 B (−92.6%)"],
            ["세션당 수신", "1,286.1 KB", "106.8 KB"],
            ["월 대역폭 (DAU 3,000)", "165 GB", "14 GB"],
            ["세션당 전송 시간 (LTE 20Mbps)", "514ms", "43ms"],
          ],
        },
        {
          kind: "text",
          text: "localhost(내 컴퓨터 안에서만 오가는 연결)에서는 압축 CPU 만 들고 전송 이득은 0 이라, 오히려 p95 가 10% 나빠 보입니다. 이득은 실제 회선에서 측정해야 보입니다.",
        },
        {
          kind: "list",
          items: [
            "데이터가 비어 있던 DB 에서 잰 기준값(기준선)은 무효로 처리했습니다. 제보 · 리뷰 테이블이 비어 있으면 서브쿼리가 공짜로 보입니다. 목표 규모 데이터를 별도 DB 에 깔자 같은 부하에서 p95 22.0 → 152.0ms, 세션당 수신 332.6 → 1,285.0KB 로 바뀌었습니다.",
            "읽기용 API 경로 20종을 3번씩 호출하고, pg_stat_user_tables 에서 순차 스캔(색인 없이 표 전체를 처음부터 훑는 읽기)이 몇 번 일어났는지 셌습니다. /api/arcades 의 상관 서브쿼리(바깥 행마다 다시 도는 안쪽 쿼리)가 오락실마다(939번) 돌며 요청 한 번에 44,042 버퍼(DB 가 읽는 데이터 조각)를 읽고 있었습니다. CTE 로 한 번만 집계하게 바꿔 163 버퍼가 됐습니다.",
            "첫 CTE 는 반경 검색을 8 → 26ms 로 늦췄습니다. 필터를 기준 CTE 안으로 옮겨 해결했습니다.",
            "이 수정은 요청을 하나씩 보내 측정하면 −15% 였지만, 부하를 건 상태에서는 p95 98.9 → 51.8ms 로 −48% 였습니다.",
          ],
        },
        {
          kind: "text",
          text: "압축 코드입니다. 응답을 JSON 으로 만든 뒤, 크기가 1,400B 이상이고 브라우저가 받아 주면 brotli(q4)를 우선 쓰고 안 되면 gzip 으로 비동기 압축합니다. 압축이 실패해도 응답이 실패하지 않고 원본을 내려보냅니다. 쿼리 자체를 고친 코드(상관 서브쿼리 → CTE)는 뷰포트 컬링 페이지의 ‘쿼리 자체를 고친 작업은 따로 있습니다’ 절에 있습니다.",
        },
        {
          kind: "code",
          caption: "lib/http.ts : 응답 압축 (brotli q4 우선, gzip 폴백)",
          lang: "ts",
          code: `const MIN_BYTES = 1400;
// …
const BROTLI_QUALITY = 4;
const GZIP_LEVEL = 6;
// …
  const encoding = enabled() && raw.byteLength >= MIN_BYTES ? negotiate(request) : null;
// …
  let packed: Buffer;
  try {
    packed =
      encoding === 'br'
        ? await brotli(raw, {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: BROTLI_QUALITY,
              [zlib.constants.BROTLI_PARAM_SIZE_HINT]: raw.byteLength,
            },
          })
        : await gzip(raw, { level: GZIP_LEVEL });
  } catch (err) {
    // 압축 실패가 응답 실패가 되면 안 됩니다 — 원본으로 내려보냅니다.
    console.error('[http] 응답 압축 실패 —', (err as Error).message);
    headers.set('Content-Length', String(raw.byteLength));
    return new NextResponse(asBody(raw), { ...init, headers });
  }

  headers.set('Content-Encoding', encoding);
  headers.set('Content-Length', String(packed.byteLength));
  return new NextResponse(asBody(packed), { ...init, headers });`,
        },
      ],
    },
    {
      id: "security",
      eyebrow: "07 · Security · 09.11 ~ 09.15",
      title: "방어가 있는 줄 알았던 자리부터 봤습니다",
      desc: "없는 방어를 더하기 전에, 있다고 착각한 방어를 먼저 찾았습니다.",
      blocks: [
        {
          kind: "table",
          head: ["문제", "고친 방법", "확인"],
          rows: [
            [
              "로그인 시도 횟수를 X-Forwarded-For(프록시가 붙이는 접속자 주소 머리글)의 첫 값으로 셈. 이 값은 보내는 사람이 바꿀 수 있어서, 바꿔 보내기만 하면 8회 제한이 사실상 없음",
              "계정별로 셉니다. IP 는 믿을 수 있는 프록시 단계 수를 설정했을 때만, 주소 목록의 오른쪽(서버에 가까운 쪽)에서 셉니다",
              "회귀 테스트(고친 문제가 다시 생기지 않는지 보는 시험) 12건 · 머리글을 바꿔 가며 공격해도 9회째부터 429(너무 잦은 요청)",
            ],
            [
              "잠금 횟수를 프로세스 메모리에서 셈. 프로세스가 2개면 8회 제한이 16회가 됨",
              "DB 테이블로 옮겼습니다",
              "—",
            ],
            [
              "글을 쓰거나 바꾸는 API 가 요청 본문에 담긴 playerId 를 그대로 믿음. 남의 이름으로 추천 · 투표 · 제보 · 댓글이 가능했음",
              "신원은 세션 쿠키에서만 읽습니다. 제보만 익명을 받고, 반영 임계값에는 세지 않습니다",
              "테스트 24건 · 운영 빌드 시나리오 7개",
            ],
            [
              "오픈 리다이렉트(로그인 뒤 이동할 주소를 조작해 엉뚱한 사이트로 보내는 취약점). next=/\\evil.com 이 외부 사이트로 이동(302)",
              "특정 문자를 막는 대신, 주소(URL)로 해석해 우리 사이트의 출처(origin) 그대로인지 확인합니다",
              "회귀 테스트 3건",
            ],
            [
              "보안 머리글 0개 · X-Powered-By(서버가 쓰는 기술을 알려 주는 머리글) 노출",
              "CSP(허용한 출처의 스크립트만 실행) · X-Frame-Options(다른 사이트가 우리 화면을 틀 안에 넣는 것 방지) · nosniff(브라우저가 파일 종류를 멋대로 추측하지 못하게) · Referrer-Policy(어디서 왔는지 정보를 얼마나 넘길지) · Permissions-Policy(카메라 · 위치 같은 기능의 허용 범위)",
              "CSP 가 지도를 막던 위반 263건까지 정리",
            ],
            [
              "서버가 기억하지 않는(무상태) 7일짜리 토큰을 도중에 무효로 만들 수단이 없음",
              "players.token_epoch 칸 하나(번호가 바뀌면 이전 토큰이 무효). 비밀번호를 바꾸면 다른 기기 로그인이 끊깁니다",
              "테스트 10건 · 운영 빌드 20/20",
            ],
          ],
        },
        {
          kind: "text",
          text: "남의 계정을 10분 잠그는 공격은 일부러 감수했습니다. 무한 대입(비밀번호를 끝없이 넣어 보기)은 계정 탈취로 끝나지만, 잠금은 로그인이 잠시 늦어지는 것으로 끝나기 때문입니다. 로그인 정보를 브라우저 저장소(localStorage)에 두고 요청마다 직접 실어 보내는 방식(Bearer)으로 옮기면, 자바스크립트가 읽지 못하는 HttpOnly 쿠키보다 보안이 낮아져 옮기지 않았습니다.",
        },
        {
          kind: "text",
          text: "고친 곳을 코드로 보면 이렇습니다. 먼저 로그인 시도 제한의 주소 판정입니다. X-Forwarded-For 의 첫 값을 키로 쓰던 것을 버렸습니다. 믿을 수 있는 것은 내가 운영하는 프록시가 오른쪽에 덧붙인 값뿐이라서, 프록시 단계 수(N)를 알 때만 오른쪽에서 N 번째 주소를 씁니다. 프록시가 없으면(N=0) 틀린 키로 세는 대신 세지 않고, 로그인은 계정별로 셉니다.",
        },
        {
          kind: "code",
          caption: "lib/auth.ts : 믿을 수 있는 프록시가 덧붙인 주소만 쓰기",
          lang: "ts",
          code: `export function clientKey(request: Request): string | null {
  const hops = trustedProxyHops();
  if (hops === 0) return null;

  const chain = (request.headers.get('x-forwarded-for') ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  if (chain.length >= hops) return chain[chain.length - hops] ?? null;

  // 프록시가 있다고 했는데 체인이 짧습니다 — 설정이 틀렸거나 프록시를 우회해
  // 직접 들어온 요청입니다. 둘 다 신뢰할 수 없으므로 세지 않습니다.
  return request.headers.get('x-real-ip')?.trim() || null;
}`,
        },
        {
          kind: "text",
          text: "오픈 리다이렉트는 문자를 하나씩 막는 대신 주소(URL)로 해석한 뒤 출처가 그대로인지 봅니다. 브라우저와 같은 파서를 쓰므로 역슬래시를 슬래시로 읽는 표기(/\\evil.com)도 걸러집니다.",
        },
        {
          kind: "code",
          caption: "lib/auth-types.ts : 이동할 주소를 앱 안쪽 경로로만 좁히기",
          lang: "ts",
          code: `export function safeNext(raw: string | null | undefined): string {
  if (!raw || !raw.startsWith('/')) return '/';
  try {
    // 출처가 있는 아무 기준 주소나 — 결과가 그 출처를 벗어나면 앱 밖으로 나가는 값이다.
    const base = 'http://arcade.invalid';
    const url = new URL(raw, base);
    if (url.origin !== base) return '/';
    return \`\${url.pathname}\${url.search}\${url.hash}\`;
  } catch {
    return '/';
  }
}`,
        },
        {
          kind: "text",
          text: "세션 회수입니다. 쿠키만 보던 확인을 쿠키 한 장과 players 한 줄을 함께 보는 것으로 바꿨습니다. 쿠키에 담긴 세대 번호(token_epoch)가 DB 의 현재 번호와 다르면 무효입니다. 비밀번호를 바꾸면 번호를 1 올려서 지난 세션이 한꺼번에 끊깁니다. 이 값은 캐시하지 않습니다. 몇 초짜리 캐시를 두면 그동안은 회수가 회수가 아니기 때문입니다. 정지 계정을 거르는 줄은 11.20 에 더해졌습니다.",
        },
        {
          kind: "code",
          caption: "lib/auth.ts : 세대 번호로 세션을 한꺼번에 끊기",
          lang: "ts",
          code: `export async function getSession(request: Request): Promise<SessionUser | null> {
  const token = readSessionToken(readCookie(request, SESSION_COOKIE));
  if (!token) return null;

  const row = await playerRow(token.playerId);
  if (!row || row.epoch !== token.epoch) return null;
  // 정지 중인 계정은 로그인이 아닙니다 (db/migrate-083). 요청마다 DB 를 보므로 정지는 즉시 통합니다.
  if (row.suspendedUntil !== null && row.suspendedUntil.getTime() > Date.now()) return null;

  return { playerId: token.playerId, nickname: row.nickname, isAdmin: row.isAdmin };
}
// …
export async function revokeSessions(playerId: number): Promise<void> {
  const prisma = await getPrismaClient();
  // updateMany — 없는 계정이면 0행으로 끝나야 합니다 (update 는 P2025 를 던집니다).
  await prisma.players.updateMany({
    where: { id: playerId },
    data: { token_epoch: { increment: 1 } },
  });
}`,
        },
        {
          kind: "text",
          text: "쓰기 API 는 요청 본문의 playerId 를 믿지 않습니다. 세션 쿠키로 확인한 사람(guard.playerId)만 쓰고, 로그인하지 않았으면 401 로 끝납니다.",
        },
        {
          kind: "code",
          caption: "lib/auth.ts · app/api/posts/route.ts : 신원은 세션에서만",
          lang: "ts",
          code: `export async function requirePlayer(request: Request): Promise<PlayerGuard> {
  const playerId = await sessionPlayerId(request);
  if (playerId === null) {
    return {
      ok: false,
      response: NextResponse.json({ error: '로그인한 뒤 다시 시도해 주세요' }, { status: 401 }),
    };
  }
  return { ok: true, playerId };
}
// …
async function onPost(request: Request) {
  const guard = await requirePlayer(request);
  if (!guard.ok) return guard.response;
// …
    const id = await createPost({ ...body.value, playerId: guard.playerId });`,
        },
      ],
    },
    {
      id: "launch",
      eyebrow: "08 · Launch · 09.13 ~ 09.15",
      title: "출시 전 감사 : Blocker 9개",
      desc: "가입자 10,000 · DAU 3,000 규모의 공개 서비스를 기준으로 코드를 읽고 의심 가는 것은 재현했습니다. Blocker(출시를 막는 것) 9 · High(심각) 12 · Medium(보통) 15 · Low(가벼움) 12.",
      blocks: [
        {
          kind: "table",
          head: ["#", "막고 있던 것", "처리"],
          rows: [
            ["B1", "운영 DB 에 표 구조(스키마)를 넣는 유일한 방법이 표를 통째로 지웠다 다시 만드는 스크립트(DROP TABLE … CASCADE)였음", "마이그레이션(DB 구조 변경)을 advisory lock(동시에 둘이 하지 못하게 거는 잠금) 안에서 적용. 지금은 배포 때 prisma migrate deploy 를 먼저 돌립니다"],
            ["B2", "DB 에 연결하지 못해 대체 DB(폴백)로 돌고 있을 때도 /api/health 가 200(정상)이라, 시험용 데이터(시드)로 서비스될 수 있음", "운영에서는 폴백을 끄고, 폴백 중에는 503(일시 사용 불가)을 내보내 프록시가 그 서버를 요청 대상에서 뺍니다"],
            ["B3", "배포 · 프로세스 관리 · 백업 · CI 가 없음", "systemd · 백업 타이머 · 순차 재기동 · CI(typecheck → test → build)"],
            ["B4", "/api/chat 에 로그인 확인이 없음. 요청 1건이 AI 모델 호출을 최대 8번 일으킴", "로그인 필수 · 사람당 하루 40회 · 전체 하루 2,000회"],
            ["B5", "일회용 계정 2개면 보유 기종을 바꿀 수 있음", "가입 24시간 미만 계정은 반영 임계값에 세지 않습니다"],
            ["B6", "익명 제보 횟수 · 길이 무제한. 챗봇 프롬프트 인젝션(글 속에 숨긴 지시로 챗봇을 엉뚱하게 움직이게 하는 공격) 경로", "10분 동안 횟수 제한 · 메모 300자 · 챗봇 도구 응답은 200자로 자름"],
            ["B7", "약관 · 개인정보처리방침 · 탈퇴 API 없음", "/terms · /privacy · DELETE /api/account"],
            ["B8 · B9", "API 500 이 흰 화면, 지도 인증 실패가 빈 지도 (화면 쪽)", "에러 화면 · 대체 지도"],
          ],
        },
        {
          kind: "text",
          text: "이어서 운영 빌드를 개발 DB 복제본에 붙여 API 72건 · 화면 10개 · 방어 점검 15건을 훑었습니다. 서버 로그 오류 0건 · 서버 오류(500) 응답 0건이었고, 고친 결함은 하나였습니다. POST 로 남아 있던 4곳을 지침대로 수정용 PUT · 삭제용 DELETE 로 맞췄습니다.",
        },
      ],
    },
    {
      id: "deploy",
      eyebrow: "09 · Deploy · 09.22 ~ 10.02",
      title: "Prisma 로 옮기고 실서버에 올렸습니다",
      desc: "상세 페이지의 다른 수치(09.18 기준) 뒤에 있었던 일입니다.",
      blocks: [
        {
          kind: "text",
          text: "직접 쓴 SQL(원시 쿼리) 121개를 먼저 분류했습니다. ORM(코드로 DB 를 다루게 해 주는 도구)으로 그대로 옮길 것 95개(78%), 쿼리 빌더(조건을 코드로 조립하는 방식) 영역 12개(10%), 직접 쓴 SQL 이 나은 것 14개(12%). 결론은 “된다. 다만 전부는 아니고, 전부일 필요도 없다”였습니다. 직접 쓴 SQL 이 나은 쿼리는 TypedSQL(직접 쓴 SQL 에 타입 검사를 붙여 주는 Prisma 기능) 9개로 남기고, 앱이 DB 에 접속하는 입구를 lib/prisma.ts 하나로 모았습니다.",
        },
        {
          kind: "list",
          items: [
            "옮기면서 버그 3개를 고쳤습니다. 같은 기종을 두 번 고르면 0곳이 나오던 것, 반경 검색이 색인(인덱스)을 쓰지 않고 표 전체를 훑던 것, 목록이 화면에서 쓰지 않는 칸(컬럼) 196KB 를 보내던 것.",
            "개발 DB 에서 빠져 있던 외래키(표끼리의 연결 규칙) 12개를 찾아 복구했습니다(30 → 42).",
            "잃은 것도 있습니다. Prisma 7 에는 PGlite(설치 없이 앱 안에서 도는 가벼운 PostgreSQL) 연결 장치(어댑터)가 없어 폴백(DB 가 없을 때의 대체 경로)이 없어졌고, 서버를 켤 때 마이그레이션이 자동으로 도는 것도 없어져 배포 순서를 ‘마이그레이션 먼저, 기동은 그다음’으로 고정했습니다.",
          ],
        },
        {
          kind: "table",
          head: ["실서버 (09.30 기동)", "내용"],
          rows: [
            ["서버", "네이버 클라우드 Micro 1대. 1vCPU · 1GB · Ubuntu 24.04"],
            ["구성", "앱 + PostgreSQL 18 + Caddy(HTTPS 처리) · systemd(프로그램 실행 관리). 앱은 프로세스 1개 × 풀 5 · 힙(메모리) 384MB"],
            ["빌드(코드를 실행할 묶음으로 만드는 작업)", "next build 가 3.2GB 를 써서 서버에서는 못 합니다. PC 의 Docker(격리된 실행 환경)에서 223MB 묶음을 만들어 올립니다"],
            ["설치", "migrate deploy → 기동 → /api/health 200 확인. 직전 묶음으로 되돌릴 수 있습니다"],
            ["리허설(실서버 대신 같은 사양으로 미리 해 본 시험, 09.29)", "첫 설치 56초 · 다시 배포 14초 · 부하 중 앱 267MB + DB 248MB"],
            ["비용", "월 약 4,400원"],
          ],
        },
        {
          kind: "note",
          text: "올리면서 고친 것 : 557MB 배포 묶음에 개발용 .env.local(비밀 설정 파일) 사본이 실리던 것을 막았고, 실서버의 리다이렉트(다른 주소로 보내는 응답)가 https://localhost:3001 로 나가던 것을 고쳤습니다.",
        },
      ],
    },
    {
      id: "incident",
      eyebrow: "10 · Incident · 08.24",
      title: "개발 DB 가 통째로 지워진 날",
      desc: "AI 에게 공지 기능을 맡기던 중이었습니다.",
      blocks: [
        {
          kind: "text",
          text: "워크트리(같은 저장소를 폴더별로 나눠 쓰는 작업 공간)마다 .env.local 이 복사되므로 폴더를 나눠도 같은 DB 를 봅니다. 파괴적 명령(데이터를 지우거나 덮어쓰는 명령) 한 번에 개발 DB 본체가 지워졌고, PGlite 사본을 다시 옮겨(이관) 복구했습니다. 그 뒤로 생긴 규칙입니다.",
        },
        {
          kind: "list",
          items: [
            "데이터를 지울 수 있는 명령 전에는 pg_dump -Fc 로 백업을 먼저 뜹니다.",
            "운영 디렉터리에서는 db:init · db:reset 을 쓰지 않습니다.",
            "마이그레이션 목록이 어긋나면 테스트가 실패합니다.",
            "부하 시험용 시드(시험용 데이터를 넣는 작업)는 DB 이름을 확인한 뒤에만 돕니다.",
            "실서버는 매일 04:00 에 DB 덤프와 첨부를 묶어 7일 보관합니다. 10GB 디스크가 경고선 가까이 차서 11.11 에 14일에서 줄였습니다.",
          ],
        },
      ],
    },
    {
      id: "after",
      eyebrow: "11 · After · 10.03 ~ 11.20",
      title: "실서버를 올린 뒤 더한 것",
      desc: "PrivateProject 저장소에 병합된 PR 기준입니다. 실서버 성능은 이 기간에 다시 측정하지 않았습니다.",
      blocks: [
        {
          kind: "table",
          head: ["날짜 · PR", "한 일", "확인"],
          rows: [
            [
              "10.06 · #17 ~ #19",
              "서버 감시. 내 PC 에서는 지표 수집 도구(Prometheus)와 그래프 화면(Grafana)을 통째로 띄우고, 1GB 실서버에는 수집기(Prometheus agent)와 지표를 내보내는 작은 프로그램(exporter) 둘만 두어 60초마다 Grafana Cloud(그래프 · 알림을 주는 외부 서비스)로 보냅니다. 알림 규칙 12개",
              "리허설 서버에서 수집기 32MB · 시계열(시간에 따라 기록되는 숫자 줄) 1,713개. 실서버에서 디스크 경고가 실제로 울려 메일이 왔습니다",
            ],
            [
              "10.06 ~ 10.07 · #20 · #21",
              "그 디스크 경고를 따라가 보니 배포 묶음이 쌓이고 있었습니다. 같은 파일에 이름을 두 개 붙인 것(하드링크)이라 한쪽을 지워도 공간이 비지 않았습니다. 설치가 끝나면 올린 원본을 지우게 했습니다. 프로세스별 메모리를 1분마다 모읍니다",
              "리허설 서버에서 설치 · 이전 판으로 되돌리기 · 업로드가 끊긴 묶음 등 6가지 경우",
            ],
            [
              "10.08 · #22 · #23",
              "운영 알림(Beta). Grafana 알림을 웹훅(알림 요청을 약속된 주소로 자동 전송하는 방식)으로 받아 Gemini(AI)로 요약하고, 관리자 화면의 종 아이콘과 웹 푸시(기기 알림)로 알립니다",
              "테스트 883 통과 · 실제 Gemini 요약",
            ],
            [
              "10.28 · #27",
              "가입 24시간 안 된 계정은 리뷰 · 투표를 403(권한 없음)으로 막고, 운영자를 사칭하는 아이디를 막았습니다",
              "테스트 991 통과",
            ],
            [
              "11.11 · #28",
              "로그인 잠금을 세는 이름표(키)가 본인 확인용 이름표와 겹치던 것을 나누고, 비밀번호를 맞춰 보기 전에 시도 횟수부터 세게 했습니다. 너무 큰 id 와 NUL 문자(글자가 아닌 제어 문자)로 서버 오류(500)가 나던 곳을 고쳤습니다",
              "같은 계정으로 30번 동시에 시도했을 때 비밀번호 대조까지 간 것은 8번. 서버 오류(500)가 잘못된 요청(400) · 정상(200)으로 바뀜",
            ],
            [
              "11.20 · #29",
              "신고 · 차단 · 계정 정지와 관리 화면. 업로드 상한(크기를 알리지 않은 요청은 411 로 거절 · 프로세스당 동시 2개 · 시간당 30회 · 하루 300MB). GitHub 저장소의 CI(코드를 올릴 때마다 자동으로 도는 검사)가 빈 DB 에 마이그레이션 92개를 적용하고, 실제 DB 로 스모크(핵심 기능만 빠르게 확인하는 시험)를 돌립니다",
              "테스트 1,057 통과",
            ],
            [
              "11.20 · #32 · #33",
              "서비스를 멈추기 전에 DB 를 점검하고 배포 직전 백업을 뜹니다. 마이그레이션이 실패하면 복구 명령을 그 자리에서 찍습니다. 서버 프로그램(인스턴스)을 하나씩 다시 띄워 서비스가 끊기지 않게 하는 무중단 재기동(SIGHUP 신호)",
              "로컬 DB 사본으로 6가지 상황. 실서버 전체 흐름은 다음 배포가 처음입니다",
            ],
          ],
        },
        {
          kind: "text",
          text: "11.11(PR #28)에 고친 로그인 잠금을 코드로 보면 이렇습니다. 잠금을 세는 키의 머리말을 나눴습니다(login: 과 acct:). 예전에는 둘 다 account: 여서 닉네임이 ‘13’ 인 사람의 로그인 키가 13번 회원의 본인 확인 키와 같았습니다. 닉네임은 대소문자를 접어서 ‘Admin’ 과 ‘admin’ 이 같은 키가 됩니다.",
        },
        {
          kind: "code",
          caption: "lib/auth.ts : 로그인 키와 본인 확인 키를 따로 두기",
          lang: "ts",
          code: `export function accountKey(nickname: string): string {
  return \`login:\${nickname.normalize('NFC').trim().toLowerCase()}\`;
}
// …
/** /account 의 본인 확인(수정 · 탈퇴 · 입장 확인)이 함께 쓰는 키. 회원번호 기준입니다 */
export function accountCheckKey(playerId: number): string {
  return \`acct:\${playerId}\`;
}`,
        },
        {
          kind: "text",
          text: "비밀번호를 맞춰 보기 전에 시도부터 세고, 센 결과로 잠금을 판단합니다. 예전 순서(잠겼나 읽기 → 대조 → 틀리면 기록)에서는 같은 순간에 들어온 요청이 모두 ‘아직 안 잠김’을 읽고 지나가서, 8회 제한이 보낸 개수만큼 늘어났습니다. 이제 UPSERT 한 문장의 RETURNING 으로 판정 재료를 받으므로 동시 요청도 한 줄로 섭니다. 잠긴 동안 들어온 시도는 until 을 늘리지 않습니다. 늘리면 남이 계속 두드리는 것만으로 표적 계정을 영영 잠가 둘 수 있기 때문입니다.",
        },
        {
          kind: "code",
          caption: "lib/auth.ts : 대조하기 전에 먼저 세기",
          lang: "ts",
          code: `export async function takeLoginAttempt(key: string): Promise<number> {
  const prisma = await getPrismaClient();
  // 원자적 UPSERT 한 문장 — prisma/sql/takeLoginAttempt.sql
  const [row] = await prisma.$queryRawTyped(takeLoginAttemptSql(key, LOCK_MINUTES, MAX_FAILURES));

  // 낡은 줄 청소는 noteLoginFailure 와 같습니다.
  await prisma.login_failures.deleteMany({
    where: { until: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  });

  if (!row || row.count <= MAX_FAILURES) return 0;
  const left = row.until.getTime() - Date.now();
  return left > 0 ? Math.ceil(left) : 0;
}`,
        },
        {
          kind: "code",
          caption: "prisma/sql/takeLoginAttempt.sql : 세고 판정 재료를 한 문장으로",
          lang: "sql",
          code: `INSERT INTO login_failures (key, count, until)
VALUES ($1::text, 1, now() + make_interval(mins => $2::int))
ON CONFLICT (key) DO UPDATE
   SET count = CASE WHEN login_failures.until > now()
                    THEN LEAST(login_failures.count + 1, $3::int + 1)
                    ELSE 1 END,
       until = CASE WHEN login_failures.until > now() AND login_failures.count > $3::int
                    THEN login_failures.until
                    ELSE now() + make_interval(mins => $2::int) END,
       updated_at = now()
RETURNING count, until;`,
        },
        {
          kind: "text",
          text: "11.20(PR #32)에는 서비스를 멈추기 전에 DB 를 읽어 보는 점검 스크립트를 더했습니다. 표는 있는데 Prisma 이력이 없으면(코드 3) 또는 끝나지 않은 마이그레이션이 있으면(코드 4) 서비스를 내리기 전에 멈추고 복구 방법을 안내합니다. DB 에는 읽기만 합니다.",
        },
        {
          kind: "code",
          caption: "deploy/ncp/predeploy-check.sh : 멈추기 전에 DB 점검 (안내문은 줄임)",
          lang: "sh",
          code: `has_tables="$(q "SELECT to_regclass('public.arcades') IS NOT NULL")"
has_ledger="$(q "SELECT to_regclass('public._prisma_migrations') IS NOT NULL")"
# …
if [[ "$has_ledger" != "t" ]]; then
  cat >&2 <<EOF
# …
EOF
  exit 3
fi
# …
unfinished="$(q "SELECT string_agg(migration_name, ' ') FROM _prisma_migrations WHERE finished_at IS NULL AND rolled_back_at IS NULL")"
if [[ -n "$unfinished" ]]; then
  cat >&2 <<EOF
# …
EOF
  exit 4
fi`,
        },
      ],
    },
    {
      id: "relaunch",
      eyebrow: "12 · Before launch · 11.24",
      title: "출시 전에 다시 잰 것",
      desc: "‘아직 남은 것’에 적어 두었던 네 가지(DB 왕복 수 · 업로드 헬스체크 · 부하 재측정 · 복구 리허설)를 하루에 손봤습니다. 원본 커밋 cdf6db37e · c3dba72 입니다.",
      blocks: [
        {
          kind: "text",
          text: "먼저 요청 하나가 DB 에 보내는 SQL 문장 수를 셌습니다. Prisma 는 include(관계를 함께 읽는 옵션) 하나에 관계마다 SELECT 를 따로 내서, 예전처럼 트랜잭션(한 묶음으로 처리되는 작업) 수로 세면 실제 모습이 안 보입니다. 개발 DB 사본에만 모든 문장을 로그로 남기게 하고, 요청 하나 앞뒤로 늘어난 로그 줄을 셌습니다. 요청마다 한 번 데운 뒤 세 번 쟀습니다.",
        },
        {
          kind: "table",
          head: ["요청", "전", "후", "뺀 것"],
          rows: [
            ["서열표 (GET /api/tier)", "3", "1", "설정 · 등급표를 5분 캐시로. 로그인한 경우는 세션 확인 한 문장이 더 붙어 4 → 2"],
            ["제보 · 대기", "16", "5", "오락실 미리 확인 · 설정 조회 · 낡은 대기 제보 정리 · 저장한 행을 관계째 다시 읽기"],
            ["제보 · 컨디션", "17", "5", "위와 같고, 기종 확인과 기체 확인을 한 번으로 합침"],
            ["제보 · 있어요", "18", "9", "위와 같음. 저장과 임계값 반영을 묶는 트랜잭션은 남김"],
            ["글 추천", "21", "12", "추천하기 전에 글을 통째로 읽던 확인(관계를 따라 9문장)"],
          ],
        },
        {
          kind: "list",
          items: [
            "없는 오락실로 온 제보는 예전엔 맨 앞에서 404(찾을 수 없음)로 돌려보냈습니다. 이제 저장하다 비거나 외래키에 걸릴 때만 한 번 더 확인해 404 · 409(충돌)를 가립니다. 응답 번호와 문구는 같습니다.",
            "기종 목록에 없는 기종 번호로 ‘있어요’를 보내면 서버 오류(500)가 나던 것이, 기종 캐시에서 먼저 걸러져 404 가 됩니다.",
            "잃은 것 : 제보 설정을 5분 캐시해서, DB 에서 임계값을 직접 바꾸면 최대 5분 늦게 반영됩니다.",
            "응답에 싣는 제보 13칸이 피드에 보이는 같은 제보와 같은지 하나씩 대조했고, 테스트는 1,248건 통과(4건 건너뜀)였습니다.",
          ],
        },
        {
          kind: "text",
          text: "헬스체크(서버가 살아 있는지 확인하는 주소 /api/health)는 DB 에 SELECT 1 을 보내 보는 것이 전부였습니다. 업로드 폴더에 쓸 수 있는지와 디스크가 남았는지를 더했습니다. 남은 자리의 하한은 비율이 아니라 가장 큰 첨부(동영상 50MB)의 4배입니다. 업로드가 실패하는 순간을 정하는 것은 ‘몇 % 남았나’가 아니라 ‘파일 하나가 들어가나’이기 때문입니다.",
        },
        {
          kind: "code",
          caption: "lib/health.ts : 업로드 폴더와 디스크 점검",
          lang: "ts",
          code: `export function minFreeBytes(): number {
  const mb = Number(process.env.HEALTH_MIN_FREE_MB);
  return Number.isFinite(mb) && mb > 0 ? mb * 1024 * 1024 : MAX_UPLOAD_BYTES * 4;
}

export async function checkUploadStorage(): Promise<{ uploads: 'ok' | 'fail'; disk: 'ok' | 'fail' }> {
  const { writable, freeBytes } = await probeStorage();
  return {
    uploads: writable ? 'ok' : 'fail',
    // 여유를 못 읽었으면 실패로 둡니다 — 모르는 것을 괜찮다고 말하지 않습니다.
    disk: freeBytes !== null && freeBytes >= minFreeBytes() ? 'ok' : 'fail',
  };
}`,
        },
        {
          kind: "text",
          text: "둘 중 하나가 실패하면 ‘degraded’(일부 고장)로 알리지만 응답 번호는 200 으로 둡니다. 503(서비스 불가)으로 하면 무중단 재기동이 새로 띄운 서버를 받아 주지 않아, 디스크를 비우는 배포까지 막히기 때문입니다. 503 은 DB 가 답하지 않을 때만 냅니다.",
        },
        {
          kind: "text",
          text: "그다음 Prisma 로 옮긴 뒤 처음으로 부하를 다시 걸었습니다. 실서버는 이 PC 에서 접속이 되지 않아, 10.06 과 같은 1GB 리허설 서버(인스턴스 1개 · DB 연결 5개)에 개발 DB 를 복원해 걸었습니다. 처음 두 줄은 메모리만 1GB 로, 아래 두 줄은 CPU 도 1개로 묶은 값입니다.",
        },
        {
          kind: "table",
          head: ["시나리오", "처리량", "p95", "실패", "CPU 최대"],
          rows: [
            ["peak 5분 (DAU 3,000)", "2.7 req/s", "23.5 ms", "0%", "—"],
            ["growth 3분 (목표 ×10)", "25.4 req/s", "23.3 ms", "0%", "—"],
            ["CPU 1개 · growth 3분", "25.4 req/s", "46.5 ms", "0%", "68%"],
            ["CPU 1개 · 한계 찾기 4분", "62.1 req/s", "5,006 ms", "14.0%", "100%"],
          ],
        },
        {
          kind: "list",
          items: [
            "목표 사용자(DAU 3,000)는 넉넉합니다. p95 가 10.06 의 13ms 에서 23ms 로 늘었지만 기준(200ms)의 1/8 입니다. 늘어난 몫은 채보가 4배로 늘어난 것과 HTTPS 를 거쳐 건 것입니다.",
            "목표의 10배도 CPU 1개로 실패 없이 버텼습니다(CPU 68%).",
            "무너지는 자리는 CPU 였습니다. CPU 가 100% 에 닿으면 처리량이 초당 약 60요청에서 멈추고 지연이 초 단위로 올라갑니다. 메모리는 끝까지 1GB 안(932MB)이었고 재시작은 0번, 부하가 끝나자 바로 정상으로 돌아왔습니다.",
            "실패는 전부 프록시가 낸 503 이었습니다. 프록시는 2초마다 헬스체크를 찔러 한 번이라도 2초를 넘기면 그 서버를 빼는데, 서버가 하나뿐이라 그동안 모든 요청이 503 이 됩니다. ‘연속 3번 실패해야 뺀다’로 바꿔 다시 쟀더니 더 나빴습니다(실패 16.9% · p99 12.2초). 빨리 503 을 내는 것이 넘치는 요청을 덜어 내는 구실을 하고 있어서 되돌렸습니다. 한계를 올리는 길은 프록시가 아니라 CPU 입니다.",
          ],
        },
        {
          kind: "text",
          text: "마지막으로 복구 리허설(백업을 실제로 되살려 보는 연습)을 스크립트 하나로 만들었습니다. 가장 최근 백업을 임시 DB · 임시 폴더에 풀고, 표마다 행 수를 운영 DB 와 견주고, DB 가 가리키는 첨부가 묶음에 다 있는지 보고, 복원한 DB 로 앱을 하나 더 띄워 주요 화면을 열어 본 뒤 전부 지웁니다. 운영 DB 에는 행 수를 세는 SELECT 만 보냅니다.",
        },
        {
          kind: "table",
          head: ["복구 리허설 (1GB 리허설 서버)", "결과"],
          rows: [
            ["백업", "DB 덤프 512KB · 첨부 35MB"],
            ["표 행 수", "40개 표 모두 운영과 같음"],
            ["마이그레이션 이력", "95개 같음"],
            ["첨부", "DB 가 가리키는 파일 중 빠진 것 0"],
            ["복원한 DB 로 띄운 앱", "헬스체크 · 오락실 · 글 · 서열표 · 첫 화면 모두 200. 앱이 운영이 아니라 복원 DB 에 붙었는지도 확인"],
            ["깨진 덤프", "일부러 잘라 넣으면 복원 단계에서 멈추고 임시 DB 를 지움"],
          ],
        },
        {
          kind: "note",
          text: "부하와 복구 모두 리허설 서버 값입니다. 리허설의 CPU 1개는 이 PC 의 코어 하나라, 실서버의 vCPU 가 더 느리면 한계도 그만큼 낮습니다. 데이터가 작아(18MB) 복원과 기동이 각각 1초 안에 끝났고, 실서버 값은 서버에서 직접 돌려야 나옵니다.",
        },
      ],
    },
    {
      id: "open",
      eyebrow: "13 · Open",
      title: "아직 남은 것",
      blocks: [
        {
          kind: "list",
          items: [
            "실서버에는 아직 부하를 걸어 보지 못했습니다. 11.24 에 1GB 리허설 서버에서 다시 잰 값(12절)뿐입니다.",
            "백업을 다른 장비로 옮기는 단계가 비어 있습니다. 복구 리허설은 리허설 서버에서 통과했지만 실서버에서는 아직입니다.",
            "출시 감사의 Medium 중 CSRF 가드(로그인된 브라우저를 속여 원치 않는 요청을 보내게 하는 공격을 막는 장치) 등이 남았습니다. 업로드 상한은 11.20 에, 업로드 헬스체크는 11.24 에 넣었습니다.",
            "글 상세를 읽는 데는 여전히 관계를 따라 9문장이 듭니다. 읽기 경로라 11.24 에는 건드리지 않았습니다.",
            "화면 · e2e 테스트(사용자가 쓰는 흐름을 처음부터 끝까지 눌러 보는 시험)와 스테이징 환경(실서비스와 같은 구성으로 미리 시험해 보는 별도 환경)이 없습니다.",
          ],
        },
      ],
    },
  ],
};
