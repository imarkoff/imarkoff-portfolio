import {vi, describe, it, expect, beforeEach} from 'vitest';
import animateLine from '../../animations/animateLine';
import {LineReferences} from "@/components/sections/ExperienceSection/components/ExperienceCard/types";
import {mockReferences} from "../mocks";
import animateLineFilling from "../../animations/animateLineFilling";
import animateLinePin from "../../animations/animateLinePin";

vi.mock('../../animations/animateLineFilling', () => ({
    default: vi.fn().mockReturnValue({ to: vi.fn() }),
}));

vi.mock('../../animations/animateLinePin', () => ({
    default: vi.fn().mockReturnValue({ to: vi.fn() }),
}));

const references: LineReferences = mockReferences.line;

describe('animateLine', () => {
    let scope: HTMLDivElement;

    beforeEach(() => {
        vi.clearAllMocks();
        scope = document.createElement('div');
    });

    it('calls animateLineFilling with correct parameters', () => {
        animateLine(scope, references, true);

        expect(animateLineFilling).toHaveBeenCalledWith(scope, references.filledLineClassName);
    });

    it('calls animateLinePin with correct parameters', () => {
        animateLine(scope, references, false);

        expect(animateLinePin).toHaveBeenCalledWith(scope, references, false);
    });

    it('returns timelines from both animations', () => {
        const result = animateLine(scope, references, true);

        expect(result.filledLineTl.to).toBeDefined();
        expect(result.pinTl.to).toBeDefined();
    });
});