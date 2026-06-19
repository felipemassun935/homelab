import { MotionConfig } from "framer-motion";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Architecture } from "./components/Architecture";
import { Services } from "./components/Services";
import { Decisions } from "./components/Decisions";
import { TechStack } from "./components/TechStack";
import { Roadmap } from "./components/Roadmap";
import { Footer } from "./components/Footer";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="main-content">
        <Hero />
        <Architecture />
        <Services />
        <Decisions />
        <TechStack />
        <Roadmap />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
