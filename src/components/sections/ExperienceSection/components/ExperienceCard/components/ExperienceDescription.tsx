import ReactMarkdown from "react-markdown";
import ExperienceItem from "@/lib/models/ExperienceItem";

interface ExperienceDescriptionProps {
    descriptionPoints: ExperienceItem['descriptionPoints'];
}

export default function ExperienceDescription(
    {descriptionPoints}: ExperienceDescriptionProps
) {
    return (
        <div
            data-testid="experience-description"
            className={"flex flex-col gap-2.5 text-gradient"}
        >
            <ReactMarkdown components={{
                p: ({node, ...props}) => (
                    <p
                        className={"text-primary"}
                        data-testid={"experience-description-paragraph"}
                        {...props}
                    />
                ),
                strong: ({node, ...props}) => (
                    <strong
                        className={"text-transparent"}
                        data-testid={"experience-description-strong"}
                        {...props}
                    />
                )
            }}>
                {descriptionPoints.join("\n\n")}
            </ReactMarkdown>
        </div>
    );
}