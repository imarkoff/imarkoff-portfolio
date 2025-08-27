import {renderHook, act} from "@testing-library/react";
import {vi, describe, it, beforeEach, expect} from "vitest";
import {useForm, UseFormReturn} from "react-hook-form";
import useContactRequestForm from "../../hooks/useContactRequestForm";
import {BaseSyntheticEvent} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";

vi.mock('react-hook-form', () => ({
    useForm: vi.fn(),
}));

vi.mock('@hookform/resolvers/zod', () => ({
    zodResolver: vi.fn((schema) => schema),
}));

describe('useContactRequestForm', () => {
    const mockSubmitHandler = vi.fn();
    const mockReactHookFormHandleSubmit = vi.fn((callback) => (
        async (e: BaseSyntheticEvent) => {
            e?.preventDefault();
            const mockData = {name: 'John Doe', email: 'john.doe@example.com', message: 'Hello'};
            await callback(mockData);
        }
    ));

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useForm).mockReturnValue({
            handleSubmit: mockReactHookFormHandleSubmit,
            formState: {},
            control: {},
        } as unknown as UseFormReturn);
    });

    it('calls onSubmit when the form is submitted and is not currently submitting or successful', async () => {
        const {result} = renderHook(() =>
            useContactRequestForm(mockSubmitHandler, false, false)
        );
        await act(async () => {
            await result.current.handleSubmit();
        });

        expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
        expect(mockSubmitHandler).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john.doe@example.com',
            message: 'Hello'
        });
    });

    it('does not call onSubmit when the form is already submitting', async () => {
        const {result} = renderHook(() =>
            useContactRequestForm(mockSubmitHandler, true, false)
        );
        await act(async () => {
            await result.current.handleSubmit();
        });

        expect(mockSubmitHandler).not.toHaveBeenCalled();
    });

    it('does not call onSubmit when the form submission was already successful', async () => {
        const {result} = renderHook(() =>
            useContactRequestForm(mockSubmitHandler, false, true)
        );
        await act(async () => {
            await result.current.handleSubmit();
        });

        expect(mockSubmitHandler).not.toHaveBeenCalled();
    });

    it('does not call onSubmit when the form is submitting and was also successful', async () => {
        const {result} = renderHook(() =>
            useContactRequestForm(mockSubmitHandler, true, true)
        );
        await act(async () => {
            await result.current.handleSubmit();
        });

        expect(mockSubmitHandler).not.toHaveBeenCalled();
    });

    it('uses the zodResolver with the ContactRequestDto', () => {
        renderHook(() =>
            useContactRequestForm(mockSubmitHandler, false, false)
        );

        expect(useForm).toHaveBeenCalledWith({
            resolver: ContactRequestDto, // mocked zodResolver returns the schema directly
        });
        expect(zodResolver).toHaveBeenCalledOnce();
    });
});