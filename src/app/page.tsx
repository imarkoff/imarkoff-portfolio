import Navbar from "@/components/layout/Navbar/Navbar";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import AboutMeSection from "@/components/sections/AboutMeSection/AboutMeSection";
import TechnologyGetter from "@/lib/services/interfaces/TechnologyGetter";
import ProjectsSection from "@/components/sections/ProjectsSection/ProjectsSection";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import ExperienceSection from "@/components/sections/ExperienceSection/ExperienceSection";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import ContactMeSection from "@/components/sections/ContactMeSection/ContactMeSection";

export default async function Home() {
    const aboutMeGetter = container.get<AboutMeGetter>(TYPES.AboutMeGetter);
    const projectGetter = container.get<ProjectGetter>(TYPES.ProjectGetter);
    const showcaseGetter = container.get<ShowcaseGetter>(TYPES.ShowcaseGetter);
    const technologyGetter = container.get<TechnologyGetter>(TYPES.TechnologyGetter);
    const experienceGetter = container.get<ExperienceGetter>(TYPES.ExperienceGetter);

    const aboutMe = await aboutMeGetter.getAboutMe();
    const projects = await projectGetter.getHomepageProjects();
    const showcases = await showcaseGetter.getShowcases();
    const aboutMeTechnologies = await technologyGetter
        .getTechnologiesBySlugGroupedByCategory(aboutMe.technologiesCategories);
    const projectsTechnologies = [];
    const experiences = await experienceGetter.getExperienceGroupedByType();

    for (const {coreTechs} of projects) {
        const technologies = await technologyGetter.getTechnologiesBySlug(coreTechs);
        console.log(coreTechs, technologies);
        projectsTechnologies.push(technologies);
    }

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
            <ProjectsSection
                projects={projects}
                projectsTechnologies={projectsTechnologies}
            />
            <ExperienceSection
                experience={experiences}
            />
            <ContactMeSection
                email={aboutMe.contactEmail}
            />
        </main>
    );
}
