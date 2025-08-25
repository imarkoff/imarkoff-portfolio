import Project from "@/lib/models/Project";

export interface ProjectCardProps {
    project: Project;
    index: number;
    references?: ProjectCardReference;
}

export interface ProjectCardReference {
    className: string;
    content: ProjectCardContentReference;
}

export interface ProjectCardContentReference {
    className: string;
    techLabelClassName: string;
}