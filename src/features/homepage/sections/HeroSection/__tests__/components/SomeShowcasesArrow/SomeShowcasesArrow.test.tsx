import { render, screen } from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from "vitest";
import "@testing-library/jest-dom/vitest";
import SomeShowcasesArrow from "../../../components/SomeShowcasesArrow/SomeShowcasesArrow";
import useShowcaseAppear from "../../../components/SomeShowcasesArrow/hooks/useShowcaseAppear";
import ArrowSVG from "../../../components/SomeShowcasesArrow/components/ArrowSVG";
import {Typography} from "@/components/ui/Typography";

vi.mock("../../../components/SomeShowcasesArrow/hooks/useShowcaseAppear", () => ({
    default: vi.fn(() => ({
        pathRef: { current: null },
        arrowRef: { current: null },
        textRef: { current: null },
    }))
}));

vi.mock("../../../components/SomeShowcasesArrow/components/ArrowSVG", () => ({
    default: vi.fn(props => <div data-testid="arrow-svg" {...props} />)
}));

vi.mock("@/components/ui/Typography", () => ({
    Typography: vi.fn(({ children, ...props }) => <div data-testid={"text"} {...props}>{children}</div>)
}));

const useShowcaseAppearMock = vi.mocked(useShowcaseAppear);

describe("SomeShowcasesArrow Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it("renders showcases text content", () => {
        render(<SomeShowcasesArrow />);

        expect(screen.getByText(/some of my/i)).toBeInTheDocument();
        expect(screen.getByText(/showcases/i)).toBeInTheDocument();
    });

    it("initializes animation hooks", () => {
        render(<SomeShowcasesArrow />);

        expect(useShowcaseAppear).toHaveBeenCalledOnce();
    });

    it("passes animation refs to ArrowSVG component", () => {
        render(<SomeShowcasesArrow />);
        const { pathRef, arrowRef } = useShowcaseAppear();

        expect(ArrowSVG).toHaveBeenCalledWith(
            expect.objectContaining({
                pathRef, arrowRef,
            }),
            undefined
        );
    });

    it("passes animation refs to Typography component", () => {
        const textRef = { current: null };
        useShowcaseAppearMock.mockReturnValue({
            pathRef: { current: null },
            arrowRef: { current: null },
            textRef,
        })

        render(<SomeShowcasesArrow />);

        expect(Typography).toHaveBeenCalledWith(
            expect.objectContaining({
                ref: textRef,
            }),
            undefined
        );
    })

    it("has responsive positioning classes for mobile and desktop", () => {
        render(<SomeShowcasesArrow />);
        const mainElement = screen.getByText(/some of my/i).closest('div.absolute');

        expect(mainElement).toHaveClass('-left-[50px]');
        expect(mainElement).toHaveClass('lg:-left-[150px]');
    });

    it("applies responsive scaling to arrow container", () => {
        render(<SomeShowcasesArrow />);
        const arrowContainer = screen.getByTestId("arrow-svg-container");

        expect(arrowContainer?.className).toContain('scale-75');
        expect(arrowContainer?.className).toContain('lg:scale-100');
    });

    it("applies decorative text styling with correct font", () => {
        render(<SomeShowcasesArrow />);
        const textElement = screen.getByTestId("text");

        expect(textElement).toHaveClass("tracking-widest");
        expect(textElement).toHaveClass("font-medium");
        expect(textElement).toHaveAttribute("family", "handwritten");
        expect(textElement).toHaveAttribute("variant", "h1");
    });
});