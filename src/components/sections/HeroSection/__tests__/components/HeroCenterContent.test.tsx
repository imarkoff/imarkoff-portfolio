import { render, screen, cleanup } from '@testing-library/react';
import {describe, it, expect, vi, afterEach, beforeEach, Mock} from 'vitest';
import "@testing-library/jest-dom/vitest";
import HeroCenterContent from '../../components/HeroCenterContent';
import AboutMe from '@/lib/models/AboutMe';
import AnimateHero from "@/components/sections/HeroSection/components/AnimateHero";
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import SocialLinks, {SocialLinksProps} from "@/components/layout/SocialLinks";

vi.mock('@/components/sections/HeroSection/components/AnimateHero', () => ({
    default: vi.fn(),
}));

vi.mock('@/components/layout/SocialLinks', () => ({
    default: vi.fn(),
}));

const MockedAnimateHero = AnimateHero as Mock;

describe('HeroCenterContent', () => {
    const mockAboutMe: AboutMe = {
        ...aboutMeFixture,
        name: 'John',
        surname: 'Doe',
        tagline: 'A **passionate** developer.',
        socialLinks: [
            { platform: 'github', username: 'johndoe' },
            { platform: 'linkedin', username: 'john_doe' }
        ]
    };

    const mockAboutMeNoSurname: AboutMe = {
        ...aboutMeFixture,
        name: 'Jane',
        surname: null,
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
        expect(SocialLinks).toHaveBeenCalledTimes(1);
    });

    it('should render correctly when surname is not provided', () => {
        render(<HeroCenterContent aboutMe={mockAboutMeNoSurname} />);

        expect(screen.getByText('Jane')).toBeInTheDocument();
        expect(screen.queryByText('Doe')).not.toBeInTheDocument();
    });

    it('calls SocialLinks with correct props', () => {
        render(<HeroCenterContent aboutMe={mockAboutMe} />);

        expect(SocialLinks).toHaveBeenCalledWith(
            expect.objectContaining<SocialLinksProps>({
                socialLinks: mockAboutMe.socialLinks,
                description: false,
                buttonProps: {
                    isIconButton: true,
                    variant: 'tertiary'
                },
                Wrapper: expect.any(Function)
            }),
            undefined
        );
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
        expect(container.querySelectorAll('.button-wrapper').length).toBe(2); // except for SocialLinks
    });
});