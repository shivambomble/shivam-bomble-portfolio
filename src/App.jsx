import { useState, useEffect, useRef, useCallback } from "react";
import Terminal from "./components/Terminal";
import LoadingScreen from "./components/LoadingScreen";
import KonamiCode from "./components/KonamiCode";
import BackgroundObjects from "./components/BackgroundObjects";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";

const LOADER_SEEN_KEY = "sb-loader-seen";

function App() {
  // Returning visitors go straight to the site; the intro is a one-time flourish.
  const [loading, setLoading] = useState(() => {
    try {
      return localStorage.getItem(LOADER_SEEN_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const progressRef = useRef(null);

  const handleLoadComplete = useCallback(() => {
    try {
      localStorage.setItem(LOADER_SEEN_KEY, "1");
    } catch {
      // Storage can be blocked; the loader just runs every visit in that case.
    }
    setLoading(false);
  }, []);

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
      <CustomCursor />
      <KonamiCode />
      <BackToTop />
      <Terminal />
    </div>
  );
}

export default App;
