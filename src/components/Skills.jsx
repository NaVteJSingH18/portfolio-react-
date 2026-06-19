import SectionHeading from "./SectionHeading";
import { skillGroups, learningItems } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Skills"
        title="Skills and technologies"
        description="A focused toolkit for building modern web applications across the stack."
      />

      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <article key={group.title} className="feature-card">
            <i className={`${group.iconClass} text-4xl`} aria-hidden="true" />
            <h3 className="mt-5 text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </article>
          
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-6xl rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-white">Currently learning</h3>
          <div className="flex flex-wrap gap-2">
            {learningItems.map((item) => (
              <span key={item} className="learning-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}