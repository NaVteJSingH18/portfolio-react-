import { useEffect, useState } from "react";

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
import BlogModal from "./components/BlogModal";

// Data
import { navItems, fallbackBlogs } from "./data";
import nsLogo from "../speed-letter-ns-logo-isolated-on-white-background-vector.jpg";

const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${apiBase}${path}`;

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Intersection Observer to highlight active link in Navbar
  useEffect(() => {
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
  }, []);

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

  // Lock scrolling when modal is open
  useEffect(() => {
    if (!selectedBlog) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedBlog(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedBlog]);

  async function openBlog(blog) {
    if (!apiBase && fallbackBlogs.some((fallbackBlog) => fallbackBlog.slug === blog.slug)) {
      setSelectedBlog(blog);
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/blogs/${blog.slug}`));
      if (!response.ok) {
        throw new Error("Blog not found");
      }
      const fullBlog = await response.json();
      setSelectedBlog({
        slug: fullBlog.slug,
        title: fullBlog.title,
        content: fullBlog.content,
        image: fullBlog.image || blog.image,
      });
    } catch {
      setSelectedBlog(blog);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050506] text-zinc-100">
      <BackgroundSlivers />
      
      <Navbar 
        activeSection={activeSection} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog blogs={blogs} openBlog={openBlog} />
        <Resume />
        <Contact />
      </main>

      <Footer />

      {selectedBlog ? <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} /> : null}
    </div>
  );
}

export default App;