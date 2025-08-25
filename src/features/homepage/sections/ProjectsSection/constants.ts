import {ProjectsSectionReferences} from "@/features/homepage/sections/ProjectsSection/types";

export const DEFAULT_HUE = 215;

export const SPACE_BETWEEN_HEADER_AND_PROJECTS = 50; // px

export const REFERENCES: ProjectsSectionReferences = {
    projectsListId: "projects__section",
    projectsHeaderId: "projects__header",
    projectCard: {
        className: "projects__project-card",
        content: {
            className: "projects__project-card__content",
            techLabelClassName: "projects__project-card__tech-label"
        }
    }
};