import Project from "@/lib/models/Project";
import Technology from "@/lib/models/Technology";

export interface ProjectCardProps {
    project: Project;
    techs: Technology[];
    index: number;
}