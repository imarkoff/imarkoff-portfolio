import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Image from "next/image";
import TechnologyLabel from "../TechnologyLabel";
import {technologyFixture} from "@/lib/test-utils/fixtures/technologyByCategoryFixtures";
import Label, {LabelProps} from "@/components/ui/Label";

vi.mock("@/components/ui/Label", () => ({
    default: vi.fn(({icon, children}) => (
        <div data-testid="label">
            {icon}
            <span>{children}</span>
        </div>
    )),
}));

vi.mock("next/image", () => ({
    default: vi.fn(() => <div data-testid="image" />),
}));

describe("TechnologyLabel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render label without icon when technology has no iconUrl", () => {
        const technology = {...technologyFixture, iconUrl: null};

        render(<TechnologyLabel technology={technology} />);

        expect(Label).toHaveBeenCalledWith(
            expect.objectContaining<LabelProps>({
                icon: undefined,
                children: technology.name,
                className: "text-nowrap min-w-fit",
            }),
            undefined
        );
        expect(Image).not.toHaveBeenCalled();
    });

    it("should render label with icon when technology has iconUrl", () => {
        const technology = technologyFixture;

        render(<TechnologyLabel technology={technology} />);

        expect(Label).toHaveBeenCalledWith(
            expect.objectContaining<LabelProps>({
                icon: expect.anything(),
                children: technology.name
            }),
            undefined
        );
        expect(Image).toHaveBeenCalledWith(
            {
                src: technology.iconUrl,
                alt: technology.name,
                width: 20,
                height: 20,
                className: "rounded-sm size-[20px]"
            },
            undefined
        );
    });

    it("should pass className to Label component", () => {
        render(<TechnologyLabel technology={technologyFixture} className="custom-class" />);

        expect(Label).toHaveBeenCalledWith(
            expect.objectContaining<Partial<LabelProps>>({
                className: expect.stringContaining("custom-class")
            }),
            undefined
        );
    });

    it("should pass additional props to Label component", () => {
        const onClick = vi.fn();

        render(
            <TechnologyLabel
                technology={technologyFixture}
                onClick={onClick}
                data-testid="custom-prop"
            />
        );

        expect(Label).toHaveBeenCalledWith(
            expect.objectContaining<Partial<LabelProps>>({
                onClick,
                "data-testid": "custom-prop"
            } as Partial<LabelProps>),
            undefined
        );
    });
});