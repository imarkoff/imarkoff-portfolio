import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import ArrowSVG from "@/features/homepage/sections/HeroSection/components/SomeShowcasesArrow/components/ArrowSVG";
import { createRef } from "react";

describe("ArrowSVG Component", () => {
    it("renders without crashing", () => {
        const pathRef = createRef<SVGPathElement>();
        const arrowRef = createRef<SVGPathElement>();

        const { container } = render(<ArrowSVG pathRef={pathRef} arrowRef={arrowRef} />);

        expect(container).toBeInTheDocument();
    });

    it("applies refs correctly", () => {
        const pathRef = createRef<SVGPathElement>();
        const arrowRef = createRef<SVGPathElement>();

        render(<ArrowSVG pathRef={pathRef} arrowRef={arrowRef} />);

        expect(pathRef.current?.tagName.toLowerCase()).toBe('path');
        expect(arrowRef.current?.tagName.toLowerCase()).toBe('path');
    });
});