import { ArrowRight, Mail } from "lucide-react";
import LogoSphere from "./LogoSphere";
import SocialIcon from "./SocialIcon";
// 1. We swap the imports here
import ProfileShowcase from "./ProfileShowcase"; 
import { socialLinks } from "../data";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-28 px-5 pb-16 pt-32 sm:px-6 lg:px-8">
      {/* 2. Kept the exact same layout grid so the right side remains perfectly proportioned */}
      <div className="mx-auto grid min-h-[calc(100vh-108px)] max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        
        {/* Left Side: Text Content */}
        <div className="animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
            Available for projects and collaboration
          </div>

          <div className="mb-6 flex items-center gap-4">
            <LogoSphere className="h-16 w-16" />
            <div>
              <p className="m-0 text-sm text-zinc-400">Portfolio of</p>
              <p className="m-0 text-lg font-semibold text-white">Navtej Singh</p>
            </div>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-[5rem]">
            Building digital experiences through real-world projects.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            B.Tech CSE student passionate about building full stack applications, APIs, and practical digital products through hands-on projects.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="primary-action" href="#projects">
              <span>View My Work</span>
              <ArrowRight size={18} />
            </a>
            <a className="secondary-action" href="#contact">
              <Mail size={18} />
              <span>Get In Touch</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={link.label}
                className="icon-button"
              >
                <SocialIcon link={link} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: New Personal Profile Card */}
        <ProfileShowcase />
        
      </div>
    </section>
  );
}