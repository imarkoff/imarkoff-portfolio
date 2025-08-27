import { vi, describe, it, expect, beforeEach } from 'vitest';
import getShowcasesApi from '../../showcases/getShowcasesApi';
describe('getShowcasesApi', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns data when fetch is successful', async () => {
        const mockData = [[{ id: 1, url: 'img.jpg' }]];
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        } as Response);

        const result = await getShowcasesApi('test-url');

        expect(result).toEqual(mockData);
    });

    it('throws error when fetch fails', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found',
        } as Response);

        await expect(
            getShowcasesApi('test-url')
        ).rejects.toThrow('Not Found');
    });
});