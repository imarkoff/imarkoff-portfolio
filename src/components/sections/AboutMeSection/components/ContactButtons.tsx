import AboutMe from "@/lib/models/AboutMe";
import DocsIcon from "@/components/icons/DocsIcon";
import LinkButton from "@/components/ui/Button/LinkButton";
import SocialLinks from "@/components/layout/SocialLinks";

export default function ContactButtons({ aboutMe }: { aboutMe: AboutMe }) {
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
            <SocialLinks
                socialLinks={aboutMe.socialLinks}
                description={false}
                buttonProps={{
                    isIconButton: true,
                    variant: "tertiary",
                }}
            />
        </div>
    );
}