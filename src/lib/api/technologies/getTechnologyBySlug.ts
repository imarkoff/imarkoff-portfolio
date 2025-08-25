import apiConfig from "@/config/apiConfig";
import Technology from "@/lib/models/Technology";

export default async function getTechnologyBySlug(
    slug: string,
    url = apiConfig.endpoints.technologies.bySlug.route
): Promise<Technology | null> {
    const response = await fetch(url(slug));

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(!!response.statusText 
            ? response.statusText 
            : "An error occurred while fetching the technology."
        );
    }

    return await response.json();
}