import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundSlivers from "./components/BackgroundSlivers";

// Section Components
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Resume from "./components/Resume";
import Contact from "./components/Contact";

// Page Components
import AllBlogs from "./components/AllBlogs";
import BlogDetail from "./components/BlogDetail";
import AdminDashboard from "./components/AdminDashboard";

// Data
import { navItems, fallbackBlogs } from "./data";
import nsLogo from "../speed-letter-ns-logo-isolated-on-white-background-vector.jpg";

const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${apiBase}${path}`;

// Main Home Page Section Aggregator
function Home({ blogs }) {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog blogs={blogs} />
      <Resume />
      <Contact />
    </>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const location = useLocation();

  // Intersection Observer to highlight active link in Navbar (Homepage only)
  useEffect(() => {
    if (location.pathname !== "/") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Fetch blogs from API
  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      try {
        const response = await fetch(apiUrl("/api/blogs"));
        if (!response.ok) {
          throw new Error("Blog API unavailable");
        }
        const remoteBlogs = await response.json();
        if (isMounted && Array.isArray(remoteBlogs) && remoteBlogs.length > 0) {
          setBlogs(
            remoteBlogs.map((blog) => ({
              slug: blog.slug,
              title: blog.title,
              content: blog.content,
              image: blog.image || nsLogo,
            })),
          );
        }
      } catch {
        if (isMounted) {
          setBlogs(fallbackBlogs);
        }
      }
    }

    loadBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050506] text-zinc-100">
      <BackgroundSlivers />
      
      <Navbar 
        activeSection={activeSection} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <main>
        <Routes>
          <Route path="/" element={<Home blogs={blogs} />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;