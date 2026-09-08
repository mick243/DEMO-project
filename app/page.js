import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
// import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Hero />
        </div>
        <About />
        <Skills />
        <Projects />
        {/* <Process /> */}
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
