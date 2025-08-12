import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import ExperienceItem from "@/lib/models/ExperienceItem";

interface ExperienceDescriptionProps {
    descriptionPoints: ExperienceItem['descriptionPoints'];
}

export default function ExperienceDescription(
    {descriptionPoints}: ExperienceDescriptionProps
) {
    return (
        <div className={clsx(
            "flex flex-col gap-2.5",
            "text-transparent bg-clip-text bg-(image:--gradient-text)",
        )}>
            <ReactMarkdown components={{
                p: ({node, ...props}) => (
                    <p className={"text-primary"} {...props} />
                ),
                strong: ({node, ...props}) => (
                    <strong className={"text-transparent"} {...props} />
                )
            }}>
                {descriptionPoints.join("\n\n")}
            </ReactMarkdown>
        </div>
    );
}