import Navbar from "@/components/layout/Navbar/Navbar";
import HeroSection from "./sections/HeroSection/HeroSection";
import AboutMeSection from "./sections/AboutMeSection/AboutMeSection";
import ProjectsSection from "./sections/ProjectsSection/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection/ExperienceSection";
import ContactMeSection from "./sections/ContactMeSection/ContactMeSection";
import AboutMe from "@/lib/models/AboutMe";
import ShowcaseImage from "@/lib/models/ShowcaseImage";
import {TechnologiesByCategory} from "@/lib/models/types/TechnologyCategory";
import Project from "@/lib/models/Project";
import Technology from "@/lib/models/Technology";
import {ExperienceByType} from "@/lib/models/types/ExperienceType";

interface HomePageProps {
    aboutMe: AboutMe;
    aboutMeTechnologies: TechnologiesByCategory[];
    showcases: ShowcaseImage[][];
    projects: Project[];
    projectsTechnologies: Technology[][];
    experiences: ExperienceByType;
}

export default function HomePage(
    { aboutMe, aboutMeTechnologies, showcases, projects, projectsTechnologies, experiences }: HomePageProps
) {
    return (
        <>
            <header>
                <Navbar/>
                <HeroSection
                    aboutMe={aboutMe}
                    showcases={showcases}
                />
            </header>
            <main>
                <AboutMeSection
                    aboutMe={aboutMe}
                    technologies={aboutMeTechnologies}
                />
                <ProjectsSection
                    projects={projects}
                    projectsTechnologies={projectsTechnologies}
                />
                <ExperienceSection
                    experience={experiences}
                />
            </main>
            <footer>
                <ContactMeSection
                    aboutMe={aboutMe}
                />
            </footer>
        </>
    )
}