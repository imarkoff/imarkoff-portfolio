import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import TypographyIcon from '../TypographyIcon';

const MockIcon = vi.fn(({ className, ...props }) => (
    <svg data-testid="mock-icon" className={className} {...props} />
));

describe('TypographyIcon', () => {
    it('renders the provided Icon component', () => {
        render(<TypographyIcon Icon={MockIcon} />);
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('applies default body style when no variant is provided', () => {
        render(<TypographyIcon Icon={MockIcon} />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-body');
    });

    it('applies hero variant styles correctly', () => {
        render(<TypographyIcon Icon={MockIcon} variant="hero" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-hero-sm');
        expect(icon).toHaveClass('md:size-icon-hero-md');
        expect(icon).toHaveClass('lg:size-icon-hero-lg');
    });

    it('applies h1 variant styles correctly', () => {
        render(<TypographyIcon Icon={MockIcon} variant="h1" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-h1-sm');
        expect(icon).toHaveClass('md:size-icon-h1-md');
        expect(icon).toHaveClass('lg:size-icon-h1-lg');
    });

    it('applies h2 variant styles correctly', () => {
        render(<TypographyIcon Icon={MockIcon} variant="h2" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-h2-sm');
        expect(icon).toHaveClass('md:size-icon-h2-md');
        expect(icon).toHaveClass('lg:size-icon-h2-lg');
    });

    it('applies h3 variant styles correctly', () => {
        render(<TypographyIcon Icon={MockIcon} variant="h3" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-h3-sm');
        expect(icon).toHaveClass('md:size-icon-h3-md');
        expect(icon).toHaveClass('lg:size-icon-h3-lg');
    });

    it('applies tagline variant styles correctly', () => {
        render(<TypographyIcon Icon={MockIcon} variant="tagline" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-h1-sm');
        expect(icon).toHaveClass('md:size-icon-h1-md');
        expect(icon).toHaveClass('lg:size-icon-h1-lg');
    });

    it('applies caption variant styles correctly', () => {
        render(<TypographyIcon Icon={MockIcon} variant="caption" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-caption');
    });

    it('merges additional className with variant styles', () => {
        render(<TypographyIcon Icon={MockIcon} className="text-primary" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveClass('size-icon-body');
        expect(icon).toHaveClass('text-primary');
    });

    it('passes additional props to the Icon component', () => {
        render(<TypographyIcon Icon={MockIcon} data-custom="test" aria-label="icon" />);
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveAttribute('data-custom', 'test');
        expect(icon).toHaveAttribute('aria-label', 'icon');
    });
});