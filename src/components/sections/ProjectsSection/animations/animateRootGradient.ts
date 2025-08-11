import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Project from "@/lib/models/Project";
import {DEFAULT_HUE} from "@/components/sections/ProjectsSection/constants";

export default function animateRootGradient(
    project: Project,
    prevProject: Project | null,
    sectionRoot: Element,
    card: Element,
    index: number
) {
    ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "center center",
        id: `project-card-${index}-root-gradient`,
        onEnter: () => gsap.to(sectionRoot, {
            "--gradient-hue": project.colors?.primaryHue, duration: 0.3
        }),
        onLeaveBack: () => gsap.to(sectionRoot, {
            "--gradient-hue": prevProject?.colors?.primaryHue || DEFAULT_HUE, duration: 0.3
        }),
    });
}