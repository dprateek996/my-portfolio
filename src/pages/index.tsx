import React from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, ArrowUpRight, Terminal } from "lucide-react";
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { LuminousText } from "@/components/ui/LuminousText";

// Lazy load the heavy chart so the page loads instantly
const ActivityCalendar = dynamic(() => import('react-activity-calendar').then(mod => mod.ActivityCalendar), {
  ssr: false,
  loading: () => <div className="h-28 w-full bg-neutral-900/50 animate-pulse rounded-lg" />
});

// Fonts
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface Day {
  date: string;
  count: number;
  level: number;
}

interface YearData {
  contributions: Day[];
  total: number;
}

export default function Portfolio() {
  const [yearData, setYearData] = React.useState<{ [key: number]: YearData }>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [visibleYear, setVisibleYear] = React.useState(2026);

  // Track theme changes
  React.useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    async function fetchCalendar() {
      try {
        const years = [2025, 2026];
        const data: { [key: number]: YearData } = {};

        for (const year of years) {
          const response = await fetch(`/api/github-contributions?year=${year}`);
          const json = await response.json();
          if (json.contributions) {
            const total = json.contributions.reduce((sum: number, day: Day) => sum + day.count, 0);
            data[year] = { contributions: json.contributions, total };
          }
        }

        setYearData(data);
      } catch (e) {
        console.error("Failed to fetch GitHub calendar", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCalendar();
  }, []);

  return (
    <main className={`min-h-screen bg-white dark:bg-black text-black dark:text-neutral-200 selection:bg-black/20 dark:selection:bg-white/20 ${inter.className}`}>

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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">

            {/* HERO - Minimal & Left Aligned */}
            <section className="mb-16 mt-8 sm:mt-12">
              <motion.div
                className="flex flex-col items-start text-left"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >

                {/* Status - Minimal Pulse */}
                <motion.div
                  className="flex items-center gap-2 mb-6"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                >
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </div>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Available for work</span>
                </motion.div>



                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  <LuminousText className="text-5xl sm:text-7xl font-medium tracking-tighter mb-4">
                    {PERSONAL_INFO.name}
                  </LuminousText>
                </motion.div>

                {/* Tagline */}
                <motion.p
                  className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed font-mono"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.1 } }
                  }}
                >
                  {PERSONAL_INFO.headline}
                </motion.p>

                {/* Social Links - Minimal Row */}
                <motion.div
                  className="flex items-center gap-4 mt-8"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: 0.2 } }
                  }}
                >
                  <TooltipProvider delayDuration={0}>
                    {PERSONAL_INFO.socials.map((social) => (
                      <Tooltip key={social.name}>
                        <TooltipTrigger asChild>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-400 hover:text-black dark:hover:text-white transition-all duration-200 hover:scale-110"
                          >
                            <social.icon size={22} strokeWidth={1.5} />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs font-mono">
                          {social.name}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </motion.div>
              </motion.div>
            </section>

            {/* ABOUT SECTION - Dashboard Style */}
            <section className="mb-10">
              <SpotlightCard className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  {/* Top Area: Bio */}
                  <div>
                    <h2 className={`${spaceGrotesk.className} text-lg font-bold text-black dark:text-white mb-2`}>About</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm max-w-3xl">
                      I&apos;m a <span className="text-black dark:text-white font-medium">Full Stack Engineer</span> based in <span className="text-accent-400 font-medium">India</span>, building products that solve real problems.
                      I work across the entire stack—<span className="text-neutral-700 dark:text-neutral-300">UI/UX to deployment</span>—shipping fast, learning faster.
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
                      <span className="text-xs font-medium text-neutral-700 dark:text-zinc-300">India <span className="text-neutral-500 dark:text-zinc-500 text-[10px]">(UTC+5:30)</span></span>
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
              <h2 className={`${spaceGrotesk.className} text-lg font-bold text-black dark:text-white mb-3`}>Experience</h2>
              <SpotlightCard className="p-5">
                <div className="space-y-5">
                  {EXPERIENCE.map((job, i) => (
                    <div key={i} className="relative">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 mb-0.5">
                        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{job.role}</h3>
                        <span className="text-[11px] font-mono text-neutral-500">{job.date}</span>
                      </div>
                      <p className="text-accent-400 text-sm font-medium mb-1.5">{job.company}</p>
                      <ul className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed list-disc pl-4 space-y-1">
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
              <h2 className={`${spaceGrotesk.className} text-lg font-bold text-black dark:text-white mb-3`}>Projects</h2>

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
                        <a href={project.link} target="_blank" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors p-1.5 hover:bg-zinc-100 dark:hover:bg-neutral-800 rounded">
                          <ArrowUpRight size={18} />
                        </a>
                      </div>

                      <h3 className={`${spaceGrotesk.className} text-xl font-bold text-black dark:text-white mb-1.5`}>{project.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-snug mb-3 text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span key={t} className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-zinc-300 dark:border-neutral-600 px-2.5 py-1 rounded-md transition-all duration-300 hover:scale-105 hover:border-accent-400 hover:text-accent-400 hover:bg-zinc-100 dark:hover:bg-neutral-900 cursor-default">
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
                        <div className="p-2 bg-zinc-100/50 dark:bg-neutral-800/50 rounded-lg border border-zinc-200/50 dark:border-neutral-700/50">
                          <Terminal size={16} className="text-neutral-400" />
                        </div>
                        <a href={project.link} target="_blank" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                          <ArrowUpRight size={16} />
                        </a>
                      </div>

                      <h3 className={`${spaceGrotesk.className} text-base font-bold text-black dark:text-white mb-1`}>{project.title}</h3>
                      <p className="text-[11px] text-neutral-500 leading-snug mb-2 line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-zinc-300 dark:border-neutral-700 px-2 py-0.5 rounded-md transition-all duration-300 hover:scale-105 hover:border-accent-500 hover:text-accent-400 hover:bg-zinc-100 dark:hover:bg-neutral-900 cursor-default"
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
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Other Work</h3>
                  <a
                    href="https://github.com/dprateek996?tab=repositories"
                    target="_blank"
                    className="text-xs font-mono text-neutral-500 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400 flex items-center gap-1 transition-colors"
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
                      className="group p-3 bg-zinc-100/40 dark:bg-neutral-900/40 border border-zinc-200/50 dark:border-neutral-800/50 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-neutral-800/60 hover:border-zinc-300 dark:hover:border-neutral-700 transition-all"
                    >
                      <h4 className="font-medium text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-accent-400 transition-colors truncate">
                        {project.title}
                      </h4>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-600 line-clamp-1 mt-1">{project.description}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

            {/* TECH STACK SECTION */}
            <section className="mb-10">
              <h2 className={`${spaceGrotesk.className} text-xl font-bold text-black dark:text-white mb-4`}>Stack</h2>
              <SpotlightCard className="py-8 px-8 overflow-hidden relative group">

                {/* Infinite Scroll Container */}
                <div
                  ref={(el) => {
                    if (el) {
                      const animation = el.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-50%)' }
                      ], {
                        duration: 25000,
                        iterations: Infinity,
                        easing: 'linear'
                      });

                      // Store animation on element to access in handlers
                      (el as HTMLDivElement & { _animation?: Animation })._animation = animation;

                      // Ensure running
                      animation.play();
                    }
                  }}
                  className="flex w-max"
                  onMouseEnter={(e) => {
                    const animation = (e.currentTarget as HTMLDivElement & { _animation?: Animation })._animation;
                    if (animation) {
                      // Smoothly decelerate
                      const targetRate = 0.3; // Slower speed
                      const startRate = animation.playbackRate;
                      const duration = 500; // ms
                      const startTime = performance.now();

                      const tick = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const ease = 1 - Math.pow(1 - progress, 3);

                        animation.playbackRate = startRate + (targetRate - startRate) * ease;

                        if (progress < 1) {
                          requestAnimationFrame(tick);
                        }
                      };
                      requestAnimationFrame(tick);
                    }
                  }}
                  onMouseLeave={(e) => {
                    const animation = (e.currentTarget as HTMLDivElement & { _animation?: Animation })._animation;
                    if (animation) {
                      // Smoothly accelerate back
                      const targetRate = 1; // Normal speed
                      const startRate = animation.playbackRate;
                      const duration = 500; // ms
                      const startTime = performance.now();

                      const tick = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const ease = 1 - Math.pow(1 - progress, 3);

                        animation.playbackRate = startRate + (targetRate - startRate) * ease;

                        if (progress < 1) {
                          requestAnimationFrame(tick);
                        }
                      };
                      requestAnimationFrame(tick);
                    }
                  }}
                >
                  {/* First set */}
                  <div className="flex items-center gap-12 pr-12">
                    {TECH_STACK.map((tech, i) => (
                      <div key={`a-${i}`} className="flex flex-col items-center gap-3 group">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={40}
                          height={40}
                          className="object-contain grayscale brightness-75 group-hover:brightness-100 transition-all duration-300"
                          unoptimized
                        />
                        <span className="text-xs text-neutral-600 dark:text-neutral-500 font-medium group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center gap-12 pr-12">
                    {TECH_STACK.map((tech, i) => (
                      <div key={`b-${i}`} className="flex flex-col items-center gap-3 group">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={40}
                          height={40}
                          className="object-contain grayscale brightness-75 group-hover:brightness-100 transition-all duration-300"
                          unoptimized
                        />
                        <span className="text-xs text-neutral-600 dark:text-neutral-500 font-medium group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </section>

            {/* GITHUB CONTRIBUTION SECTION */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-black dark:text-white`}>GitHub Activity</h2>
                <a href="https://github.com/dprateek996" target="_blank" className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
                  @dprateek996 <ArrowUpRight size={12} />
                </a>
              </div>
              <SpotlightCard className="p-6">
                {/* Contribution count label */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="font-semibold text-black dark:text-white">{yearData[visibleYear]?.total || 0}</span> contributions in {visibleYear}
                  </span>
                  <div className="flex gap-2">
                    {[2025, 2026].map((year) => (
                      <button
                        key={year}
                        onClick={() => setVisibleYear(year)}
                        className={`text-xs px-2 py-1 rounded transition-all ${visibleYear === year
                          ? 'bg-accent-500/20 text-accent-400 font-medium'
                          : 'text-neutral-500 hover:text-black dark:hover:text-white'
                          }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full overflow-x-auto custom-scrollbar opacity-90 hover:opacity-100 transition-opacity flex justify-end py-2 mb-8">
                  <ActivityCalendar
                    data={yearData[visibleYear]?.contributions || []}
                    loading={Object.keys(yearData).length === 0}
                    blockSize={12}
                    blockRadius={2}
                    blockMargin={3}
                    fontSize={12}
                    theme={{
                      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    }}
                    colorScheme={isDarkMode ? 'dark' : 'light'}
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
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors"
              >
                Get in Touch <ArrowUpRight size={14} />
              </a>
            </section>

            {/* Footer */}
            <footer className="py-4 text-center text-neutral-400 dark:text-neutral-700 text-[10px] border-t border-zinc-200 dark:border-neutral-900">
              <p>© 2026 {PERSONAL_INFO.name}</p>
            </footer>

          </div>
        </motion.div>
      )}
    </main>
  );
}
