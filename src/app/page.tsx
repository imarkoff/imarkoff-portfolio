import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import TechnologyGetter from "@/lib/services/interfaces/TechnologyGetter";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import Technology from "@/lib/models/Technology";
import HomePage from "@/features/homepage/HomePage";

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
    const projectsTechnologies: Technology[][] = [];
    const experiences = await experienceGetter.getExperienceGroupedByType();

    for (const {coreTechs} of projects) {
        const technologies = await technologyGetter.getTechnologiesBySlug(coreTechs);
        console.log(coreTechs, technologies);
        projectsTechnologies.push(technologies);
    }

    return (
        <HomePage
            aboutMe={aboutMe}
            aboutMeTechnologies={aboutMeTechnologies}
            showcases={showcases}
            projects={projects}
            projectsTechnologies={projectsTechnologies}
            experiences={experiences}
        />
    );
}
