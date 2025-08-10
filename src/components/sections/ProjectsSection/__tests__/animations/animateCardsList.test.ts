import { vi, describe, it, expect, beforeEach } from 'vitest';
import animateCardsList from '../../animations/animateCardsList';
import animateCardStacking from '../../animations/animateCardStacking';
import animateRootGradient from '../../animations/animateRootGradient';
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';

vi.mock('../../animations/animateCardStacking', () => ({
    default: vi.fn()
}));

vi.mock('../../animations/animateRootGradient', () => ({
    default: vi.fn()
}));

describe('animateCardsList', () => {
    const mockProjects = projectFixtures.slice(0, 3);
    const mockCards = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
    ] as unknown as NodeListOf<Element>;
    const mockScope = document.createElement('section');

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls animation functions for each card in the list', () => {
        animateCardsList(mockCards, mockProjects, mockScope);

        expect(animateCardStacking).toHaveBeenCalledTimes(mockCards.length);
        expect(animateRootGradient).toHaveBeenCalledTimes(mockCards.length);
    });

    it('calls animateCardStacking with correct parameters for each card', () => {
        animateCardsList(mockCards, mockProjects, mockScope);

        const lastCard = mockCards[mockCards.length - 1];

        expect(animateCardStacking).toHaveBeenCalledWith(mockCards[0], 0, 2, lastCard);
        expect(animateCardStacking).toHaveBeenCalledWith(mockCards[1], 1, 1, lastCard);
        expect(animateCardStacking).toHaveBeenCalledWith(mockCards[2], 2, 0, lastCard);
    });

    it('calls animateRootGradient with correct parameters for each card', () => {
        animateCardsList(mockCards, mockProjects, mockScope);

        expect(animateRootGradient).toHaveBeenCalledWith(mockProjects[0], null, mockScope, mockCards[0], 0);
        expect(animateRootGradient).toHaveBeenCalledWith(mockProjects[1], mockProjects[0], mockScope, mockCards[1], 1);
        expect(animateRootGradient).toHaveBeenCalledWith(mockProjects[2], mockProjects[1], mockScope, mockCards[2], 2);
    });

    it('does not call animation functions for an empty list of cards', () => {
        const emptyCards = [] as unknown as NodeListOf<Element>;
        animateCardsList(emptyCards, [], mockScope);

        expect(animateCardStacking).not.toHaveBeenCalled();
        expect(animateRootGradient).not.toHaveBeenCalled();
    });
});