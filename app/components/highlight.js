// 딥다이브 코드 블록의 문법 강조입니다. VS Code 기본 다크 테마(Dark+)의 색 규칙을 따릅니다.
// 라이브러리 없이 서버에서 한 번 토큰으로 나누고, 색은 globals.css 의 .tk-* 가 정합니다.
// 지원하는 언어: ts(TypeScript · JSX, 기본) · sql · sh(쉘 스크립트).
// diff: true 면 "+ " · "- " 로 시작하는 줄에 추가 · 삭제 배경을 깝니다.

const TS_KEYWORDS = new Set([
  "const", "let", "var", "function", "class", "new", "this", "typeof", "instanceof",
  "async", "await", "import", "export", "from", "default", "extends", "of", "in",
  "true", "false", "null", "undefined", "void", "delete",
]);
const TS_CONTROL = new Set([
  "if", "else", "for", "while", "do", "return", "break", "continue", "switch", "case",
  "try", "catch", "finally", "throw", "yield",
]);

const SQL_KEYWORDS = new Set([
  "select", "from", "where", "join", "left", "right", "inner", "outer", "cross", "lateral",
  "on", "and", "or", "not", "as", "in", "is", "null", "group", "by", "order", "asc", "desc",
  "nulls", "last", "first", "with", "limit", "offset", "union", "all", "distinct", "case",
  "when", "then", "else", "end", "exists", "having", "values", "insert", "into", "update",
  "set", "delete", "returning",
]);
const SQL_TYPES = new Set(["int", "integer", "float8", "text", "json", "jsonb", "bigint", "numeric", "boolean"]);

// 정규식은 앞에서부터 처음 맞는 것을 씁니다. 순서가 곧 우선순위입니다.
// 쉘 스크립트(sh)는 배포 스크립트 발췌에 씁니다
const SH_KEYWORDS = new Set([
  "if", "then", "else", "elif", "fi", "for", "do", "done", "while", "case", "esac", "in",
  "function", "local", "return", "exit", "set", "echo", "cat", "mapfile", "printf", "grep", "find", "sort", "tr",
]);
const SH_RULES = [
  ["comment", /^#[^\n]*/],
  ["string", /^"(?:\\[\s\S]|[^"\\])*"/],
  ["string", /^'[^']*'/],
  ["param", /^\$\{[^}\n]*\}|^\$\([^)\n]*\)|^\$[A-Za-z_]\w*/],
  ["number", /^\d+/],
  ["word", /^[A-Za-z_][\w-]*/],
  ["space", /^\s+/],
  ["punct", /^[\s\S]/],
];

const TS_RULES = [
  ["comment", /^\/\/[^\n]*/],
  ["comment", /^\/\*[\s\S]*?\*\//],
  ["string", /^`(?:\\[\s\S]|[^`\\])*`/],
  ["string", /^"(?:\\.|[^"\\\n])*"/],
  ["string", /^'(?:\\.|[^'\\\n])*'/],
  ["number", /^\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?/i],
  ["word", /^[A-Za-z_$][\w$]*/],
  ["space", /^\s+/],
  ["punct", /^[\s\S]/],
];

const SQL_RULES = [
  ["comment", /^--[^\n]*/],
  ["string", /^'(?:''|[^'\n])*'/],
  ["param", /^\$\d+/],
  ["cast", /^::[A-Za-z_]\w*/],
  ["number", /^\d+(?:\.\d+)?/],
  ["word", /^[A-Za-z_][\w$]*/],
  ["space", /^\s+/],
  ["punct", /^[\s\S]/],
];

function tokenize(src, lang) {
  const rules = lang === "sql" ? SQL_RULES : lang === "sh" ? SH_RULES : TS_RULES;
  const out = [];
  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    for (const [kind, re] of rules) {
      const m = re.exec(rest);
      if (!m) continue;
      out.push([kind, m[0]]);
      i += m[0].length;
      break;
    }
  }
  return lang === "sql" ? classifySql(out) : lang === "sh" ? classifySh(out) : classifyTs(out);
}

function nextSolid(tokens, k) {
  for (let j = k + 1; j < tokens.length; j++) if (tokens[j][0] !== "space") return tokens[j][1];
  return "";
}
function prevSolid(tokens, k) {
  for (let j = k - 1; j >= 0; j--) if (tokens[j][0] !== "space") return tokens[j][1];
  return "";
}

function classifyTs(tokens) {
  return tokens.map(([kind, text], k) => {
    if (kind !== "word") return [kind, text];
    // 점 뒤의 이름은 키워드와 철자가 같아도(markers.delete) 속성 · 메서드입니다
    if (prevSolid(tokens, k) === ".") return [nextSolid(tokens, k) === "(" ? "fn" : "prop", text];
    if (TS_CONTROL.has(text)) return ["control", text];
    if (TS_KEYWORDS.has(text)) return ["keyword", text];
    if (nextSolid(tokens, k) === "(") return ["fn", text];
    if (/^[A-Z]/.test(text)) return [/^[A-Z0-9_]+$/.test(text) && text.length > 1 ? "constant" : "type", text];
    if (prevSolid(tokens, k) === ".") return ["prop", text];
    return ["var", text];
  });
}

function classifySql(tokens) {
  return tokens.map(([kind, text], k) => {
    if (kind === "cast") return ["type", text];
    if (kind === "param") return ["number", text];
    if (kind !== "word") return [kind, text];
    const low = text.toLowerCase();
    if (nextSolid(tokens, k) === "(" && !SQL_KEYWORDS.has(low)) return ["fn", text];
    if (SQL_KEYWORDS.has(low)) return ["keyword", text];
    if (SQL_TYPES.has(low)) return ["type", text];
    return ["var", text];
  });
}

function classifySh(tokens) {
  return tokens.map(([kind, text]) => {
    if (kind === "param") return ["constant", text];
    if (kind !== "word") return [kind, text];
    return SH_KEYWORDS.has(text) ? ["keyword", text] : ["var", text];
  });
}

// 토큰을 줄 단위로 나눕니다. 여러 줄에 걸친 주석 · 문자열도 줄마다 끊어 담습니다.
export function highlightLines(src, lang = "ts") {
  const lines = [[]];
  for (const [kind, text] of tokenize(src, lang)) {
    const parts = text.split("\n");
    parts.forEach((part, p) => {
      if (p > 0) lines.push([]);
      if (part) lines[lines.length - 1].push([kind, part]);
    });
  }
  return lines;
}
