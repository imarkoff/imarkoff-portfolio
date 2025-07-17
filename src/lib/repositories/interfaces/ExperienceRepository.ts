import ExperienceItem from "@/lib/models/ExperienceItem";

export default interface ExperienceRepository {
    /**
     * Fetches the list of experience items (e.g., work, education).
     * @returns
     * An array of ExperienceItem objects sorted by start date in descending order.
     * Present items are at the top.
     */
    getExperience(): Promise<ExperienceItem[]>;
}