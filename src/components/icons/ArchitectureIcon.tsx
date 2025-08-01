import IconType from "@/components/icons/IconType";

export default function ArchitectureIcon(
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
            <path d="M444-484 336-186q-1 3-5 7l-32 31q-9 9-20.5 4.5T265-160l-4-43 1-9 112-310q15 14 32.5 23.5T444-484Zm36-36q-50 0-85-35t-35-85q0-39 22.5-69.5T440-752v-48q0-17 11.5-28.5T480-840q17 0 28.5 11.5T520-800v48q35 12 57.5 42.5T600-640q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm36 116q20-5 37.5-14.5T586-522l112 310q1 3 1 9l-4 43q-2 12-13.5 16.5T661-148l-32-31-5-7-108-298Z"/>
        </svg>
    );
}