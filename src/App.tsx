import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Search, ChevronRight, Star, CheckCircle2, Clock, Users, Trophy, Sun, Moon, Menu, X, GraduationCap, TrendingUp, Library, Layers, Bookmark, ShieldCheck, BarChart2, Award, LogOut, Settings, User, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Progress } from "./components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
// import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip as ReTooltip, CartesianGrid } from "recharts";

// -------------------------------------------------------------
// Helper: Mock Data
// -------------------------------------------------------------
const categories = [
  { id: "math", name: "Mathematics", icon: <CalculatorIcon /> },
  { id: "cs", name: "Computer Science", icon: <Layers className="h-4 w-4" /> },
  { id: "physics", name: "Physics", icon: <Sparkles className="h-4 w-4" /> },
  { id: "finance", name: "Finance", icon: <TrendingUp className="h-4 w-4" /> },
  { id: "humanities", name: "Humanities", icon: <Library className="h-4 w-4" /> },
];

const mockCourses = [
  {
    id: "calc-1",
    title: "Calculus I — Limits to Derivatives",
    category: "math",
    level: "Beginner",
    rating: 4.8,
    learners: 12840,
    duration: "14h",
    color: "from-indigo-500 to-blue-500",
    description: "Master the fundamentals of calculus with bite‑sized videos, interactive quizzes, and step‑by‑step problem walkthroughs.",
    progress: 62,
    lessons: [
      { id: "l1", title: "What is a Limit?", dur: "07:32" },
      { id: "l2", title: "Computing Limits Algebraically", dur: "09:48" },
      { id: "l3", title: "Continuity and One‑Sided Limits", dur: "08:04" },
      { id: "l4", title: "Introduction to Derivatives", dur: "10:22" },
    ],
  },
  {
    id: "ds-101",
    title: "Python for Data Science",
    category: "cs",
    level: "Beginner",
    rating: 4.7,
    learners: 42109,
    duration: "18h",
    color: "from-emerald-500 to-teal-500",
    description: "Hands‑on introduction to Python, NumPy, and pandas with coding challenges right in the lesson player.",
    progress: 35,
    lessons: [
      { id: "p1", title: "Variables & Types", dur: "06:20" },
      { id: "p2", title: "Control Flow", dur: "08:51" },
      { id: "p3", title: "Functions & Modules", dur: "09:15" },
      { id: "p4", title: "Intro to NumPy", dur: "11:03" },
    ],
  },
  {
    id: "phy-mech",
    title: "Physics — Classical Mechanics",
    category: "physics",
    level: "Intermediate",
    rating: 4.9,
    learners: 9821,
    duration: "21h",
    color: "from-fuchsia-500 to-purple-500",
    description: "Kinematics, Newton's laws, energy, momentum — with beautiful visuals and challenge problems.",
    progress: 12,
    lessons: [
      { id: "m1", title: "Vectors & Motion", dur: "08:43" },
      { id: "m2", title: "Newton's Laws", dur: "09:59" },
      { id: "m3", title: "Work & Energy", dur: "10:12" },
      { id: "m4", title: "Momentum & Collisions", dur: "09:40" },
    ],
  },
];

const progressData = [
  { week: "W1", minutes: 120 },
  { week: "W2", minutes: 220 },
  { week: "W3", minutes: 180 },
  { week: "W4", minutes: 260 },
  { week: "W5", minutes: 310 },
  { week: "W6", minutes: 290 },
];

// -------------------------------------------------------------
// Icons (tiny inline components for variety)
// -------------------------------------------------------------
function CalculatorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><rect x="8" y="6" width="8" height="4" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  );
}

// -------------------------------------------------------------
// UI Building Blocks
// -------------------------------------------------------------
function Shell({ children, onToggleSidebar, dark, setDark }: { children: React.ReactNode; onToggleSidebar: () => void; dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <div className={"min-h-screen w-full " + (dark ? "dark" : "")}>
      <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSidebar}><Menu className="h-5 w-5" /></Button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 grid place-items-center"><BookOpen className="h-4 w-4 text-white" /></div>
                <span className="font-bold tracking-tight text-lg">OpenLearn</span>
                <Badge className="ml-1" variant="secondary">Beta</Badge>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 mx-6">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search courses, skills, or topics…" className="pl-9" />
              </div>
              <Button variant="secondary" className="gap-2"><Sparkles className="h-4 w-4" />Explore</Button>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle theme">
                      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle theme</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2"><User className="h-4 w-4" />Vagif</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                  <DropdownMenuItem><Award className="mr-2 h-4 w-4" />Achievements</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

function Sidebar({ open, onClose, current, setCurrent }: { open: boolean; onClose: () => void; current: string; setCurrent: (v: string) => void }) {
  const items = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "catalog", label: "All Courses", icon: <Layers className="h-4 w-4" /> },
    { id: "learning", label: "Continue Learning", icon: <Play className="h-4 w-4" /> },
    { id: "progress", label: "Progress", icon: <BarChart2 className="h-4 w-4" /> },
    { id: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
    { id: "saved", label: "Bookmarks", icon: <Bookmark className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <ShieldCheck className="h-4 w-4" /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 grid place-items-center"><BookOpen className="h-4 w-4 text-white" /></div>
              <span className="font-semibold">OpenLearn</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
          </div>
          <nav className="px-3 py-2 space-y-1">
            {items.map(it => (
              <Button
                key={it.id}
                variant={current === it.id ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => { setCurrent(it.id); onClose(); }}
              >
                {it.icon}{it.label}
              </Button>
            ))}
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function HomeHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-500/30 to-sky-400/30 blur-3xl" />
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/60 backdrop-blur text-xs mb-4">
              <Sparkles className="h-3.5 w-3.5" /><span>New: Interactive quizzes with instant feedback</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Learn anything, step‑by‑step.
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl">
              Bite‑sized videos, practice problems, and mastery tracking inspired by Khan Academy — but with a fresh, modern UI.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="gap-2" onClick={onStart}><Play className="h-4 w-4" />Start learning</Button>
              <Button size="lg" variant="outline" className="gap-2"><Library className="h-4 w-4" />Browse catalog</Button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />Free to start</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4" />100k+ learners</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" />10–20 min lessons</div>
            </div>
          </div>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {mockCourses.map(c => (
                <Card key={c.id} className="overflow-hidden border-0 shadow-sm">
                  <div className={`h-24 bg-gradient-to-br ${c.color}`} />
                  <CardHeader className="pb-1">
                    <CardTitle className="text-base line-clamp-1">{c.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Star className="h-3.5 w-3.5" />
                      {c.rating}
                      <span className="mx-1">·</span>
                      {c.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Progress value={c.progress} className="h-2" />
                    <div className="mt-2 text-xs text-slate-500">{c.progress}% complete</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CourseCard({ c, onOpen }: { c: any; onOpen: (id: string) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow border-slate-200/70 dark:border-slate-800/70">
      <div className={`h-28 bg-gradient-to-br ${c.color}`} />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{c.title}</CardTitle>
        <CardDescription className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{c.rating} <span className="mx-1">·</span> {c.level} <span className="mx-1">·</span> {c.duration}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{c.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500"><Users className="h-3.5 w-3.5" />{c.learners.toLocaleString()}</div>
          <Badge variant="secondary">{c.category}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2" onClick={() => onOpen(c.id)}><Play className="h-4 w-4" />Continue</Button>
      </CardFooter>
    </Card>
  );
}

function Catalog({ onOpenCourse }: { onOpenCourse: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | undefined>();
  const filtered = useMemo(() => mockCourses.filter(c => (cat ? c.category === cat : true) && (q ? (c.title + " " + c.description).toLowerCase().includes(q.toLowerCase()) : true)), [q, cat]);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search the catalog…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 overflow-auto">
          <Button variant={!cat ? "secondary" : "outline"} onClick={() => setCat(undefined)}>All</Button>
          {categories.map(ct => (
            <Button key={ct.id} variant={cat === ct.id ? "secondary" : "outline"} onClick={() => setCat(ct.id)} className="gap-2">{ct.icon}{ct.name}</Button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => <CourseCard key={c.id} c={c} onOpen={onOpenCourse} />)}
      </div>
    </section>
  );
}

function LessonPlayer({ course }: { course: any }) {
  const [current, setCurrent] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const lesson = course.lessons[current];

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="aspect-video bg-black">
              {/* Replace with your player (Mux, Vimeo, etc.) */}
              <video className="w-full h-full" controls src="" poster="" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{lesson.title}</span>
                <Badge variant="secondary" className="ml-2">{lesson.dur}</Badge>
              </CardTitle>
              <CardDescription>Course: {course.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300">Short description of the lesson with key objectives and timestamps.</p>
              <div className="mt-4 flex gap-2">
                <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="gap-2"><GraduationCap className="h-4 w-4" />Take Quiz</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Quick Check</DialogTitle>
                    </DialogHeader>
                    <QuizMini onComplete={() => setShowQuiz(false)} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="gap-2"><Bookmark className="h-4 w-4" />Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lessons</CardTitle>
              <CardDescription>{course.lessons.length} total</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {course.lessons.map((l: any, i: number) => (
                <button key={l.id} onClick={() => setCurrent(i)} className={`w-full text-left p-3 rounded-xl border transition ${i === current ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900" : "hover:bg-slate-50 dark:hover:bg-slate-900/50 border-slate-200/60 dark:border-slate-800/60"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Play className="h-3.5 w-3.5" />{l.title}</div>
                    <span className="text-xs text-slate-500">{l.dur}</span>
                  </div>
                </button>
              ))}
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Progress value={course.progress} className="h-2" />
                <div className="mt-2 text-xs text-slate-500">{course.progress}% complete</div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

function QuizMini({ onComplete }: { onComplete: () => void }) {
  const questions = [
    {
      q: "The derivative represents…",
      options: ["Area under a curve", "Instantaneous rate of change", "Cumulative sum", "A limit at infinity"],
      a: 1,
      explain: "Derivative measures how a function changes at an instant; it's the slope of the tangent line.",
    },
  ];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | undefined>();
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const done = i >= questions.length;

  const submit = () => {
    if (picked === undefined) return;
    const ok = picked === questions[i].a;
    setState(ok ? "correct" : "wrong");
  };

  return (
    <div className="space-y-4">
      {!done && (
        <>
          <div className="text-base font-medium">{questions[i].q}</div>
          <div className="grid gap-2">
            {questions[i].options.map((op, idx) => (
              <button key={op} onClick={() => setPicked(idx)} className={`p-3 rounded-xl border text-left transition ${picked === idx ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30" : "border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900/50"}`}>{op}</button>
            ))}
          </div>
          {state !== "idle" && (
            <div className={`p-3 rounded-xl border ${state === "correct" ? "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-900/20" : "border-rose-300 bg-rose-50/50 dark:bg-rose-900/20"}`}>
              {state === "correct" ? "Correct!" : "Not quite."} {questions[i].explain}
            </div>
          )}
          <div className="flex justify-between">
            <Button variant="secondary" onClick={submit}>Check</Button>
            <Button onClick={() => { setI(i + 1); setPicked(undefined); setState("idle"); onComplete(); }}>Finish</Button>
          </div>
        </>
      )}
    </div>
  );
}

function ProgressView() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Learning Minutes</CardTitle>
            <CardDescription>Track your study streaks and time on task</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 10, right: 20, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ReTooltip />
                  <Line type="monotone" dataKey="minutes" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mastery</CardTitle>
            <CardDescription>Skills unlocked this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between"><span>Limits</span><Badge variant="secondary" className="gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Mastered</Badge></div>
            <div className="flex items-center justify-between"><span>Derivatives</span><Badge className="gap-1" variant="outline"><Clock className="h-3.5 w-3.5" /> In Progress</Badge></div>
            <div className="flex items-center justify-between"><span>Python Basics</span><Badge variant="secondary" className="gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Mastered</Badge></div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-9 9 9" /><path d="M9 21V9h6v12" /></svg>
  );
}

// -------------------------------------------------------------
// Main App
// -------------------------------------------------------------
export default function App() {
  const [sidebar, setSidebar] = useState(false);
  const [dark, setDark] = useState(true);
  const [view, setView] = useState<"home" | "catalog" | "learning" | "progress">("home");
  const [openCourseId, setOpenCourseId] = useState<string | undefined>();

  useEffect(() => {
    const stored = localStorage.getItem("openlearn-theme");
    if (stored) setDark(stored === "dark");
  }, []);
  useEffect(() => {
    localStorage.setItem("openlearn-theme", dark ? "dark" : "light");
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const openCourse = (id: string) => {
    setOpenCourseId(id);
    setView("learning");
  };

  const course = openCourseId ? mockCourses.find(c => c.id === openCourseId) : mockCourses[0];

  return (
    <Shell onToggleSidebar={() => setSidebar(true)} dark={dark} setDark={setDark}>
      <Sidebar open={sidebar} onClose={() => setSidebar(false)} current={view} setCurrent={setView} />

      {view === "home" && (
        <>
          <HomeHero onStart={() => setView("catalog")} />
          <section className="container mx-auto px-4 pb-12">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Popular courses</h2>
              <Button variant="ghost" className="gap-2" onClick={() => setView("catalog")}>See all <ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCourses.map(c => <CourseCard key={c.id} c={c} onOpen={openCourse} />)}
            </div>
          </section>
        </>
      )}

      {view === "catalog" && (
        <Catalog onOpenCourse={openCourse} />
      )}

      {view === "learning" && course && (
        <LessonPlayer course={course} />
      )}

      {view === "progress" && (
        <ProgressView />
      )}

      <footer className="border-t border-slate-200/70 dark:border-slate-800/70">
        <div className="container mx-auto px-4 py-6 text-sm text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> <span>© {new Date().getFullYear()} OpenLearn</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-slate-700 dark:hover:text-slate-300" href="#">Privacy</a>
            <a className="hover:text-slate-700 dark:hover:text-slate-300" href="#">Terms</a>
            <a className="hover:text-slate-700 dark:hover:text-slate-300" href="#">Support</a>
          </div>
        </div>
      </footer>
    </Shell>
  );
}
