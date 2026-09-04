import { useState, useEffect, useRef, useCallback } from "react";
import Terminal from "./components/Terminal";
import LoadingScreen from "./components/LoadingScreen";
import KonamiCode from "./components/KonamiCode";
import BackgroundObjects from "./components/BackgroundObjects";
import BackToTop from "./components/BackToTop";

function App() {
  const [loading, setLoading] = useState(true);
  const progressRef = useRef(null);

  const handleLoadComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <div ref={progressRef} className="scroll-progress" />
      <div className="grid-overlay" />
      <BackgroundObjects />
      <KonamiCode />
      <BackToTop />
      <Terminal />
    </div>
  );
}

export default App;
