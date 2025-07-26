import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom";
import Typography from '../Typography';

describe('Typography', () => {
    it('renders correctly with default props', () => {
        render(<Typography>Sample Text</Typography>);

        expect(screen.getByText('Sample Text')).toBeInTheDocument();
        expect(screen.getByText('Sample Text').tagName).toBe('P');
    });

    it('renders with specified component element', () => {
        render(<Typography component="h1">Heading 1</Typography>);

        expect(screen.getByText('Heading 1').tagName).toBe('H1');

        render(<Typography component="h3">Heading 3</Typography>);

        expect(screen.getByText('Heading 3').tagName).toBe('H3');
    });

    it('applies correct styles for each variant', () => {
        render(<Typography variant="hero">Hero Text</Typography>);
        const heroElement = screen.getByText('Hero Text');

        expect(heroElement).toHaveClass('text-hero-sm', 'md:text-hero-md', 'lg:text-hero-lg');

        render(<Typography variant="h2">H2 Text</Typography>);
        const h2Element = screen.getByText('H2 Text');

        expect(h2Element).toHaveClass('text-h2-sm', 'md:text-h2-md', 'lg:text-h2-lg');

        render(<Typography variant="caption">Caption Text</Typography>);
        const captionElement = screen.getByText('Caption Text');

        expect(captionElement).toHaveClass('text-caption-sm', 'text-secondary');
    });

    it('applies default body variant when no variant specified', () => {
        render(<Typography>Default Body</Typography>);
        const bodyElement = screen.getByText('Default Body');

        expect(bodyElement).toHaveClass('text-body-sm');
    });

    it('applies custom className correctly', () => {
        render(<Typography className="custom-class">Custom Text</Typography>);

        expect(screen.getByText('Custom Text')).toHaveClass('custom-class');
        expect(screen.getByText('Custom Text')).toHaveClass('tracking-normal'); // saving the original class name
    });

    it('forwards additional props correctly', () => {
        render(<Typography data-testid="typography-element">With Props</Typography>);

        expect(screen.getByTestId('typography-element')).toBeInTheDocument();
        expect(screen.getByTestId('typography-element')).toHaveTextContent('With Props');
    });

    it('renders children correctly', () => {
        render(
            <Typography>
                <span data-testid="child">Child Content</span>
            </Typography>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('renders without children', () => {
        render(<Typography data-testid="empty-typography" />);
        const typographyElement = screen.getByTestId('empty-typography');

        expect(typographyElement).toBeEmptyDOMElement();
    });

    it('renders with sans font family by default', () => {
        render(<Typography>Sans Font Family</Typography>);

        expect(screen.getByText('Sans Font Family')).toHaveClass('font-sans');
    })

    it('renders with handwritten font family when specified', () => {
        render(<Typography family="handwritten">Handwritten Font Family</Typography>);

        expect(screen.getByText('Handwritten Font Family')).toHaveClass('font-handwriting');
    });
});