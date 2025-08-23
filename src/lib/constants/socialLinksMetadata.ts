import {IconName} from "@/components/icons/utils/iconMap";

interface SocialLinkMetadata {
    name: string;
    url: (username: string) => string;
    icon: IconName;
}

const socialLinksMetadata: Record<string, SocialLinkMetadata> = {
    github: {
        name: "GitHub",
        url: (username: string) => `https://github.com/${username}`,
        icon: "github"
    },
    linkedin: {
        name: "LinkedIn",
        url: (username: string) => `https://www.linkedin.com/in/${username}`,
        icon: "linkedin"
    },
}

export default socialLinksMetadata;