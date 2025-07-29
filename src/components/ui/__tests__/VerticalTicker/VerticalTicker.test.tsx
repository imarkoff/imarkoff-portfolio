import React from "react";
import { render } from '@testing-library/react';
import {Mock, vi, describe, beforeEach, afterEach, it, expect} from 'vitest';
import VerticalTicker from '../../VerticalTicker/VerticalTicker';
import useDuplicatesCounter from '../../VerticalTicker/hooks/useDuplicatesCounter';
import useVerticalTickerAnimation from '../../VerticalTicker/hooks/useVerticalTickerAnimation';

// Mock the custom hooks
vi.mock('../../VerticalTicker/hooks/useDuplicatesCounter', () => ({
    default: vi.fn()
}));
vi.mock('../../VerticalTicker/hooks/useVerticalTickerAnimation', () => ({
    default: vi.fn()
}));

describe('VerticalTicker', () => {
    beforeEach(() => {
        // Default mock implementation
        (useDuplicatesCounter as Mock).mockReturnValue(2);
        (useVerticalTickerAnimation as Mock).mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component with children', () => {
        const { getAllByTestId } = render(
            <VerticalTicker spacing={10} direction="up" speed={1}>
                <div data-testid="child-content">Test Content</div>
            </VerticalTicker>
        );

        expect(getAllByTestId('child-content')).toHaveLength(3); // Original + 2 duplicates
    });

    it('passes correct props to hooks', () => {
        const props = {
            spacing: 15,
            direction: 'down' as const,
            speed: 0.5,
            startDelay: 2
        };

        render(
            <VerticalTicker {...props}>
                <div>Content</div>
            </VerticalTicker>
        );

        expect(useDuplicatesCounter).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            props.spacing
        );

        expect(useVerticalTickerAnimation).toHaveBeenCalledWith(
            { tickerStripRef: expect.any(Object), contentRef: expect.any(Object) },
            { spacing: props.spacing, direction: props.direction, speed: props.speed, startDelay: props.startDelay }
        );
    });

    it('uses default startDelay when not provided', () => {
        render(
            <VerticalTicker spacing={10} direction="up" speed={1}>
                <div>Content</div>
            </VerticalTicker>
        );

        expect(useVerticalTickerAnimation).toHaveBeenCalledWith(
            expect.any(Object),
            expect.objectContaining({ startDelay: 0 })
        );
    });

    it('creates correct number of duplicated elements', () => {
        (useDuplicatesCounter as Mock).mockReturnValue(3);

        const { getAllByText } = render(
            <VerticalTicker spacing={10} direction="up" speed={1}>
                <div>Unique Text</div>
            </VerticalTicker>
        );

        // Original + 3 duplicates = 4 instances
        expect(getAllByText('Unique Text')).toHaveLength(4);
    });

    it('applies correct spacing styles', () => {
        const spacing = 25;

        const { container } = render(
            <VerticalTicker spacing={spacing} direction="up" speed={1}>
                <div>Item</div>
            </VerticalTicker>
        );

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer.style.gap).toBe(`${spacing}px`);

        const contentContainer = mainContainer.firstChild as HTMLElement;
        expect(contentContainer.style.gap).toBe(`${spacing}px`);
    });

    it('applies correct CSS classes', () => {
        const { container } = render(
            <VerticalTicker spacing={10} direction="up" speed={1}>
                <div>Item</div>
            </VerticalTicker>
        );

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer.className).toContain('flex');
        expect(mainContainer.className).toContain('flex-col');

        const contentContainer = mainContainer.firstChild as HTMLElement;
        expect(contentContainer.className).toContain('flex');
        expect(contentContainer.className).toContain('flex-col');
    });
});