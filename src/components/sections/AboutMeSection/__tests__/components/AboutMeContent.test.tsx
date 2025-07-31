import {ReactNode} from "react";
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import AboutMeContent from '../../components/AboutMeContent';
import {TypographyProps} from "@/components/ui/Typography";
import {TypographyIconProps} from "@/components/ui/TypographyIcon";
import AboutMe from "@/lib/models/AboutMe";
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";

vi.mock('@/components/icons/AccountCircleIcon', () => ({
    default: () => <div data-testid="mock-account-circle-icon" />
}));

vi.mock('@/components/ui/Typography', () => ({
    default: ({ children, variant, component }: TypographyProps) => (
        <div data-testid="mock-typography" data-variant={variant} data-component={component}>
            {children}
        </div>
    )
}));

vi.mock('@/components/ui/TypographyIcon', () => ({
    default: ({ Icon, variant }: TypographyIconProps) => (
        <div data-testid="mock-typography-icon" data-variant={variant}>
            {Icon && <Icon />}
        </div>
    )
}));

vi.mock('react-markdown', () => ({
    default: ({ children, components }: {
        children: string;
        components: { p: (props: { children: ReactNode }) => ReactNode };
    }) => (
        <div data-testid="mock-react-markdown">
            <div data-testid="markdown-content">{children}</div>
            {components.p && components.p({ children: 'Test paragraph' })}
        </div>
    )
}));

vi.mock('@/components/sections/AboutMeSection/components/ContactButtons', () => ({
    default: ({ aboutMe }: { aboutMe: AboutMe }) => (
        <div data-testid="mock-contact-buttons" data-about-me={JSON.stringify(aboutMe)} />
    )
}));

describe('AboutMeContent', () => {
    const mockAboutMe = {
        ...aboutMeFixture,
        fullDescription: "This is my description",
        email: "test@example.com"
    };

    it('renders the about me section with heading and content', () => {
        render(<AboutMeContent aboutMe={mockAboutMe} id="test-id" />);

        expect(screen.getByTestId('mock-typography-icon')).toBeInTheDocument();
        expect(screen.getByTestId('mock-account-circle-icon')).toBeInTheDocument();
        expect(screen.getByText('About Me')).toBeInTheDocument();
        expect(screen.getByTestId('markdown-content')).toHaveTextContent(mockAboutMe.fullDescription);
    });

    it('applies the provided id to the container element', () => {
        render(<AboutMeContent aboutMe={mockAboutMe} id="custom-id" />);

        expect(screen.getByTestId("about-me-content")).toHaveAttribute('id', 'custom-id');
    });

    it('renders the heading with correct typography variant', () => {
        render(<AboutMeContent aboutMe={mockAboutMe} id="test-id" />);

        const typography = screen.getByText('About Me');
        expect(typography).toHaveAttribute('data-variant', 'h1');
        expect(typography).toHaveAttribute('data-component', 'h2');
    });

    it('passes markdown paragraphs to Typography with body variant', () => {
        render(<AboutMeContent aboutMe={mockAboutMe} id="test-id" />);

        const paragraphs = screen.getAllByTestId('mock-typography');
        const bodyParagraph = paragraphs.find(p => p.getAttribute('data-variant') === 'body');
        expect(bodyParagraph).toBeInTheDocument();
        expect(bodyParagraph).toHaveTextContent('Test paragraph');
    });

    it('passes the aboutMe data to ContactButtons component', () => {
        render(<AboutMeContent aboutMe={mockAboutMe} id="test-id" />);

        const contactButtons = screen.getByTestId('mock-contact-buttons');
        expect(contactButtons).toBeInTheDocument();
        expect(JSON.parse(contactButtons.getAttribute('data-about-me')!)).toEqual(mockAboutMe);
    });

    it('renders icon with h1 variant', () => {
        render(<AboutMeContent aboutMe={mockAboutMe} id="test-id" />);

        const icon = screen.getByTestId('mock-typography-icon');
        expect(icon).toHaveAttribute('data-variant', 'h1');
    });
});