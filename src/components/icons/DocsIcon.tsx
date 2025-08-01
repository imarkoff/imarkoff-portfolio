import IconType from "@/components/icons/IconType";

export default function DocsIcon(
    { size = "24px", fill = "currentColor", ...props }: IconType
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 -960 960 960"
            fill={fill}
            {...props}
        >
            <path
                d="M360-440h240q17 0 28.5-11.5T640-480q0-17-11.5-28.5T600-520H360q-17 0-28.5 11.5T320-480q0 17 11.5 28.5T360-440Zm0 120h240q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400H360q-17 0-28.5 11.5T320-360q0 17 11.5 28.5T360-320Zm0 120h120q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280H360q-17 0-28.5 11.5T320-240q0 17 11.5 28.5T360-200ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm480-520H580q-25 0-42.5-17.5T520-660v-140H240v640h480v-440ZM240-800v200-200 640-640Z"/>
        </svg>
    );
}