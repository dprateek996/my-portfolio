import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { ArrowUpRight, Terminal } from "lucide-react";

import { CommandMenu } from "@/components/CommandMenu";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

import { PERSONAL_INFO, PROJECTS, EXPERIENCE, TECH_STACK } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { FloatingDock } from "@/components/ui/FloatingDock";

// Fonts
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Portfolio() {
  const [calendarData, setCalendarData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const data = Array(365).fill(0).map((_, i) => ({
      date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.random() > 0.6 ? Math.ceil(Math.random() * 5) : 0,
      level: 0
    }));
    setCalendarData(data);
  }, []);

  return (
    <main className={`min-h-screen bg-zinc-950 text-zinc-200 selection:bg-white/20 ${inter.className}`}>

      <CommandMenu />

      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <FloatingDock />

      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">

        {/* HERO */}
        <section className="mb-24 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-mono text-emerald-400/80">Available for hire</span>
            </div>

            <h1 className={`${spaceGrotesk.className} text-6xl md:text-8xl font-bold text-white tracking-tight mb-6`}>
              {PERSONAL_INFO.name}
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
              {PERSONAL_INFO.headline}
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

          {/* GitHub Activity (Large Card) */}
          <SpotlightCard className="col-span-1 md:col-span-8 p-6 min-h-[220px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <h3 className={`${spaceGrotesk.className} text-xl font-bold text-zinc-200`}>Contribution Graph</h3>
              <ArrowUpRight size={18} className="text-zinc-500" />
            </div>
            <div className="w-full overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
              {/* Mock data used here. For real data, fetch from GitHub API */}
              <ActivityCalendar
                data={calendarData}
                loading={calendarData.length === 0}
                blockSize={12}
                blockMargin={4}
                theme={{
                  light: ['#18181b', '#27272a', '#3f3f46', '#52525b', '#71717a'],
                  dark: ['#27272a', '#064e3b', '#065f46', '#059669', '#10b981'],
                }}
                labels={{
                  totalCount: '{{count}} commits in 2025'
                }}
                colorScheme="dark"
                showWeekdayLabels
              />
            </div>
          </SpotlightCard>

          {/* Tech Stack Marquee (Medium Card) */}
          <SpotlightCard className="col-span-1 md:col-span-4 p-6 flex flex-col justify-center overflow-hidden">
            <h3 className={`${spaceGrotesk.className} text-lg font-bold text-zinc-400 mb-4`}>My Arsenal</h3>
            <div className="flex gap-4 animate-infinite-scroll whitespace-nowrap">
              {/* Doubled for seamless loop */}
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span key={i} className="flex items-center gap-2 text-zinc-300 font-mono text-sm bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-700/50">
                  <Terminal size={12} className="text-emerald-500" /> {tech}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* Projects (Grid) */}
          <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4" id="projects">
            {PROJECTS.map((project, i) => (
              <SpotlightCard key={i} className="p-6 group relative">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} blur-[60px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                {/* Architecture Diagram Overlay (Only for Voice Expense Tracker) */}
                {project.title === "Voice Expense Tracker" && (
                  <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                    <ArchitectureDiagram />
                  </div>
                )}

                <div className={`relative z-10 flex flex-col h-full justify-between transition-opacity duration-500 ${project.title === "Voice Expense Tracker" ? "group-hover:opacity-0" : ""}`}>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 text-white">
                        <Terminal size={20} />
                      </div>
                      <a href={project.link} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                        <ArrowUpRight size={20} />
                      </a>
                    </div>
                    <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-2`}>{project.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Work Experience */}
          <SpotlightCard className="col-span-1 md:col-span-12 p-8 mt-4">
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-6`}>Experience</h2>
            <div className="space-y-8">
              {EXPERIENCE.map((job, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:items-start justify-between border-l border-zinc-800 pl-6 relative">
                  <span className="absolute -left-[1px] top-2 w-2 h-px bg-zinc-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                    <p className="text-emerald-400 font-medium">{job.company}</p>
                  </div>
                  <div className="md:text-right">
                    <span className="text-sm font-mono text-zinc-500">{job.date}</span>
                    <p className="text-zinc-400 text-sm mt-2 max-w-xl">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>

        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-zinc-600 text-sm">
          <p>© 2025 {PERSONAL_INFO.name}. Engineering the future.</p>
        </footer>

      </div>
    </main>
  );
}
