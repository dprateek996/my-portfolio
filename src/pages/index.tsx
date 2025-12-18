import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Terminal, MapPin, Github, Linkedin, Twitter, Mail } from "lucide-react";
import dynamic from 'next/dynamic';

import { Header } from "@/components/Header";
import { Seo } from "@/components/Seo";
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, TECH_STACK, EXTRA_PROJECTS } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { Preloader } from "@/components/Preloader";
import PetCursor from "@/components/ui/PetCursor";

// Lazy load the heavy chart so the page loads instantly
const ActivityCalendar = dynamic(() => import('react-activity-calendar').then(mod => mod.ActivityCalendar), {
  ssr: false,
  loading: () => <div className="h-28 w-full bg-zinc-900/50 animate-pulse rounded-lg" />
});

// Fonts
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Portfolio() {
  const [calendarData, setCalendarData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const data = Array(365).fill(0).map((_, i) => ({
      date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.random() > 0.6 ? Math.ceil(Math.random() * 5) : 0,
      level: 0
    }));
    setCalendarData(data);
  }, []);

  return (
    <main className={`min-h-screen bg-black text-zinc-200 selection:bg-white/20 ${inter.className}`}>

      <Seo
        title={`${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`}
        description={PERSONAL_INFO.headline}
      />

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PetCursor />
          <Header />
          <FloatingDock />

          {/* CENTERED BENTO CONTAINER */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">

            {/* HERO - Compact & Centered */}
            <motion.section
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 mb-6 bg-zinc-900/60 px-4 py-2 rounded-full border border-zinc-800 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-400">Available for work</span>
              </div>

              {/* Name */}
              <h1 className={`${spaceGrotesk.className} text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500`}>
                {PERSONAL_INFO.name}
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed mb-2">
                {PERSONAL_INFO.headline}
              </p>

              <p className="text-sm text-emerald-500/80 font-mono">
                {PERSONAL_INFO.subHeadline}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-6">
                {PERSONAL_INFO.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all border border-transparent hover:border-zinc-700"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.section>

            {/* BENTO GRID */}
            <section className="grid grid-cols-12 gap-4">

              {/* Row 1: Location + GitHub Activity + Tech Stack */}

              {/* Location Card (3 cols) */}
              <SpotlightCard className="col-span-12 md:col-span-3 p-5 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-zinc-800/80 rounded-lg border border-zinc-700/50">
                    <MapPin size={18} className="text-emerald-500" />
                  </div>
                  <div className="animate-pulse w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                </div>
                <div className="mt-auto">
                  <h3 className={`${spaceGrotesk.className} text-3xl font-bold text-white`}>India</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">● Open to Remote</p>
                </div>
              </SpotlightCard>

              {/* GitHub Activity (5 cols) */}
              <SpotlightCard className="col-span-12 md:col-span-5 p-5 min-h-[160px] flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`${spaceGrotesk.className} text-lg font-bold text-zinc-300`}>GitHub Activity</h3>
                  <a href="https://github.com/dprateek996" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <div className="w-full overflow-hidden opacity-80 hover:opacity-100 transition-opacity mt-auto">
                  <ActivityCalendar
                    data={calendarData}
                    loading={calendarData.length === 0}
                    blockSize={9}
                    blockMargin={3}
                    theme={{
                      light: ['#18181b', '#27272a', '#3f3f46', '#52525b', '#71717a'],
                      dark: ['#27272a', '#064e3b', '#065f46', '#059669', '#10b981'],
                    }}
                    colorScheme="dark"
                    showWeekdayLabels={false}
                  />
                </div>
              </SpotlightCard>

              {/* Tech Stack (4 cols) */}
              <SpotlightCard className="col-span-12 md:col-span-4 p-5 flex flex-col justify-center overflow-hidden relative min-h-[160px]">
                <h3 className={`${spaceGrotesk.className} text-lg font-bold text-zinc-400 mb-3`}>Stack</h3>

                <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-zinc-900 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-zinc-900 to-transparent z-10" />

                <div className="flex overflow-hidden">
                  <div className="flex gap-2 animate-infinite-scroll whitespace-nowrap">
                    {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-zinc-300 font-mono text-xs bg-zinc-800/50 px-2.5 py-1 rounded-full border border-zinc-700/50">
                        <Terminal size={10} className="text-emerald-500" /> {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>

              {/* Row 2: Featured Project (8 cols) + Side Project (4 cols) */}

              {/* Featured Project */}
              {PROJECTS.filter(p => p.featured).map((project, i) => (
                <SpotlightCard
                  key={i}
                  className="col-span-12 md:col-span-8 p-6 group relative overflow-hidden min-h-[280px] flex flex-col"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient} blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Featured
                      </span>
                      <a href={project.link} target="_blank" className="text-zinc-500 hover:text-white transition-colors p-1.5 hover:bg-zinc-800 rounded">
                        <ArrowUpRight size={18} />
                      </a>
                    </div>

                    <h3 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white mb-3`}>{project.title}</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6 max-w-xl">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(t => (
                        <span key={t} className="text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              ))}

              {/* Side Project (First non-featured) */}
              {PROJECTS.filter(p => !p.featured).slice(0, 1).map((project, i) => (
                <SpotlightCard
                  key={i}
                  className="col-span-12 md:col-span-4 p-5 group relative overflow-hidden min-h-[280px] flex flex-col"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} blur-[60px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <Terminal size={18} className="text-zinc-400" />
                      </div>
                      <a href={project.link} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                        <ArrowUpRight size={16} />
                      </a>
                    </div>

                    <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-2`}>{project.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              ))}

              {/* Row 3: More Projects (4 cols each) */}
              {PROJECTS.filter(p => !p.featured).slice(1).map((project, i) => (
                <SpotlightCard
                  key={i}
                  className="col-span-12 sm:col-span-6 md:col-span-4 p-5 group relative overflow-hidden min-h-[200px] flex flex-col"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <Terminal size={16} className="text-zinc-400" />
                      </div>
                      <a href={project.link} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                        <ArrowUpRight size={14} />
                      </a>
                    </div>

                    <h3 className={`${spaceGrotesk.className} text-lg font-bold text-white mb-2`}>{project.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              ))}

              {/* Archive Section */}
              <div className="col-span-12 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`${spaceGrotesk.className} text-xl font-bold text-zinc-300`}>
                    Other Work
                  </h2>
                  <a
                    href="https://github.com/dprateek996?tab=repositories"
                    target="_blank"
                    className="text-xs font-mono text-zinc-600 hover:text-zinc-400 flex items-center gap-1 transition-colors"
                  >
                    View all <ArrowUpRight size={12} />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {EXTRA_PROJECTS.map((project, i) => (
                    <motion.a
                      key={i}
                      href={project.repo}
                      target="_blank"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg hover:bg-zinc-800/60 hover:border-zinc-700 transition-all flex flex-col"
                    >
                      <h3 className="font-medium text-sm text-zinc-300 group-hover:text-emerald-400 transition-colors mb-1 truncate">
                        {project.title}
                      </h3>
                      <p className="text-[10px] text-zinc-600 line-clamp-1">{project.description}</p>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              <SpotlightCard className="col-span-12 p-6 md:p-8 mt-4">
                <h2 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-6`}>
                  Experience
                </h2>

                <div className="relative pl-4">
                  <div className="absolute top-2 bottom-0 left-[19px] w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent" />

                  <div className="space-y-8">
                    {EXPERIENCE.map((job, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-zinc-600 group-hover:bg-emerald-500 transition-colors" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h3 className="text-lg font-semibold text-zinc-100">{job.role}</h3>
                          <span className="text-xs font-mono text-zinc-500">{job.date}</span>
                        </div>

                        <p className="text-emerald-400 text-sm font-medium mb-2">{job.company}</p>

                        <ul className="text-zinc-400 text-sm leading-relaxed list-disc pl-4 space-y-1">
                          {job.bullets.map((bullet, k) => (
                            <li key={k}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>

            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-zinc-600 text-xs mt-8">
              <p>© 2025 {PERSONAL_INFO.name}. Engineering the future.</p>
            </footer>

          </div>
        </motion.div>
      )}
    </main>
  );
}
