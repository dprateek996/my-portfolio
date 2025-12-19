import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Terminal, MapPin } from "lucide-react";
import dynamic from 'next/dynamic';


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
          <FloatingDock />

          {/* CENTERED BENTO CONTAINER */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">

            {/* HERO - Compact & Centered */}
            <motion.section
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 mb-6 bg-zinc-900/60 px-4 py-2 rounded-full border border-zinc-800 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                <span className="text-xs font-medium text-accent-400">Available for work</span>
              </div>

              {/* Name */}
              <h1 className={`${spaceGrotesk.className} text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500`}>
                {PERSONAL_INFO.name}
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto leading-snug">
                {PERSONAL_INFO.headline}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-6">
                {PERSONAL_INFO.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all border border-zinc-800 hover:border-zinc-700"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.section>

            {/* ABOUT SECTION - Full Width Horizontal */}
            <section className="mb-10">
              <SpotlightCard className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  {/* About Text */}
                  <div className="flex-1">
                    <h2 className={`${spaceGrotesk.className} text-lg font-bold text-white mb-2`}>About</h2>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                      I'm a <span className="text-white font-medium">Full Stack Engineer</span> based in <span className="text-accent-400 font-medium">India</span>, building products that solve real problems.
                      I work across the entire stack—<span className="text-zinc-300">UI/UX to deployment</span>—shipping fast, learning faster.
                    </p>
                  </div>
                  {/* Quick Stats */}
                  <div className="flex md:flex-col gap-4 md:gap-2 text-sm shrink-0">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin size={14} className="text-accent-500" />
                      <span>India (UTC+5:30)</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                      </span>
                      <span>Open to Remote</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </section>

            {/* EXPERIENCE SECTION */}
            <section className="mb-8">
              <h2 className={`${spaceGrotesk.className} text-lg font-bold text-white mb-3`}>Experience</h2>
              <SpotlightCard className="p-5">
                <div className="space-y-5">
                  {EXPERIENCE.map((job, i) => (
                    <div key={i} className="relative">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 mb-0.5">
                        <h3 className="text-base font-semibold text-zinc-100">{job.role}</h3>
                        <span className="text-[11px] font-mono text-zinc-500">{job.date}</span>
                      </div>
                      <p className="text-accent-400 text-sm font-medium mb-1.5">{job.company}</p>
                      <ul className="text-zinc-400 text-sm leading-relaxed list-disc pl-4 space-y-1">
                        {job.bullets.map((bullet, k) => (
                          <li key={k}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </section>

            {/* PROJECTS SECTION */}
            <section className="mb-8">
              <h2 className={`${spaceGrotesk.className} text-lg font-bold text-white mb-3`}>Projects</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Featured Project - Full Width */}
                {PROJECTS.filter(p => p.featured).map((project, i) => (
                  <SpotlightCard
                    key={i}
                    className="md:col-span-2 p-6 group relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.gradient} blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-500/10 text-accent-500 border border-accent-500/20">
                          Featured
                        </span>
                        <a href={project.link} target="_blank" className="text-zinc-500 hover:text-white transition-colors p-1.5 hover:bg-zinc-800 rounded">
                          <ArrowUpRight size={18} />
                        </a>
                      </div>

                      <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-1.5`}>{project.title}</h3>
                      <p className="text-zinc-400 leading-snug mb-3 text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span key={t} className="text-xs font-medium text-zinc-400 bg-transparent border border-dashed border-zinc-600 px-2.5 py-1 rounded-md hover:border-accent-400 hover:text-accent-400 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                ))}

                {/* Other Projects */}
                {PROJECTS.filter(p => !p.featured).map((project, i) => (
                  <SpotlightCard
                    key={i}
                    className="p-5 group relative overflow-hidden"
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                          <Terminal size={16} className="text-zinc-400" />
                        </div>
                        <a href={project.link} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                          <ArrowUpRight size={16} />
                        </a>
                      </div>

                      <h3 className={`${spaceGrotesk.className} text-base font-bold text-white mb-1`}>{project.title}</h3>
                      <p className="text-[11px] text-zinc-500 leading-snug mb-2 line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tech.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] text-zinc-400 bg-transparent border border-dashed border-zinc-600 px-2 py-0.5 rounded-md hover:border-accent-400 hover:text-accent-400 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>

              {/* Other Work (Archive) */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-zinc-400">Other Work</h3>
                  <a
                    href="https://github.com/dprateek996?tab=repositories"
                    target="_blank"
                    className="text-xs font-mono text-zinc-600 hover:text-zinc-400 flex items-center gap-1 transition-colors"
                  >
                    View all <ArrowUpRight size={12} />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {EXTRA_PROJECTS.map((project, i) => (
                    <motion.a
                      key={i}
                      href={project.repo}
                      target="_blank"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg hover:bg-zinc-800/60 hover:border-zinc-700 transition-all"
                    >
                      <h4 className="font-medium text-sm text-zinc-300 group-hover:text-accent-400 transition-colors truncate">
                        {project.title}
                      </h4>
                      <p className="text-[10px] text-zinc-600 line-clamp-1 mt-1">{project.description}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

            {/* TECH STACK SECTION */}
            <section className="mb-10">
              <h2 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-4`}>Stack</h2>
              <SpotlightCard className="py-8 px-4 overflow-hidden relative">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />

                {/* Infinite Scroll Container */}
                <div className="flex w-max animate-infinite-scroll">
                  {/* First set */}
                  <div className="flex items-center gap-12 pr-12">
                    {TECH_STACK.map((tech, i) => (
                      <div key={`a-${i}`} className="flex flex-col items-center gap-3 group">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-10 h-10 object-contain grayscale brightness-75 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-300"
                        />
                        <span className="text-xs text-zinc-500 font-medium group-hover:text-zinc-300 transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center gap-12 pr-12">
                    {TECH_STACK.map((tech, i) => (
                      <div key={`b-${i}`} className="flex flex-col items-center gap-3 group">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-10 h-10 object-contain grayscale brightness-75 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-300"
                        />
                        <span className="text-xs text-zinc-500 font-medium group-hover:text-zinc-300 transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </section>

            {/* GITHUB CONTRIBUTION SECTION */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`${spaceGrotesk.className} text-xl font-bold text-white`}>GitHub Activity</h2>
                <a href="https://github.com/dprateek996" target="_blank" className="text-xs font-mono text-zinc-600 hover:text-zinc-400 flex items-center gap-1 transition-colors">
                  @dprateek996 <ArrowUpRight size={12} />
                </a>
              </div>
              <SpotlightCard className="p-6">
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
                    colorScheme="dark"
                    showWeekdayLabels={false}
                  />
                </div>
              </SpotlightCard>
            </section>

            {/* GET IN TOUCH */}
            <section className="text-center py-6">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
              >
                Get in Touch <ArrowUpRight size={14} />
              </a>
            </section>

            {/* Footer */}
            <footer className="py-4 text-center text-zinc-700 text-[10px] border-t border-zinc-900">
              <p>© 2025 {PERSONAL_INFO.name}</p>
            </footer>

          </div>
        </motion.div>
      )}
    </main>
  );
}
