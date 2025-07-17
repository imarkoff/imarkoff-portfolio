import ExperienceItem from "@/lib/models/ExperienceItem";
import ExperienceType from "@/lib/models/types/ExperienceType";

export default interface ExperienceGetter {
    /**
     * Fetches the list of experience items (e.g., work, education).
     * @returns A promise that resolves to an array of ExperienceItem objects sorted by start date in descending order.
     * Present items are at the top.
     */
    getExperience(): Promise<ExperienceItem[]>;

    /**
     * Fetches experience items grouped by their type (e.g., work, education).
     * @returns A promise that resolves to an object where keys are ExperienceType and values are arrays of ExperienceItem.
     */
    getExperienceGroupedByType(): Promise<Record<ExperienceType, ExperienceItem[]>>;
}