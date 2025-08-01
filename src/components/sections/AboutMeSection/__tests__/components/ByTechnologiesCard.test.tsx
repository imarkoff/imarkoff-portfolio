import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import "@testing-library/jest-dom/vitest";
import ByTechnologiesCard from '../../components/ByTechnologiesCard';
import TechnologyCategory, {TechnologiesByCategory} from '@/lib/models/types/TechnologyCategory';

vi.mock('@/components/sections/AboutMeSection/components/ByTechnologiesScroll', () => ({
    default: () => <div data-testid="by-technologies-scroll" />
}));

vi.mock('@/lib/constants/technologyCategoryMetadata', () => ({
    default: {
        frontend: { name: 'Frontend', icon: 'MonitorIcon' },
        backend: { name: 'Backend', icon: 'ServerIcon' },
        database: { name: 'Database', icon: 'DatabaseIcon' },
    }
}));

vi.mock('@/components/icons/IconMap', () => ({
    default: {
        MonitorIcon: () => <div data-testid="monitor-icon" />,
        ServerIcon: () => <div data-testid="server-icon" />,
        DatabaseIcon: () => <div data-testid="database-icon" />,
    }
}));

vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} data-testid="next-image" />
}));

describe('ByTechnologiesCard', () => {
    const mockTechnologies: TechnologiesByCategory[] = [
        {
            categoryName: TechnologyCategory.Frontend,
            techs: [
                { id: 'react', name: 'React', slug: 'react', iconUrl: '/icons/react.png', category: null, description: null },
                { id: 'typescript', name: 'TypeScript', slug: 'typescript', iconUrl: null, category: null, description: null }
            ]
        },
        {
            categoryName: TechnologyCategory.Backend,
            techs: [
                { id: 'nodejs', name: 'Node.js', slug: 'nodejs', iconUrl: '/icons/nodejs.png', category: null, description: null },
            ]
        }
    ];

    it('displays section title correctly', () => {
        render(<ByTechnologiesCard technologies={mockTechnologies} />);
        expect(screen.getByText('By technologies:')).toBeInTheDocument();
    });

    it('renders all technology categories from provided data', () => {
        render(<ByTechnologiesCard technologies={mockTechnologies} />);
        expect(screen.getByText('Frontend')).toBeInTheDocument();
        expect(screen.getByText('Backend')).toBeInTheDocument();
    });

    it('lists all technologies within their respective categories', () => {
        render(<ByTechnologiesCard technologies={mockTechnologies} />);
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    it('shows icons for technologies that have iconUrl property', () => {
        render(<ByTechnologiesCard technologies={mockTechnologies} />);

        const images = screen.getAllByTestId('next-image');
        expect(images.length).toBe(2);

        const reactImage = images.find(img => img.getAttribute('alt') === 'React');
        expect(reactImage).toHaveAttribute('src', '/icons/react.png');

        const nodeImage = images.find(img => img.getAttribute('alt') === 'Node.js');
        expect(nodeImage).toHaveAttribute('src', '/icons/nodejs.png');
    });

    it('gracefully handles technologies without iconUrl', () => {
        render(<ByTechnologiesCard technologies={mockTechnologies} />);
        expect(screen.getByText('TypeScript')).toBeInTheDocument();

        const images = screen.getAllByTestId('next-image');
        const typescriptImage = images.find(img => img.getAttribute('alt') === 'TypeScript');
        expect(typescriptImage).toBeUndefined();
    });

    it('handles empty technologies array without errors', () => {
        render(<ByTechnologiesCard technologies={[]} />);
        expect(screen.getByText('By technologies:')).toBeInTheDocument();
        expect(screen.queryByText('Frontend')).not.toBeInTheDocument();
        expect(screen.queryByText('Backend')).not.toBeInTheDocument();
    });

    it('renders category icons based on metadata', () => {
        render(<ByTechnologiesCard technologies={mockTechnologies} />);
        expect(screen.getByTestId('monitor-icon')).toBeInTheDocument();
        expect(screen.getByTestId('server-icon')).toBeInTheDocument();
    });

    it('renders a category with no technologies', () => {
        const technologiesWithEmptyCategory: TechnologiesByCategory[] = [
            {
                categoryName: TechnologyCategory.Frontend,
                techs: []
            }
        ];

        render(<ByTechnologiesCard technologies={technologiesWithEmptyCategory} />);
        expect(screen.getByText('Frontend')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
    });
});