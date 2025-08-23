import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useDuplicatesCounter from '../../hooks/useDuplicatesCounter';

describe('useDuplicatesCounter', () => {
    let contentRef: { current: HTMLDivElement | null };
    let tickerStripRef: { current: HTMLDivElement | null };
    let spacing: number;

    beforeEach(() => {
        const mockContent = document.createElement('div');
        Object.defineProperty(mockContent, 'offsetHeight', { value: 100 });

        const mockParent = document.createElement('div');
        Object.defineProperty(mockParent, 'offsetHeight', { value: 300 });

        const mockTickerStrip = document.createElement('div');
        Object.defineProperty(mockTickerStrip, 'parentElement', { value: mockParent });

        contentRef = { current: mockContent };
        tickerStripRef = { current: mockTickerStrip };
        spacing = 10;
    });

    it('calculates correct number of duplicates based on container and content heights', () => {
        const { result } = renderHook(() => useDuplicatesCounter(contentRef, tickerStripRef, spacing));

        // Container height: 300, Content height: 100, Spacing: 10
        // Required duplicates = Math.ceil(300 / (100 + 10)) = Math.ceil(300 / 110) = Math.ceil(2.73) = 3
        expect(result.current).toBe(3);
    });

    it('returns default value when refs are null', () => {
        contentRef.current = null;

        const { result } = renderHook(() => useDuplicatesCounter(contentRef, tickerStripRef, spacing));
        expect(result.current).toBe(1);
    });

    it('handles zero container height', () => {
        const mockParent = document.createElement('div');
        Object.defineProperty(mockParent, 'offsetHeight', { value: 0 });

        const mockTickerStrip = document.createElement('div');
        Object.defineProperty(mockTickerStrip, 'parentElement', { value: mockParent });

        tickerStripRef.current = mockTickerStrip;

        const { result } = renderHook(() => useDuplicatesCounter(contentRef, tickerStripRef, spacing));
        expect(result.current).toBe(0);
    });

    it('handles zero content height', () => {
        const mockContent = document.createElement('div');
        Object.defineProperty(mockContent, 'offsetHeight', { value: 0 });

        contentRef.current = mockContent;

        const { result } = renderHook(() => useDuplicatesCounter(contentRef, tickerStripRef, spacing));
        expect(result.current).toBe(30); // 300 / (0 + 10) = 30
    });

    it('handles zero spacing', () => {
        const { result } = renderHook(() => useDuplicatesCounter(contentRef, tickerStripRef, 0));

        // Container height: 300, Content height: 100, Spacing: 0
        // Required duplicates = Math.ceil(300 / (100 + 0)) = Math.ceil(300 / 100) = 3
        expect(result.current).toBe(3);
    });

    it('handles missing parentElement', () => {
        const mockTickerStrip = document.createElement('div');
        Object.defineProperty(mockTickerStrip, 'parentElement', { value: null });

        tickerStripRef.current = mockTickerStrip;

        const { result } = renderHook(() => useDuplicatesCounter(contentRef, tickerStripRef, spacing));
        expect(result.current).toBe(0);
    });

    it('recalculates when dependencies change', () => {
        const { result, rerender } = renderHook(
            (props) => useDuplicatesCounter(props.contentRef, props.tickerStripRef, props.spacing),
            {
                initialProps: {
                    contentRef,
                    tickerStripRef,
                    spacing
                }
            }
        );

        expect(result.current).toBe(3);

        const newMockContent = document.createElement('div');
        Object.defineProperty(newMockContent, 'offsetHeight', { value: 50 });
        const newContentRef = { current: newMockContent };

        rerender({
            contentRef: newContentRef,
            tickerStripRef,
            spacing
        });

        // Container height: 300, Content height: 50, Spacing: 10
        // Required duplicates = Math.ceil(300 / (50 + 10)) = Math.ceil(300 / 60) = 5
        expect(result.current).toBe(5);
    });
});