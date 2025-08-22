import {render} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import TrueFooter from '../../components/TrueFooter';

vi.mock('../../hooks/useAnimateTrueFooter', () => ({
    default: vi.fn(),
}));

vi.mock('@/components/layout/Logo', () => ({
    default: vi.fn(),
}));

vi.mock('@/components/ui/Typography', () => ({
    default: vi.fn(({children}) => (<p>{children}</p>)),
}));

vi.mock('@/components/layout/SocialLinks', () => ({
    default: vi.fn(),
}));

vi.mock('@/components/ui/Card', () => ({
    default: vi.fn(props => (<div {...props} />)),
}));

import useAnimateTrueFooter from '../../hooks/useAnimateTrueFooter';
import SocialLinks, {SocialLinksProps} from "@/components/layout/SocialLinks";
import AboutMe from "@/lib/models/AboutMe";
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import Logo from "@/components/layout/Logo";
import Typography from "@/components/ui/Typography";
import Card from "@/components/ui/Card";

const mockUseAnimateTrueFooter = vi.mocked(useAnimateTrueFooter);

const currentYear = new Date().getFullYear();

describe('TrueFooter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const baseAboutMe: AboutMe = {
        ...aboutMeFixture,
        name: 'John',
        surname: 'Doe',
        socialLinks: [],
    };

    it('renders full name and logo', () => {
        render(<TrueFooter aboutMe={baseAboutMe}/>);

        expect(Logo).toHaveBeenCalledOnce();
        expect(Typography).toHaveBeenCalledWith(
            expect.objectContaining({
                variant: 'caption',
                children: 'John Doe',
            }),
            undefined
        );
    });

    it('renders copyright line with current year and full name', () => {
        render(<TrueFooter aboutMe={baseAboutMe}/>);

        expect(Typography).toHaveBeenCalledWith(
            expect.objectContaining({
                variant: 'caption',
                children: `© ${currentYear} John Doe. All rights reserved.`,
            }),
            undefined
        );
    });

    it('renders provided social links as anchors with correct hrefs', () => {
        const aboutWithLinks: AboutMe = {
            ...baseAboutMe,
            socialLinks: [
                {platform: 'github', username: 'john'},
                {platform: 'linkedin', username: 'johndoe'},
            ],
        };

        render(<TrueFooter aboutMe={aboutWithLinks}/>);

        expect(SocialLinks).toHaveBeenCalledWith(
            expect.objectContaining<SocialLinksProps>({
                socialLinks: aboutWithLinks.socialLinks,
                description: false,
                buttonProps: {
                    isIconButton: true,
                    size: 'small',
                    variant: 'tertiary',
                },
            }),
            undefined
        );
    });

    it('renders no social links when list is empty', () => {
        render(<TrueFooter aboutMe={baseAboutMe}/>);

        expect(SocialLinks).toHaveBeenCalledWith(
            expect.objectContaining<SocialLinksProps>({
                socialLinks: []
            }),
            undefined
        );
    });

    it('invokes animation hook with footer ref', () => {
        render(<TrueFooter aboutMe={baseAboutMe}/>);
        const arg = mockUseAnimateTrueFooter.mock.calls[0][0];

        expect(mockUseAnimateTrueFooter).toHaveBeenCalledTimes(1);
        expect(arg).toHaveProperty('current');
    });

    it('passes ref to Card component', () => {
        render(<TrueFooter aboutMe={baseAboutMe}/>);

        expect(Card).toHaveBeenCalledWith(
            expect.objectContaining({
                ref: expect.objectContaining({
                    current: expect.any(HTMLDivElement)
                }),
            }),
            undefined
        );
    });
});