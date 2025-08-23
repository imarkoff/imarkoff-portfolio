import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import ContactIntro from '../../components/ContactIntro';
import useAnimateIntro from '../../hooks/useAnimateIntro';
import {LinkButton} from "@/components/ui/Button";
import {MailIcon} from "@/components/icons";
import {Typography} from "@/components/ui/Typography";

vi.mock('../../hooks/useAnimateIntro', () => ({
    default: vi.fn(),
}));

vi.mock('@/components/ui/Button', () => ({
    LinkButton: vi.fn()
}));

vi.mock('@/components/ui/Typography', () => ({
    Typography: vi.fn(),
    TypographyIcon: vi.fn()
}));

const mockUseAnimateIntro = vi.mocked(useAnimateIntro);

describe('ContactIntro', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders heading and descriptive text without email link', () => {
        render(<ContactIntro />);

        expect(Typography).toHaveBeenCalledWith(
            expect.objectContaining({
                variant: 'h1',
                component: 'h2',
                children: 'Want to get in touch?',
            }),
            undefined
        );
        expect(Typography).toHaveBeenCalledWith(
            expect.objectContaining({
                children: [
                    expect.stringContaining("Build a hard-loaded CRM, or just want to say hello?"),
                    expect.any(Object),
                    expect.stringContaining("I am always open to discussing. Start by filling the form or writing an email.")
                ]
            }),
            undefined
        );
        expect(LinkButton).not.toHaveBeenCalled();
    });

    it('renders a mailto link when email prop is provided', () => {
        const email = 'me@example.com';

        render(<ContactIntro email={email} />);

        expect(LinkButton).toHaveBeenCalledWith(
            expect.objectContaining({
                href: `mailto:${email}`,
                LeftIcon: MailIcon,
                className: 'w-fit',
                children: email,
            }),
            undefined
        );
    });

    it('does not render a mailto link when email is an empty string', () => {
        render(<ContactIntro email="" />);

        expect(LinkButton).not.toHaveBeenCalled();
    });

    it('renders correctly with an email containing plus and dots', () => {
        const email = 'first.last+tag@example.co.uk';

        render(<ContactIntro email={email} />);

        expect(LinkButton).toHaveBeenCalledWith(
            expect.objectContaining({
                href: `mailto:${email}`,
            }),
            undefined
        );
    });

    it('calls animation hook with a ref on mount', () => {
        render(<ContactIntro email="a@b.com" />);
        const arg = mockUseAnimateIntro.mock.calls[0][0];

        expect(mockUseAnimateIntro).toHaveBeenCalledTimes(1);
        expect(arg).toHaveProperty('current');
    });
});