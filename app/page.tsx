"use client";

import Marquee from "react-fast-marquee";
import { useEffect, useState, useRef } from "react";

/* ============================================================
   DATA
   ============================================================ */
const skills = {
  "Programming": ["Python", "HTML", "CSS", "C"],
  "Tools & Platforms": ["Git / GitHub", "Claude Code", "Cursor", "VS Code"],
  "Cybersecurity": ["Network Security", "Cybersecurity Fundamentals", "Business Analytics", "Risk Assessment"],
  "Sales & Outreach": ["Cold Calling", "Lead Generation", "Client Qualification", "Pipeline Management", "Outreach Copywriting"],
  "Professional": ["Bookkeeping", "Sponsor Tracking", "Event Operations", "Budget Reconciliation"],
  "Spoken Languages": ["English", "Hindi", "Japanese"],
};


const experience = [
  {
    role: "Director of Finance",
    company: "PROGSU",
    companyHref: "https://www.progsu.com",
    companySuffix: " | Programming Club at Georgia State University",
    period: "January 2026 – Present",
    hacklanta: true,
    bullets: [
      "Helped organize Hacklanta 2026, GSU's flagship 24-hour hackathon with 350-400+ attendees, one of the largest student-run hackathons in the Southeast",
      "Handled all bookkeeping, budgeting, and financial tracking for the organization",
      "Managed sponsor payment tracking and post-event financial reconciliation across 8+ corporate partners",
    ],
  },
  {
    role: "Sales Manager",
    company: "Vixa Labs",
    companyHref: "",
    companySuffix: "",
    period: "August 2024 – Present",
    hacklanta: false,
    bullets: [
      "Ran outbound sales campaigns including cold calling and lead generation",
      "Qualified prospects and refined outreach scripts using conversion data",
      "Contributed to new customer acquisition and pipeline growth",
    ],
  },
];

const certifications = [
  { name: "ISC2 Certified in Cybersecurity (CC)", status: "COMPLETED", year: "Earned" },
  { name: "CompTIA Security+", status: "IN PROGRESS", year: "Expected June 2026" },
];

const staticStats = [
  { label: "HACKLANTA", value: "400+" },
  { label: "SALES CALLS", value: "100+" },
  { label: "CERTS", value: "002" },
  { label: "LANGUAGES", value: "003" },
];

const projects = [
  {
    name: "Hacklanta 2026",
    type: "Event / Operations",
    desc: "Helped organize GSU's flagship 24-hour hackathon. 350–400+ attendees, 8+ corporate sponsors, casino-style side events (Blackjack, Roulette, Texas Hold'em). Handled all finance, bookkeeping, and floated across operations wherever needed.",
    tag: "SHIPPED" as const,
  },
  {
    name: "DropCart",
    type: "E-Commerce",
    desc: "Built and launched a Shopify dropshipping store from scratch. Handled sourcing, fulfillment, marketing, and support. Hit profitability in 60 days.",
    tag: "SHIPPED" as const,
  },
  {
    name: "???.exe",
    type: "Coming Soon",
    desc: "Something in cybersecurity. Currently loading...",
    tag: "IN PROGRESS" as const,
  },
];

const processes = [
  { name: "leetcode.exe",         status: "NOT RESPONDING", color: "#ff0000" },
  { name: "sleep.exe",            status: "SUSPENDED",      color: "#808080" },
  { name: "coffee.dll",           status: "RUNNING",        color: "#00aa00" },
  { name: "internship_search.exe",status: "RUNNING",        color: "#00aa00" },
  { name: "nmap_scan.exe",         status: "RUNNING",        color: "#00aa00" },
  { name: "vim.exe",              status: "cannot close",   color: "#ff8000" },
];

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function TitleBar({ children, icon }: { children: React.ReactNode; icon?: string }) {
  return (
    <div className="title-bar">
      {icon && <span>{icon}</span>}
      {children}
    </div>
  );
}

function Win95Card({
  title,
  icon,
  children,
  yellow,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  yellow?: boolean;
}) {
  return (
    <div className="win95-card">
      <TitleBar icon={icon}>{title}</TitleBar>
      <div className={yellow ? "win95-content-yellow" : "win95-content"}>
        {children}
      </div>
    </div>
  );
}

function Badge({ label, pulse }: { label: string; pulse?: boolean }) {
  return (
    <span
      className={`inline-block px-2 py-0 text-[11px] font-black uppercase tracking-wide text-white bg-[#ff0000] border-2 border-solid leading-5 ${pulse ? "badge-pulse" : ""}`}
      style={{
        borderColor: "#ff5555 #800000 #800000 #ff5555",
        fontFamily: '"Arial Black", Impact, sans-serif',
      }}
    >
      {label}
    </span>
  );
}

function HrGroove() {
  return <div className="hr-groove w-full" />;
}

function SkillRow({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-2 border-b border-[#808080] py-1.5 px-3 text-[14px]"
      style={{ fontFamily: '"MS Sans Serif", Tahoma, sans-serif' }}
    >
      <span className="text-[#00aa00] font-black mr-1">►</span>
      {label}
    </div>
  );
}

/* ============================================================
   EASTER EGGS
   ============================================================ */

// 1. BSOD on Konami code
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

function useBSOD() {
  const [show, setShow] = useState(false);
  const seq = useRef<string[]>([]);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      seq.current = [...seq.current, e.key].slice(-10);
      if (seq.current.join(",") === KONAMI.join(",")) setShow(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return { show, dismiss: () => setShow(false) };
}

function BSOD({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-12"
      style={{ background: "#0000aa", color: "#ffffff", fontFamily: '"Courier New", Courier, monospace' }}
      onClick={onDismiss}
    >
      <div className="max-w-xl w-full">
        <div className="text-center mb-6 font-black text-lg" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
          Windows
        </div>
        <p className="text-sm leading-6 mb-4">
          A fatal exception 0E has occurred at 0028:C0034B52 in VXD VMM(01) +
          00034B52. The current application will be terminated.
        </p>
        <p className="text-sm leading-6 mb-6">
          * Press any key to terminate the current application.<br />
          * Press CTRL+ALT+DEL to restart your computer. You will lose any unsaved information in all applications.
        </p>
        <p className="text-sm leading-6 mb-8">
          Press any key to continue <span className="text-blink">_</span>
        </p>
        <div className="text-center text-[11px] text-[#aaaaff]">
          (psst -- you found the Konami code Easter egg. nice.)
        </div>
      </div>
    </div>
  );
}

// 2. Visitor counter click -- fake "hacking" popup
function useCounterHack() {
  const [show, setShow] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  function trigger() {
    if (show) return;
    setShow(true);
    setLines([]);
    const msgs = [
      "> ACCESSING MAINFRAME...",
      "> BYPASSING FIREWALL... OK",
      "> INJECTING PAYLOAD... OK",
      "> HACKING THE PLANET...",
      "> just kidding lol",
    ];
    msgs.forEach((m, i) => setTimeout(() => setLines((p) => [...p, m]), i * 350));
    setTimeout(() => setShow(false), msgs.length * 350 + 1200);
  }
  return { show, lines, trigger };
}

// 3. Footer copyright -- click 3 times for secret
function useSecretFooter() {
  const [clicks, setClicks] = useState(0);
  const [show, setShow] = useState(false);
  function click() {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 3) { setShow(true); setClicks(0); }
  }
  return { show, click, dismiss: () => setShow(false) };
}

/* ============================================================
   ANIMATED NAME
   ============================================================ */
// Types out a wrong name, backspaces, types the right name, then goes rainbow star
const WRONG = "ISHEN PATIL";
const RIGHT = "ISHAN PATEL";

function AnimatedName() {
  const [displayed, setDisplayed] = useState("");
  const [starMode, setStarMode] = useState(false);
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const textRef = useRef("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let cancelled = false;

    function delay(ms: number) {
      return new Promise<void>((res) => setTimeout(res, ms));
    }

    async function run() {
      for (let i = 1; i <= WRONG.length; i++) {
        if (cancelled) return;
        textRef.current = WRONG.slice(0, i);
        setDisplayed(textRef.current);
        await delay(100);
      }

      await delay(600);

      while (textRef.current.length > 0) {
        if (cancelled) return;
        textRef.current = textRef.current.slice(0, -1);
        setDisplayed(textRef.current);
        await delay(60);
      }

      for (let i = 1; i <= RIGHT.length; i++) {
        if (cancelled) return;
        textRef.current = RIGHT.slice(0, i);
        setDisplayed(textRef.current);
        await delay(100);
      }

      await delay(200);
      if (!cancelled) {
        setDone(true);
        setStarMode(true);
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  function handleMute() {
    if (!audioRef.current) return;
    if (!playing) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      const next = !muted;
      audioRef.current.muted = next;
      setMuted(next);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <audio ref={audioRef} src="/star-theme.mp3" loop />
      <h1
        className="text-5xl leading-none uppercase tracking-tight whitespace-nowrap"
        style={{
          fontFamily: '"Arial Black", Impact, sans-serif',
          textShadow: starMode ? undefined : "3px 3px 0 #808080",
          animation: starMode ? "mario-star 1.2s linear infinite" : undefined,
          minWidth: "14ch",
          display: "inline-block",
        }}
      >
        {displayed}
        {!done && <span className="text-blink">|</span>}
      </h1>
      {starMode && (
        <button
          onClick={handleMute}
          className="btn-90s text-[11px] px-2 py-0.5"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
        >
          {!playing ? "▶ PLAY MUSIC" : muted ? "🔇 UNMUTE" : "🔊 MUTE"}
        </button>
      )}
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  const [visitorCount, setVisitorCount] = useState<string | null>(null);
  const [repoCount, setRepoCount] = useState<string | null>(null);
  const bsod = useBSOD();
  const counterHack = useCounterHack();
  const secretFooter = useSecretFooter();
  const [hireMeText, setHireMeText] = useState("► HIRE ME");

  useEffect(() => {
    fetch("/api/visitors")
      .then((r) => r.json())
      .then((data) => {
        const n = typeof data?.count === "number" ? data.count : null;
        if (n !== null) {
          const s = Math.max(n, 1).toString().padStart(6, "0");
          setVisitorCount(s.slice(0, 3) + "," + s.slice(3));
        }
      })
      .catch(() => {
        setVisitorCount("000,001");
      });

    // Live GitHub repo count
    fetch("https://api.github.com/users/Ishanpatel07")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.public_repos === "number") {
          setRepoCount(data.public_repos.toString().padStart(3, "0"));
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    ...staticStats,
    { label: "REPOS", value: repoCount ?? "..." },
  ];

  return (
    <div>

      {/* ── MARQUEE ANNOUNCEMENT BAR ── */}
      <div
        className="border-b-2 border-[#000000] py-1"
        style={{ background: "#000080" }}
        aria-label="Announcement bar"
      >
        <Marquee speed={45} gradient={false} pauseOnHover>
          <span className="mx-6 text-[#ffff00] font-black text-sm uppercase tracking-widest" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
            ★ AVAILABLE FOR CYBER INTERNSHIPS
          </span>
          <span className="mx-6 text-[#00ff00] font-black text-sm uppercase tracking-widest" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
            ★ CIS @ GEORGIA STATE | CYBERSECURITY CONCENTRATION
          </span>
          <span className="mx-6 text-[#ff0000] font-black text-sm uppercase tracking-widest" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
            ★ SEEKING CYBERSECURITY INTERNSHIP
          </span>
          <span className="mx-6 text-[#ffffff] font-black text-sm uppercase tracking-widest" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
            ★ COMPTIA SECURITY+ | EXPECTED JUNE 2026
          </span>
          <span className="mx-6 text-[#ffff00] font-black text-sm uppercase tracking-widest" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
            ★ HACKLANTA 2026 ORGANIZER | 400+ ATTENDEES
          </span>
          <span className="mx-6 text-[#00ffff] font-black text-sm uppercase tracking-widest" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
            ★ ISC2 CERTIFIED IN CYBERSECURITY (CC)
          </span>
        </Marquee>
      </div>

      {/* ── NAVIGATION BAR ── */}
      <nav
        className="bevel-out border-b-2 border-[#000000]"
        style={{ background: "#c0c0c0" }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-1 px-6 py-2 flex-wrap">
          <a
            href="/"
            className="font-black text-[13px] uppercase mr-4"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', textDecoration: "none", color: "inherit" }}
          >
            ISHAN PATEL
          </a>
          {["ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="btn-90s text-[12px] px-3 py-1"
              style={{ textDecoration: "none" }}
            >
              {item}
            </a>
          ))}
          <div className="ml-auto">
            <Badge label="HACKING" pulse />
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-start">

          {/* Left column: bio card + readme */}
          <div className="w-full md:flex-[2] flex flex-col gap-3">

            {/* Bio card */}
            <div className="win95-card">
              <TitleBar icon="🖥️">ISHAN_PATEL.EXE | CYBERSECURITY PORTFOLIO v1.0</TitleBar>
              <div className="win95-content-yellow flex flex-col gap-2">
                <div className="text-center">
                  <AnimatedName />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge label="NEW" pulse />
                  <span
                    className="inline-block px-2 py-0 text-[11px] font-black uppercase text-white leading-5"
                    style={{
                      background: "#000080",
                      fontFamily: '"Arial Black", Impact, sans-serif',
                      border: "2px solid",
                      borderColor: "#5555ff #000060 #000060 #5555ff",
                    }}
                  >
                    CIS STUDENT
                  </span>
                  <span
                    className="inline-block px-2 py-0 text-[11px] font-black uppercase text-black leading-5"
                    style={{
                      background: "#ffff00",
                      fontFamily: '"Arial Black", Impact, sans-serif',
                      border: "2px solid",
                      borderColor: "#ffff80 #808000 #808000 #ffff80",
                    }}
                  >
                    CYBER FOCUS
                  </span>
                </div>

                <p className="text-[15px] leading-6">
                  Freshman at <strong>Georgia State University</strong> majoring in Computer
                  Information Systems with a <strong>Cybersecurity concentration</strong> and
                  a minor in Computer Science, working toward transferring to{" "}
                  <strong>Georgia Tech</strong>. Self-taught across multiple programming
                  languages and AI-powered tools, with real-world experience in{" "}
                  <strong>sales and e-commerce</strong>. Helped organize{" "}
                  <strong>Hacklanta 2026</strong>, one of the Southeast&apos;s largest
                  student-run hackathons. Actively seeking{" "}
                  <strong>internships in cybersecurity</strong> and{" "}
                  <strong>sales engineering</strong>.
                </p>

                <p className="text-[13px] leading-5 font-mono" style={{ color: "#808080" }}>
                  <span className="text-[#00aa00] font-black">C:\&gt;</span>{" "}
                  Currently building: this website, a cybersecurity homelab, and the confidence
                  to cold email people way above my level.
                </p>

                <div className="flex gap-2 flex-wrap">
                  <a
                    href="#contact"
                    className="btn-90s btn-90s-blue"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      setHireMeText("YOU SURE? (Y/N)");
                      setTimeout(() => setHireMeText("► HIRE ME"), 1500);
                    }}
                  >
                    {hireMeText}
                  </a>
                  <a
                    href="mailto:Ishan.patel2807@gmail.com"
                    className="btn-90s"
                    style={{ textDecoration: "none" }}
                  >
                    EMAIL ME
                  </a>
                </div>
              </div>
            </div>

            {/* README.TXT notepad */}
            <div className="win95-card flex flex-col">
              <TitleBar icon="📄">README.TXT</TitleBar>
              <div className="win95-content overflow-hidden" style={{ background: "#ffffff" }}>
                <pre
                  className="text-[11px] leading-5 m-0 whitespace-pre-wrap"
                  style={{ fontFamily: '"Courier New", Courier, monospace', color: "#000000" }}
                >{`ISHAN_PATEL v1.0 -- README
==========================

INSTALLATION:
Simply hire me. No dependencies required.

KNOWN BUGS:
- Occasionally forgets to sleep()
- Will talk about cybersecurity unprompted
- Japanese still buffering...

SYSTEM REQUIREMENTS:
- Internship opportunity
- Wi-Fi (preferably fast)
- Coffee (any version)

WARRANTY:
Ships with 100% genuine effort.
No refunds. No cap.

LICENSE: Open to opportunities.`}</pre>
                {/* Fake Win95 scrollbar */}
                <div
                  className="border-t-2 border-[#808080] flex items-center"
                  style={{ height: "16px", background: "#c0c0c0" }}
                >
                  <div className="bevel-out h-full w-4 shrink-0" style={{ background: "#c0c0c0" }} />
                  <div className="flex-1 bevel-in mx-0" style={{ background: "#c0c0c0", height: "100%" }} />
                  <div className="bevel-out h-full w-4 shrink-0" style={{ background: "#c0c0c0" }} />
                </div>
              </div>
            </div>

          </div>

          {/* Side panel */}
          <div className="w-full md:flex-[1] flex flex-col gap-3">

            {/* Hit counter */}
            <div className="win95-card">
              <TitleBar icon="📊">SYSTEM STATUS</TitleBar>
              <div className="hit-counter">
                <div className="counter-text text-[#00ff00] font-mono text-sm mb-1">
                  ■ ONLINE SINCE: 2007
                </div>
                <div
                  className="text-[#00ff00] font-mono text-sm mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={counterHack.trigger}
                  title="click me..."
                >
                  ■ VISITORS: {visitorCount ?? "LOADING..."}
                </div>
                <div className="text-[#ffff00] font-mono text-sm mb-1">
                  ■ STATUS: SEEKING INTERN
                </div>
                <div className="text-[#ff0000] font-mono text-sm">
                  ■ THREAT LVL: ELITE
                </div>
              </div>
            </div>

            {/* Task manager */}
            <div className="win95-card flex-1 flex flex-col">
              <TitleBar icon="⚙️">CURRENTLY RUNNING</TitleBar>
              <div className="win95-content p-0 flex-1">
                <div
                  className="flex text-[10px] font-black uppercase px-2 py-1 border-b-2 border-[#808080]"
                  style={{ fontFamily: '"Arial Black", Impact, sans-serif', background: "#e8e8e8" }}
                >
                  <span className="flex-1">PROCESS</span>
                  <span className="w-28 text-right">STATUS</span>
                </div>
                {processes.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center px-2 py-1 border-b border-[#808080] text-[11px] font-mono"
                    style={{ background: i % 2 === 0 ? "#ffffff" : "#e8e8e8" }}
                  >
                    <span
                      className="flex-1 truncate"
                      title={p.name === "vim.exe" ? "please. someone. help me close this." : undefined}
                    >{p.name}</span>
                    <span className="w-28 text-right font-black" style={{ color: p.color, fontFamily: '"Arial Black", Impact, sans-serif', fontSize: "10px" }}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="win95-card">
              <TitleBar icon="🔢">QUICK STATS.EXE</TitleBar>
              <div className="win95-content p-0">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-2 py-1 border-b border-[#808080] text-[12px] font-mono"
                    style={{
                      background: i % 2 === 0 ? "#ffffff" : "#e8e8e8",
                    }}
                  >
                    <span className="font-black uppercase" style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: "11px" }}>
                      {s.label}
                    </span>
                    <span className="text-[#000080] font-black">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CYBER STATUS BAR ── */}
      <div
        className="border-y-2 border-[#000000]"
        style={{ background: "#000000" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap items-center gap-4 overflow-x-auto">
          {[
            { label: "FIREWALL", value: "ACTIVE",    color: "#00ff00" },
            { label: "ENCRYPTION", value: "AES-256",  color: "#00ff00" },
            { label: "THREAT LEVEL", value: "LOW",    color: "#00ff00" },
            { label: "VPN",        value: "ENABLED",  color: "#00ff00" },
            { label: "IDS",        value: "RUNNING",  color: "#00ff00" },
            { label: "AUTH",       value: "2FA ON",   color: "#ffff00" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1 shrink-0">
              <span
                className="text-[#808080] font-mono text-[11px] uppercase"
              >
                {item.label}:
              </span>
              <span
                className="font-black text-[11px] uppercase"
                style={{ color: item.color, fontFamily: '"Arial Black", Impact, sans-serif' }}
              >
                {item.value}
              </span>
            </div>
          ))}
          <span className="ml-auto text-[#00ff00] font-mono text-[11px] shrink-0">
            ■ SECURE CONNECTION ESTABLISHED
          </span>
        </div>
      </div>

      <HrGroove />

      {/* ══════════════════════════════════════════════════════
          SKILLS
          ══════════════════════════════════════════════════════ */}
      <section id="skills" className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center gap-3 mb-3">
          <h2
            className="text-3xl uppercase tracking-tight"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', textShadow: "2px 2px 0 #808080" }}
          >
            SKILLS &amp; TOOLS
          </h2>
          <Badge label="UPDATED" pulse />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {Object.entries(skills).map(([category, items]) => (
            <Win95Card key={category} title={category} icon="🔧">
              <div className="p-0 -m-4">
                {items.map((skill) => (
                  <SkillRow key={skill} label={skill} />
                ))}
              </div>
            </Win95Card>
          ))}
        </div>

        {/* Certifications row */}
        <div className="mt-3">
          <Win95Card title="CERTIFICATIONS &amp; TRAINING" icon="🏆">
            <div className="-m-4 p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="p-3 border-r-2 border-b-2 border-[#808080] text-[13px]"
                    style={{ background: i % 2 === 0 ? "#ffffff" : "#e8e8e8" }}
                  >
                    <div
                      className="font-black text-[12px] mb-1 uppercase leading-tight"
                      style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
                    >
                      {cert.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#808080] mb-1">{cert.year}</div>
                    <span
                      className="text-[10px] font-black uppercase px-1 text-white"
                      style={{
                        background: cert.status === "COMPLETED" ? "#00aa00" : "#000080",
                        fontFamily: '"Arial Black", Impact, sans-serif',
                        border: "1px solid #000",
                      }}
                    >
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Win95Card>
        </div>
      </section>

      <HrGroove />

      {/* ══════════════════════════════════════════════════════
          PROJECTS
          ══════════════════════════════════════════════════════ */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-3">
          <h2
            className="text-3xl uppercase tracking-tight"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', textShadow: "2px 2px 0 #808080" }}
          >
            PROJECTS
          </h2>
          <span
            className="text-blink text-[#ff0000] font-black text-sm uppercase"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
          >
            ● ACTIVE
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projects.map((proj, i) => (
            <div key={i} className="win95-card">
              <TitleBar icon="💾">{proj.name}</TitleBar>
              <div className="win95-content flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[11px] text-[#808080] uppercase"
                  >
                    {proj.type}
                  </span>
                  <span
                    className="text-[10px] font-black uppercase px-2 text-white leading-5"
                    style={{
                      background: proj.tag === "SHIPPED" ? "#00aa00" : "#808000",
                      fontFamily: '"Arial Black", Impact, sans-serif',
                      border: "2px solid",
                      borderColor: proj.tag === "SHIPPED"
                        ? "#00ff00 #006600 #006600 #00ff00"
                        : "#ffff00 #404000 #404000 #ffff00",
                      color: proj.tag === "SHIPPED" ? "#ffffff" : "#000000",
                    }}
                  >
                    [{proj.tag}]
                  </span>
                </div>
                <p className="text-[14px] leading-6">{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <HrGroove />

      {/* ══════════════════════════════════════════════════════
          EXPERIENCE
          ══════════════════════════════════════════════════════ */}
      <section id="experience" className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center gap-3 mb-3">
          <h2
            className="text-3xl uppercase tracking-tight"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', textShadow: "2px 2px 0 #808080" }}
          >
            EXPERIENCE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 flex flex-col gap-3">
            {experience.map((exp, i) => (
              <div key={i} className="win95-card">
                <TitleBar icon="💼">
                  {exp.role} @{" "}
                  {exp.companyHref ? (
                    <a
                      href={exp.companyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#ffffff", textDecoration: "underline" }}
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                  {exp.companySuffix}
                </TitleBar>
                <div className="win95-content">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <span className="font-mono text-[12px] text-[#808080]">
                      {exp.period}
                    </span>
                    {exp.hacklanta && <Badge label="HACKLANTA 2026" pulse />}
                  </div>
                  <ul className="list-none p-0 m-0">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-[14px] leading-6 mb-2 flex gap-2">
                        <span className="text-[#00aa00] font-black mt-0.5">►</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Education */}
            <Win95Card title="EDUCATION" icon="🎓">
              <div className="mb-2">
                <div className="font-black text-[14px] uppercase" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
                  B.B.A. Computer Information Systems
                </div>
                <div className="text-[13px] mt-1">Concentration: <strong>Cybersecurity</strong> &middot; Minor: <strong>Computer Science</strong></div>
                <div className="text-[13px]">Georgia State University &middot; Expected May 2029</div>
                <div className="text-[13px] mt-1 flex items-center gap-2">
                  <span className="text-[#0000ff] font-black">→</span>
                  Transfer Goal: <strong>Georgia Institute of Technology</strong>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {["PROGSU Finance", "Hacklanta Organizer", "Cyber Concentration", "CS Minor"].map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-black uppercase px-2 text-black"
                    style={{
                      background: "#ffff00",
                      fontFamily: '"Arial Black", Impact, sans-serif',
                      border: "2px solid",
                      borderColor: "#ffff80 #808000 #808000 #ffff80",
                      lineHeight: "1.8",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Win95Card>
          </div>

          {/* Side: Career Goal Card */}
          <div className="flex flex-col gap-3">
            <Win95Card title="CAREER GOAL" icon="🎯" yellow>
              <div
                className="text-[13px] font-black uppercase mb-2"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
              >
                TARGET ROLE:
              </div>
              <div
                className="text-rainbow text-2xl font-black uppercase mb-3 leading-tight"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
              >
                SALES ENGINEER | CYBERSECURITY
              </div>
              <div className="text-[13px] leading-5 mb-3">
                Combining deep technical knowledge in cybersecurity with strong
                communication skills to help organizations understand and deploy
                security solutions.
              </div>
              <div className="hr-groove mb-3" />
              <div
                className="text-[12px] font-black uppercase mb-1"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
              >
                ■ Why Sales Engineering?
              </div>
              <ul className="list-none p-0 m-0 text-[12px]">
                {[
                  "Bridge tech & business communication",
                  "Explain complex security to stakeholders",
                  "Demo & architect security solutions",
                  "High impact, client-facing role",
                ].map((item) => (
                  <li key={item} className="flex gap-1 mb-1">
                    <span className="text-[#0000ff] font-black">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Win95Card>

            <Win95Card title="INTERESTS" icon="🔐">
              <div className="text-[13px] leading-5">
                {[
                  "Penetration Testing",
                  "Network Defense",
                  "Threat Intelligence",
                  "Security Awareness",
                  "CTF Competitions",
                  "Blue Team Ops",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 py-1 border-b border-[#e8e8e8]"
                  >
                    <span className="text-[#ff0000] font-black text-[10px]">■</span>
                    {item}
                  </div>
                ))}
              </div>
            </Win95Card>
          </div>
        </div>
      </section>

      <HrGroove />

      {/* ══════════════════════════════════════════════════════
          CTA — CONSTRUCTION STRIPE SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="py-2 bg-construction" aria-label="Attention section" />

      <section
        id="contact"
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <div className="win95-card">
          <TitleBar icon="📧">CONTACT | OPEN FOR OPPORTUNITIES</TitleBar>
          <div className="win95-content-yellow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2
                  className="text-2xl uppercase mb-2"
                  style={{ fontFamily: '"Arial Black", Impact, sans-serif', textShadow: "2px 2px 0 #808080" }}
                >
                  LET&apos;S CONNECT
                </h2>
                <p className="text-[13px] leading-5 mb-2">
                  Looking for a <strong>cyber intern</strong> who can hit the ground
                  running? I bring hands-on lab experience, a security-first mindset,
                  and the communication skills to explain threats to any audience.
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "📧", label: "EMAIL", value: "Ishan.patel2807@gmail.com", href: "mailto:Ishan.patel2807@gmail.com" },
                    { icon: "🔗", label: "LINKEDIN", value: "linkedin.com/in/ishanpatel09", href: "https://www.linkedin.com/in/ishanpatel09/" },
                    { icon: "🐙", label: "GITHUB", value: "github.com/Ishanpatel07", href: "https://github.com/Ishanpatel07" },
                    { icon: "📱", label: "PHONE", value: "(470) 561-5682", href: "tel:4705615682" },
                  ].map((link) => (
                    <div key={link.label} className="flex items-center gap-2 text-[13px] bevel-in p-2 bg-white">
                      <span className="text-[16px]">{link.icon}</span>
                      <span
                        className="font-black uppercase text-[11px] w-20 shrink-0"
                        style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
                      >
                        {link.label}:
                      </span>
                      <a href={link.href} className="text-[#0000ff] underline hover:text-[#ff0000]" target="_blank" rel="noopener noreferrer">
                        {link.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <div className="flex flex-col gap-3">
                <div className="hit-counter">
                  <div
                    className="text-[#ffff00] font-black uppercase text-sm mb-2"
                    style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
                  >
                    ■ AVAILABILITY STATUS
                  </div>
                  <div className="counter-text text-[#00ff00] font-mono mb-1">
                    ► INTERNSHIP: OPEN
                  </div>
                  <div className="text-[#00ff00] font-mono mb-1">
                    ► PART-TIME: OPEN
                  </div>
                  <div className="text-[#00ff00] font-mono mb-1">
                    ► START DATE: MAY 2025
                  </div>
                  <div className="text-[#808080] font-mono text-[11px] mt-2">
                    LAST UPDATED: 04/09/2026
                  </div>
                </div>

                <div className="bevel-out p-3 bg-[#c0c0c0]">
                  <div
                    className="font-black uppercase text-[12px] mb-2"
                    style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}
                  >
                    ■ LOOKING FOR:
                  </div>
                  {[
                    "SOC Analyst Intern",
                    "Security Analyst Intern",
                    "IT Security Intern",
                    "Pre-Sales / SE Intern",
                    "Penetration Testing Intern",
                  ].map((role) => (
                    <div key={role} className="flex items-center gap-1 text-[13px] mb-1">
                      <span className="text-[#ff0000] font-black">✓</span>
                      {role}
                    </div>
                  ))}
                </div>

                <a
                  href="mailto:Ishan.patel2807@gmail.com"
                  className="btn-90s btn-90s-blue text-center w-full"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  ► SEND EMAIL NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-2 bg-construction" aria-hidden="true" />

      {/* ── FOOTER ── */}
      <footer
        className="border-t-2 border-[#000000]"
        style={{ background: "#000080" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <span
            className="text-white font-black uppercase text-[12px]"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', cursor: "pointer" }}
            onClick={secretFooter.click}
            title="..."
          >
            © 1997-2026 ISHAN PATEL | ALL RIGHTS RESERVED
          </span>
          <div className="hit-counter py-1 px-3">
            <span className="counter-text text-[#00ff00] font-mono text-[12px]">
              VISITORS: {visitorCount ?? "LOADING..."} | BEST VIEWED IN 800×600
            </span>
          </div>
          <span
            className="text-[#ffff00] font-mono text-[11px] text-blink"
          >
            ★ UNDER CONSTRUCTION ★
          </span>
        </div>
      </footer>

      {/* Easter egg: BSOD */}
      {bsod.show && <BSOD onDismiss={bsod.dismiss} />}

      {/* Easter egg: counter hack popup */}
      {counterHack.show && (
        <div
          className="win95-card fixed bottom-4 right-4 z-50 w-64"
          style={{ fontFamily: '"Courier New", Courier, monospace' }}
        >
          <div className="title-bar">HACK_THE_PLANET.EXE</div>
          <div style={{ background: "#000", padding: "8px 10px", minHeight: "60px" }}>
            {counterHack.lines.map((l, i) => (
              <div key={i} className="text-[11px] leading-5" style={{ color: "#00ff00" }}>{l}</div>
            ))}
            <span className="text-[#00ff00] text-[11px] text-blink">_</span>
          </div>
        </div>
      )}

      {/* Easter egg: secret footer message */}
      {secretFooter.show && (
        <div
          className="win95-card fixed inset-0 m-auto z-50 w-80 h-fit"
          onClick={secretFooter.dismiss}
        >
          <div className="title-bar">SECRET.TXT</div>
          <div className="win95-content text-center flex flex-col gap-2">
            <div className="text-2xl">🕵️</div>
            <div className="font-black text-[13px] uppercase" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
              you found it.
            </div>
            <p className="text-[12px] leading-5">
              if you&apos;re reading this, you&apos;re exactly the kind of person i want to work with.<br /><br />
              email me. seriously.
            </p>
            <a href="mailto:Ishan.patel2807@gmail.com" className="btn-90s btn-90s-blue text-center" style={{ textDecoration: "none" }}>
              ► EMAIL NOW
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
