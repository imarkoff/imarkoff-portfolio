import {RefObject} from "react";
import {renderHook} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import useVerticalTickerAnimation, {AnimationParams} from '../../hooks/useVerticalTickerAnimation';
import {calculateTickerAnimation} from '../../utils/tickerCalculations';
import TickerStopper from '../../utils/TickerStopper';
// @ts-expect-error 2614
import {mockGsap, mockTimeline} from 'gsap';

vi.mock('gsap', () => {
    const mockTimeline = {
        to: vi.fn().mockReturnThis(),
        kill: vi.fn(),
    };
    const mockGsap = {
        set: vi.fn(),
        timeline: vi.fn().mockReturnValue(mockTimeline),
        registerPlugin: vi.fn(),
    };
    return {
        default: mockGsap,
        mockGsap: mockGsap,
        mockTimeline: mockTimeline,
    };
});

vi.mock('../../../VerticalTicker/utils/tickerCalculations', () => ({
    calculateTickerAnimation: vi.fn().mockReturnValue({
        yPosition: {start: 0, end: -100},
        duration: 2
    })
}));

vi.mock('../../../VerticalTicker/utils/TickerStopper', () => ({
    default: vi.fn().mockImplementation(() => ({
        destroy: vi.fn()
    }))
}));

describe('useVerticalTickerAnimation', () => {
    let tickerStripRef: RefObject<HTMLDivElement | null>;
    let contentRef: RefObject<HTMLDivElement | null>;
    let animationParams: AnimationParams;

    beforeEach(() => {
        vi.clearAllMocks();

        const mockTickerStrip = document.createElement('div');
        const mockContent = document.createElement('div');
        Object.defineProperty(mockContent, 'offsetHeight', {value: 200});

        tickerStripRef = {current: mockTickerStrip};
        contentRef = {current: mockContent};

        animationParams = {
            spacing: 20,
            direction: 'up',
            speed: 1,
            startDelay: 0.5
        };
    });

    it('creates animation with correct parameters', () => {
        renderHook(() => useVerticalTickerAnimation(
            {tickerStripRef, contentRef},
            animationParams
        ));

        expect(calculateTickerAnimation).toHaveBeenCalledWith(
            200, 20, 'up', 1
        );

        expect(mockGsap.set).toHaveBeenCalledWith(tickerStripRef.current, {y: 0});

        expect(mockGsap.timeline).toHaveBeenCalledWith({
            repeat: -1,
            defaults: {ease: "none"},
            delay: 0.5,
            paused: false
        });

        expect(mockTimeline.to).toHaveBeenCalledWith(
            tickerStripRef.current,
            {
                y: -100,
                duration: 2
            }
        );

        expect(TickerStopper).toHaveBeenCalledWith(tickerStripRef.current, mockTimeline);
    });

    it('does not create animation when refs are null', () => {
        renderHook(() => useVerticalTickerAnimation(
            {tickerStripRef: {current: null}, contentRef},
            animationParams
        ));

        expect(mockGsap.set).not.toHaveBeenCalled();
        expect(mockGsap.timeline).not.toHaveBeenCalled();
        expect(TickerStopper).not.toHaveBeenCalled();
    });

    it('updates animation when dependencies change', () => {
        const {rerender} = renderHook(
            (props) => useVerticalTickerAnimation(
                {tickerStripRef, contentRef},
                props
            ),
            {initialProps: animationParams}
        );

        vi.clearAllMocks();

        const newParams: AnimationParams = {
            ...animationParams,
            direction: 'down',
            speed: 2
        };

        rerender(
            newParams
        );

        expect(calculateTickerAnimation).toHaveBeenCalledWith(
            200, 20, 'down', 2
        );
    });

    it('cleans up animation and stopper on unmount', () => {
        const {unmount} = renderHook(() => useVerticalTickerAnimation(
            {tickerStripRef, contentRef},
            animationParams
        ));

        unmount();

        expect(mockTimeline.kill).toHaveBeenCalled();
        expect(vi.mocked(TickerStopper).mock.results[0].value.destroy).toHaveBeenCalled();
    });

    it('handles different animation direction', () => {
        renderHook(() => useVerticalTickerAnimation(
            {tickerStripRef, contentRef},
            {...animationParams, direction: 'down'}
        ));

        expect(calculateTickerAnimation).toHaveBeenCalledWith(
            200, 20, 'down', 1
        );
    });

    it('applies correct start delay', () => {
        renderHook(() => useVerticalTickerAnimation(
            {tickerStripRef, contentRef},
            {...animationParams, startDelay: 2.5}
        ));

        expect(mockGsap.timeline).toHaveBeenCalledWith(
            expect.objectContaining({delay: 2.5})
        );
    });
});