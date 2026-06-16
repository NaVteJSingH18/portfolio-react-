import { FileText } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="section-shell">
      <div className="mx-auto max-w-5xl rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(245,158,11,0.08),rgba(244,63,94,0.1))] px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Want to know more?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300">
          Reach out for a detailed look at my experience, skills, education, and project work.
        </p>
        <div className="mt-7 flex justify-center">
          {/* Updated link to perfectly match your file name with underscores */}
          <a 
            className="primary-action" 
            href="/Navtej_singh_resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FileText size={18} />
            <span>View Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}