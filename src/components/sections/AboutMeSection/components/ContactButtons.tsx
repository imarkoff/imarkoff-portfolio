import AboutMe from "@/lib/models/AboutMe";
import DocsIcon from "@/components/icons/DocsIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import LinkButton from "@/components/ui/Button/LinkButton";

export default function ContactButtons({ aboutMe }: { aboutMe: AboutMe }) {
    const github = aboutMe.socialLinks.find(link => link.platform === "github");
    const linkedin = aboutMe.socialLinks.find(link => link.platform === "linkedin");

    return (
        <div className={"flex justify-start items-center gap-2.5"}>
            {aboutMe.resumeUrl && (
                <LinkButton
                    href={aboutMe.resumeUrl}
                    target={"_blank"}
                    variant={"secondary"}
                    LeftIcon={DocsIcon}
                >
                    Get my CV
                </LinkButton>
            )}
            {github && (
                <LinkButton
                    href={github.url}
                    target={"_blank"}
                    variant={"tertiary"}
                    LeftIcon={GitHubIcon}
                    isIconButton
                    title={"GitHub"}
                />
            )}
            {linkedin && (
                <LinkButton
                    href={linkedin.url}
                    target={"_blank"}
                    variant={"tertiary"}
                    LeftIcon={LinkedInIcon}
                    isIconButton
                    title={"LinkedIn"}
                />
            )}
        </div>
    );
}