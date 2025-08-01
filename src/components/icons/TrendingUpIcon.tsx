import IconType from "@/components/icons/IconType";

export default function TrendingUpIcon(
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
            <path d="M108-255q-12-12-11.5-28.5T108-311l211-214q23-23 57-23t57 23l103 104 208-206h-64q-17 0-28.5-11.5T640-667q0-17 11.5-28.5T680-707h160q17 0 28.5 11.5T880-667v160q0 17-11.5 28.5T840-467q-17 0-28.5-11.5T800-507v-64L593-364q-23 23-57 23t-57-23L376-467 164-255q-11 11-28 11t-28-11Z"/>
        </svg>
    );
}