import Label from "@/components/ui/Label";
import {Typography} from "@/components/ui/Typography";
import ReactMarkdown from "react-markdown";
import DocsIcon from "@/components/icons/DocsIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import {HeroAnimatorProps} from "@/components/sections/HeroSection/types";
import AboutMe from "@/lib/models/AboutMe";
import AnimateHero from "@/components/sections/HeroSection/components/AnimateHero";
import {LinkButton} from "@/components/ui/Button";
import SocialLinks from "@/components/layout/SocialLinks";

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
                                className={"font-tagline text-gradient"}
                                {...props} />,
                        }}
                    >
                        {aboutMe.tagline}
                    </ReactMarkdown>
                </Typography>
            </div>
            <div className={"flex items-center justify-center md:justify-start gap-4 flex-wrap"}>
                {/* buttons has own transitions which are incompatible with GSAP */}
                {aboutMe.resumeUrl && (
                    <div className={references.buttonWrapperClassName}>
                        <LinkButton
                            href={aboutMe.resumeUrl}
                            target={"_blank"}
                            variant={"primary"}
                            LeftIcon={DocsIcon}
                        >
                            Get my CV
                        </LinkButton>
                    </div>

                )}
                <div className={references.buttonWrapperClassName}>
                    <LinkButton
                        href={"#contact"}
                        LeftIcon={ChatIcon}
                        className={"backdrop-blur-xl"}
                    >
                        Contact me
                    </LinkButton>
                </div>
                <div className={"flex items-center gap-2.5"}>
                    <SocialLinks
                        socialLinks={aboutMe.socialLinks}
                        description={false}
                        buttonProps={{
                            isIconButton: true,
                            variant: "tertiary",
                        }}
                        Wrapper={({children}) => (
                            <div className={references.buttonWrapperClassName}>
                                {children}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}