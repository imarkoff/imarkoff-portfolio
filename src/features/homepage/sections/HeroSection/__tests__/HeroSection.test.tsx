import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import HeroSection from '../HeroSection';
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import HeroCenterContent from "../components/HeroCenterContent";
import {showcaseImageMatrixFixture} from "@/lib/test-utils/fixtures/showcaseImage.fixtures";
import ShowcaseCarousel from "@/features/homepage/sections/HeroSection/components/ShowcaseCarousel/ShowcaseCarousel";

vi.mock('@/components/ui/Section', () => ({
    default: vi.fn(({ children }) => <section>{children}</section>),
}));
vi.mock('@/components/sections/HeroSection/components/DownArrow', () => ({
    default: vi.fn(() => <div data-testid="down-arrow" />),
}));
vi.mock('@/components/sections/HeroSection/components/ShowcaseCarousel/ShowcaseCarousel', () => ({
    default: vi.fn(() => <div data-testid="showcase-carousel" />),
}));
vi.mock('@/components/ui/GradientBlur', () => ({
    default: vi.fn(() => <div data-testid="gradient-blur" />),
}));
vi.mock('@/components/sections/HeroSection/components/SomeShowcasesArrow/SomeShowcasesArrow', () => ({
    default: vi.fn(() => <div data-testid="some-showcases-arrow" />),
}));
vi.mock('@/components/sections/HeroSection/components/HeroBackground', () => ({
    default: vi.fn(() => <div data-testid="hero-background" />),
}));
vi.mock('../components/HeroCenterContent');

describe('HeroSection', () => {
    it('should render all child components correctly', () => {
        render(<HeroSection aboutMe={aboutMeFixture} showcases={showcaseImageMatrixFixture} />);

        expect(screen.getByTestId('hero-background')).toBeInTheDocument();
        expect(HeroCenterContent).toHaveBeenCalledWith(
            { aboutMe: aboutMeFixture }, undefined
        );
        expect(ShowcaseCarousel).toHaveBeenCalledWith(
            { showcases: showcaseImageMatrixFixture }, undefined
        );
        expect(screen.getByTestId('down-arrow')).toBeInTheDocument();
        expect(screen.getByTestId('some-showcases-arrow')).toBeInTheDocument();
        expect(screen.getByTestId('gradient-blur')).toBeInTheDocument();
    });
});