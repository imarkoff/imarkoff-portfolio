import {vi, describe, beforeEach, it, expect} from "vitest";
import {renderHook} from "@testing-library/react";
import {useGSAP} from "@gsap/react";
import useAnimateTrueFooter from "../../hooks/useAnimateTrueFooter";
import animateTrueFooter from "../../animations/animateTrueFooter";

vi.mock("@gsap/react", () => ({
    useGSAP: vi.fn((callback) => { callback() }),
}));

vi.mock("../../animations/animateTrueFooter", () => ({
    default: vi.fn(),
}));

describe('useAnimateTrueFooter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls useGSAP once', () => {
        const cardRef = { current: null };

        renderHook(() => useAnimateTrueFooter(cardRef));

        expect(useGSAP).toHaveBeenCalledTimes(1);
        expect(useGSAP).toHaveBeenCalledWith(
            expect.any(Function),
            { scope: cardRef }
        );
    });

    it('calls animateTrueFooter with the ref current value when it is a valid element', () => {
        const mockElement = document.createElement('div');
        const cardRef = { current: mockElement };

        renderHook(() => useAnimateTrueFooter(cardRef));

        expect(animateTrueFooter).toHaveBeenCalledWith(mockElement);
        expect(animateTrueFooter).toHaveBeenCalledTimes(1);
    });

    it('does not call animateTrueFooter when the ref current value is null', () => {
        const cardRef = { current: null };

        renderHook(() => useAnimateTrueFooter(cardRef));

        expect(animateTrueFooter).not.toHaveBeenCalled();
    });
});