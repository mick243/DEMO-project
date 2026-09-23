import "./globals.css";

export const metadata = {
  title: "강정민 | Frontend Developer",
  description: "혼자 끝까지, 함께 일하는 프론트엔드 개발자 강정민의 포트폴리오.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}