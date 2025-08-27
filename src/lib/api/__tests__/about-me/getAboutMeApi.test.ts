import { vi, describe, it, expect, beforeEach } from 'vitest';
import getAboutMeApi from '../../about-me/getAboutMeApi';

describe('getAboutMeApi', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns data when fetch is successful', async () => {
        const mockData = { name: 'John Doe', bio: 'Developer' };
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        } as Response);

        const result = await getAboutMeApi('test-url');

        expect(result).toEqual(mockData);
    });

    it('throws error with statusText when fetch fails and statusText is present', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found',
        } as Response);

        await expect(
            getAboutMeApi('test-url')
        ).rejects.toThrow('Not Found');
    });

    it('throws generic error when fetch fails without statusText', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            statusText: '',
        } as Response);

        await expect(
            getAboutMeApi('test-url')
        ).rejects.toThrow('Failed to fetch about me data');
    });
});