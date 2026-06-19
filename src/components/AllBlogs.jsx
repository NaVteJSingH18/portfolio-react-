import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, FileText } from "lucide-react";
import SectionHeading from "./SectionHeading";
import nsLogo from "../../speed-letter-ns-logo-isolated-on-white-background-vector.jpg";

const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${apiBase}${path}`;

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    async function fetchBlogs() {
      try {
        const response = await fetch(apiUrl("/api/blogs"));
        if (!response.ok) {
          throw new Error("Failed to load blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error loading blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const query = searchTerm.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-6 lg:px-8">
      {/* Navigation Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="secondary-action !px-4 !py-2 text-sm"
          type="button"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>
      </div>

      <SectionHeading
        eyebrow="Writing Archive"
        title="Explore all publications"
        description="A full repository of articles detailing developer notes, projects, and systems design."
      />

      {/* Search Bar */}
      <div className="mx-auto mb-12 max-w-xl">
        <div className="relative">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by title or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#050506]/80 py-3.5 pr-6 pl-12 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-zinc-950/90 focus:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>
          <p className="mt-4 text-sm text-zinc-400">Loading publications...</p>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.slug}
              onClick={() => navigate(`/blogs/${blog.slug}`)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden bg-zinc-900">
                <img
                  src={blog.image || nsLogo}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold tracking-wider text-cyan-400 uppercase">
                  <FileText size={12} />
                  <span>Article</span>
                </div>
                <h3 className="line-clamp-2 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {blog.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                  {blog.content}
                </p>
                <div className="mt-auto pt-6 text-xs text-zinc-500">
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Published"}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] py-16 text-center">
          <p className="text-zinc-500">No publications found matching your search.</p>
        </div>
      )}
    </div>
  );
}
