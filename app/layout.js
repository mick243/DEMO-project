import "./globals.css";

export const metadata = {
  title: "강정민 | Frontend Developer",
  description: "렌더 성능을 측정으로 검증하는 프론트엔드 개발자 강정민의 포트폴리오.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}