import {render, screen} from "@testing-library/react";
import {describe, vi, it, expect, beforeEach} from "vitest";
import "@testing-library/jest-dom/vitest";
import ProgressActivityIcon from "@/components/icons/ProgressActivityIcon";
import ButtonContent from "../../../Button/components/ButtonContent";
import {ReactNode} from "react";

vi.mock("@/components/icons/ProgressActivityIcon", () => ({
    default: vi.fn()
}));

const mockedProgressActivityIcon = vi.mocked(ProgressActivityIcon);

describe('ButtonContent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders left icon', () => {
        const LeftIcon = vi.fn((props) => <span {...props} />);

        render(<ButtonContent LeftIcon={LeftIcon}/>);

        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
        expect(LeftIcon).toHaveBeenCalledWith(
            expect.objectContaining({className: "icon"}),
            undefined
        );
    });

    it('renders right icon', () => {
        const RightIcon = vi.fn((props) => <span {...props} />);

        render(<ButtonContent RightIcon={RightIcon}/>);

        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
        expect(RightIcon).toHaveBeenCalledWith(
            expect.objectContaining({className: "icon"}),
            undefined
        );
    });

    it('renders children', () => {
        const children = "Button Text";

        render(<ButtonContent>{children}</ButtonContent>);

        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('does not render children if each child is falsy', () => {
        const children = [null, undefined, false] as ReactNode;

        render(<ButtonContent>{children}</ButtonContent>);

        expect(screen.queryByTestId('button-children')).not.toBeInTheDocument();
    })

    it('renders loading spinner', () => {
        render(<ButtonContent loading={true}/>);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        expect(mockedProgressActivityIcon).toHaveBeenCalledWith(
            expect.objectContaining({className: "spinner-icon"}),
            undefined
        );
    });

    it('does not render loading spinner when not loading', () => {
        render(<ButtonContent loading={false}/>);

        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    it('renders left icon, children, and right icon together', () => {
        const LeftIcon = vi.fn((props) => <span {...props} />);
        const RightIcon = vi.fn((props) => <span {...props} />);
        const children = "Button Text";

        render(
            <ButtonContent LeftIcon={LeftIcon} RightIcon={RightIcon}>
                {children}
            </ButtonContent>
        );

        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        expect(screen.getByText(children)).toBeInTheDocument();
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
});