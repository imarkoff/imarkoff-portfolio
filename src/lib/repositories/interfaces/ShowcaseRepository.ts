import ShowcaseImage from "@/lib/models/ShowcaseImage";

export default interface ShowcaseRepository {
    /** Fetches the showcase images from the repository. */
    getShowcaseImages(): Promise<ShowcaseImage[]>;
}