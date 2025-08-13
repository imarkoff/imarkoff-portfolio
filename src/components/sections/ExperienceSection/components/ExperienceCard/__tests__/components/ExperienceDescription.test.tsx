import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ExperienceDescription from '../../components/ExperienceDescription';

describe('ExperienceDescription', () => {
    it('renders multiple description points correctly', () => {
        const descriptionPoints = [
            'First point',
            'Second point',
            'Third point'
        ];

        render(<ExperienceDescription descriptionPoints={descriptionPoints} />);

        expect(screen.getAllByTestId('experience-description-paragraph')).toHaveLength(3);
        expect(screen.getByText('First point')).toBeInTheDocument();
        expect(screen.getByText('Second point')).toBeInTheDocument();
        expect(screen.getByText('Third point')).toBeInTheDocument();
    });

    it('renders empty component when no description points are provided', () => {
        const { getByTestId } = render(
            <ExperienceDescription descriptionPoints={[]} />
        );
        const descriptionDiv = getByTestId('experience-description');

        expect(descriptionDiv).toBeInTheDocument();
        expect(descriptionDiv.children).toHaveLength(0);
    });

    it('applies gradient class to the description div', () => {
        const { getByTestId } = render(
            <ExperienceDescription descriptionPoints={['Test']} />
        );
        const descriptionDiv = getByTestId('experience-description');

        expect(descriptionDiv).toHaveClass('text-gradient');
    });

    it('renders paragraphs with text-primary class', () => {
        const { getByTestId } = render(
            <ExperienceDescription descriptionPoints={['Test paragraph']} />
        );
        const paragraph = getByTestId('experience-description-paragraph');

        expect(paragraph.tagName.toLowerCase()).toBe('p');
        expect(paragraph).toHaveClass('text-primary');
    });

    it('renders strong elements with text-transparent class', () => {
        const { getByTestId } = render(
            <ExperienceDescription descriptionPoints={['Text with **strong** emphasis']} />
        );
        const strongElement = getByTestId('experience-description-strong');

        expect(strongElement.tagName.toLowerCase()).toBe('strong');
        expect(strongElement).toHaveClass('text-transparent');
    });
});