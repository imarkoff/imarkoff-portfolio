import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import ExperienceLine from '../../components/ExperienceLine';
import { mockReferences } from '../mocks';
import {LineReferences} from "../../types";

describe('ExperienceLine', () => {
    const references: LineReferences = mockReferences.line;

    it('renders all line components correctly', () => {
        const { getByTestId } = render(
            <ExperienceLine
                references={references}
                index={{ current: 1, total: 3 }}
            />
        );
        const elements = {
            container: getByTestId('experience-line-container'),
            pin: getByTestId('experience-line-pin'),
            pinChild: getByTestId('experience-line-pin-child'),
            line: getByTestId('experience-line'),
            dashedLine: getByTestId('experience-line-dashed'),
            filledLine: getByTestId('experience-line-filled')
        };

        expect(elements.container).toBeInTheDocument();
        expect(elements.line).toBeInTheDocument();
        expect(elements.pin).toBeInTheDocument();
        expect(elements.pinChild).toBeInTheDocument();
        expect(elements.dashedLine).toBeInTheDocument();
        expect(elements.filledLine).toBeInTheDocument();
    });

    it('applies mask-t-from-80% class when index is first item', () => {
        const { getByTestId } = render(
            <ExperienceLine
                references={references}
                index={{ current: 0, total: 3 }}
            />
        );
        const mainDiv = getByTestId('experience-line');

        expect(mainDiv).toHaveClass('mask-t-from-80%');
        expect(mainDiv).not.toHaveClass('mask-b-from-80%');
    });

    it('applies mask-b-from-80% class when index is last item', () => {
        const { getByTestId } = render(
            <ExperienceLine
                references={references}
                index={{ current: 2, total: 3 }}
            />
        );
        const mainDiv = getByTestId('experience-line');

        expect(mainDiv).not.toHaveClass('mask-t-from-80%');
        expect(mainDiv).toHaveClass('mask-b-from-80%');
    });

    it('applies no mask classes when index is middle item', () => {
        const { getByTestId } = render(
            <ExperienceLine
                references={references}
                index={{ current: 1, total: 3 }}
            />
        );
        const mainDiv = getByTestId('experience-line');

        expect(mainDiv).not.toHaveClass('mask-t-from-80%');
        expect(mainDiv).not.toHaveClass('mask-b-from-80%');
    });

    it('applies masks from tob and bottom correctly when only one item', () => {
        const { getByTestId } = render(
            <ExperienceLine
                references={references}
                index={{ current: 0, total: 1 }}
            />
        );
        const mainDiv = getByTestId('experience-line');

        expect(mainDiv).toHaveClass('mask-t-from-80%');
        expect(mainDiv).toHaveClass('mask-b-from-80%');
    });

    it('passes className references to child components correctly', () => {
        const { getByTestId } = render(
            <ExperienceLine
                references={references}
                index={{ current: 1, total: 3 }}
            />
        );
        const elements = {
            pin: getByTestId('experience-line-pin'),
            pinChild: getByTestId('experience-line-pin-child'),
            filledLine: getByTestId('experience-line-filled')
        };

        expect(elements.pin).toHaveClass(references.pinClassName);
        expect(elements.pinChild).toHaveClass(references.pinChildClassName);
        expect(elements.filledLine).toHaveClass(references.filledLineClassName);
    });
});