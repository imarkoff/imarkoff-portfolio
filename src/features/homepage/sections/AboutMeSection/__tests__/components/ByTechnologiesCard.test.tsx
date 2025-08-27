import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import "@testing-library/jest-dom/vitest";
import ByTechnologiesCard from '../../components/ByTechnologiesCard';
import TechnologyCategory, {TechnologiesSlugsByCategory} from '@/lib/models/types/TechnologyCategory';

vi.mock('../../components/ByTechnologiesScroll', () => ({
    default: vi.fn(() => <div data-testid="by-technologies-scroll" />)
}));

vi.mock('@/components/ui/TechnologyLabel', () => ({
    SSGSlugTechnologyLabel: vi.fn(({technologySlug}) => (<div>{technologySlug}</div>))
}));

vi.mock('@/lib/constants/technologyCategoryMetadata', () => ({
    default: {
        frontend: { name: 'Frontend', icon: 'MonitorIcon' },
        backend: { name: 'Backend', icon: 'ServerIcon' },
        database: { name: 'Database', icon: 'DatabaseIcon' },
    }
}));

vi.mock('@/components/icons/utils/iconMap', () => ({
    default: {
        MonitorIcon: () => <div data-testid="monitor-icon" />,
        ServerIcon: () => <div data-testid="server-icon" />,
        DatabaseIcon: () => <div data-testid="database-icon" />,
    }
}));

vi.mock('next/image', () => ({
    default: vi.fn(({ src, alt }) => <img src={src} alt={alt} data-testid="next-image" />)
}));

describe('ByTechnologiesCard', () => {
    const mockTechnologies: TechnologiesSlugsByCategory[] = [
        {
            categoryName: TechnologyCategory.Frontend,
            techs: ["react", "vue", "angular"]
        },
        {
            categoryName: TechnologyCategory.Backend,
            techs: ["node", "python", "java"]
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

        expect(screen.getByText('react')).toBeInTheDocument();
        expect(screen.getByText('vue')).toBeInTheDocument();
        expect(screen.getByText('java')).toBeInTheDocument();
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
        const technologiesWithEmptyCategory: TechnologiesSlugsByCategory[] = [
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