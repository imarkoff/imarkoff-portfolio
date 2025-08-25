import AboutMe from "@/lib/models/AboutMe";
import ByTheNumbersCard from "@/features/homepage/sections/AboutMeSection/components/ByTheNumbersCard";
import ByTechnologiesCard from "@/features/homepage/sections/AboutMeSection/components/ByTechnologiesCard";
import AboutMeScroll from "@/features/homepage/sections/AboutMeSection/components/AboutMeScroll";
import AboutMeContent from "@/features/homepage/sections/AboutMeSection/components/AboutMeContent";
import HomePageSection from "@/features/homepage/components/HomePageSection";

export default function AboutMeSection(
    {aboutMe}: { aboutMe: AboutMe }
) {
    const references = {
        aboutMeGridLayoutId: "about-me.section",
        aboutMeContentColumnId: "about-me.container",
        byTheNumbersContainerId: "by-the-numbers.container",
        byTheNumbersHeadingId: "by-the-numbers.heading",
    };

    return (
        <HomePageSection
            id={"about"}
            slotProps={{ root: {
                className: "border-t-2 overflow-hidden",
                style: {
                    background: "radial-gradient(75% 75% at 90% 27%, #B400FF19 0%, #FF07C000 100%),radial-gradient(50% 50% at 5% 18%, #B400FF30 0%, #FF07C000 100%),radial-gradient(50% 75% at 45% 95%, #006FFF26 0%, #073AFF00 100%)"
                }
            } }}
        >
            <AboutMeScroll references={references} />
            <div className={"flex flex-col gap-6"}>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 items-center"} id={references.aboutMeGridLayoutId}>
                    <AboutMeContent
                        aboutMe={aboutMe}
                        id={references.aboutMeContentColumnId}
                    />
                    <ByTheNumbersCard
                        byTheNumbers={aboutMe.byTheNumbers}
                        id={references.byTheNumbersContainerId}
                        headingId={references.byTheNumbersHeadingId}
                    />
                </div>
                <ByTechnologiesCard technologies={aboutMe.technologiesCategories} />
            </div>
        </HomePageSection>
    );
}