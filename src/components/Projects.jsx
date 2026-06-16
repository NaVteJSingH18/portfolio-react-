import { ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projectsData } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Featured projects"
        description="A selection of work that shows UI design, frontend implementation, backend structure, and deployment practice."
      />

      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
        {projectsData.map((project) => (
          <article key={project.title} className="project-card">
            <img src={project.image} alt={`${project.title} preview`} className="h-64 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{project.description}</p>
                </div>
                <div className="flex flex-none gap-2">
                  <a className="mini-icon-button" href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
                    <i className="devicon-github-original text-lg" aria-hidden="true" />
                  </a>
                  <a className="mini-icon-button" href={project.liveUrl} target={project.liveUrl.startsWith("http") ? "_blank" : undefined} rel={project.liveUrl.startsWith("http") ? "noreferrer" : undefined} aria-label={`${project.title} live demo`}>
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="skill-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a className="secondary-action" href="https://github.com/navtejsingh18" target="_blank" rel="noreferrer">
          <i className="devicon-github-original text-lg" aria-hidden="true" />
          <span>View All Projects on GitHub</span>
        </a>
      </div>
    </section>
  );
}