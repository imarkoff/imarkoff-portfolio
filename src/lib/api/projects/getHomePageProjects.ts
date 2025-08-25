import apiConfig from "@/config/apiConfig";
import Project from "@/lib/models/Project";

export default async function getHomePageProjects(
    url = apiConfig.endpoints.projects.homepage.route
): Promise<Project[]> {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        throw new Error(!!response.statusText 
            ? response.statusText 
            : "An unknown error occured while fetching the projects"
        );
    }
    return response.json();
}