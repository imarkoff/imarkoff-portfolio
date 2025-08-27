import AboutMe from "@/lib/models/AboutMe";
import {DocsIcon} from "@/components/icons";
import {LinkButton} from "@/components/ui/Button";
import SocialLinks from "@/components/layout/SocialLinks";

export interface ContactButtonsProps {
    socialLinks: AboutMe["socialLinks"];
    resumeUrl: AboutMe["resumeUrl"];
}

export default function ContactButtons(
    { socialLinks, resumeUrl }: ContactButtonsProps
) {
    return (
        <div className={"flex justify-start items-center gap-2.5"}>
            {resumeUrl && (
                <LinkButton
                    href={resumeUrl}
                    target={"_blank"}
                    variant={"secondary"}
                    LeftIcon={DocsIcon}
                >
                    Get my CV
                </LinkButton>
            )}
            <SocialLinks
                socialLinks={socialLinks}
                description={false}
                buttonProps={{
                    isIconButton: true,
                    variant: "tertiary",
                }}
            />
        </div>
    );
}