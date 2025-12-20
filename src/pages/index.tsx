import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, MapPin, ArrowUpRight, Music, Code, Terminal } from "lucide-react";
import dynamic from 'next/dynamic';

import { Header } from "@/components/Header";
import { CurrentlyLearning } from "@/components/CurrentlyLearning";
import { Seo } from "@/components/Seo";
import { SpotifyCard } from "@/components/SpotifyCard";
import { CodingStatsCard } from "@/components/CodingStatsCard";
import { GitHubContributions } from "@/components/GitHubContributions";
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, TECH_STACK, EXTRA_PROJECTS } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { Preloader } from "@/components/Preloader";
import PetCursor from "@/components/ui/PetCursor";

// Lazy load the heavy chart so the page loads instantly
const ActivityCalendar = dynamic(() => import('react-activity-calendar').then(mod => mod.ActivityCalendar), {
  ssr: false,
  loading: () => <div className="h-28 w-full bg-neutral-900/50 animate-pulse rounded-lg" />
});

// Fonts
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Portfolio() {
  const [calendarData, setCalendarData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchCalendar() {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/dprateek996?y=${new Date().getFullYear()}`);
        const json = await response.json();

        if (json.contributions) {
          setCalendarData(json.contributions);
        }
      } catch (e) {
        console.error("Failed to fetch GitHub calendar", e);
        // data will remain empty (shim will show)
      } finally {
        setIsLoading(false);
      }
    }

    fetchCalendar();
  }, []);

  return (
    <main className={`min-h-screen bg-black text-neutral-200 selection:bg-white/20 ${inter.className}`}>

      <Seo
        title={`${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`}
        description={PERSONAL_INFO.headline}
      />

      <AnimatePresence mode="wait">
        {isLoading && (
          null
          // <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">

            {/* HERO - Compact & Centered */}
            <motion.section
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 mb-6 bg-neutral-900/60 px-4 py-2 rounded-full border border-neutral-800 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                <span className="text-xs font-medium text-accent-400">Available for work</span>
              </div>

              {/* Name */}
              <h1 className={`${spaceGrotesk.className} text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500`}>
                {PERSONAL_INFO.name}
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto leading-snug">
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
                    className="p-2.5 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-all border border-neutral-800 hover:border-neutral-700"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.section>

            {/* ABOUT SECTION - Dashboard Style */}
            <section className="mb-10">
              <SpotlightCard className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  {/* Top Area: Bio */}
                  <div>
                    <h2 className={`${spaceGrotesk.className} text-lg font-bold text-white mb-2`}>About</h2>
                    <p className="text-neutral-400 leading-relaxed text-sm max-w-3xl">
                      I'm a <span className="text-white font-medium">Full Stack Engineer</span> based in <span className="text-accent-400 font-medium">India</span>, building products that solve real problems.
                      I work across the entire stack—<span className="text-neutral-300">UI/UX to deployment</span>—shipping fast, learning faster.
                    </p>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="h-px bg-zinc-800/20 w-full" />

                  {/* Bottom Area: Status Bar */}
                  <div className="grid grid-cols-2 gap-y-4 md:flex md:flex-nowrap md:items-center md:gap-x-8 md:gap-y-3">

                    {/* Location */}
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-zinc-500" />
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider md:hidden">Location</span>
                      </div>
                      <span className="text-xs font-medium text-zinc-300">India <span className="text-zinc-500 text-[10px]">(UTC+5:30)</span></span>
                    </div>

                    <span className="opacity-10 hidden md:block text-zinc-500">•</span>

                    {/* Spotify */}
                    <div className="shrink-0">
                      <SpotifyCard />
                    </div>

                    <span className="opacity-10 hidden md:block text-zinc-500">•</span>

                    {/* Coding */}
                    <div className="shrink-0">
                      <CodingStatsCard />
                    </div>

                    <span className="opacity-10 hidden md:block text-zinc-500">•</span>

                    {/* Learning */}
                    <div className="shrink-0 col-span-2 md:col-span-1">
                      <CurrentlyLearning />
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
                        <h3 className="text-base font-semibold text-neutral-100">{job.role}</h3>
                        <span className="text-[11px] font-mono text-neutral-500">{job.date}</span>
                      </div>
                      <p className="text-accent-400 text-sm font-medium mb-1.5">{job.company}</p>
                      <ul className="text-neutral-400 text-sm leading-relaxed list-disc pl-4 space-y-1">
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
                        <a href={project.link} target="_blank" className="text-neutral-500 hover:text-white transition-colors p-1.5 hover:bg-neutral-800 rounded">
                          <ArrowUpRight size={18} />
                        </a>
                      </div>

                      <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-1.5`}>{project.title}</h3>
                      <p className="text-neutral-400 leading-snug mb-3 text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span key={t} className="text-xs font-medium text-neutral-400 bg-transparent border border-dashed border-neutral-600 px-2.5 py-1 rounded-md transition-all duration-300 hover:scale-105 hover:border-accent-400 hover:text-accent-400 hover:bg-neutral-900 cursor-default">
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
                        <div className="p-2 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                          <Terminal size={16} className="text-neutral-400" />
                        </div>
                        <a href={project.link} target="_blank" className="text-neutral-500 hover:text-white transition-colors">
                          <ArrowUpRight size={16} />
                        </a>
                      </div>

                      <h3 className={`${spaceGrotesk.className} text-base font-bold text-white mb-1`}>{project.title}</h3>
                      <p className="text-[11px] text-neutral-500 leading-snug mb-2 line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] text-neutral-400 bg-transparent border border-dashed border-neutral-700 px-2 py-0.5 rounded-md transition-all duration-300 hover:scale-105 hover:border-accent-500 hover:text-accent-400 hover:bg-neutral-900 cursor-default"
                          >
                            {tech}
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
                  <h3 className="text-sm font-medium text-neutral-400">Other Work</h3>
                  <a
                    href="https://github.com/dprateek996?tab=repositories"
                    target="_blank"
                    className="text-xs font-mono text-neutral-600 hover:text-neutral-400 flex items-center gap-1 transition-colors"
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
                      className="group p-3 bg-neutral-900/40 border border-neutral-800/50 rounded-lg hover:bg-neutral-800/60 hover:border-neutral-700 transition-all"
                    >
                      <h4 className="font-medium text-sm text-neutral-300 group-hover:text-accent-400 transition-colors truncate">
                        {project.title}
                      </h4>
                      <p className="text-[10px] text-neutral-600 line-clamp-1 mt-1">{project.description}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

            {/* TECH STACK SECTION */}
            <section className="mb-10">
              <h2 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-4`}>Stack</h2>
              <SpotlightCard className="py-8 px-8 overflow-hidden relative">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />

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
                        <span className="text-xs text-neutral-500 font-medium group-hover:text-neutral-300 transition-colors">{tech.name}</span>
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
                        <span className="text-xs text-neutral-500 font-medium group-hover:text-neutral-300 transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </section>

            {/* GITHUB CONTRIBUTION SECTION */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white`}>GitHub Activity</h2>
                <a href="https://github.com/dprateek996" target="_blank" className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                  @dprateek996 <ArrowUpRight size={12} />
                </a>
              </div>
              <SpotlightCard className="p-6">
                <div className="w-full overflow-x-auto custom-scrollbar opacity-90 hover:opacity-100 transition-opacity flex justify-end py-2 mb-8">
                  <ActivityCalendar
                    data={calendarData}
                    loading={calendarData.length === 0}
                    blockSize={12}
                    blockRadius={2}
                    blockMargin={3}
                    fontSize={12}
                    theme={{
                      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    }}
                    colorScheme="dark"
                    showWeekdayLabels={true}
                  />
                </div>

                {/* Real GitHub PRs List */}
                <GitHubContributions />
              </SpotlightCard>
            </section>

            {/* GET IN TOUCH */}
            <section className="text-center py-6">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm font-medium transition-colors"
              >
                Get in Touch <ArrowUpRight size={14} />
              </a>
            </section>

            {/* Footer */}
            <footer className="py-4 text-center text-neutral-700 text-[10px] border-t border-neutral-900">
              <p>© 2025 {PERSONAL_INFO.name}</p>
            </footer>

          </div>
        </motion.div>
      )}
    </main>
  );
}
