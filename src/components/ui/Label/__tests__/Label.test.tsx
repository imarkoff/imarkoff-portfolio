import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Label from '../Label';

describe('Label', () => {
    it('renders with default properties', () => {
        const labelText = 'Default Label';
        const { container } = render(<Label>{labelText}</Label>);

        expect(screen.getByText(labelText)).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('bg-on-surface');
        expect(container.firstChild).toHaveClass('text-primary');
    });

    it('renders with icon', () => {
        const labelText = 'Label with icon';
        const testIcon = <span data-testid="test-icon">★</span>;

        render(<Label icon={testIcon}>{labelText}</Label>);

        expect(screen.getByText(labelText)).toBeInTheDocument();
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('applies green color scheme', () => {
        const { container } = render(<Label color="green">Green Label</Label>);

        expect(container.firstChild).toHaveClass('bg-green-tinted');
        expect(container.firstChild).toHaveClass('text-green-filled');
        expect(container.firstChild).not.toHaveClass('bg-on-surface');
    });

    it('applies red color scheme', () => {
        const { container } = render(<Label color="red">Red Label</Label>);

        expect(container.firstChild).toHaveClass('bg-red-tinted');
        expect(container.firstChild).toHaveClass('text-red-filled');
    });

    it('applies yellow color scheme', () => {
        const { container } = render(<Label color="yellow">Yellow Label</Label>);

        expect(container.firstChild).toHaveClass('bg-yellow-tinted');
        expect(container.firstChild).toHaveClass('text-yellow-filled');
    });

    it('applies rounded corners', () => {
        const { container } = render(<Label rounded>Rounded Label</Label>);

        expect(container.firstChild).toHaveClass('rounded-full');
    });

    it('applies custom className', () => {
        const customClass = 'my-custom-class';
        const { container } = render(<Label className={customClass}>Custom Class Label</Label>);

        expect(container.firstChild).toHaveClass(customClass);
        expect(container.firstChild).toHaveClass('border'); // Still has default classes
    });

    it('passes additional HTML attributes', () => {
        const testId = 'test-label-id';
        const title = 'Label title attribute';

        render(<Label data-testid={testId} title={title}>Label with attributes</Label>);

        const label = screen.getByTestId(testId);
        expect(label).toHaveAttribute('title', title);
    });
});