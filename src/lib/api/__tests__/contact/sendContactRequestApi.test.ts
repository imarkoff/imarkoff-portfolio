import { vi, describe, it, expect, beforeEach } from 'vitest';
import sendContactRequestApi from '../../contact/sendContactRequestApi';
import apiConfig from "@/config/apiConfig";

const url = apiConfig.endpoints.contactMe.route;

describe('sendContactRequestApi', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns response data when request is successful', async () => {
        const mockResponse = { success: true };
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        } as Response);

        const result = await sendContactRequestApi(
            url,
            { arg: { name: 'Alice', email: 'alice@example.com', message: 'Hello' } }
        );
        expect(result).toEqual(mockResponse);
    });

    it('throws error with statusText when request fails and statusText is present', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            statusText: 'Bad Request',
        } as Response);

        await expect(
            sendContactRequestApi(
                url,
                { arg: { name: 'Bob', email: 'bob@example.com', message: 'Hi'} }
            )
        ).rejects.toThrow('Bad Request');
    });

    it('throws generic error when request fails without statusText', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            statusText: '',
        } as Response);

        await expect(
            sendContactRequestApi(
                url,
                 { arg: { name: 'Charlie', email: 'charlie@example.com', message: 'Hey'} }
            )
        ).rejects.toThrow('Failed to send contact request');
    });

    it('throws error when fetch throws an exception', async () => {
        vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

        await expect(
            sendContactRequestApi(
                url,
                { arg: { name: 'Dave', email: 'dave@example.com', message: 'Yo' } }
            )
        ).rejects.toThrow('Network error');
    });
});