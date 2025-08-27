import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import HomePage from "@/features/homepage/HomePage";
import { Metadata } from "next";
import removeMarkdown from "remove-markdown";

export const dynamic = "force-static";

async function getDependencies() {
    return {
        aboutMeGetter: container.get<AboutMeGetter>(TYPES.AboutMeGetter),
        projectGetter: container.get<ProjectGetter>(TYPES.ProjectGetter),
        showcaseGetter: container.get<ShowcaseGetter>(TYPES.ShowcaseGetter),
        experienceGetter: container.get<ExperienceGetter>(TYPES.ExperienceGetter),
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { aboutMeGetter } = await getDependencies();
    const aboutMe = await aboutMeGetter.getAboutMe();
    const description = removeMarkdown(aboutMe.tagline).trim();
    const fullName = aboutMe.surname ? `${aboutMe.name} ${aboutMe.surname}` : aboutMe.name;

    return {
        title: `${fullName} | Software Developer | Portfolio`,
        description,
    };
}

export default async function Home() {
    const { aboutMeGetter, projectGetter, showcaseGetter, experienceGetter } = await getDependencies();

    const [aboutMe, projects, showcases, experiences] = await Promise.all([
        aboutMeGetter.getAboutMe(),
        projectGetter.getHomepageProjects(),
        showcaseGetter.getShowcases(),
        experienceGetter.getExperienceGroupedByType(),
    ]);

    return (
        <HomePage
            aboutMe={aboutMe}
            showcases={showcases}
            projects={projects}
            experiences={experiences}
        />
    );
}