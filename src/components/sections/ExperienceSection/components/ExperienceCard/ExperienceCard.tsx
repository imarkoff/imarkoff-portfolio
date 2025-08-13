import dayjs from "dayjs";
import ExperienceItem from "@/lib/models/ExperienceItem";
import {ExperienceCardIndex} from "./types";
import {REFERENCES} from "./constants";
import ExperienceTitle from "./components/ExperienceTitle";
import ExperienceLine from "./components/ExperienceLine";
import ExperienceDescription from "./components/ExperienceDescription";
import ExperienceCardWrapper from "./components/ExperienceCardWrapper";

export interface ExperienceCardProps {
    experience: ExperienceItem;
    index: ExperienceCardIndex;
}

export default function ExperienceCard(
    {experience, index}: ExperienceCardProps
) {
    const isPresent = experience.endDate === null || dayjs(experience.endDate).isAfter(dayjs());

    return (
        <ExperienceCardWrapper references={REFERENCES} isPresent={isPresent}>
            <div className={`flex-1 hidden lg:block ${REFERENCES.sides.leftSideClassName}`}>
                <ExperienceTitle experience={experience} />
            </div>
            <ExperienceLine references={REFERENCES.line} index={index} />
            <div className={`flex-1 pb-6 lg:py-12 flex flex-col gap-2.5 ${REFERENCES.sides.rightSideClassName}`}>
                <div className={"lg:hidden"} data-testid="experience-title-mobile">
                    <ExperienceTitle experience={experience} />
                </div>
                <ExperienceDescription descriptionPoints={experience.descriptionPoints} />
            </div>
        </ExperienceCardWrapper>
    );
}

