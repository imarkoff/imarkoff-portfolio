import IconType from "@/components/icons/IconType";

export default function SentimentVerySatisfiedIcon(
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
            <path d="M480-260q58 0 107-28t79-76q6-12-1-24t-21-12H316q-14 0-21 12t-1 24q30 48 79.5 76T480-260ZM356-562l21 21q9 9 21 9t21-9q9-9 8.5-21t-8.5-21l-35-36q-12-12-28.5-12T327-619l-36 36q-9 9-9 21t9 21q8 8 20.5 8.5T333-540l23-22Zm248 0 23 22q9 8 21 8t21-9q9-9 9-21t-9-21l-36-36q-12-12-28.5-12T576-619l-36 36q-8 9-8 21t9 21q9 9 21 9t21-9l21-21ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
        </svg>
    );
}