import {Mocked, vi} from "vitest";
import ContactRequestService from "@/lib/services/interfaces/ContactRequestService";
import ContainerBinder from "@/lib/test-utils/ContainerBinder";
import TYPES from "@/lib/di/types";

export const mockedContactRequestService: Mocked<ContactRequestService> = {
    createContactRequest: vi.fn()
}

export const bindMockContactRequestService = () =>
    ContainerBinder.bindMockService(TYPES.ContactRequestService, mockedContactRequestService)