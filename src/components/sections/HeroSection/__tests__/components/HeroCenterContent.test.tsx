import { render, screen, cleanup } from '@testing-library/react';
import {describe, it, expect, vi, afterEach, beforeEach, Mock} from 'vitest';
import "@testing-library/jest-dom/vitest";
import HeroCenterContent from '../../components/HeroCenterContent';
import AboutMe from '@/lib/models/AboutMe';
import AnimateHero from "@/components/sections/HeroSection/components/AnimateHero";
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";

vi.mock('@/components/sections/HeroSection/components/AnimateHero', () => ({
    default: vi.fn(() => null),
}));

const MockedAnimateHero = AnimateHero as Mock;

describe('HeroCenterContent', () => {
    const mockAboutMe: AboutMe = {
        ...aboutMeFixture,
        name: 'John',
        surname: 'Doe',
        tagline: 'A **passionate** developer.',
        socialLinks: [
            { platform: 'github', url: 'https://github.com/johndoe' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe' }
        ]
    };

    const mockAboutMeNoSurname: AboutMe = {
        ...aboutMeFixture,
        name: 'Jane',
        surname: null,
        tagline: 'Another **great** developer.',
        socialLinks: [
            { platform: 'github', url: 'https://github.com/janedoe' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/janedoe' }
        ]
    };

    const mockAboutMeNoGithub: AboutMe = {
        ...aboutMeFixture,
        name: 'John',
        surname: 'Doe',
        tagline: 'A **passionate** developer.',
        socialLinks: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe' }
        ]
    };

    const mockAboutMeNoLinkedin: AboutMe = {
        ...aboutMeFixture,
        name: 'John',
        surname: 'Doe',
        tagline: 'A **passionate** developer.',
        socialLinks: [
            { platform: 'github', url: 'https://github.com/johndoe' }
        ]
    };

    beforeEach(() => {
        MockedAnimateHero.mockClear();
    });

    afterEach(() => {
        cleanup();
    });

    it('should render all elements correctly with full data', () => {
        render(<HeroCenterContent aboutMe={mockAboutMe} />);

        expect(screen.getByText('Seeking for a job')).toBeInTheDocument();
        expect(screen.getByText(/Hi 👋/)).toBeInTheDocument();
        expect(screen.getByText(/, I’m/)).toBeInTheDocument();
        expect(screen.getByText(/John/)).toBeInTheDocument();
        expect(screen.getByText(/Doe/)).toBeInTheDocument();
        expect(screen.getByText(/A/)).toBeInTheDocument();
        expect(screen.getByText('passionate')).toBeInTheDocument();
        expect(screen.getByText(/developer./)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Get my CV/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Contact me/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /GitHub profile/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /LinkedIn profile/i })).toBeInTheDocument();
    });

    it('should render correctly when surname is not provided', () => {
        render(<HeroCenterContent aboutMe={mockAboutMeNoSurname} />);

        expect(screen.getByText('Jane')).toBeInTheDocument();
        expect(screen.queryByText('Doe')).not.toBeInTheDocument();
    });

    it('should not render GitHub link when not provided', () => {
        render(<HeroCenterContent aboutMe={mockAboutMeNoGithub} />);
        expect(screen.queryByRole('link', { name: /GitHub profile/i })).not.toBeInTheDocument();
        expect(screen.getByRole('link', { name: /LinkedIn profile/i })).toBeInTheDocument();
    });

    it('should not render LinkedIn link when not provided', () => {
        render(<HeroCenterContent aboutMe={mockAboutMeNoLinkedin} />);
        expect(screen.getByRole('link', { name: /GitHub profile/i })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /LinkedIn profile/i })).not.toBeInTheDocument();
    });

    it('should render the AnimateHero component with correct props', () => {
        render(<HeroCenterContent aboutMe={mockAboutMe} />);

        const expectedProps = {
            greeting: { hiId: "hero.greeting.hi", otherId: "hero.greeting.other" },
            nameId: "hero.name",
            taglineId: "hero.tagline",
            labelId: "hero.label",
            buttonWrapperClassName: "button-wrapper"
        };

        expect(MockedAnimateHero).toHaveBeenCalledTimes(1);
        expect(MockedAnimateHero).toHaveBeenCalledWith(expectedProps, undefined);
    });

    it('should apply correct IDs and classNames to elements for animation', () => {
        const { container } = render(<HeroCenterContent aboutMe={mockAboutMe} />);

        expect(container.querySelector('#hero\\.label')).toBeInTheDocument();
        expect(container.querySelector('#hero\\.greeting\\.hi')).toBeInTheDocument();
        expect(container.querySelector('#hero\\.greeting\\.other')).toBeInTheDocument();
        expect(container.querySelector('#hero\\.name')).toBeInTheDocument();
        expect(container.querySelector('#hero\\.tagline')).toBeInTheDocument();
        expect(container.querySelectorAll('.button-wrapper').length).toBe(4);
    });
});