import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-6">
          <Hero />
          <Projects />
          {/* <Testimonials /> */}
          <About />
          <Footer />
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
