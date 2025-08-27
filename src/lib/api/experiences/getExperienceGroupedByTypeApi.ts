import apiConfig from "@/config/apiConfig";
import {ExperienceByType} from "@/lib/models/types/ExperienceType";

export default async function getExperienceGroupedByTypeApi(
    url = apiConfig.endpoints.experience.groupedByType.route
): Promise<ExperienceByType> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(!!response.statusText ? response.statusText : 'Error fetching showcases');
    }

    return await response.json();
}