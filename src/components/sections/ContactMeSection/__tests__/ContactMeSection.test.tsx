import {render} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import ContactMeSection from '../ContactMeSection';
import AboutMe from '@/lib/models/AboutMe';
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import Section from "@/components/ui/Section";
import {SECTION_GRADIENT} from "../constants";
import ContactIntro from "../components/ContactIntro";
import ContactForm from "../components/ContactForm";
import TrueFooter from "../components/TrueFooter";

vi.mock('@/components/ui/Section', () => ({
    default: vi.fn(({children}) => <div>{children}</div>)
}));
vi.mock('../components/ContactIntro', () => ({
    default: vi.fn()
}));
vi.mock('../components/ContactForm', () => ({
    default: vi.fn()
}));
vi.mock('../components/TrueFooter', () => ({
    default: vi.fn()
}));

const MockSection = vi.mocked(Section);
const MockContactIntro = vi.mocked(ContactIntro);
const MockContactForm = vi.mocked(ContactForm);
const MockTrueFooter = vi.mocked(TrueFooter);

describe('ContactMeSection', () => {
    const mockAboutMe: AboutMe = {
        ...aboutMeFixture,
        contactEmail: 'test@example.com',
        socialLinks: [
            {platform: 'github', username: 'imarkoff'},
            {platform: 'linkedin', username: 'imarkoff_linkedin'}
        ],
        resumeUrl: '/resume.pdf'
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the Section component with correct styling props', () => {
        render(<ContactMeSection aboutMe={mockAboutMe}/>);

        expect(MockSection).toHaveBeenCalledWith(
            expect.objectContaining({
                slotProps: {
                    root: {
                        className: "overflow-hidden",
                        style: {background: SECTION_GRADIENT}
                    },
                    section: {
                        className: "flex flex-col gap-12 lg:gap-20 pb-5 md:pb-9 lg:pb-12"
                    }
                }
            }),
            undefined
        );
    });

    it('renders the ContactIntro component with the correct email prop', () => {
        render(<ContactMeSection aboutMe={mockAboutMe}/>);

        expect(MockContactIntro).toHaveBeenCalledWith(
            {email: mockAboutMe.contactEmail},
            undefined
        );
    });

    it('renders the ContactForm component', () => {
        render(<ContactMeSection aboutMe={mockAboutMe}/>);

        expect(MockContactForm).toHaveBeenCalled();
    });

    it('renders the TrueFooter component with the correct aboutMe prop', () => {
        render(<ContactMeSection aboutMe={mockAboutMe}/>);

        expect(MockTrueFooter).toHaveBeenCalledWith(
            {aboutMe: mockAboutMe},
            undefined
        );
    });
});