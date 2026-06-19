import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { fallbackBlogs } from "../data";
import nsLogo from "../../speed-letter-ns-logo-isolated-on-white-background-vector.jpg";

const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${apiBase}${path}`;

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchBlogDetail() {
      try {
        const response = await fetch(apiUrl(`/api/blogs/${slug}`));
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.warn("API error, checking fallbacks:", err);
        // Look up in fallback mock blogs
        const localMock = fallbackBlogs.find((fb) => fb.slug === slug);
        if (localMock) {
          setBlog({
            title: localMock.title,
            content: localMock.content,
            image: localMock.image,
            createdAt: new Date().toISOString(),
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogDetail();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050506] text-zinc-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>
        <p className="mt-4 text-sm text-zinc-400">Loading publication details...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050506] px-5 text-center text-zinc-100">
        <h2 className="text-2xl font-bold">Publication Not Found</h2>
        <p className="mt-2 text-zinc-400">The article you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate("/blogs")}
          className="primary-action mt-6"
          type="button"
        >
          <ArrowLeft size={16} />
          <span>Back to Archive</span>
        </button>
      </div>
    );
  }

  // Calculate a mock reading time based on word count
  const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="mx-auto max-w-4xl px-5 pt-32 pb-24 sm:px-6 lg:px-8">
      {/* Navigation & Header Actions */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="secondary-action !px-4 !py-2 text-sm"
          type="button"
        >
          <ArrowLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Article Cover Image */}
      <div className="relative mb-10 h-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 sm:h-96">
        <img
          src={blog.image || nsLogo}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-6 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-cyan-400" />
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="text-amber-400" />
          <span>Navtej Singh</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-rose-400" />
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Content */}
      <h1 className="mt-8 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
        {blog.title}
      </h1>

      <div className="mt-8 whitespace-pre-line text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
        {blog.content}
      </div>
    </article>
  );
}
