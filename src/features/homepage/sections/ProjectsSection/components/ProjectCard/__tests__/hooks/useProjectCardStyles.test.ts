import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useProjectCardStyles from '../../hooks/useProjectCardStyles';
import Project from '@/lib/models/Project';

describe('useProjectCardStyles', () => {
    it('returns correct styles when project colors are provided', () => {
        const mockColors: Project['colors'] = {
            primaryHue: 200,
            background: 'linear-gradient(to right, red, blue)',
        };

        const { result } = renderHook(() => useProjectCardStyles(mockColors));

        expect(result.current).toEqual({
            '--primary-hue': 200,
            '--color-primary': 'hsla(200, 68%, 95%, 1)',
            '--color-active-filled': 'hsla(200, 76%, 60%, 1)',
            '--color-on-active-filled': 'hsla(200, 31%, 20%, 1)',
            '--color-active-filled-hover': 'hsla(200, 82%, 75%, 1)',
            '--color-active-filled-disabled': 'hsla(200, 79%, 68%, 0.5)',
            background: 'linear-gradient(to right, red, blue), var(--color-background)',
            borderColor: 'hsla(200, 76%, 60%, 1)',
            boxShadow: '0px 6px 40px 0px hsla(200, 76%, 60%, 0.1)',
        });
    });

    it('returns fallback styles when project colors are not provided', () => {
        const mockColors: Project['colors'] = null;

        const { result } = renderHook(() => useProjectCardStyles(mockColors));

        expect(result.current).toEqual({
            '--primary-hue': undefined,
            '--color-primary': undefined,
            '--color-active-filled': undefined,
            '--color-on-active-filled': undefined,
            '--color-active-filled-hover': undefined,
            '--color-active-filled-disabled': undefined,
            background: 'var(--color-background)',
            borderColor: undefined,
            boxShadow: '0px 6px 40px 0px rgba(0, 0, 0, 0.1)',
        });
    });

    it('returns fallback styles when project colors object is empty', () => {
        const mockColors = {} as Project['colors'];

        const { result } = renderHook(() => useProjectCardStyles(mockColors));

        expect(result.current).toEqual({
            '--primary-hue': undefined,
            '--color-primary': undefined,
            '--color-active-filled': undefined,
            '--color-on-active-filled': undefined,
            '--color-active-filled-hover': undefined,
            '--color-active-filled-disabled': undefined,
            background: 'var(--color-background)',
            borderColor: undefined,
            boxShadow: '0px 6px 40px 0px rgba(0, 0, 0, 0.1)',
        });
    });

    it('returns correct styles when only primaryHue is provided', () => {
        const mockProject: Project['colors'] = {
            primaryHue: 250,
            background: null,
        };

        const { result } = renderHook(() => useProjectCardStyles(mockProject));

        expect(result.current).toEqual({
            '--primary-hue': 250,
            '--color-primary': 'hsla(250, 68%, 95%, 1)',
            '--color-active-filled': 'hsla(250, 76%, 60%, 1)',
            '--color-on-active-filled': 'hsla(250, 31%, 20%, 1)',
            '--color-active-filled-hover': 'hsla(250, 82%, 75%, 1)',
            '--color-active-filled-disabled': 'hsla(250, 79%, 68%, 0.5)',
            background: 'var(--color-background)',
            borderColor: 'hsla(250, 76%, 60%, 1)',
            boxShadow: '0px 6px 40px 0px hsla(250, 76%, 60%, 0.1)',
        });
    });

    it('returns correct styles when only background is provided', () => {
        const mockProject: Project['colors'] = {
                primaryHue: undefined as unknown as number,
                background: 'red',
        };

        const { result } = renderHook(() => useProjectCardStyles(mockProject));

        expect(result.current).toEqual({
            '--primary-hue': undefined,
            '--color-primary': undefined,
            '--color-active-filled': undefined,
            '--color-on-active-filled': undefined,
            '--color-active-filled-hover': undefined,
            '--color-active-filled-disabled': undefined,
            background: 'red, var(--color-background)',
            borderColor: undefined,
            boxShadow: '0px 6px 40px 0px rgba(0, 0, 0, 0.1)',
        });
    });
});