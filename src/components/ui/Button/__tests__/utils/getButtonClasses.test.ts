import {describe, it, expect} from "vitest";
import getButtonClasses from "../../utils/getButtonClasses";

describe('getButtonClasses', () => {
    it('returns button class by default', () => {
        const result = getButtonClasses({});

        expect(result).toContain('button');
        expect(result).toContain('secondary');
        expect(result).toContain('size-medium');
    });

    it('applies size class', () => {
        const result = getButtonClasses({ size: 'small' });

        expect(result).toContain('size-small');
        expect(result).not.toContain('size-medium');
    });

    it('applies variant class', () => {
        const result = getButtonClasses({ variant: 'primary' });

        expect(result).toContain('primary');
        expect(result).not.toContain('secondary');
        expect(result).not.toContain('tertiary');
    });

    it('applies color class', () => {
        const result = getButtonClasses({ color: 'success' });

        expect(result).toContain('success');
        expect(result).not.toContain('warning');
        expect(result).not.toContain('error');
    });

    it('applies loading class', () => {
        const result = getButtonClasses({ isLoading: true });

        expect(result).toContain('loading');
    });

    it('applies icon-only class', () => {
        const result = getButtonClasses({ isIconButton: true });

        expect(result).toContain('icon-only');
    });

    it('applies active class', () => {
        const result = getButtonClasses({ active: true });

        expect(result).toContain('active');
    });

    it('applies custom className', () => {
        const customClass = 'custom-class';
        const result = getButtonClasses({ className: customClass });

        expect(result).toContain(customClass);
    });

    it('combines multiple classes', () => {
        const result = getButtonClasses({
            size: 'small',
            variant: 'primary',
            color: 'error',
            isLoading: true,
            isIconButton: true,
            active: true,
            className: 'custom-class'
        });

        expect(result).toContain('size-small');
        expect(result).toContain('primary');
        expect(result).toContain('error');
        expect(result).toContain('loading');
        expect(result).toContain('icon-only');
        expect(result).toContain('active');
        expect(result).toContain('custom-class');
    });
});