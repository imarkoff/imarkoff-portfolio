import {vi, describe, beforeEach, it, expect} from "vitest";
import {renderHook} from "@testing-library/react";
import {useGSAP} from "@gsap/react";
import useAnimateIntro from "../../hooks/useAnimateIntro";
import staggerIntro from "../../animations/staggerIntro";

vi.mock("@gsap/react", () => ({
    useGSAP: vi.fn((callback) => { callback() }),
}));

vi.mock("../../animations/staggerIntro", () => ({
    default: vi.fn(),
}));

describe('useAnimateIntro', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls useGSAP once', () => {
        const cardRef = { current: null };

        renderHook(() => useAnimateIntro(cardRef));

        expect(useGSAP).toHaveBeenCalledTimes(1);
        expect(useGSAP).toHaveBeenCalledWith(
            expect.any(Function),
            { scope: cardRef }
        );
    });

    it('calls staggerIntro with the ref current value when it is a valid element', () => {
        const mockElement = document.createElement('div');
        const cardRef = { current: mockElement };

        renderHook(() => useAnimateIntro(cardRef));

        expect(staggerIntro).toHaveBeenCalledWith(mockElement);
        expect(staggerIntro).toHaveBeenCalledTimes(1);
    });

    it('does not call staggerIntro when the ref current value is null', () => {
        const cardRef = { current: null };

        renderHook(() => useAnimateIntro(cardRef));

        expect(staggerIntro).not.toHaveBeenCalled();
    });
});