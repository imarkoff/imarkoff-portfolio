import {useGSAP} from '@gsap/react';
import {renderHook} from '@testing-library/react';
import {vi, describe, beforeEach, expect, it} from 'vitest';
import {mockReferences} from "../mocks";
import animateLine from '../../animations/animateLine';
import animateSidesAppear from '../../animations/animateSidesAppear';
import useAnimateExperienceCard from '../../hooks/useAnimateExperienceCard';
import {RefObject} from "react";

vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn((callback) => {
        callback();
    }),
}));

vi.mock('../../animations/animateSidesAppear', () => ({
    default: vi.fn(),
}));

vi.mock('../../animations/animateLine', () => ({
    default: vi.fn(),
}));

const mockAnimateSidesAppear = vi.mocked(animateSidesAppear);
const mockAnimateLine = vi.mocked(animateLine);
const mockUseGSAP = vi.mocked(useGSAP);

describe('useAnimateExperienceCard', () => {
    const mockRef: RefObject<HTMLDivElement | null> = {current: null};

    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        mockRef.current = document.createElement('div');
    });

    it('calls animation functions with correct parameters when ref is valid', () => {
        const mockIsPresent = true;

        renderHook(() => useAnimateExperienceCard(mockRef, mockIsPresent, mockReferences));

        expect(mockAnimateSidesAppear).toHaveBeenCalledWith(mockRef.current, mockReferences.sides);
        expect(mockAnimateLine).toHaveBeenCalledWith(mockRef.current, mockReferences.line, mockIsPresent);
    });

    it('does not call animation functions when ref is null', () => {
        mockRef.current = null;
        const mockIsPresent = true;

        renderHook(() => useAnimateExperienceCard(mockRef, mockIsPresent, mockReferences));

        expect(mockAnimateSidesAppear).not.toHaveBeenCalled();
        expect(mockAnimateLine).not.toHaveBeenCalled();
    });

    it('passes different isPresent value to animateLine when isPresent is false', () => {
        const mockIsPresent = false;

        renderHook(() => useAnimateExperienceCard(mockRef, mockIsPresent, mockReferences));

        expect(mockAnimateLine).toHaveBeenCalledWith(mockRef.current, mockReferences.line, false);
    });

    it('configures useGSAP with correct scope option', () => {
        renderHook(() => useAnimateExperienceCard(mockRef, true, mockReferences));

        expect(mockUseGSAP).toHaveBeenCalledWith(
            expect.any(Function),
            expect.objectContaining({scope: mockRef})
        );
    });
});