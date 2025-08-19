import Section from "@/components/ui/Section";
import AboutMe from "@/lib/models/AboutMe";
import ContactForm from "./components/ContactForm";
import TrueFooter from "./components/TrueFooter";
import ContactIntro from "./components/ContactIntro";

interface ContactMeSectionProps {
    aboutMe: AboutMe;
}

export default function ContactMeSection(
    {aboutMe}: ContactMeSectionProps
) {
    return (
        <Section
            slotProps={{
                root: {
                    style: {
                        background: "radial-gradient(70% 91% at -3% 93%, #A92CDD38 1%, #FF000000 99%),radial-gradient(90% 91% at 102% 36%, #DD2CA812 1%, #FF000000 99%)"
                    }
                },
                section: {
                    className: "flex flex-col gap-12 lg:gap-20 pb-5 md:pb-9 lg:pb-12"
                }
            }}
        >
            <div className={"flex flex-col lg:flex-row gap-6 lg:items-center"}>
                <ContactIntro email={aboutMe.contactEmail} />
                <div className={"flex-1"}>
                    <ContactForm />
                </div>
            </div>
            <TrueFooter aboutMe={aboutMe} />
        </Section>
    );
}