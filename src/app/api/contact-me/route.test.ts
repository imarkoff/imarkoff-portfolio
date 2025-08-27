import {describe, it, expect, beforeAll} from "vitest";
import {POST} from "./route";
import {NextRequest} from "next/server";
import {bindMockContactRequestService, mockedContactRequestService} from "@/lib/test-utils/mocks/ContactRequestService.mocks";
import {ValidationError} from "@/lib/errors/errors";

describe("POST /api/contact-me", () => {
    beforeAll(() => {
        bindMockContactRequestService();
    });

    it("should return 201 and the created contact request on success", async () => {
        const contactRequestData = { name: "John Doe", email: "john@example.com", message: "Hello" };
        const createdContactRequest = { id: "1", ...contactRequestData };
        mockedContactRequestService.createContactRequest.mockResolvedValue(createdContactRequest);
        const request = new NextRequest("https://example.com/api/contact-me", {
            method: "POST",
            body: JSON.stringify(contactRequestData),
            headers: { "Content-Type": "application/json" }
        });

        const response = await POST(request);

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual(createdContactRequest);
    });

    it("should return 400 and error message when ValidationError is thrown", async () => {
        const contactRequestData = { name: "", email: "invalid", message: "" };
        const error = new ValidationError("Invalid data");
        mockedContactRequestService.createContactRequest.mockRejectedValue(error);
        const request = new NextRequest("https://example.com/api/contact-me", {
            method: "POST",
            body: JSON.stringify(contactRequestData),
            headers: { "Content-Type": "application/json" }
        });

        const response = await POST(request);

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({ message: "Invalid data" });
    });

    it("should throw error if createContactRequest throws a non-ValidationError", async () => {
        const contactRequestData = { name: "Jane", email: "jane@example.com", message: "Hi" };
        const error = new Error("Unexpected error");
        mockedContactRequestService.createContactRequest.mockRejectedValue(error);
        const request = new NextRequest("https://example.com/api/contact-me", {
            method: "POST",
            body: JSON.stringify(contactRequestData),
            headers: { "Content-Type": "application/json" }
        });

        await expect(() =>
            POST(request)
        ).rejects.toThrowError(error);
    });
});