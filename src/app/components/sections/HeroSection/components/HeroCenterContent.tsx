import Label from "@/app/components/ui/Label";
import Typography from "@/app/components/ui/Typography";
import ReactMarkdown from "react-markdown";
import Button from "@/app/components/ui/Button";
import DocsIcon from "@/app/components/icons/DocsIcon";
import ChatIcon from "@/app/components/icons/ChatIcon";
import GitHubIcon from "@/app/components/icons/GitHubIcon";
import LinkedInIcon from "@/app/components/icons/LinkedInIcon";
import {HeroAnimatorProps} from "@/app/components/sections/HeroSection/types";
import AboutMe from "@/lib/models/AboutMe";
import AnimateHero from "@/app/components/sections/HeroSection/components/AnimateHero";
import Link from "next/link";

export default function HeroCenterContent({aboutMe}: { aboutMe: AboutMe }) {
    const references: HeroAnimatorProps = {
        greeting: {
            hiId: "hero.greeting.hi",
            otherId: "hero.greeting.other"
        },
        nameId: "hero.name",
        taglineId: "hero.tagline",
        labelId: "hero.label",
        buttonWrapperClassName: "button-wrapper"
    };

    const githubLink = aboutMe.socialLinks.find(link => link.platform === "github");
    const linkedinLink = aboutMe.socialLinks.find(link => link.platform === "linkedin");

    return (
        <div className={"md:w-fit flex flex-col items-center md:items-start gap-3 md:gap-6 z-10"}>
            <AnimateHero {...references} />
            <Label
                color={"green"}
                className={"drop-shadow-card !px-3 !gap-3"}
                id={references.labelId}
                icon={
                    <div className={"size-[10px] relative"}>
                        <div className={"size-full rounded-full bg-green-filled"} />
                        <div className={"absolute inset-0 rounded-full bg-green-filled animate-ping"} />
                    </div>
                }
            >
                <Typography variant={"h3"}>
                    Seeking for a job
                </Typography>
            </Label>
            <div className={"flex flex-col items-center md:items-start"}>
                <Typography variant={"tagline"} component={"h3"}>
                    <span className={"inline-block origin-[25%] md:origin-left"} id={references.greeting.hiId}>
                        Hi 👋
                    </span>
                    <span className={"inline-block"} id={references.greeting.otherId}>, I’m</span>
                </Typography>
                <Typography
                    variant={"hero"}
                    component={"h1"}
                    className={"text-center"}
                    id={references.nameId}
                >
                    {aboutMe.name}&nbsp;
                    {aboutMe.surname && (
                        <span className={"!hidden md:!inline-block"}>
                            {aboutMe.surname}
                        </span>
                    )}
                </Typography>
                <Typography variant={"tagline"} component={"div"} id={references.taglineId}>
                    <ReactMarkdown
                        allowedElements={["strong", "p"]}
                        components={{
                            p: ({node, ...props}) => <h2
                                className={"text-center md:text-left"}
                                {...props} />,
                            strong: ({node, ...props}) => <strong
                                className={"text-transparent font-tagline bg-clip-text bg-(image:--gradient-text)"}
                                {...props} />,
                        }}
                    >
                        {aboutMe.tagline}
                    </ReactMarkdown>
                </Typography>
            </div>
            <div className={"flex items-center justify-center md:justify-start gap-4 flex-wrap"}>
                {/* buttons has own transitions which are incompatible with GSAP */}
                <div className={references.buttonWrapperClassName}>
                    <Button variant={"primary"} LeftIcon={DocsIcon}>
                        Get my CV
                    </Button>
                </div>
                <div className={references.buttonWrapperClassName}>
                    <Button LeftIcon={ChatIcon} className={"backdrop-blur-xl"}>
                        Contact me
                    </Button>
                </div>
                <div className={"flex items-center gap-2.5"}>
                    {githubLink && (
                        <Link className={references.buttonWrapperClassName} href={githubLink.url}>
                            <Button variant={"tertiary"} isIconButton title={"GitHub profile"}>
                                <GitHubIcon className={"size-icon-md"} />
                            </Button>
                        </Link>
                    )}
                    {linkedinLink && (
                        <Link className={references.buttonWrapperClassName} href={linkedinLink.url}>
                            <Button variant={"tertiary"} isIconButton title={"LinkedIn profile"}>
                                <LinkedInIcon className={"size-icon-md"} />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}