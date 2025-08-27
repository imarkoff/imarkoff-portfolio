import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useCardContentAppear from '../../hooks/useCardContentAppear';
import animateCardContentAppear from '../../animations/animateCardContentAppear';
import {ProjectCardReference} from "@/features/homepage/sections/ProjectsSection/components/ProjectCard/types";


vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn().mockImplementation((callback, { scope }) => {
        callback(); // Simulate the GSAP effect by immediately calling the callback
        return {current: scope};
    }),
}));

vi.mock('../../animations/animateCardContentAppear', () => ({
    default: vi.fn(),
}));

const mockAnimateCardContentAppear = vi.mocked(animateCardContentAppear);

describe('useCardContentAppear', () => {
    const mockIndex = 1;
    const mockReferences: ProjectCardReference['content'] = {
        className: 'card-content',
        techLabelClassName: 'tech-label',
    };

    let mockScope: HTMLDivElement;
    let mockCardContent: HTMLDivElement;
    let mockTechLabels: NodeListOf<Element>;

    beforeEach(() => {
        vi.clearAllMocks();

        document.body.innerHTML = `
            <div class="project-card-wrapper">
                <div class="${mockReferences.className}">
                    <p>Project Description</p>
                    <div class="tech-labels">
                        <span class="${mockReferences.techLabelClassName}">Tech 1</span>
                        <span class="${mockReferences.techLabelClassName}">Tech 2</span
                    </div>
                </div>
            </div>
        `;

        mockScope = document.querySelector(".project-card-wrapper") as HTMLDivElement;
        mockCardContent = document.querySelector(`.${mockReferences.className}`) as HTMLDivElement;
        mockTechLabels = document.querySelectorAll(`.${mockReferences.techLabelClassName}`) as NodeListOf<Element>;
    });

    it('calls animateCardContentAppear when references and elements are available', () => {
        const cardRef = { current: mockScope };
        renderHook(() => useCardContentAppear(cardRef, mockReferences, mockIndex));

        expect(mockAnimateCardContentAppear).toHaveBeenCalledWith(
            mockCardContent,
            mockTechLabels,
            mockIndex
        );
    });

    it('does not call animateCardContentAppear when references are not provided', () => {
        const cardRef = { current: mockScope };

        renderHook(() => useCardContentAppear(cardRef, undefined, mockIndex));

        expect(mockAnimateCardContentAppear).not.toHaveBeenCalled();
    });

    it('does not call animateCardContentAppear when card content element is not found', () => {
        mockScope.removeChild(mockCardContent);
        const cardRef = { current: mockScope };

        renderHook(() => useCardContentAppear(cardRef, mockReferences, mockIndex));

        expect(mockAnimateCardContentAppear).not.toHaveBeenCalled();
    });
});