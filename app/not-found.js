import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { notFound, profile } from "./data/portfolioData";

export const metadata = {
  title: `페이지를 찾을 수 없습니다 | ${profile.handle}`,
};

/** 없는 주소로 들어왔을 때 Next.js 기본 404 대신 보이는 화면입니다. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="section not-found" style={{ borderTop: "none" }}>
          <div className="container">
            <span className="section-eyebrow">404</span>
            <h1 className="section-title">{notFound.title}</h1>
            <p className="section-desc">{notFound.desc}</p>
            <div className="hero-actions">
              <Link href="/" className="btn btn-primary">
                홈으로
              </Link>
              <Link href="/#projects" className="btn btn-ghost">
                프로젝트 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
