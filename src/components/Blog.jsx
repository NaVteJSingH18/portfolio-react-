import { ArrowRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "./SectionHeading";

export default function Blog({ blogs }) {
  const navigate = useNavigate();
  // Display only the latest 3 blogs on the homepage feed
  const latestBlogs = (blogs || []).slice(0, 3);

  return (
    <section id="blogs" className="section-shell">
      <SectionHeading
        eyebrow="Writing"
        title="Thoughts on code & architecture."
        description="Technical articles, project post-mortems, and notes on my continuous learning journey."
      />

      <div className="mx-auto max-w-4xl space-y-4">
        {latestBlogs.map((blog) => (
          <article 
            key={blog.slug} 
            // The "group" class lets us trigger animations on child elements when the parent is hovered
            className="group cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20 sm:p-8"
            onClick={() => navigate(`/blogs/${blog.slug}`)}
          >
            <div className="flex items-center justify-between gap-6">
              
              {/* Left Side: Icon & Text */}
              <div className="flex flex-1 items-start gap-5">
                <div className="hidden rounded-full bg-white/5 p-3 text-zinc-500 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-400 sm:block">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100 transition-colors group-hover:text-emerald-300">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {/* Truncate long content to keep the list neat */}
                    {blog.content.length > 150 ? `${blog.content.slice(0, 150)}...` : blog.content}
                  </p>
                </div>
              </div>

              {/* Right Side: Animated Arrow */}
              <div className="flex flex-none items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-500 transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:-rotate-45" />
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/blogs")}
          className="secondary-action"
          type="button"
        >
          <FileText size={18} />
          <span>View All Publications</span>
        </button>
      </div>
    </section>
  );
}