import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import HomePage from "@/features/homepage/HomePage";

export default async function Home() {
    const aboutMeGetter = container.get<AboutMeGetter>(TYPES.AboutMeGetter);
    const projectGetter = container.get<ProjectGetter>(TYPES.ProjectGetter);
    const showcaseGetter = container.get<ShowcaseGetter>(TYPES.ShowcaseGetter);
    const experienceGetter = container.get<ExperienceGetter>(TYPES.ExperienceGetter);

    const aboutMe = await aboutMeGetter.getAboutMe();
    const projects = await projectGetter.getHomepageProjects();
    const showcases = await showcaseGetter.getShowcases();
    const experiences = await experienceGetter.getExperienceGroupedByType();

    return (
        <HomePage
            aboutMe={aboutMe}
            showcases={showcases}
            projects={projects}
            experiences={experiences}
        />
    );
}
