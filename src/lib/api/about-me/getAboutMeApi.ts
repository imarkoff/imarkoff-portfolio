import apiConfig from "@/config/apiConfig";
import AboutMe from "@/lib/models/AboutMe";

export default async function getAboutMeApi(
    url = apiConfig.endpoints.aboutMe.route,
): Promise<AboutMe> {
    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(!!response.statusText ? response.statusText : "Failed to fetch about me data");
    }

    return await response.json();
}