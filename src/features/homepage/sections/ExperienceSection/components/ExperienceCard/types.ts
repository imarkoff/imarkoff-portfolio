export type ExperienceCardIndex = {
    current: number;
    total: number;
}

export type ExperienceCardReferences = {
    sides: SideReferences;
    line: LineReferences;
}

export type SideReferences = {
    leftSideClassName: string;
    rightSideClassName: string;
}

export type LineReferences = {
    filledLineClassName: string;
    pinClassName: string;
    pinChildClassName: string;
}