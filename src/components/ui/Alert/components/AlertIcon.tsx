import IconType from "@/components/icons/IconType";
import {ComponentType} from "react";
import iconMap from "@/components/icons/IconMap";
import {DEFAULT_ICONS} from "@/components/ui/Alert/constants";
import {AlertType} from "@/components/ui/Alert/types";

export interface AlertIconProps {
    type?: AlertType;
    Icon?: ComponentType<IconType> | false;
}

export default function AlertIcon(
    { type, Icon }: AlertIconProps
) {
    if (Icon === false) return null;

    const IconToRender = Icon || (type ? iconMap[DEFAULT_ICONS[type]] : null);

    return IconToRender && (
        <div className={"icon-wrapper"}>
            <IconToRender className="icon" />
        </div>
    );
}