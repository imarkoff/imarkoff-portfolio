import clsx from "clsx";
import Image from "next/image";
import Typography from "@/components/ui/Typography";
import Project from "@/lib/models/Project";

export default function ProjectCardImage({ heroImage }: { heroImage: Project['heroImage'] }) {
    const imageWidth = 1080;
    const imageHeight = imageWidth / heroImage.width * heroImage.height;

    return (
        <figure className={clsx(
            "relative w-full lg:col-span-8 -order-1 lg:order-1 lg:text-center",
            "flex flex-col gap-2 p-2.5 lg:p-0",
        )}>
            <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={imageWidth}
                height={imageHeight}
                quality={95}
                className={"rounded-xl lg:rounded-none"}
            />
            <Typography
                variant={"caption"}
                component={"figcaption"}
                className={clsx(
                    "lg:absolute py-1 px-2.5 right-3 bottom-3",
                    "lg:bg-on-background rounded-lg lg:backdrop-blur-md lg:text-primary lg:shadow-lg",
                    "lg:border lg:border-border-menu",
                )}
            >
                {heroImage.alt}
            </Typography>
        </figure>
    );
}