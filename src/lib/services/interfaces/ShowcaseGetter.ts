import ShowcaseImage from "@/lib/models/ShowcaseImage";

export default interface ShowcaseGetter {
    /**
     * Fetches the showcase images.
     * @return A matrix of ShowcaseImage arrays, where each array is a column of images.
     */
    getShowcases(): Promise<Array<ShowcaseImage[]>>;
}