import {vi, describe, beforeEach, it, expect} from "vitest";
import {renderHook} from "@testing-library/react";
import {useGSAP} from "@gsap/react";
import useAnimateForm from "../../hooks/useAnimateForm";
import staggerForm from "../../animations/staggerForm";

vi.mock("@gsap/react", () => ({
    useGSAP: vi.fn((callback) => { callback() }),
}));

vi.mock("../../animations/staggerForm", () => ({
    default: vi.fn(),
}));

describe('useAnimateForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls useGSAP once', () => {
        const cardRef = { current: null };

        renderHook(() => useAnimateForm(cardRef));

        expect(useGSAP).toHaveBeenCalledTimes(1);
        expect(useGSAP).toHaveBeenCalledWith(
            expect.any(Function),
            { scope: cardRef }
        );
    });

    it('calls staggerForm with the ref current value when it is a valid element', () => {
        const mockElement = document.createElement('div');
        const cardRef = { current: mockElement };

        renderHook(() => useAnimateForm(cardRef));

        expect(staggerForm).toHaveBeenCalledWith(mockElement);
        expect(staggerForm).toHaveBeenCalledTimes(1);
    });

    it('does not call staggerForm when the ref current value is null', () => {
        const cardRef = { current: null };

        renderHook(() => useAnimateForm(cardRef));

        expect(staggerForm).not.toHaveBeenCalled();
    });
});