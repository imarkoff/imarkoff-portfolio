import {ByTheNumbers} from "@/lib/models/AboutMe";
import Typography from "@/components/ui/Typography";
import Card from "@/components/ui/Card";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import TypographyIcon from "@/components/ui/TypographyIcon";
import IconMap, {IconName} from "@/components/icons/IconMap";
import NumberIncrement from "@/components/ui/NumberIncrement";

export interface ByTheNumbersCardProps {
    byTheNumbers: ByTheNumbers[];
    id?: string;
    headingId?: string;
}

export default function ByTheNumbersCard(
    {byTheNumbers, id, headingId}: ByTheNumbersCardProps) {
    return (
        <div id={id}>
            <Typography variant={"h3"} component={"h3"} className={"mb-2.5"} id={headingId}>
                By the numbers:
            </Typography>
            <Card className={"p-card-sm lg:p-card flex flex-col gap-4"}>
                {byTheNumbers.map((item, i) => (
                    <ByTheNumbersItem key={i} item={item} />
                ))}
            </Card>
        </div>
    );
}

const ByTheNumbersItem = ({item}: { item: ByTheNumbers }) => {
    const Icon = IconMap[item.iconName as IconName];

    return (
        <div className={"flex gap-2.5 items-center"}>
            {Icon && (
                <>
                    <TypographyIcon Icon={Icon} variant={"h1"} className={"text-secondary"} />
                    <div className={"w-2.5 h-0.5 bg-tertiary"} />
                </>
            )}
            <p className={clsx(
                "leading-none text-transparent bg-clip-text bg-(image:--gradient-text)",
                "text-h2-sm md:text-h2-md lg:text-h1-lg font-bold"
            )}>
                <Typography component={"span"} className={"text-h2-sm md:text-h2-md lg:text-h1-lg !font-extrabold"}>
                    <strong>
                        <NumberIncrement initialValue={0} finalValue={item.value} duration={1.5} />
                    </strong>
                    <strong>
                        {item.valueSuffix}
                    </strong>
                </Typography>
                &nbsp;
                <ReactMarkdown components={{
                    p: ({node, ...props}) => (
                        <span
                            className={"text-secondary text-h3-sm md:text-h3-md lg:text-h2-lg font-semibold"}
                            {...props}
                        />
                    ),
                    strong: ({node, ...props}) => (
                        <strong
                            className={"text-transparent text-h2-sm md:text-h2-md lg:text-h1-lg font-extrabold"}
                            {...props}
                        />
                    )
                }}>
                    {item.label}
                </ReactMarkdown>
            </p>
        </div>
    );
}