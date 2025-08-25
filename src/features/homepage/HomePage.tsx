import Navbar from "@/components/layout/Navbar/Navbar";
import HeroSection from "./sections/HeroSection/HeroSection";
import AboutMeSection from "./sections/AboutMeSection/AboutMeSection";
import ProjectsSection from "./sections/ProjectsSection/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection/ExperienceSection";
import ContactMeSection from "./sections/ContactMeSection/ContactMeSection";
import AboutMe from "@/lib/models/AboutMe";
import ShowcaseImage from "@/lib/models/ShowcaseImage";
import Project from "@/lib/models/Project";
import {ExperienceByType} from "@/lib/models/types/ExperienceType";

interface HomePageProps {
    aboutMe: AboutMe;
    showcases: ShowcaseImage[][];
    projects: Project[];
    experiences: ExperienceByType;
}

export default function HomePage(
    { aboutMe, showcases, projects, experiences }: HomePageProps
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
                />
                <ProjectsSection
                    projects={projects}
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