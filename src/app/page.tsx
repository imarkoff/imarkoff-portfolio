import Section from "@/components/ui/Section";
import Typography from "@/components/ui/Typography";
import Navbar from "@/components/layout/Navbar/Navbar";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import Label from "@/components/ui/Label";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import AboutMeSection from "@/components/sections/AboutMeSection/AboutMeSection";
import TechnologyGetter from "@/lib/services/interfaces/TechnologyGetter";

export default async function Home() {
    const aboutMeGetter = container.get<AboutMeGetter>(TYPES.AboutMeGetter);
    const showcaseGetter = container.get<ShowcaseGetter>(TYPES.ShowcaseGetter);
    const technologyGetter = container.get<TechnologyGetter>(TYPES.TechnologyGetter);
    const aboutMe = await aboutMeGetter.getAboutMe();
    const showcases = await showcaseGetter.getShowcases();
    const aboutMeTechnologies = await technologyGetter
        .getTechnologiesBySlugGroupedByCategory(aboutMe.technologiesCategories);

    return (
        <main className={"min-h-full flex flex-col"}>
            <Navbar/>
            <HeroSection
                aboutMe={aboutMe}
                showcases={showcases}
            />
            <AboutMeSection
                aboutMe={aboutMe}
                technologies={aboutMeTechnologies}
            />
            <Section>
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
                <div className={"flex flex-wrap items-center gap-2"}>
                    <Label>
                        React
                    </Label>
                    <Label icon={<img src={"favicon.ico"} width={"19px"} alt={"Next.js"}/>}>
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
