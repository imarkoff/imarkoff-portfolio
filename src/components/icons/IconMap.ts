import {lazy} from "react";

/** A mapping of icon names to their respective React components. */
const IconMap = {
    "account_circle": lazy(() => import("./AccountCircleIcon")),
    "alternate_email": lazy(() => import("./AlternateEmailIcon")),
    "architecture": lazy(() => import("./ArchitectureIcon")),
    "arrow_forward": lazy(() => import("./ArrowForwardIcon")),
    "bug_report": lazy(() => import("./BugReportIcon")),
    "chat": lazy(() => import("./ChatIcon")),
    "code": lazy(() => import("./CodeIcon")),
    "commit": lazy(() => import("./CommitIcon")),
    "docs": lazy(() => import("./DocsIcon")),
    "database": lazy(() => import("./DatabaseIcon")),
    "dns": lazy(() => import("./DnsIcon")),
    "github": lazy(() => import("./GitHubIcon")),
    "home": lazy(() => import("./HomeIcon")),
    "linkedin": lazy(() => import("./LinkedInIcon")),
    "mail": lazy(() => import("./MailIcon")),
    "memory": lazy(() => import("./MemoryIcon")),
    "menu": lazy(() => import("./MenuIcon")),
    "more_horiz": lazy(() => import("./MoreHorizIcon")),
    "progress_activity": lazy(() => import("./ProgressActivityIcon")),
    "school": lazy(() => import("./SchoolIcon")),
    "send": lazy(() => import("./SendIcon")),
    "sentiment_very_satisfied": lazy(() => import("./SentimentVerySatisfiedIcon")),
    "trending_up": lazy(() => import("./TrendingUpIcon")),
    "web": lazy(() => import("./WebIcon")),
    "work": lazy(() => import("./WorkIcon")),
};

export type IconName = keyof typeof IconMap;

export default IconMap;