import { vi, describe, it, expect, beforeEach } from 'vitest';
import getHomePageProjectsApi from '../../projects/getHomePageProjectsApi';

describe('getHomePageProjectsApi', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns project data when fetch is successful', async () => {
        const mockProjects = [{ id: 1, name: 'Project A' }];
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockProjects,
        } as Response);

        const result = await getHomePageProjectsApi();
        expect(result).toEqual(mockProjects);
    });

    it('throws error with statusText when fetch fails and statusText is present', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            statusText: 'Forbidden',
        } as Response);

        await expect(
            getHomePageProjectsApi
        ).rejects.toThrow('Forbidden');
    });

    it('throws generic error when fetch fails and statusText is empty', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            statusText: '',
        } as Response);

        await expect(
            getHomePageProjectsApi
        ).rejects.toThrow('An unknown error occured while fetching the projects');
    });

    it('throws error when fetch throws an exception', async () => {
        vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network failure'));

        await expect(
            getHomePageProjectsApi
        ).rejects.toThrow('Network failure');
    });
});