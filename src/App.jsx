import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    /* Changed overflow-hidden to overflow-x-hidden so vertical scroll works */
    <div className="relative min-h-screen bg-[#0f172a] text-white  overflow-hidden pt-16 selection:bg-blue-500/30">
      
      {/* Background Grid - This makes it look like your Hero section everywhere */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Navbar />

      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;