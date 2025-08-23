import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";
import ProjectsHeader from '../../components/ProjectsHeader';

vi.mock('@/components/ui/Typography', () => ({
    Typography: vi.fn(({ children, variant, component }) => {
        const Tag = component || 'p';
        return (
            <Tag data-testid={`typography-${variant || 'body'}`}>
                {children}
            </Tag>
        );
    }),
    TypographyIcon: vi.fn(({ Icon }) => (
        <div data-testid="typography-icon">
            <Icon />
        </div>
    )),
}));

vi.mock('@/components/icons', () => ({
    CodeIcon: vi.fn(() => <svg data-testid="code-icon" />),
}));

describe('ProjectsHeader', () => {
    const testId = 'projects-header';

    it('renders the main heading text', () => {
        render(<ProjectsHeader id={testId} />);

        expect(screen.getByRole('heading', { name: 'Projects', level: 2 }))
            .toBeInTheDocument();
    });

    it('renders the subtitle text', () => {
        render(<ProjectsHeader id={testId} />);

        expect(screen.getByText("I've built from zero to a ready for production products."))
            .toBeInTheDocument();
    });

    it('applies the provided id to the main container', () => {
        render(<ProjectsHeader id={testId} />);

        expect(screen.getByTestId('projects-header-container'))
            .toHaveAttribute('id', testId);
    });

    it('renders the CodeIcon inside the TypographyIcon component', () => {
        render(<ProjectsHeader id={testId} />);
        const typographyIcon = screen.getByTestId('typography-icon');
        const codeIcon = screen.getByTestId('code-icon');

        expect(typographyIcon).toBeInTheDocument();
        expect(codeIcon).toBeInTheDocument();
        expect(typographyIcon).toContainElement(codeIcon);
    });
});