import { navItems, socialLinks } from "../data";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Navtej Singh</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Full stack developer passionate about creating useful products and clean digital experiences.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="mt-3 grid gap-2">
            {navItems.slice(1, 5).map((item) => (
              <a key={item.id} href={item.href} className="text-sm text-zinc-400 hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Connect</h3>
          <div className="mt-4 flex gap-3">
            {socialLinks.map((link) => {
              return (
                <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} aria-label={link.label} className="icon-button">
                  <SocialIcon link={link} size={19} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Navtej Singh. All rights reserved.</p>
        <p>Made with React, Tailwind CSS, and Vite.</p>
      </div>
    </footer>
  );
}