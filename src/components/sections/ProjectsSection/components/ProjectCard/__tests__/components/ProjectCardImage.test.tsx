import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import ProjectCardImage from '../../components/ProjectCardImage';
import Project from '@/lib/models/Project';

vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} alt={props.alt} />,
}));

vi.mock('@/components/ui/Typography', () => ({
    Typography: ({ children, component: Component = 'div', ...props }: any) => (
        <Component {...props}>{children}</Component>
    ),
}));

describe('ProjectCardImage', () => {
    const mockHeroImage: Project['heroImage'] = {
        src: '/path/to/image.jpg',
        alt: 'An awesome project image',
        width: 1600,
        height: 900,
    };

    it('renders the image with correct attributes and calculated dimensions', () => {
        render(<ProjectCardImage heroImage={mockHeroImage} />);

        const image = screen.getByRole('img', { name: mockHeroImage.alt });
        const expectedWidth = 1080;
        const expectedHeight = (expectedWidth / mockHeroImage.width) * mockHeroImage.height; // 607.5

        expect(image).toHaveAttribute('src', mockHeroImage.src);
        expect(image).toHaveAttribute('width', String(expectedWidth));
        expect(image).toHaveAttribute('height', String(expectedHeight));
        expect(image).toHaveAttribute('quality', '95');
    });

    it('renders the figcaption with the correct alt text', () => {
        render(<ProjectCardImage heroImage={mockHeroImage} />);

        const figcaption = screen.getByText(mockHeroImage.alt);
        expect(figcaption.tagName).toBe('FIGCAPTION');
    });

    it('applies correct class names to the image and caption', () => {
        render(<ProjectCardImage heroImage={mockHeroImage} />);

        const image = screen.getByRole('img');
        expect(image).toHaveClass('rounded-xl lg:rounded-none');

        const figcaption = screen.getByText(mockHeroImage.alt);
        expect(figcaption).toHaveClass(
            'lg:absolute',
            'lg:bg-on-background',
            'lg:border',
            'lg:border-border-menu'
        );
    });
});