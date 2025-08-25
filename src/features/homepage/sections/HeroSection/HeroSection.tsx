import AboutMe from "@/lib/models/AboutMe";
import DownArrow from "@/features/homepage/sections/HeroSection/components/DownArrow";
import ShowcaseCarousel from "@/features/homepage/sections/HeroSection/components/ShowcaseCarousel/ShowcaseCarousel";
import GradientBlur from "@/components/ui/GradientBlur";
import SomeShowcasesArrow from "@/features/homepage/sections/HeroSection/components/SomeShowcasesArrow/SomeShowcasesArrow";
import HeroBackground from "@/features/homepage/sections/HeroSection/components/HeroBackground";
import HeroCenterContent from "./components/HeroCenterContent";
import ShowcaseImage from "@/lib/models/ShowcaseImage";
import HomePageSection from "@/features/homepage/components/HomePageSection";

export default function HeroSection(
    {aboutMe, showcases}: { aboutMe: AboutMe, showcases: Array<ShowcaseImage[]> }
) {
    return (
        <HomePageSection
            id={"home"}
            slotProps={{
                root: {
                    className: "flex-grow h-screen border-none relative overflow-hidden",
                    style: {
                        boxShadow: "0px 12px 100px 0px rgba(67, 7, 38, 0.25)"
                    }
                },
                section: {
                    className: "flex gap-6",
                    "data-animate-appear": true,
                }
            }}
        >
            <HeroBackground />
            <div className={"flex-grow flex flex-col gap-6"}>
                <div className={"flex-1"} />
                <HeroCenterContent aboutMe={aboutMe} />
                <div className={"flex-1 flex items-center justify-center md:justify-start z-10"}>
                    <DownArrow />
                </div>
            </div>

            <div className={"absolute -top-full bottom-0 right-0 translate-x-1/4 translate-y-1/3 flex items-center justify-center opacity-35 lg:opacity-100"}>
                <SomeShowcasesArrow />
                <ShowcaseCarousel showcases={showcases} />
            </div>
            <div className={"absolute inset-x-0 bottom-0 z-1 w-full h-[15px]"}>
                <GradientBlur direction={"bottom-to-top"} layers={[
                    {blurAmount: 32, maskStart: 0, maskEnd: 30},
                    {blurAmount: 2, maskStart: 0, maskEnd: 100},
                    {blurAmount: 1, maskStart: 70, maskEnd: 100}
                ]} />
            </div>
        </HomePageSection>
    );
}