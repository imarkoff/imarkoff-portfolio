import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {FormState} from "react-hook-form";
import "@testing-library/jest-dom/vitest";
import FormField, {FormFieldProps} from "@/components/ui/FormField";
import {Button, ButtonProps} from "@/components/ui/Button";
import Alert, {AlertProps} from "@/components/ui/Alert";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";
import ContactForm from '../../components/ContactForm';
import useSendContactRequestApi from "../../hooks/lib/useSendContactRequestApi";
import useContactRequestForm, {UseContactRequestFormReturn} from "../../hooks/useContactRequestForm";
import useAnimateForm from "../../hooks/useAnimateForm";
import {SUCCESS_MESSAGE, UNKNOWN_ERROR_MESSAGE} from "../../constants";

vi.mock('@/components/ui/Card', () => ({
    default: vi.fn(props => <div {...props} />),
}));
vi.mock('@/components/ui/FormField/FormField', () => ({
    default: vi.fn(),
}));
vi.mock('@/components/ui/FormField/TextArea', () => ({
    default: vi.fn(),
}));
vi.mock('@/components/ui/Typography', () => ({
    TypographyIcon: vi.fn(props => <span {...props} />),
}));
vi.mock('@/components/ui/Button', () => ({
    Button: vi.fn(({children}) => <button>{children}</button>),
}));
vi.mock('@/components/ui/Alert', () => ({
    default: vi.fn(props => <div {...props} />),
}));

vi.mock('../../hooks/lib/useSendContactRequestApi', () => ({
    default: vi.fn(),
}));
vi.mock('../../hooks/useContactRequestForm', () => ({
    default: vi.fn(),
}));
vi.mock('../../hooks/useAnimateForm', () => ({
    default: vi.fn(),
}));

const mockUseSendContactRequestApi = vi.mocked(useSendContactRequestApi);
const mockUseContactRequestForm = vi.mocked(useContactRequestForm);
const mockUseAnimateForm = vi.mocked(useAnimateForm);

const expectDisabledFields = () => {
    expect(FormField).toHaveBeenCalledWith(
        expect.objectContaining<FormFieldProps<'input'>>({
            disabled: true
        }),
        undefined
    );
    expect(FormField).not.toHaveBeenCalledWith(
        expect.objectContaining<FormFieldProps<'input'>>({
            disabled: false
        }),
        undefined
    );
    expect(FormField).toHaveBeenCalledWith(
        expect.objectContaining<FormFieldProps<'textarea'>>({
            disabled: true
        }),
        undefined
    );
    expect(Button).toHaveBeenCalledWith(
        expect.objectContaining<ButtonProps>({
            disabled: true
        }),
        undefined
    );
};

const mockFormState: FormState<ContactRequestDto> = {
    errors: {},
    isDirty: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    isSubmitting: false,
    isValid: true,
    isValidating: false,
    submitCount: 0,
    isLoading: false,
    dirtyFields: {},
    touchedFields: {},
    disabled: false,
    validatingFields: {},
    isReady: true,
};

describe('ContactForm', () => {
    const mockHandleSubmit = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseSendContactRequestApi.mockReturnValue({
            isSendingContactRequest: false,
            isContactRequestResponse: false,
            contactRequestError: null,
            sendContactRequest: vi.fn(),
        });
        mockUseContactRequestForm.mockReturnValue({
            handleSubmit: mockHandleSubmit,
            register: vi.fn(),
            formState: mockFormState,
        } as unknown as UseContactRequestFormReturn);
    });

    it('renders the form with all fields and a submit button', () => {
        render(<ContactForm />);

        expect(FormField).toHaveBeenCalledTimes(3);
        expect(Button).toHaveBeenCalledTimes(1);
        expect(FormField).toHaveBeenCalledWith(
            expect.objectContaining<FormFieldProps<'input'>>({
                id: 'contact-name',
                label: 'Your Name',
                autoComplete: 'name'
            }),
            undefined
        );
        expect(FormField).toHaveBeenCalledWith(
            expect.objectContaining<FormFieldProps<'input'>>({
                id: 'contact-email',
                label: 'Your Email',
                type: 'email',
                autoComplete: 'email'
            }),
            undefined
        );
        expect(FormField).toHaveBeenCalledWith(
            expect.objectContaining<FormFieldProps<'textarea'>>({
                id: 'contact-message',
                label: 'Your Message',
                as: 'textarea'
            }),
            undefined
        );
        expect(Button).toHaveBeenCalledWith(
            expect.objectContaining({
                children: 'Send Message',
                type: 'submit'
            }),
            undefined
        );
    });

    it('calls the animation hook on render', () => {
        render(<ContactForm />);

        expect(mockUseAnimateForm).toHaveBeenCalled();
    });

    it('calls handleSubmit when the form is submitted', () => {
        const {container} = render(<ContactForm />);
        const form = container.querySelector('form');
        fireEvent.submit(form!);

        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('disables all fields and shows loading state on button when sending', () => {
        mockUseSendContactRequestApi.mockReturnValue({
            sendContactRequest: vi.fn(),
            isSendingContactRequest: true,
            isContactRequestResponse: false,
            contactRequestError: null,
        });

        render(<ContactForm />);

        expectDisabledFields();
        expect(Button).toHaveBeenCalledWith(
            expect.objectContaining<ButtonProps>({
                loading: true
            }),
            undefined
        );
    });

    it('displays a success message and disables fields on successful submission', () => {
        mockUseSendContactRequestApi.mockReturnValue({
            sendContactRequest: vi.fn(),
            isSendingContactRequest: false,
            isContactRequestResponse: true,
            contactRequestError: null,
        });

        render(<ContactForm />);

        expect(screen.getByTestId('contact-success-message')).toBeInTheDocument();
        expect(Alert).toHaveBeenCalledWith(
            expect.objectContaining<AlertProps>({
                message: SUCCESS_MESSAGE,
                type: 'success'
            }),
            undefined
        );
        expectDisabledFields();
    });

    it('displays an error message on submission failure', () => {
        const errorMessage = 'Something went wrong.';
        mockUseSendContactRequestApi.mockReturnValue({
            sendContactRequest: vi.fn(),
            isSendingContactRequest: false,
            isContactRequestResponse: false,
            contactRequestError: new Error(errorMessage),
        });

        render(<ContactForm />);

        expect(screen.getByTestId('contact-error-message')).toBeInTheDocument();
        expect(Alert).toHaveBeenCalledWith(
            expect.objectContaining<AlertProps>({
                message: errorMessage,
                type: 'error'
            }),
            undefined
        );
        expect(screen.getByRole('button', { name: 'Send Message' })).not.toBeDisabled();
    });

    it('displays unknown error message if error has no message', () => {
        mockUseSendContactRequestApi.mockReturnValue({
            sendContactRequest: vi.fn(),
            isSendingContactRequest: false,
            isContactRequestResponse: false,
            contactRequestError: new Error()
        });

        render(<ContactForm />);

        expect(screen.getByTestId('contact-error-message')).toBeInTheDocument();
        expect(Alert).toHaveBeenCalledWith(
            expect.objectContaining<AlertProps>({
                message: UNKNOWN_ERROR_MESSAGE,
                type: 'error'
            }),
            undefined
        );
    });

    it('displays validation errors for fields', () => {
        mockUseContactRequestForm.mockReturnValue({
            handleSubmit: vi.fn(),
            register: vi.fn(),
            formState: {
                ...mockFormState,
                errors: {
                    name: {
                        type: 'required',
                        message: 'Name is required'
                    },
                    email: {
                        type: 'pattern',
                        message: 'Email is invalid'
                    },
                    message: {
                        type: 'maxLength',
                        message: 'Message exceeds maximum length'
                    }
                },
            },
        } as unknown as UseContactRequestFormReturn);

        render(<ContactForm />);

        expect(FormField).toHaveBeenCalledWith(
            expect.objectContaining<FormFieldProps<'input'>>({
                id: 'contact-name',
                state: 'error',
                message: 'Name is required'
            }),
            undefined
        );
        expect(FormField).toHaveBeenCalledWith(
            expect.objectContaining<FormFieldProps<'input'>>({
                id: 'contact-email',
                state: 'error',
                message: 'Email is invalid'
            }),
            undefined
        );
        expect(FormField).toHaveBeenCalledWith(
            expect.objectContaining<FormFieldProps<'textarea'>>({
                id: 'contact-message',
                state: 'error',
                message: 'Message exceeds maximum length'
            }),
            undefined
        );
    });

    it('renders a noscript tag', () => {
        const { container } = render(<ContactForm />);

        expect(container.querySelector('noscript')).toBeInTheDocument();
    });
});