import {describe, it, expect, vi, beforeEach, Mocked} from "vitest";
import ContactRequestServiceImpl from "@/lib/services/ContactRequestServiceImpl";
import type ContactRequestRepository from "@/lib/repositories/interfaces/ContactRequestRepository";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";
import { ValidationError } from "@/lib/errors/errors";
import type ContactRequest from "@/lib/models/ContactRequest";
import {ZodError} from "zod";

vi.mock("@/lib/dto/ContactRequestDto", async (importOriginal) => {
    const actual = (await importOriginal()) as typeof ContactRequestDto;
    return {
        ...actual,
        default: {
            ...actual.default,
            safeParse: vi.fn()
        }
    };
});

const mockContactRequestDto = vi.mocked(ContactRequestDto);

describe("ContactRequestServiceImpl", () => {
    let contactRequestRepository: Mocked<ContactRequestRepository>;
    let service: ContactRequestServiceImpl;

    beforeEach(() => {
        contactRequestRepository = { createContactRequest: vi.fn() };
        service = new ContactRequestServiceImpl(contactRequestRepository);
        vi.clearAllMocks();
    });

    it("should create a contact request when validation passes", async () => {
        const dto = { name: "John", email: "john@example.com", message: "Hello" };
        const parsedData = { name: "John", email: "john@example.com", message: "Hello" };
        mockContactRequestDto.safeParse.mockReturnValue({ success: true, data: parsedData });
        const createdContactRequest: ContactRequest = { ...parsedData };
        contactRequestRepository.createContactRequest.mockResolvedValue(createdContactRequest);

        const result = await service.createContactRequest(dto);

        expect(ContactRequestDto.safeParse).toHaveBeenCalledWith(dto);
        expect(contactRequestRepository.createContactRequest).toHaveBeenCalledWith(parsedData);
        expect(result).toEqual(createdContactRequest);
    });

    it("should throw ValidationError when validation fails", async () => {
        const dto = { name: "", email: "invalid", message: "" };
        const error = { message: "Invalid data" } as ZodError<ContactRequestDto>;
        mockContactRequestDto.safeParse.mockReturnValue({ success: false, error });

        await expect(
            service.createContactRequest(dto)
        ).rejects.toThrowError(new ValidationError(error.message));
        expect(ContactRequestDto.safeParse).toHaveBeenCalledWith(dto);
        expect(contactRequestRepository.createContactRequest).not.toHaveBeenCalled();
    });

    it("should propagate errors from the repository", async () => {
        const dto = { name: "Jane", email: "jane@example.com", message: "Hi" };
        const parsedData = { name: "Jane", email: "jane@example.com", message: "Hi" };
        const repoError = new Error("DB error");
        mockContactRequestDto.safeParse.mockReturnValue({ success: true, data: parsedData });
        contactRequestRepository.createContactRequest.mockRejectedValue(repoError);

        await expect(
            service.createContactRequest(dto)
        ).rejects.toThrowError(repoError);
        expect(ContactRequestDto.safeParse).toHaveBeenCalledWith(dto);
        expect(contactRequestRepository.createContactRequest).toHaveBeenCalledWith(parsedData);
    });
});