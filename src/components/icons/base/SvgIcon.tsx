import IconProps from "../types/IconProps";

export default function SvgIcon(
    {children, size = "24px", fill = "currentColor", ...props}: IconProps
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill={fill}
            {...props}
        >
            {children}
        </svg>
    );
}