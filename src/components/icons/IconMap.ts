import {lazy} from "react";

/** A mapping of icon names to their respective React components. */
const IconMap = {
    "account_circle": lazy(() => import("@/components/icons/AccountCircleIcon")),
    "architecture": lazy(() => import("@/components/icons/ArchitectureIcon")),
    "arrow_forward": lazy(() => import("@/components/icons/ArrowForwardIcon")),
    "bug_report": lazy(() => import("@/components/icons/BugReportIcon")),
    "chat": lazy(() => import("@/components/icons/ChatIcon")),
    "code": lazy(() => import("@/components/icons/CodeIcon")),
    "commit": lazy(() => import("@/components/icons/CommitIcon")),
    "docs": lazy(() => import("@/components/icons/DocsIcon")),
    "database": lazy(() => import("@/components/icons/DatabaseIcon")),
    "dns": lazy(() => import("@/components/icons/DnsIcon")),
    "github": lazy(() => import("@/components/icons/GitHubIcon")),
    "home": lazy(() => import("@/components/icons/HomeIcon")),
    "linkedin": lazy(() => import("@/components/icons/LinkedInIcon")),
    "memory": lazy(() => import("@/components/icons/MemoryIcon")),
    "menu": lazy(() => import("@/components/icons/MenuIcon")),
    "more_horiz": lazy(() => import("@/components/icons/MoreHorizIcon")),
    "progress_activity": lazy(() => import("@/components/icons/ProgressActivityIcon")),
    "school": lazy(() => import("@/components/icons/SchoolIcon")),
    "sentiment_very_satisfied": lazy(() => import("@/components/icons/SentimentVerySatisfiedIcon")),
    "trending_up": lazy(() => import("@/components/icons/TrendingUpIcon")),
    "web": lazy(() => import("@/components/icons/WebIcon")),
    "work": lazy(() => import("@/components/icons/WorkIcon")),
};

export type IconName = keyof typeof IconMap;

export default IconMap;