import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import GradientBlur from '../GradientBlur';

describe('GradientBlur', () => {
    it('renders all default layers', () => {
        const { container } = render(<GradientBlur />);

        const mainContainer = container.firstChild as HTMLElement;
        const blurLayers = container.querySelectorAll('[data-testid^="gradient-blur-layer-"]');
        expect(mainContainer).toBeInTheDocument();
        expect(blurLayers.length).toBe(7);
    });

    it('applies top-to-bottom direction by default', () => {
        const { container } = render(<GradientBlur />);

        const firstLayer = container.querySelector('[data-testid^="gradient-blur-layer-"]') as HTMLElement;
        expect(firstLayer.style.mask).not.toContain('to top');
        expect(firstLayer.style.mask).toContain('linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%');
    });

    it('applies bottom-to-top direction when specified', () => {
        const { container } = render(<GradientBlur direction="bottom-to-top" />);

        const firstLayer = container.querySelector('[data-testid^="gradient-blur-layer-"]') as HTMLElement;
        expect(firstLayer.style.mask).toContain('to top');
        expect(firstLayer.style.mask).toContain('linear-gradient(to top, rgba(0, 0, 0, 1) 0%');
    });

    it('renders custom layers', () => {
        const customLayers = [
            { blurAmount: 42, maskStart: 15, maskEnd: 55 },
            { blurAmount: 21, maskStart: 50, maskEnd: 80 }
        ];

        const { container } = render(<GradientBlur layers={customLayers} />);

        const blurLayers = container.querySelectorAll('[data-testid^="gradient-blur-layer-"]');
        expect(blurLayers.length).toBe(2);
        const firstLayer = blurLayers[0] as HTMLElement;
        expect(firstLayer.style.backdropFilter).toBe('blur(42px)');
        const secondLayer = blurLayers[1] as HTMLElement;
        expect(secondLayer.style.backdropFilter).toBe('blur(21px)');
    });

    it('applies custom className', () => {
        const testClass = 'test-gradient-class';

        const { container } = render(<GradientBlur className={testClass} />);

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer).toHaveClass(testClass);
    });

    it('applies custom background', () => {
        const testBg = 'rgba(255, 0, 0, 0.5)';
        const { container } = render(<GradientBlur background={testBg} />);

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer.style.background).toBe(testBg);
    });

    it('renders without layers', () => {
        const { container } = render(<GradientBlur layers={[]} />);

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer).toBeInTheDocument();
        const blurLayers = container.querySelectorAll('[data-testid^="gradient-blur-layer-"]');
        expect(blurLayers.length).toBe(0);
    });

    it('renders with extreme blur values', () => {
        const extremeLayers = [
            { blurAmount: 100, maskStart: 0, maskEnd: 100 },
            { blurAmount: 0, maskStart: 0, maskEnd: 0 }
        ];

        const { container } = render(<GradientBlur layers={extremeLayers} />);

        const blurLayers = container.querySelectorAll('[data-testid^="gradient-blur-layer-"]');
        expect(blurLayers.length).toBe(2);
        const firstLayer = blurLayers[0] as HTMLElement;
        expect(firstLayer.style.backdropFilter).toBe('blur(100px)');
    });
});