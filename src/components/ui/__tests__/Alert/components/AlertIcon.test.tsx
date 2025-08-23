import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import AlertIcon from '../../../Alert/components/AlertIcon';
import { AlertType } from '../../../Alert/types';
import { DEFAULT_ICONS } from '../../../Alert/constants';
import iconMap from "@/components/icons/IconMap";

const CustomIcon = vi.fn(() => <svg data-testid="custom-icon" />);

vi.mock('@/components/icons/IconMap', async () => {
    const { DEFAULT_ICONS } = await import('../../../Alert/constants');

    return {
        default: {
            [DEFAULT_ICONS.success]: vi.fn(() => <svg data-testid="success-icon" />),
            [DEFAULT_ICONS.error]: vi.fn(() => <svg data-testid="error-icon" />),
            [DEFAULT_ICONS.warning]: vi.fn(() => <svg data-testid="warning-icon" />),
            [DEFAULT_ICONS.info]: vi.fn(() => <svg data-testid="info-icon" />),
        },
    };
});

describe('AlertIcon', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should not render anything when Icon prop is false', () => {
        const { container } = render(<AlertIcon Icon={false} />);

        expect(container.firstChild).toBeNull();
    });

    it('should not render anything when neither type nor Icon are provided', () => {
        const { container } = render(<AlertIcon />);

        expect(container.firstChild).toBeNull();
    });

    it('should render a custom icon when provided', () => {
        render(<AlertIcon Icon={CustomIcon} type="info" />);

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
        const wrapper = screen.getByTestId('custom-icon').parentElement;
        expect(wrapper).toHaveClass('icon-wrapper');
        expect(CustomIcon).toHaveBeenCalledWith(
            { className: 'icon' },
            undefined
        );
    });

    it.each([
        ['success' as AlertType, 'success-icon'],
        ['error' as AlertType, 'error-icon'],
        ['warning' as AlertType, 'warning-icon'],
        ['info' as AlertType, 'info-icon'],
    ])('should render the default icon for type "%s"', (type, testId) => {
        render(<AlertIcon type={type} />);

        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('should pass the "icon" className to the rendered icon component', () => {
        const SuccessIcon = iconMap[DEFAULT_ICONS.success];

        render(<AlertIcon type="success" />);

        expect(SuccessIcon).toHaveBeenCalledWith(
            { className: 'icon' },
            undefined
        );
    });

    it('should prioritize the custom Icon prop over the type-based default icon', () => {
        render(<AlertIcon type="success" Icon={CustomIcon} />);

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('success-icon')).not.toBeInTheDocument();
    });
});