import IconType from "@/components/icons/IconType";

export default function WebIcon(
    {size, fill, ...props}: IconType
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size ?? "24px"}
            viewBox="0 -960 960 960"
            width={size ?? "24px"}
            fill={fill ?? "currentColor"}
            {...props}
        >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h420v-140H160v140Zm500 0h140v-360H660v360ZM160-460h420v-140H160v140Z"/>
        </svg>
    );
}