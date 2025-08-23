import {render, screen} from '@testing-library/react';
import {vi, describe, it, expect, beforeEach} from 'vitest';
import "@testing-library/jest-dom/vitest";
import Button from "../Button";
import ButtonContent, {ButtonContentProps} from "../components/ButtonContent";
import getButtonClasses, {ButtonClassesProps} from "../utils/getButtonClasses";

vi.mock("../components/ButtonContent", () => ({
    default: vi.fn(({ children }) => (<span>{children}</span>))
}));

vi.mock("../utils/getButtonClasses", () => ({
    default: vi.fn(() => 'button')
}));

const mockedButtonContent = vi.mocked(ButtonContent);
const mockedGetButtonClasses = vi.mocked(getButtonClasses);

describe("Button", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders with default props and children', () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Click Me');
        expect(button).toHaveClass('button');
        expect(button).not.toBeDisabled();
    });

    it('has button type by default', () => {
        render(<Button>Default Type</Button>);
        const button = screen.getByRole('button');

        expect(button).toHaveAttribute('type', 'button');
    });

    it('marks the button as disabled when loading', () => {
        render(<Button loading>Submit</Button>);
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>Test Click</Button>);
        const button = screen.getByRole('button');
        button.click();

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('passes additional props to the button element', () => {
        render(<Button aria-label="test-button" title={"Test Button"}>Test</Button>);
        const button = screen.getByRole('button');

        expect(button).toHaveAttribute('aria-label', 'test-button');
        expect(button).toHaveAttribute('title', 'Test Button');
    });

    it('calls getButtonClasses with correct parameters', () => {
        render(<Button
            size={"small"}
            variant={"primary"}
            color={"accent"}
            isIconButton={false}
            active={false}
            loading={false}
            className={"test-class"}
        >
            Test Classes
        </Button>);

        expect(mockedGetButtonClasses).toHaveBeenCalledWith({
            size: "small",
            variant: "primary",
            color: "accent",
            isIconButton: false,
            active: false,
            isLoading: false,
            className: "test-class"
        } as ButtonClassesProps);
    });

    it('renders ButtonContent with correct props', () => {
        const LeftIcon = vi.fn();
        const RightIcon = vi.fn();

        render(
            <Button
                LeftIcon={LeftIcon}
                RightIcon={RightIcon}
                loading={false}
            >
                Button Content
            </Button>
        );

        expect(mockedButtonContent).toHaveBeenCalledWith(
            expect.objectContaining<ButtonContentProps>({
                loading: false,
                LeftIcon: LeftIcon,
                RightIcon: RightIcon,
                children: "Button Content"
            }),
            undefined
        );
    });
});