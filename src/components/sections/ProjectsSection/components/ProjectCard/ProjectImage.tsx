import Image from "next/image";
import Typography from "@/components/ui/Typography";
import Project from "@/lib/models/Project";

export default function ProjectImage({ heroImage }: { heroImage: Project['heroImage'] }) {
    const imageWidth = 828;
    const imageHeight = imageWidth / heroImage.width * heroImage.height;

    return (
        <figure className={"lg:col-span-7 w-full lg:text-center flex flex-col gap-2"}>
            <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={imageWidth}
                height={imageHeight}
                quality={95}
                className={"rounded-xl"}
            />
            <Typography variant={"caption"} component={"figcaption"}>
                {heroImage.alt}
            </Typography>
        </figure>
    );
}