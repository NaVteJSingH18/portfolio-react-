import { Code2, LayoutDashboard, Mail, MapPin, Phone, Server, TrendingUp } from "lucide-react";
import nsLogo from "../speed-letter-ns-logo-isolated-on-white-background-vector.jpg";
import landingPageImage from "../landingpage.png";
import placemateImg from "./assets/projects/placemate.png"
import empImg from "./assets/projects/emp.png"

export const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Blog", href: "#blogs", id: "blogs" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const strengths = [
  { title: "Full Stack Projects", description: "Building complete applications from interface polish to backend routes.", icon: Code2 },
  { title: "Backend Architecture", description: "Designing modular Express APIs, route layers, and MongoDB-backed features.", icon: Server },
  { title: "Project Structure", description: "Organizing code so features stay readable, reusable, and easier to grow.", icon: LayoutDashboard },
  { title: "Continuous Growth", description: "Practicing DSA, system design, and hands-on full-stack development.", icon: TrendingUp },
];

export const skillGroups = [
  { title: "Frontend", iconClass: "devicon-react-original colored", skills: ["React", "HTML5", "CSS3", "JavaScript ES6+"] },
  { title: "Backend", iconClass: "devicon-nodejs-plain colored", skills: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Database", iconClass: "devicon-mongodb-plain colored", skills: ["MongoDB", "SQL"] },
  { title: "DevOps & Tools", iconClass: "devicon-git-plain colored", skills: ["Git", "Linux", "GitHub Actions", "Postman"] },
];

export const projectsData = [
  {
    title: "PlaceMate",
    description: "Campus placement portal for students, recruiters and application tracking.",
    image: placemateImg,
    tech: ["React", "Tailwind"],
    liveUrl: "https://placemate-app.vercel.app/", // Add your live link here if you have one!
    repoUrl: "https://github.com/NaVteJSingH18/PlaceMate", 
  },
  {
    title: "BeatFlow Landing Page",
    description: "A responsive music landing page focused on sharp visual hierarchy, fast loading, and a clear conversion path.",
    image: landingPageImage,
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://navtejsingh18.github.io/Landing-page/",
    repoUrl: "https://github.com/navtejsingh18",
  },
{
    title: "Employee Portal",
    description: "Employee management dashboard with authentication and task tracking.",
    image: empImg,
    tech: ["React", "Context API"],
    liveUrl: "https://employee-portal-navtej.vercel.app/", // Add your live link here if you have one!
    repoUrl: "https://github.com/NaVteJSingH18/employee-management-system",
  },
];

export const fallbackBlogs = [
  { slug: "building-with-better-structure", title: "Building With Better Structure", content: "Good projects become easier to improve when routes, controllers, components, and data are separated with clear responsibilities.", image: nsLogo },
  { slug: "frontend-polish-that-matters", title: "Frontend Polish That Matters", content: "A portfolio should feel direct, readable, and alive. Strong spacing, responsive cards, accessible buttons, and useful fallback states make the experience feel more finished.", image: landingPageImage },
];

export const contactLinks = [
  { label: "Email", value: "navtej.dgc@gmail.com", href: "mailto:navtej.dgc@gmail.com", icon: Mail },
  { label: "Phone", value: "9464734065", href: "tel:9464734065", icon: Phone },
  { label: "Location", value: "Punjab, India", href: "#contact", icon: MapPin },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/navtejsingh18", iconClass: "devicon-github-original" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/navtejsingh18", iconClass: "devicon-linkedin-plain colored" },
  { label: "Email", href: "mailto:navtej.dgc@gmail.com", icon: Mail },
];

export const learningItems = ["React", "Node.js", "System design", "DSA"];

export const slivers = [
  { left: "8%", width: "4px", height: "64px", duration: "25s", delay: "0s" },
  { left: "18%", width: "2px", height: "38px", duration: "38s", delay: "11s" },
  { left: "34%", width: "6px", height: "88px", duration: "27s", delay: "2s" },
  { left: "47%", width: "3px", height: "72px", duration: "32s", delay: "8s" },
  { left: "58%", width: "5px", height: "52px", duration: "29s", delay: "4s" },
  { left: "71%", width: "2px", height: "98px", duration: "36s", delay: "13s" },
  { left: "84%", width: "7px", height: "116px", duration: "31s", delay: "6s" },
  { left: "93%", width: "3px", height: "42px", duration: "40s", delay: "9s" },
];