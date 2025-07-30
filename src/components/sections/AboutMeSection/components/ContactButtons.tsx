import AboutMe from "@/lib/models/AboutMe";
import Button from "@/components/ui/Button";
import DocsIcon from "@/components/icons/DocsIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import Link from "next/link";

export default function ContactButtons({ aboutMe }: { aboutMe: AboutMe }) {
    const github = aboutMe.socialLinks.find(link => link.platform === "github");
    const linkedin = aboutMe.socialLinks.find(link => link.platform === "linkedin");

    return (
        <div className={"flex justify-start items-center gap-2.5"}>
            {aboutMe.resumeUrl && (
                <Link href={aboutMe.resumeUrl} target={"_blank"}>
                    <Button variant={"secondary"} LeftIcon={DocsIcon}>
                        Get my CV
                    </Button>
                </Link>
            )}
            {github && (
                <Link href={github.url} target={"_blank"}>
                    <Button variant={"tertiary"} LeftIcon={GitHubIcon} isIconButton title={"GitHub"} />
                </Link>
            )}
            {linkedin && (
                <Link href={linkedin.url} target={"_blank"}>
                    <Button variant={"tertiary"} LeftIcon={LinkedInIcon} isIconButton title={"LinkedIn"} />
                </Link>
            )}
        </div>
    );
}