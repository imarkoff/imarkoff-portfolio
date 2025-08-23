import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import NumberIncrement from '../NumberIncrement';

vi.mock('gsap', () => ({
    default: {
        registerPlugin: vi.fn(),
        to: vi.fn().mockReturnValue({})
    }
}));

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {
        create: vi.fn()
    }
}));

vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn(cb => cb())
}));

vi.mock('@/utils/getDecimalPlaces', () => ({
    default: (num) => {
        const str = num.toString();
        return str.includes('.') ? str.split('.')[1].length : 0;
    }
}));

describe('NumberIncrement', () => {
    it('initializes with finalValue for progressive enhancement', () => {
        render(<NumberIncrement initialValue={0} finalValue={100} />);
        expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('displays proper accessibility label with initial and final values', () => {
        render(<NumberIncrement initialValue={5} finalValue={10} />);
        expect(screen.getByLabelText('Number increment from 5 to 10')).toBeInTheDocument();
    });

    it('formats value with auto precision based on maximum decimal places', () => {
        render(<NumberIncrement initialValue={5.25} finalValue={10.5} />);
        expect(screen.getByText('10.50')).toBeInTheDocument();
    });

    it('formats value with explicitly specified precision', () => {
        render(<NumberIncrement initialValue={5} finalValue={10} precision={3} />);
        expect(screen.getByText('10.000')).toBeInTheDocument();
    });

    it('handles negative values correctly', () => {
        render(<NumberIncrement initialValue={-10} finalValue={-5.5} />);
        expect(screen.getByText('-5.5')).toBeInTheDocument();
    });

    it('formats zero values with appropriate precision', () => {
        render(<NumberIncrement initialValue={0} finalValue={0} precision={2} />);
        expect(screen.getByText('0.00')).toBeInTheDocument();
    });

    it('uses highest precision between initial and final values when auto', () => {
        render(<NumberIncrement initialValue={10.123} finalValue={20.1} />);
        expect(screen.getByText('20.100')).toBeInTheDocument();
    });

    it('handles very large numbers without losing precision', () => {
        render(<NumberIncrement initialValue={1000000} finalValue={2000000} />);
        expect(screen.getByText('2000000')).toBeInTheDocument();
    });

    it('maintains precision for very small decimal numbers', () => {
        render(<NumberIncrement initialValue={0.0001} finalValue={0.0002} />);
        expect(screen.getByText('0.0002')).toBeInTheDocument();
    });

    it('works with mixed negative and positive values', () => {
        render(<NumberIncrement initialValue={-10} finalValue={10} />);
        expect(screen.getByText('10')).toBeInTheDocument();
    });
});