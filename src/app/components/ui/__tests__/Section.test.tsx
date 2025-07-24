import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom";
import Section from '../Section';

describe('Section', () => {
    it('renders correctly with default props', () => {
        render(<Section>Content</Section>);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        render(
            <Section>
                <div data-testid="child">Child Content</div>
            </Section>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('applies custom className correctly', () => {
        render(<Section className="custom-class">Content</Section>);
        const sectionElement = screen.getByText('Content');
        expect(sectionElement).toHaveClass('custom-class');
        expect(sectionElement).toHaveClass('max-w-[1400px]');
    });

    it('forwards additional props correctly', () => {
        render(<Section data-testid="section-element">Content</Section>);
        expect(screen.getByTestId('section-element')).toBeInTheDocument();
    });

    it('renders without children', () => {
        render(<Section />);
        const sectionElement = screen.getByRole('region');
        expect(sectionElement).toBeEmptyDOMElement();
    });
});