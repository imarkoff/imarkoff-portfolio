import apiConfig from "@/config/apiConfig";
import ShowcaseImage from "@/lib/models/ShowcaseImage";

export default async function getShowcasesApi(
    url = apiConfig.endpoints.showcases.route,
): Promise<ShowcaseImage[][]> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(!!response.statusText ? response.statusText : 'Error fetching showcases');
    }

    return await response.json();
}