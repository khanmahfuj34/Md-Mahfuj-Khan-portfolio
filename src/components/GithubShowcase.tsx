import React, { useState, useEffect } from "react";
import { Github, FolderHeart, Star, GitFork, ArrowUpRight, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

// ─── Static featured repos shown when no token is available ──────────────────
// Update this list to match your preferred featured repositories.
const FEATURED_REPOS: GithubRepo[] = [
  {
    name: "ProFast",
    description: "A full-stack logistics and parcel shipping hub powered by Socket.IO live courier coordinate tracking and interactive multi-state control panels.",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    html_url: "https://github.com/khanmahfuj34/ProFast"
  },
  {
    name: "SwiftCart-Shop",
    description: "Clean retail frontend checkout platform with reactive shopping cart sessions and aggregated MongoDB product listing queries.",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    html_url: "https://github.com/khanmahfuj34/SwiftCart-Shop"
  },
  {
    name: "portfolio",
    description: "Personal developer portfolio showcasing full-stack projects, skills, and open-source contributions built with React and TypeScript.",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    html_url: "https://github.com/khanmahfuj34/Md-Mahfuj-Khan-portfolio"
  }
];

// ─── Component ────────────────────────────────────────────────────────────────

export const GithubShowcase: React.FC = () => {
  const [profile, setProfile] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallbackRepos, setUsingFallbackRepos] = useState(false);

  // ── Fetch profile via public REST API (no token needed) ──────────────────
  const fetchProfile = async (): Promise<GithubUser | null> => {
    try {
      const res = await fetch("https://api.github.com/users/khanmahfuj34");
      if (!res.ok) return null;
      const d = await res.json();
      return {
        login: d.login,
        avatar_url: d.avatar_url,
        name: d.name || "Md Mahfuj Al Hossain Khan",
        bio: d.bio || "Full Stack Developer | Computer Science & Engineering",
        public_repos: d.public_repos,
        followers: d.followers,
        following: d.following,
        html_url: d.html_url
      };
    } catch {
      return null;
    }
  };

  // ── Fetch pinned repos via GraphQL (token required) ──────────────────────
  const fetchPinnedRepos = async (token: string): Promise<GithubRepo[] | null> => {
    try {
      const query = `
        query {
          user(login: "khanmahfuj34") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  stargazerCount
                  forkCount
                  primaryLanguage { name }
                  url
                }
              }
            }
          }
        }
      `;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query })
      });
      if (!res.ok) return null;
      const { data, errors } = await res.json();
      if (errors || !data?.user?.pinnedItems?.nodes) return null;
      const nodes = data.user.pinnedItems.nodes;
      if (nodes.length === 0) return null;

      const REPO_DESCRIPTIONS: Record<string, string> = {
        "ProFast": "A full-stack logistics and parcel shipping hub powered by Socket.IO live courier coordinate tracking and interactive multi-state control panels.",
        "SwiftCart-Shop": "Clean retail frontend checkout platform with reactive shopping cart sessions and aggregated MongoDB product listing queries.",
        "SwiftCart-app": "Full-stack e-commerce mobile-ready app with user authentication, product catalog, and checkout flow.",
        "appstore": "A curated app directory platform with category filtering, ratings, and dynamic listing pages.",
        "HRM-PRO": "Human Resource Management system with employee records, leave tracking, payroll, and admin dashboards."
      };

      return nodes.map((repo: any) => ({
        name: repo.name,
        description: repo.description || REPO_DESCRIPTIONS[repo.name] || "Open-source project by khanmahfuj34.",
        stargazers_count: repo.stargazerCount,
        forks_count: repo.forkCount,
        language: repo.primaryLanguage?.name || "TypeScript",
        html_url: repo.url
      }));
    } catch {
      return null;
    }
  };

  // ── Fetch public repos via REST API (no token needed) ────────────────────
  const fetchPublicRepos = async (): Promise<GithubRepo[] | null> => {
    try {
      const res = await fetch(
        "https://api.github.com/users/khanmahfuj34/repos?sort=updated&per_page=6"
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data.map((repo: any) => ({
        name: repo.name,
        description: repo.description || "No description provided.",
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language || "TypeScript",
        html_url: repo.html_url
      }));
    } catch {
      return null;
    }
  };

  // ── Main orchestrator ─────────────────────────────────────────────────────
  const fetchGithubDetails = async () => {
    setIsLoading(true);
    setUsingFallbackRepos(false);

    const token: string | undefined =
      import.meta.env.VITE_GITHUB_TOKEN || import.meta.env.GITHUB_TOKEN;

    // Always fetch public profile data (no token needed)
    const profileData = await fetchProfile();
    setProfile(profileData);

    // Try GraphQL pinned repos if token exists
    if (token) {
      const pinned = await fetchPinnedRepos(token);
      if (pinned && pinned.length > 0) {
        setRepos(pinned);
        setIsLoading(false);
        return;
      }
    }

    // Token missing or GraphQL failed → try public REST repos
    const publicRepos = await fetchPublicRepos();
    if (publicRepos && publicRepos.length > 0) {
      setRepos(publicRepos);
      setIsLoading(false);
      return;
    }

    // Last resort → static featured repos list (always works)
    setRepos(FEATURED_REPOS);
    setUsingFallbackRepos(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGithubDetails();
  }, []);

  // ── Language color helper ─────────────────────────────────────────────────
  const getLanguageColor = (lang: string): string => {
    switch (lang?.toLowerCase()) {
      case "javascript": return "bg-yellow-400";
      case "typescript": return "bg-blue-500";
      case "html": return "bg-orange-500";
      case "css": return "bg-purple-500";
      case "python": return "bg-green-500";
      case "java": return "bg-red-500";
      case "go": return "bg-cyan-500";
      case "rust": return "bg-orange-700";
      default: return "bg-emerald-500";
    }
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section id="github" className="relative bg-slate-50/50 py-20 transition-colors duration-300 dark:bg-gray-900/40">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="h-4 w-36 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-8 w-64 rounded-xl bg-slate-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950/40 p-6 space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-4 w-40 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950/20 p-5 space-y-3">
                    <div className="h-4 w-32 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                    <div className="h-3 w-4/5 rounded-full bg-slate-200 dark:bg-gray-800 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Use real or fallback profile ──────────────────────────────────────────
  const activeUser: GithubUser = profile ?? {
    login: "khanmahfuj34",
    avatar_url: "https://avatars.githubusercontent.com/u/104322971?v=4",
    name: "Md Mahfuj Al Hossain Khan",
    bio: "Full Stack Developer | Daffodil International University | CSE",
    public_repos: 18,
    followers: 12,
    following: 15,
    html_url: "https://github.com/khanmahfuj34"
  };

  return (
    <section
      id="github"
      className="relative bg-slate-50/50 py-20 transition-colors duration-300 dark:bg-gray-900/40"
    >
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <span className="h-1 w-6 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase">06 / Live Repositories</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Open Source Codebase
            </h2>
          </div>

          <button
            onClick={fetchGithubDetails}
            className="mt-3 flex items-center space-x-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 md:mt-0 transition-colors"
          >
            <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
            <span>Resync GitHub Stats</span>
          </button>
        </div>

        {/* CONTAINER SHELL */}
        <div className="grid gap-8 lg:grid-cols-12">

          {/* LEFT PANEL: PROFILE SUMMARY */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/40">

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar */}
                <div className="relative h-20 w-20 rounded-full border-2 border-blue-500/30 p-1">
                  <img
                    src={activeUser.avatar_url}
                    alt={activeUser.name}
                    className="h-full w-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://avatars.githubusercontent.com/u/104322971?v=4";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-950 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {activeUser.name}
                  </h3>
                  <a
                    href={activeUser.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    @{activeUser.login}
                  </a>
                </div>

                <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed max-w-xs">
                  {activeUser.bio}
                </p>

                {/* Counter blocks */}
                <div className="grid grid-cols-3 gap-1.5 w-full border-t border-slate-100 pt-5 dark:border-gray-800">
                  <div className="text-center">
                    <span className="block font-mono text-base font-extrabold text-slate-900 dark:text-white">
                      {activeUser.public_repos}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-gray-400 uppercase tracking-wider block mt-0.5">Repositories</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-mono text-base font-extrabold text-slate-900 dark:text-white">
                      {activeUser.followers}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-gray-400 uppercase tracking-wider block mt-0.5">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-mono text-base font-extrabold text-slate-900 dark:text-white">
                      {activeUser.following}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-gray-400 uppercase tracking-wider block mt-0.5">Following</span>
                  </div>
                </div>
              </div>

              {/* Codebase composition */}
              <div className="mt-8 pt-5 border-t border-slate-100 dark:border-gray-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-gray-300 mb-4">
                  Codebase Composition Share
                </h4>
                <div className="space-y-3.5">
                  {[
                    { name: "TypeScript", percent: "52%", cls: "bg-blue-500" },
                    { name: "JavaScript", percent: "31%", cls: "bg-yellow-400" },
                    { name: "PostgreSQL / SQL", percent: "12%", cls: "bg-purple-500" },
                    { name: "Other Code", percent: "5%", cls: "bg-emerald-500" }
                  ].map((lan) => (
                    <div key={lan.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-gray-300">{lan.name}</span>
                        <span className="font-mono text-[10px] text-slate-500">{lan.percent}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-gray-800">
                        <div className={`h-full rounded-full ${lan.cls}`} style={{ width: lan.percent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA Profile card */}
            <a
              href={activeUser.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl bg-slate-900 p-4 font-display text-xs font-semibold text-white shadow-md hover:opacity-90 dark:bg-white dark:text-gray-950 transition-opacity"
            >
              <div className="flex items-center space-x-2">
                <Github size={15} />
                <span>Explore Full GitHub Sandbox</span>
              </div>
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Subtle note when showing featured repos */}
            {usingFallbackRepos && (
              <p className="text-center text-[10px] font-mono text-slate-400 dark:text-gray-600">
                Showing featured repositories
              </p>
            )}
          </div>

          {/* RIGHT PANEL: REPOSITORY TILES */}
          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {repos.map((repo, idx) => (
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  key={`${repo.name}-${idx}`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-blue-500/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-950/20"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-display text-sm font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <FolderHeart size={14} className="text-blue-500 shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>

                    <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  {/* Footer statistics */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-gray-800 font-mono text-[10px] text-slate-400">
                    {/* Language */}
                    <div className="flex items-center space-x-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                      <span className="text-slate-600 dark:text-gray-300 font-semibold">
                        {repo.language || "TypeScript"}
                      </span>
                    </div>

                    {/* Stars and Forks */}
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Star size={11} className="text-yellow-500" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitFork size={11} className="text-gray-400" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>

                </motion.a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
