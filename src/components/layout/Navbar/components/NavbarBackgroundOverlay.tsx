import GradientBlur from "@/components/ui/GradientBlur";
import dottedBackground from "@/utils/dottedBackground";

export default function NavbarBackgroundOverlay() {
    return (
        <>
            <GradientBlur direction={"top-to-bottom"}/>
            <div className={"absolute inset-0"} style={{
                ...dottedBackground("rgba(255, 255, 255, 0.03)", "1px", "10px"),
                maskImage: "linear-gradient(180deg, black 0%, rgba(0, 0, 0, .6) 50%, transparent 100%)",
            }}/>
        </>
    );
}
