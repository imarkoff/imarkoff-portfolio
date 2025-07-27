import AboutMe from "@/lib/models/AboutMe";
import Typography from "@/app/components/ui/Typography";
import Section from "@/app/components/ui/Section";
import ReactMarkdown from "react-markdown";
import Button from "@/app/components/ui/Button";
import DocsIcon from "@/app/components/icons/DocsIcon";
import ChatIcon from "@/app/components/icons/ChatIcon";
import GitHubIcon from "@/app/components/icons/GitHubIcon";
import LinkedInIcon from "@/app/components/icons/LinkedInIcon";
import Label from "@/app/components/ui/Label";
import DownArrow from "@/app/components/sections/HeroSection/components/DownArrow";
import ShowcaseCarousel from "@/app/components/sections/HeroSection/components/ShowcaseCarousel";
import GradientBlur from "@/app/components/ui/GradientBlur";
import SomeShowcasesArrow from "@/app/components/sections/HeroSection/components/SomeShowcasesArrow/SomeShowcasesArrow";
import GreetingAnimator from "@/app/components/sections/HeroSection/components/GreetingAnimator";
import HeroAnimator from "@/app/components/sections/HeroSection/components/HeroAnimator";
import HeroBackground from "@/app/components/sections/HeroSection/components/HeroBackground";
import clsx from "clsx";

export default function HeroSection({aboutMe}: { aboutMe: AboutMe }) {
    const greetingHiId = "hero.greeting.hi";
    const greetingOtherId = "hero.greeting.other";
    const nameId = "hero.name";
    const taglineId = "hero.tagline";
    const labelId = "hero.label";
    const buttonWrapperClassName = "button-wrapper";

    return (
        <Section slotProps={{
            root: {
                className: "flex-grow h-screen border-none relative overflow-hidden",
                style: {
                    boxShadow: "0px 12px 100px 0px rgba(67, 7, 38, 0.25)"
                }
            },
            section: {
                className: "flex gap-6"
            }
        }}>
            <HeroBackground />
            <HeroAnimator
                nameId={nameId}
                taglineId={taglineId}
                labelId={labelId}
                buttonWrapperClassName={buttonWrapperClassName}
            />
            <div className={"flex-grow flex flex-col gap-6"}>
                <div className={"flex-1"} />
                <div className={"w-fit flex flex-col items-center md:items-start gap-3 md:gap-6 z-10"}>
                    <Label
                        color={"green"}
                        className={"drop-shadow-card !px-3 !gap-3"}
                        id={labelId}
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
                            <span className={"inline-block origin-[25%] md:origin-left"} id={greetingHiId}>Hi 👋</span>
                            <span className={"inline-block"} id={greetingOtherId}>, I’m</span>
                        </Typography>
                        <GreetingAnimator greetingHiId={greetingHiId} greetingOtherId={greetingOtherId} />
                        <Typography
                            variant={"hero"}
                            component={"h1"}
                            className={"text-center"}
                            id={nameId}
                        >
                            {aboutMe.name}&nbsp;
                            {aboutMe.surname && (
                                <span className={"hidden md:inline"}>
                                    {aboutMe.surname}
                                </span>
                            )}
                        </Typography>
                        <Typography variant={"tagline"} component={"div"} id={taglineId}>
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
                        <div className={buttonWrapperClassName}>
                            <Button variant={"primary"} LeftIcon={DocsIcon}>
                                Get my CV
                            </Button>
                        </div>
                        <div className={clsx(buttonWrapperClassName, "backdrop-blur-2xl !rounded-button-sm")}>
                            <Button LeftIcon={ChatIcon}>
                                Contact me
                            </Button>
                        </div>
                        <div className={"flex items-center gap-2.5"}>
                            <div className={buttonWrapperClassName}>
                                <Button variant={"tertiary"} isIconButton title={"GitHub profile"}>
                                    <GitHubIcon className={"size-icon-md"} />
                                </Button>
                            </div>
                            <div className={buttonWrapperClassName}>
                                <Button variant={"tertiary"} isIconButton title={"LinkedIn profile"}>
                                    <LinkedInIcon className={"size-icon-md"} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex-1 flex items-center justify-center md:justify-start z-10"}>
                    <DownArrow />
                </div>
            </div>

            <div className={"absolute -top-full bottom-0 right-0 translate-x-1/3 translate-y-1/3 flex items-center justify-center opacity-35 lg:opacity-100"}>
                <SomeShowcasesArrow />
                <ShowcaseCarousel />
            </div>
            <div className={"absolute inset-x-0 bottom-0 z-1 w-full h-[15px]"}>
                <GradientBlur direction={"bottom-to-top"} layers={[
                    {blurAmount: 32, maskStart: 0, maskEnd: 30},
                    {blurAmount: 2, maskStart: 0, maskEnd: 100},
                    {blurAmount: 1, maskStart: 70, maskEnd: 100}
                ]} />
            </div>
        </Section>
    );
}