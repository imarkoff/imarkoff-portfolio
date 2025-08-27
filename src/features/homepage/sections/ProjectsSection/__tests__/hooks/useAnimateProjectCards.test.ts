import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useAnimateProjectCards from '../../hooks/useAnimateProjectCards';
import animatePinHeader from "../../animations/animatePinHeader";
import animateCardsList from "../../animations/animateCardsList";
import projectFixtures from "@/lib/test-utils/fixtures/project.fixtures";
import {mockReferences} from "@/features/homepage/sections/ProjectsSection/__tests__/mocks";

let mockGSAPCallback: null | (() => void) = null;
let mockGSAPOptions: null | { scope: any, dependencies: any } = null;

vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn((callback, options) => {
        mockGSAPCallback = callback;
        mockGSAPOptions = options;
    })
}));

vi.mock('../../animations/animatePinHeader', () => ({
    default: vi.fn()
}));

vi.mock('../../animations/animateCardsList', () => ({
    default: vi.fn()
}));

describe('useAnimateProjectCards', () => {
    const mockProjects = projectFixtures;

    beforeEach(() => {
        vi.clearAllMocks();
        mockGSAPCallback = null;
        mockGSAPOptions = null;
    });

    it('returns a ref object', () => {
        const { result } = renderHook(() => useAnimateProjectCards(mockReferences, mockProjects));

        expect(result.current).toHaveProperty('current');
    });

    it('calls useGSAP with projects as dependencies', () => {
        renderHook(() => useAnimateProjectCards(mockReferences, mockProjects));

        expect(mockGSAPOptions?.dependencies).toEqual([mockProjects]);
    });

    it('provides rootRef as scope to useGSAP', () => {
        const { result } = renderHook(() => useAnimateProjectCards(mockReferences, mockProjects));

        expect(mockGSAPOptions?.scope).toBe(result.current);
    });

    it('does not call animation functions when root element is null', () => {
        renderHook(() => useAnimateProjectCards(mockReferences, mockProjects));
        mockGSAPCallback!();

        expect(animatePinHeader).not.toHaveBeenCalled();
        expect(animateCardsList).not.toHaveBeenCalled();
    });

    it('does not call animation functions when DOM elements are missing', () => {
        const mockRoot = {
            querySelector: vi.fn().mockReturnValue(null)
        } as unknown as HTMLDivElement;

        renderHook(() => {
            const rootRef = useAnimateProjectCards(mockReferences, mockProjects);
            rootRef.current = mockRoot;
            return rootRef;
        });
        mockGSAPCallback!();

        expect(animatePinHeader).not.toHaveBeenCalled();
        expect(animateCardsList).not.toHaveBeenCalled();
    });

    it('calls animation functions when all DOM elements exist', () => {
        const mockCards = [{ element: 'card1' }, { element: 'card2' }];
        const mockCardsList = {
            querySelectorAll: vi.fn().mockReturnValue(mockCards)
        };
        const mockHeader = { element: 'header' };
        const mockRoot = {
            querySelector: vi.fn((selector) => {
                if (selector === `#${mockReferences.projectsListId}`) return mockCardsList;
                if (selector === `#${mockReferences.projectsHeaderId}`) return mockHeader;
                return null;
            })
        } as unknown as HTMLDivElement;

        renderHook(() => {
            const rootRef = useAnimateProjectCards(mockReferences, mockProjects);
            rootRef.current = mockRoot;
            return rootRef;
        });
        mockGSAPCallback?.();

        expect(animatePinHeader).toHaveBeenCalledWith(mockHeader, mockCardsList, mockCards[mockCards.length - 1]);
        expect(animateCardsList).toHaveBeenCalledWith(mockCards, mockProjects, mockRoot);
    });
});