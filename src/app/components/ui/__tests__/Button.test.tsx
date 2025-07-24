import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';
import React from 'react';
import ProgressActivityIcon from "@/app/components/icons/ProgressActivityIcon";

const TestIcon = ProgressActivityIcon;

describe('Button Component', () => {
    it('renders with default props and children', () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-on-surface');
        expect(button).toHaveClass('text-primary');
        expect(button).toHaveClass('rounded-button-md');
        expect(button).toHaveClass('py-button-md-y');
        expect(button).toHaveClass('px-button-md-x');
        expect(button).not.toBeDisabled();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Test Click</Button>);
        const button = screen.getByRole('button', { name: /test click/i });

        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders in loading state, is disabled, and shows loading text', () => {
        render(<Button isLoading>Submit</Button>);
        const button = screen.getByRole('button', { name: /submit/i });
        const spinner = screen.getByTestId('loading-spinner');

        expect(button).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('renders in disabled state when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);
        const button = screen.getByRole('button', { name: /disabled button/i });

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('renders with a left icon', () => {
        render(<Button LeftIcon={TestIcon}>With Left Icon</Button>);
        const button = screen.getByRole('button', { name: /with left icon/i });
        const leftIcon = screen.getByTestId('left-icon');
        const rightIcon = screen.queryByTestId('right-icon');

        expect(button).toBeInTheDocument();
        expect(leftIcon).toBeInTheDocument();
        expect(rightIcon).not.toBeInTheDocument();
        expect(leftIcon).toHaveClass('size-icon-md');
        expect(button).toHaveClass('pl-button-icon-md-x');
        expect(button).toHaveClass('pr-button-md-x');
    });

    it('renders with a right icon', () => {
        render(<Button RightIcon={TestIcon}>With Right Icon</Button>);
        const button = screen.getByRole('button', { name: /with right icon/i });
        const leftIcon = screen.queryByTestId('left-icon');
        const rightIcon = screen.getByTestId('right-icon');

        expect(button).toBeInTheDocument();
        expect(leftIcon).not.toBeInTheDocument();
        expect(rightIcon).toBeInTheDocument();
        expect(rightIcon).toHaveClass('size-icon-md');
        expect(button).toHaveClass('pl-button-md-x');
        expect(button).toHaveClass('pr-button-icon-md-x');
    });

    it('renders with both left and right icons', () => {
        render(<Button LeftIcon={TestIcon} RightIcon={TestIcon}>Both Icons</Button>);
        const button = screen.getByRole('button', { name: /both icons/i });
        const leftIcon = screen.getByTestId('left-icon');
        const rightIcon = screen.getByTestId('right-icon');

        expect(button).toBeInTheDocument();
        expect(leftIcon).toBeInTheDocument();
        expect(rightIcon).toBeInTheDocument();
        expect(button).toHaveClass('px-button-icon-md-x');
    });

    it('renders as an icon button (square padding)', () => {
        render(<Button isIconButton><TestIcon data-testid={'child-icon'} /></Button>);
        const button = screen.getByRole('button');
        const childIcon = screen.getByTestId('child-icon');

        expect(button).toBeInTheDocument();
        expect(childIcon).toBeInTheDocument();
        expect(button).toHaveClass('px-button-md-y');
        expect(button).toHaveClass('py-button-md-y');
        expect(button).toHaveClass('rounded-button-md');
    });

    it('renders with small size', () => {
        render(<Button size="small">Small Button</Button>);
        const button = screen.getByRole('button', { name: /small button/i });

        expect(button).toHaveClass('rounded-button-sm');
        expect(button).toHaveClass('py-button-sm-y');
        expect(button).toHaveClass('px-button-sm-x');
        expect(button).not.toHaveClass('rounded-button-md');
    });

    it('renders small icon button', () => {
        render(<Button size="small" isIconButton><TestIcon data-testid={"child-icon"} /></Button>);
        const button = screen.getByRole('button');
        const childIcon = screen.getByTestId('child-icon');

        expect(childIcon).toBeInTheDocument();
        expect(button).toHaveClass('rounded-button-sm');
        expect(button).toHaveClass('px-button-sm-y');
        expect(button).toHaveClass('py-button-sm-y');
    });

    it('renders primary variant with accent color', () => {
        render(<Button variant="primary" color="accent">Primary Accent</Button>);
        const button = screen.getByRole('button', { name: /primary accent/i });

        expect(button).toHaveClass('bg-active-filled');
        expect(button).toHaveClass('text-active-filled-text');
        expect(button).toHaveClass('focus-visible:border-active-filled');
        expect(button).not.toHaveClass('border-transparent');
    });

    it('renders tertiary variant with text color and hover background', () => {
        render(<Button variant="tertiary">Tertiary Button</Button>);
        const button = screen.getByRole('button', { name: /tertiary button/i });

        expect(button).toHaveClass('text-ghost-button-fg');
        expect(button).toHaveClass('hover:bg-ghost-button-hover-bg');
        expect(button).toHaveClass('border-transparent');
    });

    it('renders primary variant with success color', () => {
        render(<Button variant="primary" color="success">Primary Success</Button>);
        const button = screen.getByRole('button', { name: /primary success/i });

        expect(button).toHaveClass('bg-green-filled');
        expect(button).toHaveClass('hover:bg-green-filled-hover');
        expect(button).toHaveClass('text-active-filled-text');
    });

    it('renders secondary variant with error color', () => {
        render(<Button variant="secondary" color="error">Secondary Error</Button>);
        const button = screen.getByRole('button', { name: /secondary error/i });

        expect(button).toHaveClass('bg-red-tinted');
        expect(button).toHaveClass('hover:bg-red-tinted-hover');
        expect(button).toHaveClass('text-primary');
    });

    it('custom className does not override existing styles', () => {
        render(<Button className="custom-style">Custom Button</Button>);
        const button = screen.getByRole('button', { name: /custom button/i });

        expect(button).toHaveClass('custom-style');
        expect(button).toHaveClass('bg-on-surface');
    });
});
