import { renderHook } from '@testing-library/react';
import {vi, describe, it, expect, beforeEach, Mock} from 'vitest';
import useShowcaseAppear from '@/features/homepage/sections/HeroSection/components/SomeShowcasesArrow/hooks/useShowcaseAppear';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

vi.mock('gsap', () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: vi.fn(() => ({
            from: vi.fn().mockReturnThis(),
            fromTo: vi.fn().mockReturnThis(),
            set: vi.fn().mockReturnThis()
        }))
    }
}));

vi.mock('gsap/SplitText', () => ({
    SplitText: vi.fn(() => ({ words: ['word1', 'word2'] }))
}));

vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn().mockImplementation((callback) => callback()),
}));

describe('useShowcaseAppear', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns three refs with initial null values', () => {
        const { result } = renderHook(() => useShowcaseAppear());

        expect(result.current.pathRef.current).toBeNull();
        expect(result.current.arrowRef.current).toBeNull();
        expect(result.current.textRef.current).toBeNull();
    });

    it('sets up useGSAP with empty dependency array', () => {
        renderHook(() => useShowcaseAppear());

        expect(useGSAP).toHaveBeenCalled();
        expect((useGSAP as Mock).mock.calls[0][1]).toEqual([]);
    });

    it('does not create timeline when refs are null', () => {
        renderHook(() => useShowcaseAppear());

        // callback to useGSAP
        (useGSAP as Mock).mock.calls[0][0]();

        expect(gsap.timeline).not.toHaveBeenCalled();
    });

    it('creates timeline when all refs are available', () => {
        const { result } = renderHook(() => useShowcaseAppear());

        // Mock refs with required values
        result.current.pathRef.current = {
            getTotalLength: vi.fn(() => 100)
        } as unknown as SVGPathElement;
        result.current.arrowRef.current = {} as SVGPathElement;
        result.current.textRef.current = {} as HTMLParagraphElement;

        // callback to useGSAP
        (useGSAP as Mock).mock.calls[0][0]();

        expect(gsap.timeline).toHaveBeenCalled();
        expect(SplitText).toHaveBeenCalledWith(result.current.textRef.current, { type: 'words' });
    });
});