import { describe, it, expect } from 'vitest';
import {
    calculateAnimationDistance,
    calculateYPosition,
    calculateDuration,
    calculateTickerAnimation
} from '../../../VerticalTicker/utils/tickerCalculations';

describe('calculateAnimationDistance', () => {
    it('adds content height and spacing correctly', () => {
        expect(calculateAnimationDistance(100, 20)).toBe(120);
    });

    it('handles zero spacing', () => {
        expect(calculateAnimationDistance(100, 0)).toBe(100);
    });

    it('handles zero content height', () => {
        expect(calculateAnimationDistance(0, 20)).toBe(20);
    });

    it('handles negative values', () => {
        expect(calculateAnimationDistance(100, -10)).toBe(90);
    });
});

describe('calculateYPosition', () => {
    it('returns correct positions for "up" direction', () => {
        const result = calculateYPosition(200, 'up');
        expect(result).toEqual({ start: 0, end: -200 });
    });

    it('returns correct positions for "down" direction', () => {
        const result = calculateYPosition(200, 'down');
        expect(result).toEqual({ start: -200, end: 0 });
    });

    it('handles zero animation distance', () => {
        const resultUp = calculateYPosition(0, 'up');
        const resultDown = calculateYPosition(0, 'down');

        expect(resultUp).toEqual({ start: 0, end: -0 });
        expect(resultDown).toEqual({ start: -0, end: 0 });
    });
});

describe('calculateDuration', () => {
    it('calculates duration correctly', () => {
        expect(calculateDuration(100, 1)).toBe(2); // 100 / (1 * 50)
    });

    it('handles higher speeds', () => {
        expect(calculateDuration(100, 2)).toBe(1); // 100 / (2 * 50)
    });

    it('handles lower speeds', () => {
        expect(calculateDuration(100, 0.5)).toBe(4); // 100 / (0.5 * 50)
    });

    it('handles zero animation distance', () => {
        expect(calculateDuration(0, 1)).toBe(0);
    });

    it('handles very small speeds', () => {
        expect(calculateDuration(100, 0.01)).toBe(200); // 100 / (0.01 * 50)
    });
});

describe('calculateTickerAnimation', () => {
    it('returns correct values for "up" direction', () => {
        const result = calculateTickerAnimation(100, 20, 'up', 1);

        expect(result.yPosition).toEqual({ start: 0, end: -120 });
        expect(result.duration).toBe(2.4); // 120 / (1 * 50)
    });

    it('returns correct values for "down" direction', () => {
        const result = calculateTickerAnimation(100, 20, 'down', 1);

        expect(result.yPosition).toEqual({ start: -120, end: 0 });
        expect(result.duration).toBe(2.4); // 120 / (1 * 50)
    });

    it('calculates correctly with zero spacing', () => {
        const result = calculateTickerAnimation(100, 0, 'up', 1);

        expect(result.yPosition).toEqual({ start: 0, end: -100 });
        expect(result.duration).toBe(2); // 100 / (1 * 50)
    });

    it('calculates correctly with different speed values', () => {
        const result = calculateTickerAnimation(100, 20, 'up', 2);

        expect(result.duration).toBe(1.2); // 120 / (2 * 50)
    });
});