import Logo from "@/components/layout/Logo";
import Typography from "@/components/ui/Typography";
import SocialLinks from "@/components/layout/SocialLinks";
import AboutMe from "@/lib/models/AboutMe";
import Card from "@/components/ui/Card";

interface TrueFooterProps {
    aboutMe: AboutMe;
}

export default function TrueFooter(
    { aboutMe }: TrueFooterProps
) {
    const currentYear = new Date().getFullYear();

    return (
        <Card className={"w-full grid grid-cols-2 lg:grid-cols-3 items-center gap-4 p-4"}>
            <div>
                <Logo />
                <Typography variant={"caption"} className={"!leading-none"}>
                    {aboutMe.name} {aboutMe.surname}
                </Typography>
            </div>
            <div className={"flex items-center justify-end lg:justify-center gap-2"}>
                <SocialLinks
                    socialLinks={aboutMe.socialLinks}
                    description={false}
                    buttonProps={{
                        isIconButton: true,
                        size: "small",
                        variant: "tertiary",
                    }}
                />
            </div>
            <Typography variant={"caption"} className={"lg:text-end col-span-2 lg:col-span-1"}>
                © {currentYear} {aboutMe.name} {aboutMe.surname}. All rights reserved.
            </Typography>
        </Card>
    );
}