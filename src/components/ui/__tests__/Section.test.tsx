import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom";
import Section from '../Section';

describe('Section', () => {
    it('applies custom className correctly', () => {
        render(
            <Section
                slotProps={{
                    section: { className: 'custom-class' }
                }}
            >
                Content
            </Section>
        );
        const sectionElement = screen.getByRole('region');
        expect(sectionElement).toHaveClass('custom-class');
        expect(sectionElement).toHaveClass('max-w-[1400px]');
    });

    it('forwards additional props correctly', () => {
        render(
            <Section
                slotProps={{
                    // @ts-expect-error 2353 data-testid is not defined in HTMLAttributes
                    section: { 'data-testid': 'section-element' }
                }}
            >
                Content
            </Section>
        );
        expect(screen.getByTestId('section-element')).toBeInTheDocument();
    });

    it('passes props to root element correctly', () => {
        render(
            <Section
                slotProps={{
                    // @ts-expect-error 2353 data-testid is not defined in HTMLAttributes
                    root: { 'data-testid': 'root-element' }
                }}
            >
                Content
            </Section>
        );
        expect(screen.getByTestId('root-element')).toBeInTheDocument();
    });

    it('handles undefined slotProps gracefully', () => {
        render(<Section>Content</Section>);
        expect(screen.getByText('Content')).toBeInTheDocument();
        expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('should make children optional', () => {
        // @ts-expect-error 2353 data-testid is not defined in HTMLAttributes
        render(<Section slotProps={{ section: { 'data-testid': 'empty-section' } }} />);
        expect(screen.getByTestId('empty-section')).toBeEmptyDOMElement();
    });
});