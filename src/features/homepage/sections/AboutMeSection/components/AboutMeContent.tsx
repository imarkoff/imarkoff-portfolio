import {AccountCircleIcon} from "@/components/icons";
import {Typography, TypographyIcon} from "@/components/ui/Typography";
import AboutMe from "@/lib/models/AboutMe";
import ReactMarkdown from "react-markdown";
import ContactButtons from "@/features/homepage/sections/AboutMeSection/components/ContactButtons";

export interface AboutMeContentProps {
    aboutMe: AboutMe;
    id: string;
}

export default function AboutMeContent(
    {aboutMe, id}: AboutMeContentProps
) {
    return (
        <div
            className={"flex flex-col gap-6"}
            data-testid={"about-me-content"}
            id={id}
        >
            <div className={"flex gap-2.5 items-center"}>
                <TypographyIcon Icon={AccountCircleIcon} variant={"h1"} />
                <Typography variant={"h1"} component={"h2"}>
                    About Me
                </Typography>
            </div>
            <div className={"flex flex-col gap-4"}>
                <ReactMarkdown
                    components={{
                        p: ({node, ...props}) => (
                            <Typography variant={"body"} {...props} />
                        )
                    }}
                >
                    {aboutMe.fullDescription}
                </ReactMarkdown>
            </div>
            <ContactButtons
                socialLinks={aboutMe.socialLinks}
                resumeUrl={aboutMe.resumeUrl}
            />
        </div>
    );
}