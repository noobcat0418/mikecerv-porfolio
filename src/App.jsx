import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, Home, Code, Briefcase, FolderGit2, Send, ChevronRight, MapPin, Calendar, Moon, Sun, Download, User, AtSign, FileText, MessageSquare, ArrowUp, Filter, Menu, X, Bot } from 'lucide-react';

const ScanningLine = () => {
  const [scanning, setScanning] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  useEffect(() => {
    const startScan = () => { setScanning(true); setScanCount(c => c + 1); setTimeout(() => setScanning(false), 2500); };
    const initialTimeout = setTimeout(startScan, 2000);
    const interval = setInterval(startScan, 7000);
    return () => { clearTimeout(initialTimeout); clearInterval(interval); };
  }, []);
  if (!scanning) return null;
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <div key={`scan-main-${scanCount}`} className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent" style={{ boxShadow: '0 0 8px 2px rgba(34, 197, 94, 0.5), 0 0 20px 4px rgba(34, 197, 94, 0.3)', animation: 'scanLine 2.5s ease-in-out forwards' }} />
      <div key={`scan-glow-${scanCount}`} className="absolute left-0 right-0 h-[20px] bg-gradient-to-b from-green-500/15 via-green-500/5 to-transparent" style={{ animation: 'scanLine 2.5s ease-in-out forwards' }} />
      <style>{`@keyframes scanLine { 0% { top: -5px; opacity: 0; } 5% { opacity: 1; } 95% { opacity: 1; } 100% { top: calc(100vh + 5px); opacity: 0; } }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(20px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

const MatrixRain = ({ isDark }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const chars = 'アイウエオ0123456789ABCDEF';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);
    const draw = () => {
      ctx.fillStyle = isDark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = isDark ? '#00ff41' : '#15803d';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    window.addEventListener('resize', resize);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, [isDark]);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: isDark ? 0.15 : 0.1 }} />;
};

const TypingEffect = ({ texts }) => {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      const current = texts[idx];
      if (!deleting) {
        setDisplay(current.substring(0, charIdx + 1));
        setCharIdx(c => c + 1);
        if (charIdx === current.length) setTimeout(() => setDeleting(true), 1500);
      } else {
        setDisplay(current.substring(0, charIdx - 1));
        setCharIdx(c => c - 1);
        if (charIdx === 0) { setDeleting(false); setIdx(i => (i + 1) % texts.length); }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts]);
  return <span className="text-gray-300">{display}<span className="animate-pulse text-green-500">|</span></span>;
};

const ScrollToTop = ({ isDark }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 group p-4 rounded-full bg-green-500 shadow-xl hover:scale-125 hover:bg-green-400 hover:rotate-12 transition-all duration-300">
      <span className="absolute -inset-2 rounded-full bg-green-400 opacity-40 blur-lg group-hover:opacity-100 animate-pulse transition-opacity duration-300"></span>
      <ArrowUp size={24} className="relative text-black transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
};

const TechLogo = ({ name, isDark }) => {
  const logos = {
    'Selenium': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg', glow: 'group-hover:shadow-green-500/50' },
    'Robot Framework': { img: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Robot-framework-logo.png', glow: 'group-hover:shadow-gray-500/50' },
    'Playwright': { img: 'https://playwright.dev/img/playwright-logo.svg', glow: 'group-hover:shadow-green-500/50' },
    'JavaScript': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', glow: 'group-hover:shadow-yellow-500/50' },
    'TypeScript': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', glow: 'group-hover:shadow-blue-500/50' },
    'Java': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', glow: 'group-hover:shadow-red-500/50' },
    'Python': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', glow: 'group-hover:shadow-blue-500/50' },
    'Cucumber': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cucumber/cucumber-plain.svg', glow: 'group-hover:shadow-green-500/50' },
    'Jenkins': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', glow: 'group-hover:shadow-red-500/50' },
    'AWS': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', glow: 'group-hover:shadow-orange-500/50' },
    'Git': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', glow: 'group-hover:shadow-orange-500/50' },
    'Jira': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', glow: 'group-hover:shadow-blue-500/50' },
    'Postman': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', glow: 'group-hover:shadow-orange-500/50' },
    'Node.js': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', glow: 'group-hover:shadow-green-500/50' },
    'Maven': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg', glow: 'group-hover:shadow-orange-500/50' },
    'TestNG': { img: 'https://avatars.githubusercontent.com/u/12528662?s=200&v=4', glow: 'group-hover:shadow-red-500/50' },
    'GitHub': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', glow: 'group-hover:shadow-purple-500/50', invert: true },
    'GitHub Actions': { img: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4', glow: 'group-hover:shadow-blue-500/50' },
    'Azure DevOps': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg', glow: 'group-hover:shadow-blue-500/50' },
    'GitLab CI': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', glow: 'group-hover:shadow-orange-500/50' },
    'Cypress': { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg', glow: 'group-hover:shadow-gray-500/50' },
  };
  const l = logos[name] || { img: '', glow: 'group-hover:shadow-gray-500/50' };
  return (
    <div className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100'}`}>
      <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl ${l.glow} group-hover:rotate-6 p-2`}>
        <img src={l.img} alt={name} className={`w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110 ${l.invert && isDark ? 'invert' : ''}`} />
      </div>
      <span className={`text-xs font-medium transition-all duration-300 ${isDark ? 'text-gray-400 group-hover:text-green-400' : 'text-gray-600 group-hover:text-green-600'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{name}</span>
    </div>
  );
};

const ProgressBar = ({ skill, level, isDark }) => (
  <div className="mb-4 group cursor-pointer">
    <div className="flex justify-between mb-1">
      <span className={`text-sm transition-all duration-300 group-hover:text-green-400 group-hover:translate-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <span className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→ </span>{skill}
      </span>
      <span className="text-sm text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:text-green-400" style={{ fontFamily: "'Fira Code', monospace" }}>{level}<span className="text-gray-500">%</span></span>
    </div>
    <div className={`h-2 rounded-full overflow-hidden transition-all duration-300 group-hover:h-3 ${isDark ? 'bg-gray-800 group-hover:bg-gray-700' : 'bg-gray-200 group-hover:bg-gray-300'}`}>
      <div className="h-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-green-500/50 relative overflow-hidden" style={{ width: `${level}%` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  </div>
);

const ContactForm = ({ isDark }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const handleSubmit = () => {
    setSending(true);
    window.location.href = `mailto:cervantesmikeryan24@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${formData.subject}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    setTimeout(() => { setSending(false); setFormData({ name: '', email: '', subject: '', message: '' }); }, 1000);
  };
  const inputClass = `w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-green-500/50' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-green-500'}`;
  return (
    <div className="space-y-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input type="text" placeholder="// your_name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`${inputClass} pl-10 text-sm`} /></div>
        <div className="relative"><AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input type="email" placeholder="// your_email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`${inputClass} pl-10 text-sm`} /></div>
      </div>
      <div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} /><input type="text" placeholder="// subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className={`${inputClass} pl-10 text-sm`} /></div>
      <div className="relative"><MessageSquare className="absolute left-3 top-4 text-gray-500" size={18} /><textarea placeholder="// your_message" rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className={`${inputClass} pl-10 resize-none text-sm`} /></div>
      <button onClick={handleSubmit} disabled={sending} className="group relative w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden text-sm">
        <span className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-opacity"></span>
        <span className="absolute -inset-1 bg-green-500 opacity-0 group-hover:opacity-50 blur-lg rounded-lg"></span>
        <span className="relative flex items-center justify-center gap-2">{sending ? '$ sending...' : '$ send_message'} <Send size={18} /></span>
      </button>
    </div>
  );
};

export default function Portfolio() {
  const [active, setActive] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [projectFilter, setProjectFilter] = useState('All');
  const [mobileMenu, setMobileMenu] = useState(false);

  // Scroll spy - detect which section is in view
  useEffect(() => {
    const sections = ['home', 'techstack', 'projects', 'experience', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const scrollTo = (id) => { 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); 
    setMobileMenu(false); 
  };
  const techs = ['Playwright', 'Robot Framework', 'Selenium', 'Cypress', 'Cucumber', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Node.js', 'Azure DevOps', 'GitLab CI', 'GitHub Actions', 'Jenkins', 'Jira', 'Postman', 'AWS', 'Git', 'GitHub'];
  const skills = {
    auto: [{ n: 'Playwright', l: 95 }, { n: 'Robot Framework', l: 90 }, { n: 'Selenium', l: 88 }, { n: 'Cucumber/BDD', l: 90 }, { n: 'API Testing', l: 88 }],
    lang: [{ n: 'TypeScript', l: 90 }, { n: 'JavaScript/Node.js', l: 88 }, { n: 'Python', l: 82 }, { n: 'Java', l: 80 }, { n: 'Gherkin', l: 95 }],
    tools: [{ n: 'Azure DevOps', l: 88 }, { n: 'GitLab CI', l: 90 }, { n: 'Jenkins', l: 80 }, { n: 'Jira/Zephyr/TestRail', l: 95 }, { n: 'Postman', l: 85 }],
    ai: [{ n: 'Claude Code Agents', l: 85 }, { n: 'LLM Integration (API/Ollama)', l: 75 }, { n: 'REST API Integrations', l: 88 }, { n: 'Power Automate/Teams', l: 70 }],
  };

  const projects = [
    { t: "Personal Inbox Agent", d: "Gmail triage agent on a local LLM: sorts each email into important, to-do, FYI or noise, writes a daily summary and to-do list, and labels mail only under AI/. Never archives, deletes or sends; treats every email as untrusted input. 26 tests.", tech: ["Python", "Gmail API", "Ollama", "SQLite"], category: "AI Automation", img: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=400&fit=crop", github: "https://github.com/noobcat0418/inbox-agent" },
    { t: "Fashion Scraper & AI Shopping Board", d: "Turns public Shopify feeds into one row per colourway with price history and a filterable board. A local LLM scores each product; weights live in config. Polite by design: robots.txt checks, request spacing, caching. 26 tests.", tech: ["Python", "SQLite", "Ollama", "Shopify feeds"], category: "AI Automation", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop", github: "https://github.com/noobcat0418/fashion-scraper" },
    { t: "AI Activity-Digest Agent", d: "Pulls activity from GitLab, Jira and TestRail into one record model, filters it for relevance, and summarises it with Claude into a markdown report and Discord post. Grouping review comments cut the LLM payload from ~70k to ~46k tokens.", tech: ["Python", "Claude", "REST APIs", "Discord"], category: "AI Automation", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop" },
    { t: "Playwright E-commerce Framework", d: "End-to-end test automation framework using Playwright for cross-browser testing with TypeScript, featuring Page Object Model and comprehensive reporting.", tech: ["Playwright", "TypeScript", "Node.js", "CI/CD"], category: "Playwright", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop", github: "https://github.com/noobcat0418/playwright-ecommerce-framework" },
    { t: "BookHaven Cypress Framework", d: "Cypress E2E test framework for BookHaven with page objects, API testing, data factories, and CI/CD.", tech: ["Cypress", "TypeScript", "API Testing", "CI/CD"], category: "Cypress", img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400&fit=crop", github: "https://github.com/noobcat0418/bookhaven-cypress-framework" },
    { t: "Selenium Java Cucumber", d: "BDD test automation framework with Selenium WebDriver, Cucumber, implementing keyword-driven and data-driven testing approaches with CI/CD integration.", tech: ["Selenium", "Java", "Cucumber", "Maven"], category: "Selenium", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop", github: "https://github.com/noobcat0418/java-cucumber-automation-framework" },
    { t: "Robot Framework Suite", d: "Keyword-driven test automation using Robot Framework with Python, featuring reusable keywords and integration with Jenkins CI/CD pipelines.", tech: ["Robot Framework", "Python", "Jenkins"], category: "Robot Framework", img: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop", github: "https://github.com/noobcat0418/robotframework-ecommerce-tests" },
    { t: "AttendanceQR App", d: "Full-stack React attendance management system with QR code scanning, multi-role access control, schedule management, and dashboard analytics.", tech: ["React", "Supabase", "Tailwind", "QR Code"], category: "Web App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop", github: "https://github.com/noobcat0418/attendance-system" },
  ];

  const projectCategories = [
    { name: 'All', icon: Filter },
    { name: 'AI Automation', icon: Bot },
    { name: 'Playwright', icon: () => <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" className="w-4 h-4" /> },
    { name: 'Cypress', icon: () => <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg" alt="Cypress" className="w-4 h-4" /> },
    { name: 'Selenium', icon: () => <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" alt="Selenium" className="w-4 h-4" /> },
    { name: 'Robot Framework', icon: () => <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Robot-framework-logo.png" alt="Robot" className="w-4 h-4" /> },
    { name: 'Web App', icon: Code },
  ];
  const filteredProjects = projectFilter === 'All' ? projects : projects.filter(p => p.category === projectFilter);

  const exp = [
    { r: "Senior Quality Assurance Engineer", co: "Hammerjack", loc: "Makati City", p: "Nov 2024 - Present", pts: ["Own quality across a multi-module Australian enterprise case management platform: 128 user stories, 548 SIT/UAT/E2E test cases in Zephyr Scale, 92 production defects filed", "Designed a Playwright framework (UI and API) on Azure DevOps Pipelines with nightly regression and failure alerts; migrated the legacy Robot Framework suite and maintain 400+ tests", "Built and run an in-house AI agent service that takes Jira tickets from Microsoft Teams commands through Claude Code stages (test design, Playwright automation, test runs, reporting) behind three human approval gates; 418 paired QA tasks completed end to end", "Shipped 69 pull requests across two repositories and mentor QA teammates on framework usage and Agile testing"] },
    { r: "QA Automation Engineer", co: "Axya", loc: "Remote", p: "Nov 2023 - Oct 2024", pts: ["Founded the end-to-end suite from an empty repository: 116 spec files and ~346 tests on a five-layer Playwright/TypeScript framework", "Owned the GitLab CI pipeline end to end; cut the merge-request gate from 15.4 to 3.7 minutes and the nightly run from 25.4 to 19.2 minutes", "Built a typed API client with token auth and auto re-authentication; API-seeded test data cut ~40s of UI setup to ~2s per test", "Wired JUnit, HTML and TestRail reporting per pipeline and mapped 357 TestRail cases to automated specs"] },
    { r: "Senior Automation Engineer", co: "Loanworks Inc.", loc: "Ortigas City", p: "Nov 2020 - Oct 2023", pts: ["Migrated a legacy automation framework to Cucumber BDD across loan origination and mortgage servicing workflows", "Developed and maintained automated regression scripts for a business-critical financial services platform", "Partnered with developers and project managers to shape release test plans and drive defect resolution"] },
    { r: "Test Engineer", co: "Accenture Inc.", loc: "Mandaluyong City", p: "Jan 2018 - Oct 2020", pts: ["Built Selenium WebDriver regression automation for an enterprise product line", "Migrated the suite to Cucumber BDD and integrated it with Jenkins CI for continuous testing", "Produced suite-stability reports for stakeholders and applied performance testing with LoadRunner and UFT"] },
  ];

  const bg = isDark ? 'bg-black' : 'bg-gray-50';
  const txt = isDark ? 'text-gray-100' : 'text-gray-900';
  const muted = isDark ? 'text-gray-400' : 'text-gray-600';
  const card = isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/90 border-gray-200';

  return (
    <div className={`min-h-screen ${bg} ${txt}`} style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <MatrixRain isDark={isDark} />
      <ScanningLine />
      <ScrollToTop isDark={isDark} />
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-950/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'} border-b ${isDark ? 'border-green-500/30' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Terminal Style */}
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => scrollTo('home')}>
              <span className="text-green-500 text-xl font-bold transition-all duration-300 group-hover:text-green-400" style={{ fontFamily: "'Fira Code', monospace" }}>&gt;_</span>
              <span className={`text-lg font-semibold transition-all duration-300 group-hover:text-green-400 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Fira Code', monospace" }}>Mike</span>
              <span className="text-green-500 text-lg font-semibold" style={{ fontFamily: "'Fira Code', monospace" }}>@QA+AI</span>
            </div>
            
            {/* Nav Items - Right Side */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1">
                {[
                  { id: 'home', icon: Home, label: 'Home' },
                  { id: 'techstack', icon: Code, label: 'Tech-Stack' },
                  { id: 'projects', icon: FolderGit2, label: 'Projects' },
                  { id: 'experience', icon: Briefcase, label: 'Experience' },
                  { id: 'contact', icon: Mail, label: 'Contact' }
                ].map(({ id, icon: Icon, label }) => (
                  <button 
                    key={id} 
                    onClick={() => scrollTo(id)} 
                    className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      active === id 
                        ? 'bg-green-500 text-black shadow-lg shadow-green-500/30' 
                        : `${isDark ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'} hover:bg-green-500/10`
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <Icon size={16} className={`transition-transform duration-300 group-hover:scale-110 ${active === id ? 'text-black' : ''}`} />
                    {label}
                  </button>
                ))}
              </div>
              
              {/* Theme Toggle */}
              <button 
                onClick={() => setIsDark(!isDark)} 
                className={`p-2.5 rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'border-green-500/50 text-green-500 hover:bg-green-500/10 hover:border-green-500' 
                    : 'border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-600'
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenu(!mobileMenu)} 
                className="md:hidden p-2 text-green-500"
              >
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenu && (
            <div className={`md:hidden mt-4 pb-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} pt-4`}>
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'techstack', icon: Code, label: 'Tech-Stack' },
                { id: 'projects', icon: FolderGit2, label: 'Projects' },
                { id: 'experience', icon: Briefcase, label: 'Experience' },
                { id: 'contact', icon: Mail, label: 'Contact' }
              ].map(({ id, icon: Icon, label }) => (
                <button 
                  key={id} 
                  onClick={() => scrollTo(id)} 
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-1 transition-all duration-300 ${
                    active === id 
                      ? 'bg-green-500 text-black' 
                      : `${isDark ? 'text-gray-400' : 'text-gray-600'} hover:bg-green-500/10 hover:text-green-500`
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        {/* HOME */}
        <section id="home" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-green-500 mb-2 text-sm" style={{ fontFamily: "'Fira Code', monospace" }}>root@system:~$ ./initialize_profile.sh</p>
              <p className="text-green-500 mb-4 flex items-center gap-2 text-sm tracking-wider"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="opacity-70">//</span> Available for opportunities</p>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Hi, I'm <span className="text-green-500">Mike Ryan</span></h1>
              <h2 className={`text-xl lg:text-2xl mb-6 h-10 ${muted} tracking-wide`}><span className="text-cyan-400 mr-2">$</span><TypingEffect texts={['Senior QA Automation Engineer', 'Playwright Developer', 'AI Automation Builder', 'Test Framework Architect']} /></h2>
              
              <p className="mb-2 text-sm" style={{ fontFamily: "'Fira Code', monospace" }}><span className="text-cyan-400">$</span> <span className="text-green-500">cat about.txt</span></p>
              <div className={`${muted} mb-8 max-w-xl leading-relaxed text-sm`}>
                <p>As a <span className="text-green-500">Senior QA Automation Engineer</span> with 8+ years of experience, I build robust, scalable test suites and CI/CD pipelines using <span className="text-green-500">Playwright</span>, <span className="text-green-500">Robot Framework</span>, <span className="text-green-500">Selenium</span>, and <span className="text-green-500">Cucumber</span>.</p>
                <p className="mt-3">I now bring the same reliability discipline to <span className="text-green-500">AI automation</span>: agents and integrations with human approval gates, safety limits, and tests.</p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <a href="/MikeRyan_CV.pdf" download className="group relative px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:scale-105 hover:bg-green-400 transition-all duration-300"><span className="absolute -inset-2 bg-green-400 opacity-50 blur-xl group-hover:opacity-100 rounded-lg animate-pulse"></span><span className="relative flex items-center gap-2"><Download size={18} /> Download CV</span></a>
                <button onClick={() => scrollTo('contact')} className="group relative px-6 py-3 border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:scale-105 hover:bg-green-500/10 transition-all duration-300"><span className="relative flex items-center gap-2"><ChevronRight size={18} className="text-green-500" />_ Contact Me</span></button>
              </div>
              
              <p className={`${muted} mb-4 flex items-center gap-2 text-sm`}><MapPin size={16} className="text-green-500" /> <span className="text-green-500">Philippines</span> <span className="text-gray-500">PH</span></p>
              
              <div className="flex gap-3">
                <a href="https://github.com/noobcat0418" target="_blank" rel="noopener noreferrer" className={`group relative p-3 rounded-lg border-2 border-gray-700 hover:border-green-500 hover:scale-110 transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}><span className="absolute -inset-1 rounded-lg bg-purple-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></span><Github size={22} className="relative transition-all duration-300 group-hover:text-green-400" /></a>
                <a href="https://www.linkedin.com/in/mike-cervantes-67b5b72b1" target="_blank" rel="noopener noreferrer" className={`group relative p-3 rounded-lg border-2 border-gray-700 hover:border-green-500 hover:scale-110 transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}><span className="absolute -inset-1 rounded-lg bg-blue-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></span><Linkedin size={22} className="relative text-blue-500 transition-all duration-300 group-hover:text-blue-400" /></a>
                <a href="mailto:cervantesmikeryan24@gmail.com" className={`group relative p-3 rounded-lg border-2 border-gray-700 hover:border-green-500 hover:scale-110 transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}><span className="absolute -inset-1 rounded-lg bg-orange-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></span><Mail size={22} className="relative text-orange-500 transition-all duration-300 group-hover:text-orange-400" /></a>
                <a href="https://www.upwork.com/freelancers/~01e81b6f8b5105f447" target="_blank" rel="noopener noreferrer" className={`group relative p-3 rounded-lg border-2 border-gray-700 hover:border-green-500 hover:scale-110 transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}><span className="absolute -inset-1 rounded-lg bg-green-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></span><span className="relative text-green-500 font-bold text-lg">Up</span></a>
              </div>
            </div>
            
            {/* Right - Profile Picture */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-3xl group-hover:bg-green-500/30 transition-all duration-500 opacity-50"></div>
                
                {/* Image container with frame */}
                <div className="relative">
                  {/* Corner accents - tight around image */}
                  <div className="absolute -top-2 -left-2 w-10 h-10 border-t-4 border-l-4 border-green-500"></div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 border-t-4 border-r-4 border-green-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-4 border-l-4 border-green-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-4 border-r-4 border-green-500"></div>
                  
                  {/* Image */}
                  <img 
                    src="/profile.png" 
                    alt="Mike Ryan Cervantes"
                    className="w-64 h-80 lg:w-72 lg:h-96 object-cover object-top transition-all duration-500 group-hover:scale-105 drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                  />
                </div>
              </div>
            </div>

            {/* Impact stats */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { v: '8+', l: 'years in test automation' },
                { v: '400+', l: 'Playwright tests maintained' },
                { v: '15.4→3.7', u: 'min', l: 'merge-request gate cut' },
                { v: '418', l: 'tasks completed by an AI agent I built' },
              ].map(({ v, u, l }) => (
                <div key={l} className={`group ${card} border rounded-xl p-5 transition-all duration-300 hover:border-green-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20`}>
                  <p className="text-2xl lg:text-3xl font-bold text-green-500 group-hover:text-green-400 transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{v}{u && <span className="text-base text-gray-500 ml-1">{u}</span>}</p>
                  <p className={`${muted} text-xs mt-1`}><span className="text-gray-600">// </span>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section id="techstack" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-purple-400 text-sm tracking-wider">&lt;section id="tech-stack"&gt;</span>
              <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Tech <span className="text-green-500">Stack</span></h2>
              <p className={`${muted} text-sm tracking-wide`}><span className="text-gray-600">// </span>Technologies I work with</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-16">{techs.map(t => <TechLogo key={t} name={t} isDark={isDark} />)}</div>
            <div className="grid md:grid-cols-2 gap-8">
              {[{ title: 'test_automation', icon: Code, data: skills.auto }, { title: 'languages', icon: FileText, data: skills.lang }, { title: 'devops_tools', icon: Briefcase, data: skills.tools }, { title: 'ai_automation', icon: Bot, data: skills.ai }].map(({ title, icon: Icon, data }) => (
                <div key={title} className={`group ${card} border rounded-xl p-6 transition-all duration-300 hover:border-green-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden cursor-pointer`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <h3 className="text-lg font-semibold text-green-500 mb-6 flex items-center gap-2 transition-all duration-300 group-hover:text-green-400 group-hover:translate-x-1 relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}><Icon size={20} className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" /><span className="text-gray-500 text-sm">./</span>{title}</h3>
                  <div className="relative">{data.map(s => <ProgressBar key={s.n} skill={s.n} level={s.l} isDark={isDark} />)}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8"><span className="text-purple-400 text-sm tracking-wider">&lt;/section&gt;</span></div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-purple-400 text-sm tracking-wider">&lt;section id="projects"&gt;</span>
              <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Featured <span className="text-green-500">Projects</span></h2>
              <p className={`${muted} text-sm tracking-wide`}><span className="text-gray-600">// </span>AI agents, test frameworks and applications I've built</p>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {projectCategories.map(({ name, icon: Icon }) => (
                <button key={name} onClick={() => setProjectFilter(name)} className={`group relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border-2 ${projectFilter === name ? 'bg-green-500 text-black border-green-400 shadow-lg shadow-green-500/50 scale-105' : `${isDark ? 'bg-gray-900/90 border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-400 hover:bg-gray-800' : 'bg-white border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-600'}`} hover:scale-110 hover:-translate-y-1`}>
                  <span className={`absolute inset-0 rounded-xl bg-green-500/30 opacity-0 ${projectFilter !== name ? 'group-hover:opacity-100' : ''} transition-opacity blur-sm`}></span>
                  <span className={`absolute -inset-1 rounded-xl ${projectFilter === name ? 'bg-green-400 opacity-30 blur-md animate-pulse' : 'bg-green-500 opacity-0 group-hover:opacity-20 blur-lg'} transition-opacity`}></span>
                  <span className="relative flex items-center gap-2">
                    {typeof Icon === 'function' ? <Icon /> : <Icon size={16} className={`transition-transform duration-300 group-hover:rotate-12 ${projectFilter === name ? 'text-black' : ''}`} />}
                    {name}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((p, i) => (
                <div key={`${projectFilter}-${i}`} className={`group relative ${card} border rounded-xl overflow-hidden hover:border-green-500/50 transition-all duration-500 cursor-pointer animate-fadeIn`} style={{ animationDelay: `${i * 100}ms` }}>
                  {/* Project Image - MORE PRONOUNCED ZOOM OUT on hover */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={p.img} alt={p.t} className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-75 group-hover:brightness-125 group-hover:rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className={`absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:scale-125 hover:rotate-12 transition-all duration-300 ${isDark ? 'bg-black/70 hover:bg-green-500/50' : 'bg-white/70 hover:bg-green-500/50'}`}><Github size={20} /></a>}
                    <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-transparent to-transparent h-[30%] -translate-y-full group-hover:translate-y-[400%] transition-transform duration-1000 ease-in-out"></div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-green-500/90 text-black">{p.category}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-all duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}><span className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">~/</span>{p.t}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tech.slice(0, 3).map((t) => (<span key={t} className={`text-xs px-3 py-1 rounded-full text-green-500 border transition-all duration-300 hover:scale-105 hover:bg-green-500/20 hover:border-green-500 ${isDark ? 'bg-gray-800 border-green-900/50' : 'bg-gray-100 border-green-500/30'}`}>{t}</span>))}
                      {p.tech.length > 3 && (<span className={`text-xs px-3 py-1 rounded-full text-gray-400 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>+{p.tech.length - 3}</span>)}
                    </div>
                    <p className={`${muted} text-sm leading-relaxed`}>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <a href="https://github.com/noobcat0418" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-transparent border-2 border-green-500 text-green-500 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-green-500 hover:text-black overflow-hidden">
                <span className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="absolute -inset-1 bg-green-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 rounded-xl"></span>
                <span className="relative flex items-center gap-3"><span className="text-gray-500 group-hover:text-gray-700">$</span> git clone --more-projects<Github size={20} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" /></span>
              </a>
            </div>
            <div className="text-center mt-12"><span className="text-purple-400 text-sm tracking-wider">&lt;/section&gt;</span></div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-purple-400 text-sm tracking-wider">&lt;section id="experience"&gt;</span>
              <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Work <span className="text-green-500">Experience</span></h2>
              <p className={`${muted} text-sm tracking-wide`}><span className="text-gray-600">// </span>git log --oneline career.history</p>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-green-500/50 to-transparent" />
              {exp.map((e, i) => (
                <div key={i} className="relative pl-12 pb-10 last:pb-0 group">
                  <div className="absolute left-0 w-8 h-8 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:bg-green-500/40 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-300"><div className="w-3 h-3 bg-green-500 rounded-full group-hover:animate-ping" /></div>
                  <div className={`${card} border rounded-xl p-6 transition-all duration-300 hover:border-green-500/50 hover:-translate-y-2 hover:translate-x-2 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="absolute top-0 left-0 w-1 h-0 bg-green-500 group-hover:h-full transition-all duration-300"></div>
                    <div className="relative">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}><span className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">$ </span>{e.r}</h3>
                        <span className={`text-sm ${muted} flex items-center gap-1 transition-all duration-300 group-hover:text-green-400`}><Calendar size={14} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" /> {e.p}</span>
                      </div>
                      <p className={`${muted} mb-3 flex items-center gap-2 text-sm transition-all duration-300 group-hover:text-gray-300`}><span className="text-purple-400 transition-transform duration-300 group-hover:scale-110">@</span>{e.co} <span className="text-gray-600">|</span> <MapPin size={14} className="transition-all duration-300 group-hover:text-green-400 group-hover:scale-110" />{e.loc}</p>
                      <ul className="space-y-2">{e.pts.map((pt, j) => (<li key={j} className={`${muted} text-sm flex items-start gap-2 transition-all duration-300 group-hover:text-gray-300 group-hover:translate-x-2`} style={{ transitionDelay: `${j * 50}ms` }}><span className="text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:scale-125">→</span>{pt}</li>))}</ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12"><span className="text-purple-400 text-sm tracking-wider">&lt;/section&gt;</span></div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-purple-400 text-sm tracking-wider">&lt;section id="contact"&gt;</span>
              <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Get In <span className="text-green-500">Touch</span></h2>
              <p className={`${muted} text-sm tracking-wide`}><span className="text-gray-600">// </span>npm run connect --with="Mike"</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <a href="mailto:cervantesmikeryan24@gmail.com" className={`group flex items-center gap-4 p-5 ${card} border rounded-xl hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300`}>
                  <div className="p-3 bg-orange-500/20 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/50"><Mail className="text-orange-500 transition-transform duration-300 group-hover:scale-110" size={22} /></div>
                  <div><p className={`text-xs ${muted}`}>Email</p><p className="text-green-500 transition-colors duration-300 group-hover:text-green-400">cervantesmikeryan24@gmail.com</p></div>
                </a>
                <a href="tel:+639317022814" className={`group flex items-center gap-4 p-5 ${card} border rounded-xl hover:border-green-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300`}>
                  <div className="p-3 bg-green-500/20 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/50"><Phone className="text-green-500 transition-transform duration-300 group-hover:scale-110" size={22} /></div>
                  <div><p className={`text-xs ${muted}`}>Phone</p><p className="text-green-500 transition-colors duration-300 group-hover:text-green-400">+63 931 702 2814</p></div>
                </a>
                <div className="flex gap-3 pt-4">
                  <a href="https://www.linkedin.com/in/mike-cervantes-67b5b72b1" target="_blank" rel="noopener noreferrer" className={`group relative flex-1 p-4 rounded-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-100'} flex items-center justify-center gap-2`}><span className="absolute -inset-1 rounded-xl bg-blue-500 opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-300"></span><Linkedin size={20} className="relative text-blue-500 transition-transform duration-300 group-hover:rotate-12" /><span className="relative text-sm transition-colors duration-300 group-hover:text-blue-400">LinkedIn</span></a>
                  <a href="https://github.com/noobcat0418" target="_blank" rel="noopener noreferrer" className={`group relative flex-1 p-4 rounded-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-100'} flex items-center justify-center gap-2`}><span className="absolute -inset-1 rounded-xl bg-purple-500 opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-300"></span><Github size={20} className="relative transition-all duration-300 group-hover:text-purple-400 group-hover:rotate-12" /><span className="relative text-sm transition-colors duration-300 group-hover:text-purple-400">GitHub</span></a>
                  <a href="https://www.upwork.com/freelancers/~01e81b6f8b5105f447" target="_blank" rel="noopener noreferrer" className={`group relative flex-1 p-4 rounded-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-100'} flex items-center justify-center gap-2`}><span className="absolute -inset-1 rounded-xl bg-green-500 opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-300"></span><span className="relative text-green-500 font-bold transition-transform duration-300 group-hover:scale-110">Up</span><span className="relative text-sm transition-colors duration-300 group-hover:text-green-400">Upwork</span></a>
                </div>
              </div>
              <div className={`${card} border rounded-xl p-6 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300`}>
                <h3 className="text-lg font-semibold text-green-500 mb-6 flex items-center gap-2 group" style={{ fontFamily: "'Space Grotesk', sans-serif" }}><Send size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /> <span className="text-gray-500">$</span> send_message</h3>
                <ContactForm isDark={isDark} />
              </div>
            </div>
            <div className="mt-16 text-center">
              <span className="text-purple-400 text-sm">&lt;/portfolio&gt;</span>
              <p className={`text-sm ${muted} mt-2`}><span className="text-gray-600">/* </span>© {new Date().getFullYear()} Mike Ryan B. Cervantes. All rights reserved.<span className="text-gray-600"> */</span></p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}