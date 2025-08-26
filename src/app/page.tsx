import HomePage from "@/features/homepage/HomePage";
import getAboutMeApi from "@/lib/api/about-me/getAboutMeApi";
import getHomePageProjectsApi from "@/lib/api/projects/getHomePageProjectsApi";
import getShowcasesApi from "@/lib/api/showcases/getShowcasesApi";
import getExperienceGroupedByTypeApi from "@/lib/api/experiences/getExperienceGroupedByTypeApi";

export default async function Home() {
    const aboutMe = await getAboutMeApi();
    const projects = await getHomePageProjectsApi();
    const showcases = await getShowcasesApi();
    const experiences = await getExperienceGroupedByTypeApi();

    return (
        <HomePage
            aboutMe={aboutMe}
            showcases={showcases}
            projects={projects}
            experiences={experiences}
        />
    );
}
