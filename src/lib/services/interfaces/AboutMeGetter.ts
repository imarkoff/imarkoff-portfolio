import AboutMe from "@/lib/models/AboutMe";

export default interface AboutMeGetter {
    /**
     * Fetches the "About Me" section data.
     * @returns A promise that resolves to an AboutMe object containing the data.
     * @throws {NotFoundError} If the "About Me" document does not exist.
     */
    getAboutMe(): Promise<AboutMe>;
}