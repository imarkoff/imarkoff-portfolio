import {CSSProperties, SVGProps} from "react";

export default interface IconType extends SVGProps<SVGSVGElement> {
    /** Width and height of the icon */
    size?: number | string;
    /** Fill color of the icon */
    fill?: string;
    /** Additional CSS class names for styling */
    className?: string;
    /** Custom styles to apply to the icon */
    style?: CSSProperties;
}