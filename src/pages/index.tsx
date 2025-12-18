import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import dynamic from 'next/dynamic';

import { Header } from "@/components/Header";
import { CommandMenu } from "@/components/CommandMenu";
import { Seo } from "@/components/Seo";
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, TECH_STACK, EXTRA_PROJECTS } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { HologramCard } from "@/components/ui/HologramCard";
import { Preloader } from "@/components/Preloader";
import { RenxaCursor } from "@/components/ui/RenxaCursor";

// Lazy load the heavy chart so the page loads instantly
const ActivityCalendar = dynamic(() => import('react-activity-calendar').then(mod => mod.ActivityCalendar), {
  ssr: false,
  loading: () => <div className="h-32 w-full bg-zinc-900/50 animate-pulse rounded-lg" />
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
          <RenxaCursor />
          {/* Top Navigation */}
          <Header />

          <FloatingDock />

          <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">

            {/* HERO */}
            <section className="mb-24 mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-8 bg-zinc-900/50 w-fit px-4 py-2 rounded-full border border-zinc-800 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-medium text-emerald-400">All Systems Operational</span>
                  <span className="text-zinc-700 mx-2">|</span>
                  <span className="text-xs text-zinc-400">Based in India (UTC+5:30)</span>
                </div>

                <h1 className={`${spaceGrotesk.className} text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500`}>
                  {PERSONAL_INFO.name}
                </h1>

                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
                  {PERSONAL_INFO.headline}
                </p>

                {/* The Human Sentence */}
                <p className="text-md text-emerald-500/80 font-mono mt-4">
                  {PERSONAL_INFO.subHeadline}
                </p>

                <div className="flex gap-4 mt-8">
                  {PERSONAL_INFO.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all"
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* BENTO GRID */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-24">

              {/* Location/Time Card - Holographic Edition */}
              <HologramCard className="col-span-1 md:col-span-6 lg:col-span-3 p-6 flex flex-col justify-between group">
                <div className="absolute inset-0 bg-grid-zinc-800/50 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                <div className="relative z-10 flex justify-between items-start">
                  <div className="p-2 bg-zinc-800/80 rounded-lg border border-zinc-700/50 text-white shadow-lg backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="animate-pulse w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                </div>
                <div className="relative z-10 mt-4">
                  <h3 className={`${spaceGrotesk.className} text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500`}>India</h3>
                  <p className="text-sm text-emerald-400 mt-1 font-mono tracking-wide">● Accepting Remote</p>
                </div>
              </HologramCard>

              {/* GitHub Activity */}
              <SpotlightCard className="col-span-1 md:col-span-6 lg:col-span-5 p-6 min-h-[220px] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold text-zinc-200`}>Contribution Graph</h3>
                  <ArrowUpRight size={18} className="text-zinc-500" />
                </div>
                <div className="w-full overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  <ActivityCalendar
                    data={calendarData}
                    loading={calendarData.length === 0}
                    blockSize={10}
                    blockMargin={4}
                    theme={{
                      light: ['#18181b', '#27272a', '#3f3f46', '#52525b', '#71717a'],
                      dark: ['#27272a', '#064e3b', '#065f46', '#059669', '#10b981'],
                    }}
                    labels={{
                      totalCount: '{{count}} commits'
                    }}
                    colorScheme="dark"
                    showWeekdayLabels={false}
                  />
                </div>
              </SpotlightCard>

              {/* Dynamic Arsenal (Tech Stack) */}
              <SpotlightCard className="col-span-1 md:col-span-12 lg:col-span-4 p-6 flex flex-col justify-center overflow-hidden relative group">
                <h3 className={`${spaceGrotesk.className} text-lg font-bold text-zinc-400 mb-4 relative z-10`}>My Arsenal</h3>

                {/* Mask to fade edges */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-900 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent z-10" />

                <div className="flex w-full overflow-hidden select-none mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)">
                  <div className="flex gap-4 animate-infinite-scroll whitespace-nowrap group-hover:paused">
                    {/* Tripled for smoother loop */}
                    {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                      <span key={i} className="flex items-center gap-2 text-zinc-300 font-mono text-sm bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-700/50 hover:bg-zinc-700 transition-colors cursor-default">
                        <Terminal size={12} className="text-emerald-500" /> {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>

              {/* Projects (Grid) with Sibling Dimming & Feature Highlighting */}
              <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 group/grid" id="projects">
                {PROJECTS.map((project, i) => (
                  <SpotlightCard
                    key={i}
                    // Featured projects span 2 cols on large screens, others span 1.
                    // Added hover lift, and dimming of siblings via group-hover/grid
                    className={`
                        p-6 group relative overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-1 hover:border-zinc-600
                        ${project.featured ? "md:col-span-2 min-h-[300px]" : "md:col-span-1"}
                        group-hover/grid:opacity-40 hover:!opacity-100
                    `}
                  >

                    {/* 1. Gradient Blob (Background) */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient} blur-[80px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />

                    {/* 2. Diagram Overlay (Background Layer) */}
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center bg-zinc-950/90 backdrop-blur-[2px] pointer-events-none">
                      <div className="scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700">
                        {project.Diagram && <project.Diagram />}
                      </div>
                    </div>

                    {/* 3. Content Layer (Foreground) */}
                    <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">

                      {/* Header Area */}
                      <div>
                        {project.featured && (
                          <span className="inline-block mb-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Featured Work
                          </span>
                        )}
                        <div className="flex justify-between items-center mb-4 pointer-events-auto">
                          <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 text-white">
                            <Terminal size={20} />
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors z-20 p-2 hover:bg-zinc-800 rounded-md"
                          >
                            <ArrowUpRight size={20} />
                          </a>
                        </div>

                        {/* Title & Desc - Fades out slightly on hover to let Diagram shine, but stays readable */}
                        <div className="transition-opacity duration-500 group-hover:opacity-10">
                          <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-2`}>{project.title}</h3>
                          <p className="text-md text-zinc-400 leading-relaxed mb-4 max-w-2xl">{project.description}</p>
                        </div>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto transition-opacity duration-500 group-hover:opacity-10">
                        {project.tech.map(t => (
                          <span key={t} className="text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 4. "View Project" Call to Action (Appears only on hover) */}
                    <a
                      href={project.link}
                      target="_blank"
                      className="absolute bottom-6 left-6 right-6 py-3 bg-zinc-100 text-zinc-950 text-center font-bold rounded-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30 shadow-xl shadow-black/50"
                    >
                      View Details
                    </a>

                  </SpotlightCard>
                ))}
              </div>

              {/* "THE ARCHIVE" - Compact Grid for Extra Projects */}
              <div className="col-span-1 md:col-span-12 mt-12 mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-200`}>
                    Other Noteworthy Work
                  </h2>
                  <a
                    href="https://github.com/dprateek996?tab=repositories"
                    target="_blank"
                    className="text-sm font-mono text-zinc-600 hover:text-zinc-400 flex items-center gap-2 transition-colors"
                  >
                    View all on GitHub <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {EXTRA_PROJECTS.map((project, i) => (
                    <motion.a
                      key={i}
                      href={project.repo} // Link directly to Repo
                      target="_blank"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-1.5 bg-zinc-800 rounded text-zinc-400 group-hover:text-emerald-400 group-hover:bg-zinc-900 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v13.28a2 2 0 0 0 2 2H20Z" /></svg>
                        </div>
                        <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                      </div>

                      <h3 className="font-semibold text-zinc-200 mb-1 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] text-zinc-400 bg-zinc-950/50 px-2 py-0.5 rounded border border-zinc-800/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Work Experience Timeline */}
              <SpotlightCard className="col-span-1 md:col-span-12 p-8 mt-4">
                <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-8`}>
                  Engineering Journey
                </h2>

                <div className="relative pl-4">
                  {/* The Vertical Spine Line */}
                  <div className="absolute top-2 bottom-0 left-[19px] w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent" />

                  <div className="space-y-12">
                    {EXPERIENCE.map((job, i) => (
                      <div key={i} className="relative group">

                        {/* The Dot */}
                        <div className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-zinc-600 group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_0_4px_rgba(24,24,27,1)]" />

                        <div className="flex flex-col md:flex-row gap-2 md:items-baseline justify-between">
                          <h3 className="text-xl font-semibold text-zinc-100">{job.role}</h3>
                          <span className="text-sm font-mono text-zinc-500">{job.date}</span>
                        </div>

                        <p className="text-emerald-400 font-medium mb-3">{job.company}</p>

                        {/* Bullet Points for Impact */}
                        <ul className="text-zinc-400 text-sm leading-relaxed max-w-2xl list-disc pl-4 space-y-1">
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
            <footer className="py-8 text-center text-zinc-600 text-sm">
              <p>© 2025 {PERSONAL_INFO.name}. Engineering the future.</p>
            </footer>

          </div>
        </motion.div>
      )}
    </main>
  );
}
