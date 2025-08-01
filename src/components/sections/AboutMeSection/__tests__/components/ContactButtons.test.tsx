import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import ContactButtons from '@/components/sections/AboutMeSection/components/ContactButtons';
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import AboutMe from "@/lib/models/AboutMe";

describe('ContactButtons', () => {
    it('renders all buttons when all links are provided', () => {
        const mockAboutMe = {
            ...aboutMeFixture,
            socialLinks: [
                { platform: 'github', url: 'https://github.com/user' },
                { platform: 'linkedin', url: 'https://linkedin.com/in/user' }
            ],
            resumeUrl: 'https://example.com/cv.pdf'
        };

        const { getByText, getByTitle } = render(<ContactButtons aboutMe={mockAboutMe} />);

        expect(getByText('Get my CV')).toBeDefined();
        expect(getByTitle('GitHub')).toBeDefined();
        expect(getByTitle('LinkedIn')).toBeDefined();
    });

    it('does not render CV button when resumeUrl is missing', () => {
        const mockAboutMe: AboutMe = {
            ...aboutMeFixture,
            resumeUrl: null,
            socialLinks: [
                { platform: 'github', url: 'https://github.com/user' },
                { platform: 'linkedin', url: 'https://linkedin.com/in/user' }
            ]
        };

        const { queryByText, getByTitle } = render(<ContactButtons aboutMe={mockAboutMe} />);

        expect(queryByText('Get my CV')).toBeNull();
        expect(getByTitle('GitHub')).toBeDefined();
        expect(getByTitle('LinkedIn')).toBeDefined();
    });

    it('does not render GitHub button when GitHub link is missing', () => {
        const mockAboutMe: AboutMe = {
            ...aboutMeFixture,
            socialLinks: [
                { platform: 'linkedin', url: 'https://linkedin.com/in/user' }
            ],
            resumeUrl: 'https://example.com/cv.pdf'
        };

        const { getByText, queryByTitle, getByTitle } = render(<ContactButtons aboutMe={mockAboutMe} />);

        expect(getByText('Get my CV')).toBeDefined();
        expect(queryByTitle('GitHub')).toBeNull();
        expect(getByTitle('LinkedIn')).toBeDefined();
    });

    it('does not render LinkedIn button when LinkedIn link is missing', () => {
        const mockAboutMe = {
            ...aboutMeFixture,
            socialLinks: [
                { platform: 'github', url: 'https://github.com/user' }
            ],
            resumeUrl: 'https://example.com/cv.pdf'
        };

        const { getByText, getByTitle, queryByTitle } = render(<ContactButtons aboutMe={mockAboutMe} />);

        expect(getByText('Get my CV')).toBeDefined();
        expect(getByTitle('GitHub')).toBeDefined();
        expect(queryByTitle('LinkedIn')).toBeNull();
    });

    it('renders empty container when all links are missing', () => {
        const mockAboutMe = {
            ...aboutMeFixture,
            resumeUrl: null,
            socialLinks: []
        };

        const { container } = render(<ContactButtons aboutMe={mockAboutMe} />);

        expect((container.firstChild as HTMLElement).children.length).toBe(0);
    });

    it('renders buttons with correct href attributes', () => {
        const githubUrl = 'https://github.com/user';
        const linkedinUrl = 'https://linkedin.com/in/user';
        const resumeUrl = 'https://example.com/cv.pdf';

        const mockAboutMe = {
            ...aboutMeFixture,
            socialLinks: [
                { platform: 'github', url: githubUrl },
                { platform: 'linkedin', url: linkedinUrl }
            ],
            resumeUrl: resumeUrl
        };

        const { getByText, getByTitle } = render(<ContactButtons aboutMe={mockAboutMe} />);

        expect(getByText('Get my CV').closest('a')).toHaveAttribute('href', resumeUrl);
        expect(getByTitle('GitHub').closest('a')).toHaveAttribute('href', githubUrl);
        expect(getByTitle('LinkedIn').closest('a')).toHaveAttribute('href', linkedinUrl);
    });
});