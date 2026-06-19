import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import LogoSphere from "./LogoSphere";
import { navItems } from "../data"; 

export default function Navbar({ activeSection, isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    // 1. We make the header fixed, transparent, and pointer-events-none so you can click *through* the empty space around it
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      
      {/* 2. The Floating Pill: We restore pointer-events here so the navbar itself is clickable */}
      <nav className="pointer-events-auto flex w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-[#050506]/60 px-4 py-2 shadow-2xl backdrop-blur-md transition-all">
        
        {/* Logo Area */}
        <a href={isHome ? "#home" : "/"} className="flex items-center gap-3 pl-2" onClick={() => setIsMenuOpen(false)}>
          {/* Made the logo slightly smaller to fit the sleek pill */}
          <LogoSphere className="h-8 w-8" />
          <span className="hidden font-semibold text-white sm:block">Navtej Singh</span>
        </a>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden items-center gap-1 pr-2 md:flex">
          {navItems.map((item) => {
            const href = isHome ? item.href : `/${item.href}`;
            return (
              <a 
                key={item.id} 
                href={href} 
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isHome && activeSection === item.id 
                    ? "bg-white/10 text-white" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Burger Button (Hidden on Desktop) */}
        <button 
          type="button" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white md:hidden" 
          aria-label="Toggle navigation" 
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Floating Dropdown Card */}
      {isMenuOpen ? (
        <div className="pointer-events-auto absolute left-4 right-4 top-[115%] mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#050506]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
          {navItems.map((item) => {
            const href = isHome ? item.href : `/${item.href}`;
            return (
              <a 
                key={item.id} 
                href={href} 
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isHome && activeSection === item.id 
                    ? "bg-white/10 text-white" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`} 
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}