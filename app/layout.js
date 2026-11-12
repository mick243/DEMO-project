import "./globals.css";

export const metadata = {
  title: "강정민 | Frontend Developer",
  description: "끝까지 책임지며 함께 일하는 프론트엔드 개발자 강정민의 포트폴리오.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 스크립트가 돌 때만 섹션을 숨겼다 보여 줍니다. 스크립트가 꺼져 있으면 처음부터 보입니다. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}