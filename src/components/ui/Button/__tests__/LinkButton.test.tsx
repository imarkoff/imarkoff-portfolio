import {render, screen} from '@testing-library/react';
import {vi, describe, it, expect, beforeEach} from 'vitest';
import "@testing-library/jest-dom/vitest";
import ButtonContent, {ButtonContentProps} from '../components/ButtonContent';
import getButtonClasses, {ButtonClassesProps} from '../utils/getButtonClasses';
import LinkButton from "../LinkButton";

vi.mock("next/link", () => ({
    default: vi.fn(({children, ...props}) => (
        <a {...props}>{children}</a>
    ))
}));

vi.mock("@/config/routeConfig", () => ({
    default: {
        projects: {
            path: "/projects",
        }
    }
}));

vi.mock("../components/ButtonContent", () => ({
    default: vi.fn(({children}) => (<span>{children}</span>))
}));

vi.mock("../utils/getButtonClasses", () => ({
    default: vi.fn(() => 'link-button')
}));

const mockedButtonContent = vi.mocked(ButtonContent);
const mockedGetButtonClasses = vi.mocked(getButtonClasses);

describe('LinkButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders with default props and children', () => {
        render(<LinkButton href="#about">Click Me</LinkButton>);
        const linkButton = screen.getByRole('link');

        expect(linkButton).toBeInTheDocument();
        expect(linkButton).toHaveTextContent('Click Me');
        expect(linkButton).toHaveClass('link-button');
        expect(linkButton).not.toHaveAttribute('disabled');
    });

    it('handles href as a string', () => {
        render(<LinkButton href="/about">Go to About</LinkButton>);
        const linkButton = screen.getByRole('link');

        expect(linkButton).toHaveAttribute('href', '/about');
    });

    it('handles href as a function', () => {
        render(
            <LinkButton
                href={(route) => route.projects.path}
            >
                Go to Projects
            </LinkButton>
        );
        const linkButton = screen.getByRole('link');

        expect(linkButton).toHaveAttribute('href', '/projects');
    });

    it('handles href as a URL object', () => {
        const url = new URL('https://example.com/about');

        render(<LinkButton href={url}>Go to Example About</LinkButton>);
        const linkButton = screen.getByRole('link');

        expect(linkButton).toHaveAttribute('href', url.toString());
    });

    it('applies custom props like target and rel', () => {
        render(
            <LinkButton
                href="/external"
                target="_blank"
                rel="noopener noreferrer"
            >
                External Link
            </LinkButton>
        );
        const linkButton = screen.getByRole('link');

        expect(linkButton).toHaveAttribute('target', '_blank');
        expect(linkButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('applies additional attributes like aria-label', () => {
        render(<LinkButton href="#test" aria-label="test-link">Test Link</LinkButton>);
        const linkButton = screen.getByRole('link');

        expect(linkButton).toHaveAttribute('aria-label', 'test-link');
    });

    it('calls getButtonClasses with correct parameters', () => {
        render(
            <LinkButton
                href="#styled-link"
                size="small"
                variant="primary"
                className={"test-class"}
                color="accent"
            >
                Styled Link
            </LinkButton>
        );

        expect(mockedGetButtonClasses).toHaveBeenCalledWith({
            size: "small",
            variant: "primary",
            color: "accent",
            className: "test-class",
        } as ButtonClassesProps);
    });

    it('calls ButtonContent with correct props', () => {
        const LeftIcon = vi.fn();
        const RightIcon = vi.fn();

        render(
            <LinkButton
                href="#icon-link"
                LeftIcon={LeftIcon}
                RightIcon={RightIcon}
            >
                Button Content
            </LinkButton>
        );

        expect(mockedButtonContent).toHaveBeenCalledWith(
            expect.objectContaining<ButtonContentProps>({
                LeftIcon: LeftIcon,
                RightIcon: RightIcon,
                children: "Button Content"
            }),
            undefined
        );
    });
});