export type ExperienceCardIndex = {
    current: number;
    total: number;
}

export type ExperienceCardReferences = {
    leftSideClassName: string;
    rightSideClassName: string;
    line: LineReferences;
}

export type LineReferences = {
    filledLineClassName: string;
    pinClassName: string;
}