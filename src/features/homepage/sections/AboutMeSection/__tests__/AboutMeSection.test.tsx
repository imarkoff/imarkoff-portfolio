 import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import AboutMeSection from '../AboutMeSection';
 import {CSSProperties, ReactNode} from "react";
 import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
 import {AboutMeReferences} from "../components/AboutMeScroll";
 import {AboutMeContentProps} from "../components/AboutMeContent";
 import {ByTheNumbersCardProps} from "../components/ByTheNumbersCard";
 import {ByTechnologiesCardProps} from "../components/ByTechnologiesCard";
 import AboutMe from "@/lib/models/AboutMe";

vi.mock('@/features/homepage/components/HomePageSection', () => ({
    default: ({ children, slotProps }: {
        children: ReactNode,
        slotProps?: {root?: { className: string; style: CSSProperties } }
    }) => (
        <div data-testid="mock-section" className={slotProps?.root?.className} style={slotProps?.root?.style}>
            {children}
        </div>
    )
}));

vi.mock('../components/AboutMeScroll', () => ({
    default: ({ references }: { references: AboutMeReferences }) =>
        <div data-testid="mock-about-me-scroll" data-references={JSON.stringify(references)} />
}));

vi.mock('../components/AboutMeContent', () => ({
    default: ({ aboutMe, id }: AboutMeContentProps) =>
        <div data-testid="mock-about-me-content" data-about-me={JSON.stringify(aboutMe)} id={id} />
}));

vi.mock('../components/ByTheNumbersCard', () => ({
    default: ({ byTheNumbers, id, headingId }: ByTheNumbersCardProps) => (
        <div data-testid="mock-by-the-numbers-card" data-by-the-numbers={JSON.stringify(byTheNumbers)} id={id} data-heading-id={headingId} />
    )
}));

vi.mock('../components/ByTechnologiesCard', () => ({
    default: ({ technologies }: ByTechnologiesCardProps) =>
        <div data-testid="mock-by-technologies-card" data-technologies={JSON.stringify(technologies)} />
}));

const mockAboutMe = aboutMeFixture;

describe('AboutMeSection', () => {
    it('renders the about me section with content and statistics', () => {
        render(<AboutMeSection aboutMe={mockAboutMe} />);

        expect(screen.getByTestId('mock-section')).toBeInTheDocument();
        expect(screen.getByTestId('mock-about-me-content')).toBeInTheDocument();
        expect(screen.getByTestId('mock-by-the-numbers-card')).toBeInTheDocument();
    });

    it('displays technologies organized by category', () => {
        render(<AboutMeSection aboutMe={mockAboutMe} />);

        expect(screen.getByTestId('mock-by-technologies-card')).toBeInTheDocument();
        const technologiesData = JSON.parse(screen.getByTestId('mock-by-technologies-card').dataset.technologies!);
        expect(technologiesData).toEqual(mockAboutMe.technologiesCategories);
    });

    it('provides proper identifiers for scroll interactions', () => {
        render(<AboutMeSection aboutMe={mockAboutMe} />);

        expect(screen.getByTestId('mock-about-me-scroll')).toBeInTheDocument();
        expect(screen.getByTestId('mock-about-me-content')).toHaveAttribute('id', 'about-me.container');
        expect(screen.getByTestId('mock-by-the-numbers-card')).toHaveAttribute('id', 'by-the-numbers.container');
    });

    it('displays about me content with the provided information', () => {
        render(<AboutMeSection aboutMe={mockAboutMe} />);

        const aboutMeContent = screen.getByTestId('mock-about-me-content');
        const aboutMeData = JSON.parse(aboutMeContent.dataset.aboutMe!);
        expect(aboutMeData.fullDescription).toBe(mockAboutMe.fullDescription);
    });

    it('shows achievement statistics from the about me data', () => {
        render(<AboutMeSection aboutMe={mockAboutMe} />);

        const byTheNumbersCard = screen.getByTestId('mock-by-the-numbers-card');
        const byTheNumbersData = JSON.parse(byTheNumbersCard.dataset.byTheNumbers!);
        expect(byTheNumbersData).toEqual(mockAboutMe.byTheNumbers);
    });

    it('handles empty technologies gracefully', () => {
        const aboutMeWithoutTechnologies: AboutMe = {
            ...mockAboutMe,
            technologiesCategories: []
        };

        render(<AboutMeSection aboutMe={aboutMeWithoutTechnologies} />);

        expect(screen.getByTestId('mock-by-technologies-card')).toBeInTheDocument();
        const technologiesData = JSON.parse(screen.getByTestId('mock-by-technologies-card').dataset.technologies!);
        expect(technologiesData).toEqual([]);
    });

    it('displays section with appropriate styling', () => {
        render(<AboutMeSection aboutMe={mockAboutMe} />);

        const section = screen.getByTestId('mock-section');
        expect(section).toHaveClass('border-t-2 overflow-hidden');
        expect(section).toHaveStyle({
            background: expect.stringContaining('radial-gradient')
        });
    });
});