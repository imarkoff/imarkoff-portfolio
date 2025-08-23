import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import ContactButtons, {ContactButtonsProps} from '@/components/sections/AboutMeSection/components/ContactButtons';
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import { LinkButton } from '@/components/ui/Button';
import SocialLinks from '@/components/layout/SocialLinks';
import DocsIcon from '@/components/icons/DocsIcon';

vi.mock('@/components/ui/Button', () => ({
    LinkButton: vi.fn(() => <div data-testid="LinkButton" />)
}));
vi.mock('@/components/layout/SocialLinks', () => ({
    default: vi.fn(() => <div data-testid="SocialLinks" />)
}));

describe('ContactButtons', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls LinkButton and SocialLinks with correct props when all links are provided', () => {
        const mockAboutMe: ContactButtonsProps = {
            socialLinks: [
                { platform: 'github', username: 'john' },
                { platform: 'linkedin', username: 'john_doe' }
            ],
            resumeUrl: 'https://example.com/cv.pdf'
        };

        render(<ContactButtons {...mockAboutMe} />);

        expect(LinkButton).toHaveBeenCalledWith(
            expect.objectContaining({
                href: mockAboutMe.resumeUrl,
                target: '_blank',
                variant: 'secondary',
                LeftIcon: DocsIcon,
                children: 'Get my CV'
            }),
            undefined
        );
        expect(SocialLinks).toHaveBeenCalledWith(
            expect.objectContaining({
                socialLinks: mockAboutMe.socialLinks,
                description: false,
                buttonProps: {
                    isIconButton: true,
                    variant: 'tertiary'
                }
            }),
            undefined
        );
    });

    it('does not call LinkButton when resumeUrl is missing', () => {
        const mockAboutMe = {
            resumeUrl: null,
            socialLinks: [
                { platform: 'github', username: 'john' }
            ]
        };

        render(<ContactButtons {...mockAboutMe} />);

        expect(LinkButton).not.toHaveBeenCalled();
        expect(SocialLinks).toHaveBeenCalled();
    });

    it('calls SocialLinks with empty array when all links are missing', () => {
        const mockAboutMe = {
            ...aboutMeFixture,
            resumeUrl: null,
            socialLinks: []
        };

        render(<ContactButtons {...mockAboutMe} />);

        expect(LinkButton).not.toHaveBeenCalled();
        expect(SocialLinks).toHaveBeenCalledWith(
            expect.objectContaining({
                socialLinks: [],
                description: false,
                buttonProps: {
                    isIconButton: true,
                    variant: 'tertiary'
                }
            }),
            undefined
        );
    });
});