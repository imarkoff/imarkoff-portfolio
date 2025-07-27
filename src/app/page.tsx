import Section from "@/app/components/ui/Section";
import Typography from "@/app/components/ui/Typography";
import Navbar from "@/app/components/layout/Navbar/Navbar";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import HeroSection from "@/app/components/sections/HeroSection/HeroSection";
import Label from "@/app/components/ui/Label";

export default async function Home() {
    const aboutMeGetter = container.get<AboutMeGetter>(TYPES.AboutMeGetter);
    const aboutMe = await aboutMeGetter.getAboutMe();

    return (
        <main className={"min-h-full flex flex-col"}>
            <Navbar />
            <HeroSection aboutMe={aboutMe} />
            <Section slotProps={{ root: { className: "border-t-2 overflow-hidden" } }}>
                <Typography variant={"hero"} component={"h1"}>
                    Hero
                </Typography>
                <Typography variant={"tagline"} component={"h2"}>
                    Tagline
                </Typography>
                <Typography variant={"h1"} component={"h3"}>
                    H1
                </Typography>
                <Typography variant={"h2"} component={"h4"}>
                    H2
                </Typography>
                <Typography variant={"h3"} component={"h5"}>
                    H3
                </Typography>
                <Typography variant={"body"} component={"p"}>
                    Body
                </Typography>
                <Typography variant={"caption"} component={"p"}>
                    Caption
                </Typography>
                <Typography family={"handwritten"} variant={"hero"} className={"tracking-wider text-secondary"}>
                    Handwritten text
                </Typography>
                <div className={"flex items-center gap-2"}>
                    <Label>
                        React
                    </Label>
                    <Label icon={<img src={"favicon.ico"} width={"19px"} alt={"Next.js"} />}>
                        Next.js
                    </Label>
                    <Label color={"green"}>
                        Green Label
                    </Label>
                    <Label color={"red"}>
                        Red Label
                    </Label>
                    <Label color={"yellow"} rounded>
                        Rounded Yellow Label
                    </Label>
                </div>
            </Section>
        </main>
    );
}
