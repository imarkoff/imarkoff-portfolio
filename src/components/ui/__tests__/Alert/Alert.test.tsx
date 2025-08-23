import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Alert, { AlertProps } from '../../Alert';
import { AlertType } from '../../Alert/types';
import AlertIcon, {AlertIconProps} from "../../Alert/components/AlertIcon";

vi.mock('../../Alert/components/AlertIcon', () => ({
    default: vi.fn(),
}));

describe('Alert', () => {
    const defaultProps: AlertProps = {
        message: 'This is a test message.',
    };

    it('should render the alert with the provided message', () => {
        render(<Alert {...defaultProps} />);
        expect(screen.getByText('This is a test message.')).toBeInTheDocument();
    });

    it('should render complex ReactNode messages', () => {
        const complexMessage = (
            <span>
                This is a <strong>complex</strong> message.
            </span>
        );
        render(<Alert message={complexMessage} />);
        expect(screen.getByText('complex', { selector: 'strong' })).toBeInTheDocument();
        expect(screen.getByText(/This is a/)).toBeInTheDocument();
    });

    it('should apply the base class "alert"', () => {
        const { container } = render(<Alert {...defaultProps} />);
        expect(container.firstChild).toHaveClass('alert');
    });

    it('should set the role attribute to "alert"', () => {
        render(<Alert {...defaultProps} />);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it.each([
        ['success'], ['error'], ['warning'], ['info']
    ] as [AlertType][])('should set the data-type attribute to "%s" when type is %s', (type) => {
        render(<Alert {...defaultProps} type={type} />);
        const alertElement = screen.getByRole('alert');
        expect(alertElement).toHaveAttribute('data-type', type);
    });

    it('should render with default icon when type is provided and Icon prop is not', () => {
        render(<Alert {...defaultProps} type="success" />);

        expect(AlertIcon).toHaveBeenCalledWith(
            {
                type: 'success',
                Icon: undefined
            } as AlertIconProps,
            undefined
        );
    });

    it('should render a custom icon when provided', () => {
        const CustomIcon = vi.fn();

        render(<Alert {...defaultProps} type="warning" Icon={CustomIcon} />);

        expect(AlertIcon).toHaveBeenCalledWith(
            {
                type: 'warning',
                Icon: CustomIcon
            } as AlertIconProps,
            undefined
        );
    });

    it('should render without a data-type attribute if type is not provided', () => {
        render(<Alert {...defaultProps} />);
        const alertElement = screen.getByRole('alert');

        expect(alertElement).not.toHaveAttribute('data-type');
    });
});