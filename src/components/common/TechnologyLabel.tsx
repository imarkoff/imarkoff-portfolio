import Technology from "@/lib/models/Technology";
import Image from "next/image";
import Label, {LabelProps} from "@/components/ui/Label";
import clsx from "clsx";

export interface TechnologyLabelProps extends Omit<LabelProps, "icon" | "children"> {
    /** The technology object containing the name and optional icon URL. */
    technology: Technology;
}

/**
 * Component to display a technology label with an optional icon.
 * It uses the Label component to render the technology name and icon.
 * The icon is displayed if the technology has an icon URL.
 */
export default function TechnologyLabel(
    { technology, className, ...props }: TechnologyLabelProps
) {
    return (
        <Label
            icon={
                technology.iconUrl ? <Image
                    src={technology.iconUrl}
                    alt={technology.name}
                    width={20}
                    height={20}
                    className={"rounded-sm size-[20px]"}
                /> : undefined
            }
            className={clsx("text-nowrap min-w-fit", className)}
            {...props}
        >
            {technology.name}
        </Label>
    );
}