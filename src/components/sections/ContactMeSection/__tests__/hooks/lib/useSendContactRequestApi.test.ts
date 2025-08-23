import { renderHook, act } from "@testing-library/react";
import { vi, describe, expect, it, beforeEach } from "vitest";
import useSWRMutation from "swr/mutation";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";
import apiConfig from "@/config/apiConfig";
import { sendContactRequest } from "@/lib/api/contact";
import useSendContactRequestApi from "../../../hooks/lib/useSendContactRequestApi";

vi.mock("swr/mutation");
vi.mock("@/lib/api/contact");
vi.mock("@/config/apiConfig", () => ({
    default: {
        endpoints: {
            contactMe: {
                route: "/api/contact",
            },
        },
    }
}));

const useSWRMutationMock = vi.mocked(useSWRMutation);
const sendContactRequestMock = vi.mocked(sendContactRequest);

describe('useSendContactRequestApi', () => {
    const mockTrigger = vi.fn();
    const mockReset = vi.fn();
    const contactData: ContactRequestDto = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
    };
    const mockSWRMutationResponse = {
        trigger: mockTrigger,
        isMutating: false,
        error: undefined,
        data: undefined,
        reset: mockReset
    }

    beforeEach(() => {
        vi.clearAllMocks();
        useSWRMutationMock.mockReturnValue(mockSWRMutationResponse);
    });

    it('initializes with the correct default state', () => {
        const { result } = renderHook(() => useSendContactRequestApi());

        expect(result.current.isSendingContactRequest).toBe(false);
        expect(result.current.contactRequestError).toBeUndefined();
        expect(result.current.isContactRequestResponse).toBe(false);
        expect(useSWRMutationMock).toHaveBeenCalledWith(
            apiConfig.endpoints.contactMe.route,
            sendContactRequestMock
        );
    });

    it('calls trigger with data when sendContactRequest is invoked', async () => {
        const { result } = renderHook(() => useSendContactRequestApi());
        await act(async () => {
            await result.current.sendContactRequest(contactData);
        });

        expect(mockTrigger).toHaveBeenCalledWith(contactData);
        expect(mockTrigger).toHaveBeenCalledTimes(1);
    });

    it('does not call trigger if a request is already in progress', async () => {
        useSWRMutationMock.mockReturnValue({
            ...mockSWRMutationResponse,
            isMutating: true
        });

        const { result } = renderHook(() => useSendContactRequestApi());
        await act(async () => {
            await result.current.sendContactRequest(contactData);
        });

        expect(mockTrigger).not.toHaveBeenCalled();
    });

    it('does not call trigger if a response has already been received', async () => {
        useSWRMutationMock.mockReturnValue({
            ...mockSWRMutationResponse,
            data: { success: true }
        });

        const { result } = renderHook(() => useSendContactRequestApi());
        await act(async () => {
            await result.current.sendContactRequest(contactData);
        });

        expect(mockTrigger).not.toHaveBeenCalled();
    });

    it('returns the correct state during mutation', () => {
        useSWRMutationMock.mockReturnValue({
            ...mockSWRMutationResponse,
            isMutating: true
        });

        const { result } = renderHook(() => useSendContactRequestApi());

        expect(result.current.isSendingContactRequest).toBe(true);
        expect(result.current.isContactRequestResponse).toBe(false);
        expect(result.current.contactRequestError).toBeUndefined();
    });

    it('returns the correct state on mutation success', () => {
        useSWRMutationMock.mockReturnValue({
            ...mockSWRMutationResponse,
            isMutating: false,
            data: { success: true }
        });

        const { result } = renderHook(() => useSendContactRequestApi());

        expect(result.current.isSendingContactRequest).toBe(false);
        expect(result.current.isContactRequestResponse).toBe(true);
        expect(result.current.contactRequestError).toBeUndefined();
    });

    it('returns the correct state on mutation error', () => {
        const mockError = new Error('API Error');
        useSWRMutationMock.mockReturnValue({
            ...mockSWRMutationResponse,
            isMutating: false,
            error: mockError
        });

        const { result } = renderHook(() => useSendContactRequestApi());

        expect(result.current.isSendingContactRequest).toBe(false);
        expect(result.current.isContactRequestResponse).toBe(false);
        expect(result.current.contactRequestError).toBe(mockError);
    });
});