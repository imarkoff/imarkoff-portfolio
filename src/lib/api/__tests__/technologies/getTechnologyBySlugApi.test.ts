import { vi, describe, it, expect, beforeEach } from 'vitest';
import getTechnologyBySlugApi from '../../technologies/getTechnologyBySlugApi';

describe('getTechnologyBySlugApi', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns technology data when fetch is successful', async () => {
        const mockTechnology = { id: 1, name: 'React', slug: 'react' };
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => mockTechnology,
        } as Response);

        const result = await getTechnologyBySlugApi('react');
        expect(result).toEqual(mockTechnology);
    });

    it('returns null when response status is 404', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        } as Response);

        const result = await getTechnologyBySlugApi('unknown');
        expect(result).toBeNull();
    });

    it('throws error with statusText when fetch fails and statusText is present', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        } as Response);

        await expect(getTechnologyBySlugApi('error')).rejects.toThrow('Internal Server Error');
    });

    it('throws generic error when fetch fails and statusText is empty', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: '',
        } as Response);

        await expect(getTechnologyBySlugApi('bad')).rejects.toThrow('An error occurred while fetching the technology.');
    });

    it('throws error when fetch throws an exception', async () => {
        vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

        await expect(getTechnologyBySlugApi('network')).rejects.toThrow('Network error');
    });
});