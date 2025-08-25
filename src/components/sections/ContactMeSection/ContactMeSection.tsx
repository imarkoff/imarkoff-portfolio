import AboutMe from "@/lib/models/AboutMe";
import ContactForm from "./components/ContactForm";
import TrueFooter from "./components/TrueFooter";
import ContactIntro from "./components/ContactIntro";
import {SECTION_GRADIENT} from "./constants";
import HomePageSection from "@/features/homepage/components/HomePageSection";

interface ContactMeSectionProps {
    aboutMe: AboutMe;
}

export default function ContactMeSection(
    {aboutMe}: ContactMeSectionProps
) {
    return (
        <HomePageSection
            id={"contact"}
            slotProps={{
                root: {
                    className: "overflow-hidden",
                    style: { background: SECTION_GRADIENT }
                },
                section: {
                    className: "flex flex-col gap-12 lg:gap-20 pb-5 md:pb-9 lg:pb-12"
                }
            }}
        >
            <div className={"flex flex-col lg:flex-row gap-6 md:items-center lg:justify-between"}>
                <ContactIntro email={aboutMe.contactEmail} />
                <ContactForm />
            </div>
            <TrueFooter aboutMe={aboutMe} />
        </HomePageSection>
    );
}