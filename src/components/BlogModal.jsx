import { X } from "lucide-react";

export default function BlogModal({ blog, onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="blog-modal-title" 
      onMouseDown={onClose}
    >
      <article 
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black" 
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="blog-modal-title" className="text-2xl font-semibold text-white">
            {blog.title}
          </h2>
          <button 
            type="button" 
            className="icon-button flex-none" 
            aria-label="Close blog post" 
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <p className="mt-5 whitespace-pre-line text-base leading-8 text-zinc-300">
          {blog.content}
        </p>
      </article>
    </div>
  );
}