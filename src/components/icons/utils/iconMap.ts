import {lazy} from "react";

/** A mapping of icon names to their respective React components. */
const iconMap = {
    "account_circle": lazy(() => import("../icons/AccountCircleIcon")),
    "alternate_email": lazy(() => import("../icons/AlternateEmailIcon")),
    "architecture": lazy(() => import("../icons/ArchitectureIcon")),
    "arrow_forward": lazy(() => import("../icons/ArrowForwardIcon")),
    "bug_report": lazy(() => import("../icons/BugReportIcon")),
    "chat": lazy(() => import("../icons/ChatIcon")),
    "check_circle": lazy(() => import("../icons/CheckCircleIcon")),
    "code": lazy(() => import("../icons/CodeIcon")),
    "commit": lazy(() => import("../icons/CommitIcon")),
    "docs": lazy(() => import("../icons/DocsIcon")),
    "error": lazy(() => import("../icons/ErrorIcon")),
    "database": lazy(() => import("../icons/DatabaseIcon")),
    "dns": lazy(() => import("../icons/DnsIcon")),
    "github": lazy(() => import("../icons/GitHubIcon")),
    "home": lazy(() => import("../icons/HomeIcon")),
    "info": lazy(() => import("../icons/InfoIcon")),
    "linkedin": lazy(() => import("../icons/LinkedInIcon")),
    "mail": lazy(() => import("../icons/MailIcon")),
    "memory": lazy(() => import("../icons/MemoryIcon")),
    "menu": lazy(() => import("../icons/MenuIcon")),
    "more_horiz": lazy(() => import("../icons/MoreHorizIcon")),
    "progress_activity": lazy(() => import("../icons/ProgressActivityIcon")),
    "school": lazy(() => import("../icons/SchoolIcon")),
    "send": lazy(() => import("../icons/SendIcon")),
    "sentiment_very_satisfied": lazy(() => import("../icons/SentimentVerySatisfiedIcon")),
    "trending_up": lazy(() => import("../icons/TrendingUpIcon")),
    "warning": lazy(() => import("../icons/WarningIcon")),
    "web": lazy(() => import("../icons/WebIcon")),
    "work": lazy(() => import("../icons/WorkIcon")),
};

export type IconName = keyof typeof iconMap;

export default iconMap;