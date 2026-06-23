import { useState, useEffect } from 'react';
import { ReactTyped } from "react-typed";
import { motion, AnimatePresence } from "framer-motion";
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import ParticlesBackground from './ParticlesBackground';
// Utility for cleaner class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Contact Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch("https://formsubmit.co/ajax/garvsharmaofficial10@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          _subject: formData.subject || "New Message from Portfolio",
          message: formData.message
        })
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setContactModalOpen(false);
        setSubmitSuccess(false);
        setFormData({ email: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 selection:bg-accent-cyan/30">
      
      {/* NAVBAR */}
      <nav className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent h-[70px] flex items-center",
        scrolled ? "bg-dark-900/80 backdrop-blur-lg border-white/10 shadow-lg" : "bg-transparent"
      )}>
        <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center w-full">
          <a href="#hero" className="font-mono text-xl font-bold tracking-tight">
            <span className="text-accent-cyan">&lt;</span>GS<span className="text-accent-cyan">/&gt;</span>
          </a>
          
          <ul className="hidden md:flex gap-2">
            {['About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="px-4 py-2 font-mono text-sm text-slate-400 hover:text-accent-cyan hover:bg-accent-cyan/10 rounded-full transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a href="/Garv Sharma Resume.pdf" download className="hidden md:flex items-center gap-2 border border-accent-cyan text-accent-cyan px-5 py-2 rounded-full font-medium text-sm hover:bg-accent-cyan/10 transition-all">
              <i className="fa-solid fa-download"></i> Resume
            </a>
            
            <button className="md:hidden text-2xl text-slate-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[70px] bg-dark-900/95 backdrop-blur-xl z-30 flex flex-col p-6 gap-4 border-b border-white/10 md:hidden"
          >
            {['About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-mono text-slate-300 py-3 border-b border-white/5">
                {item}
              </a>
            ))}
            <a href="/Garv Sharma Resume.pdf" download className="mt-4 flex justify-center items-center gap-2 border border-accent-cyan text-accent-cyan px-5 py-3 rounded-full font-medium transition-all">
              <i className="fa-solid fa-download"></i> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dark-900">
        {/* Interactive Particle Network Background */}
        <ParticlesBackground />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/10 via-dark-900/60 to-dark-900 z-[2] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-[10] pointer-events-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-xs font-mono text-accent-green bg-accent-green/10 border border-accent-green/20 px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
              Available for Internships & Collaborations
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gradient mb-6">
            Garv Sharma
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl font-mono text-slate-400 mb-8 h-8">
            <span className="text-slate-500 mr-2">$ whoami &rarr;</span>
            <ReactTyped
              strings={['Full-Stack Developer', 'CS Engineer @ NIT KKR', 'AI & RAG Enthusiast', 'Competitive Programmer']}
              typeSpeed={50}
              backSpeed={30}
              loop
              className="text-accent-cyan font-medium"
            />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            CS Engineering student at <span className="text-slate-200 font-semibold">NIT Kurukshetra</span>. Building full-stack products, embedded systems, and intelligent applications.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#projects" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-accent text-white rounded-full font-semibold hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer">
              <i className="fa-solid fa-rocket"></i> View Projects
            </a>
            <button onClick={() => setContactModalOpen(true)} className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-accent-cyan hover:bg-accent-cyan/5 text-slate-200 rounded-full font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer">
              <i className="fa-solid fa-paper-plane"></i> Get In Touch
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="glass-card rounded-2xl p-6 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 max-w-3xl mx-auto relative z-20">
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gradient font-mono">1000+</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">DSA Problems</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gradient font-mono">5+</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Projects</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gradient font-mono">AIR 880</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">ICPC 2025</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION (ENHANCED) */}
      <section id="about" className="py-24 bg-dark-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-2 block">01. about</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">Who Am I?</h2>
          </div>

          <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-center">
            {/* About Text Content */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                Hey! I'm <strong className="text-slate-200 font-semibold">Garv Sharma</strong> — a passionate Computer Science & Engineering student (B.Tech + M.Tech integrated) at <span className="text-slate-200 font-semibold">NIT Kurukshetra</span>.
              </p>
              <p>
                I thrive at the intersection of <span className="text-accent-cyan font-medium">full-stack development</span>, <span className="text-accent-violet font-medium">AI/ML</span>, and <span className="text-accent-green font-medium">embedded systems</span>. I don't just write code; I strive to architect robust software solutions that bring ideas to reality.
              </p>
              <p>
                When I'm not shipping features or exploring the depths of new frameworks, you'll find me solving complex algorithmic challenges, actively participating in competitive programming contests, or reading about the latest tech trends.
              </p>
              
              <div className="pt-6 grid sm:grid-cols-2 gap-6">
                <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-cyan/10 rounded-xl flex items-center justify-center text-accent-cyan text-xl">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Education</div>
                    <div className="text-slate-200 font-medium text-sm">CSE, NIT Kurukshetra</div>
                  </div>
                </div>
                <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-violet/10 rounded-xl flex items-center justify-center text-accent-violet text-xl">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Location</div>
                    <div className="text-slate-200 font-medium text-sm">Gurugram, Haryana</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Image Frame */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative mx-auto w-full max-w-[320px] aspect-[4/5] perspective">
              {/* Decorative Glow Elements */}
              <div className="absolute -inset-4 bg-gradient-accent rounded-3xl opacity-20 blur-2xl animate-pulse-slow pointer-events-none"></div>
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl group">
                <img 
                  src="/profilePhoto.jpeg" 
                  alt="Garv Sharma" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Floating Tech Badges over the image */}
                <div className="absolute top-4 -right-4 bg-dark-900/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transform -rotate-12 transition-transform duration-300 group-hover:rotate-0">
                  <i className="fa-brands fa-react text-accent-cyan"></i>
                  <span className="text-xs font-mono font-bold">React</span>
                </div>
                <div className="absolute bottom-8 -left-4 bg-dark-900/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transform rotate-12 transition-transform duration-300 group-hover:rotate-0">
                  <i className="fa-brands fa-java text-accent-orange"></i>
                  <span className="text-xs font-mono font-bold">Spring</span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="font-bold text-xl text-white">Garv Sharma</h3>
                  <p className="text-accent-cyan font-mono text-xs">Full-Stack Developer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-dark-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-2 block">02. skills</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Technical Arsenal</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit of languages, frameworks, and modern technologies I use to build scalable solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              { 
                title: "Core Languages", 
                icon: "fa-code", 
                color: "cyan", 
                skills: [
                  { name: "Java", icon: "fa-brands fa-java" },
                  { name: "C++", icon: "fa-brands fa-c" },
                  { name: "Python", icon: "fa-brands fa-python" },
                  { name: "JavaScript", icon: "fa-brands fa-js" },
                  { name: "HTML/CSS", icon: "fa-brands fa-html5" }
                ] 
              },
              { 
                title: "Frameworks & Dev", 
                icon: "fa-layer-group", 
                color: "green", 
                skills: [
                  { name: "Spring Boot", icon: "fa-solid fa-leaf" },
                  { name: "React.js", icon: "fa-brands fa-react" },
                  { name: "Flutter", icon: "fa-solid fa-mobile-screen" },
                  { name: "REST APIs", icon: "fa-solid fa-server" }
                ] 
              },
              { 
                title: "AI & Databases", 
                icon: "fa-brain", 
                color: "violet", 
                skills: [
                  { name: "RAG Arch.", icon: "fa-solid fa-network-wired" },
                  { name: "Llama 3.2", icon: "fa-solid fa-robot" },
                  { name: "MongoDB Atlas", icon: "fa-solid fa-database" },
                  { name: "SQL", icon: "fa-solid fa-table" },
                  { name: "Vector Search", icon: "fa-solid fa-magnifying-glass-chart" }
                ] 
              },
              { 
                title: "Tools & Fundamentals", 
                icon: "fa-wrench", 
                color: "orange", 
                skills: [
                  { name: "Docker", icon: "fa-brands fa-docker" },
                  { name: "Git", icon: "fa-brands fa-git-alt" },
                  { name: "Postman", icon: "fa-solid fa-paper-plane" },
                  { name: "DSA & OOPs", icon: "fa-solid fa-cubes" },
                  { name: "OS & DBMS", icon: "fa-solid fa-hard-drive" }
                ] 
              }
            ].map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8 rounded-3xl hover:border-white/20 transition-all group">
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl bg-accent-${cat.color}/10 text-accent-${cat.color} group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                    <i className={`fa-solid ${cat.icon}`}></i>
                  </div>
                  <h3 className="font-bold text-2xl text-slate-100">{cat.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {cat.skills.map(skill => (
                    <div key={skill.name} className={`px-5 py-3 text-sm md:text-base font-semibold rounded-xl bg-dark-800/80 border border-white/5 hover:border-accent-${cat.color}/40 hover:bg-accent-${cat.color}/10 hover:text-accent-${cat.color} hover:-translate-y-1 transition-all flex items-center gap-3 cursor-default shadow-sm`}>
                      <i className={`${skill.icon} text-lg opacity-80`}></i>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION (REDESIGNED FOR CLUTTER FREE IMAGE CARDS) */}
      <section id="projects" className="py-24 bg-dark-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-2 block">03. projects</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">What I've Built</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "YouTube Semantic Search Engine",
                desc: "A full-stack semantic search app that ranks YouTube videos based on natural language intent using a RAG pipeline with locally deployed Llama 3.2 and MongoDB Atlas Vector Search.",
                tech: ["React.js", "Spring Boot", "MongoDB Atlas", "Llama 3.2"],
                icon: "fa-magnifying-glass",
                image: "/youtube_search.jpg",
                github: "https://github.com/garvsharma9/yt-dlp",
                featured: true
              },
              {
                title: "Team Finder",
                desc: "Full-stack platform to find teammates for hackathons & projects. Features Google/GitHub OAuth, SEO optimization, chat, and caching for high-traffic endpoints.",
                tech: ["React", "Spring Boot", "MongoDB", "Docker", "OAuth"],
                icon: "fa-users",
                image: "/team_finder.jpg",
                github: "https://github.com/garvsharma9/TeamFinder",
                featured: true
              },
              {
                title: "Link Shortener",
                desc: "Cross-platform link shortener with Spring Boot REST APIs, MongoDB Atlas, and Flutter frontend. Deployed on Railway with full API validation via Postman.",
                tech: ["Flutter", "Spring Boot", "MongoDB", "Railway"],
                icon: "fa-link",
                image: "/link_shortener.jpg",
                github: "https://github.com/garvsharma9",
                featured: false
              },
              {
                title: "Smart Cycle Lock",
                desc: "IoT embedded system with C++ firmware on ESP-32 enabling remote lock/unlock over Wi-Fi. Led a 5-member team as Team Leader for this hardware project.",
                tech: ["C++", "ESP-32", "IoT", "Wi-Fi"],
                icon: "fa-lock",
                image: "/smart_lock.jpg",
                github: "https://github.com/garvsharma9/Excalibur",
                featured: false
              }
            ].map((proj, i) => (
              <motion.div key={proj.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative rounded-3xl overflow-hidden shadow-2xl bg-dark-900 border border-white/10 aspect-[4/3] md:aspect-[16/10]">
                {/* Project Background Image */}
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>
                
                {proj.featured && <div className="absolute top-4 right-4 bg-gradient-accent text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">Featured</div>}
                
                {/* Default Clean View (Bottom Title) */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-dark-800/80 backdrop-blur-md rounded-lg flex items-center justify-center text-white text-lg border border-white/10">
                      <i className={`fa-solid ${proj.icon}`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{proj.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-xs font-mono text-accent-cyan bg-dark-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5">{t}</span>
                    ))}
                    {proj.tech.length > 3 && <span className="text-xs font-mono text-slate-400 bg-dark-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5">+{proj.tech.length - 3}</span>}
                  </div>
                </div>

                {/* Hover Reveal Overlay (Description & Links) */}
                <div className="absolute inset-0 bg-dark-900/90 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-center translate-y-[100%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                  <h3 className="text-2xl font-bold text-accent-cyan mb-4">{proj.title}</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed flex-1">{proj.desc}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.tech.map(t => (
                        <span key={t} className="text-xs font-mono text-slate-200 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">{t}</span>
                      ))}
                    </div>
                    
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-dark-900 hover:bg-accent-cyan hover:text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors">
                      <i className="fa-brands fa-github text-lg"></i> View Repository
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS & PROFILES SECTION */}
      <section id="achievements" className="py-24 bg-dark-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-2 block">04. milestones</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">Achievements & Coding</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: "ICPC 2025", metric: "AIR 880", desc: "Team 'Survival Trio' — Preliminary Contest", icon: "fa-trophy" },
              { title: "JEE Mains 2024", metric: "Top 1.5%", desc: "AIR 20,961 among 1.4 Million candidates", icon: "fa-medal" },
              { title: "Algorithms", metric: "1000+ Solved", desc: "LeetCode 1642 · Codeforces 1095", icon: "fa-bolt" }
            ].map((ach, i) => (
              <motion.div key={ach.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-white/5 bg-dark-800 rounded-2xl p-6 hover:border-accent-cyan/30 transition-colors">
                <i className={`fa-solid ${ach.icon} text-3xl text-accent-cyan mb-4`}></i>
                <h3 className="text-lg font-bold text-slate-200">{ach.title}</h3>
                <div className="text-xl font-mono text-gradient font-bold my-2">{ach.metric}</div>
                <p className="text-sm text-slate-400">{ach.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Coding Profiles */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "LeetCode", handle: "garvsharma09", url: "https://leetcode.com/u/garvsharma09/", icon: "fa-code" },
              { name: "Codeforces", handle: "garvroc9", url: "https://codeforces.com/profile/garvroc9", icon: "fa-laptop-code" },
              { name: "CodeChef", handle: "suave_shop_50", url: "https://www.codechef.com/users/suave_shop_50", icon: "fa-utensils" },
              { name: "GeeksforGeeks", handle: "Garv Sharma", url: "https://www.geeksforgeeks.org/user/garvsharmaofficial10/", icon: "fa-leaf" }
            ].map((prof, i) => (
              <motion.a key={prof.name} href={prof.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-all group">
                <div className="w-10 h-10 rounded bg-dark-900 border border-white/10 flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform">
                  <i className={`fa-solid ${prof.icon}`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{prof.name}</h4>
                  <p className="text-xs font-mono text-slate-400">{prof.handle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-dark-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-2 block">05. contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Let's Connect</h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Open to internships, collaborations, and interesting conversations. Whether it's a project or just a chat about tech — my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <a href="mailto:garvsharmaofficial10@gmail.com" className="glass-card px-8 py-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 transition-transform hover:border-accent-cyan/50">
              <i className="fa-solid fa-envelope text-3xl text-accent-cyan"></i>
              <div className="font-semibold text-lg">Email Me</div>
              <div className="text-sm font-mono text-slate-400">garvsharmaofficial10@gmail.com</div>
            </a>
            <a href="https://github.com/garvsharma9" target="_blank" rel="noopener noreferrer" className="glass-card px-8 py-6 rounded-2xl flex flex-col items-center gap-3 hover:-translate-y-2 transition-transform hover:border-accent-violet/50">
              <i className="fa-brands fa-github text-3xl text-accent-violet"></i>
              <div className="font-semibold text-lg">GitHub</div>
              <div className="text-sm font-mono text-slate-400">@garvsharma9</div>
            </a>
          </div>

          <button onClick={() => setContactModalOpen(true)} className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-accent text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all transform hover:scale-105 cursor-pointer">
            <i className="fa-solid fa-paper-plane"></i> Send Direct Message
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-dark-900 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono font-bold text-slate-400">
            <span className="text-accent-cyan">&lt;</span>GS<span className="text-accent-cyan">/&gt;</span>
          </div>
          <p className="text-sm text-slate-500">Designed & built by <span className="text-slate-300 font-semibold">Garv Sharma</span> &copy; 2025</p>
          <div className="flex gap-4">
            <a href="https://github.com/garvsharma9" target="_blank" className="text-slate-500 hover:text-accent-cyan transition-colors"><i className="fa-brands fa-github text-xl"></i></a>
            <a href="mailto:garvsharmaofficial10@gmail.com" className="text-slate-500 hover:text-accent-cyan transition-colors"><i className="fa-solid fa-envelope text-xl"></i></a>
          </div>
        </div>
      </footer>

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm"
              onClick={() => setContactModalOpen(false)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-lg bg-dark-800 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <button onClick={() => setContactModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
              
              <h3 className="text-3xl font-bold mb-2">Say Hello</h3>
              <p className="text-slate-400 mb-8">Send me a direct message to <span className="text-accent-cyan font-mono text-sm">garvsharmaofficial10@gmail.com</span></p>

              {submitSuccess ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-accent-green/20 text-accent-green rounded-full flex items-center justify-center text-3xl mb-4">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Your Email ID</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                      placeholder="Internship Opportunity / Collaboration"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Body</label>
                    <textarea 
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                      placeholder="Hi Garv, I'd like to discuss..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-accent text-white rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</>
                    ) : (
                      <><i className="fa-solid fa-paper-plane"></i> Send Message</>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 mt-4">
                    <i className="fa-solid fa-lock mr-1"></i> Form powered securely via FormSubmit. <br/>
                    Ready to be swapped to Spring Boot backend later!
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
