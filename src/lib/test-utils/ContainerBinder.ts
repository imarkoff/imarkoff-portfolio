import {vi} from "vitest";
import container from "@/lib/di/container";

/**
 * ContainerBinder is a utility class for binding mock services to the dependency injection container.
 * This is particularly useful for testing purposes, allowing you to replace real service implementations
 * with mock versions.
 */
export default class ContainerBinder {
    /**
     * Binds a mock service to the container for testing purposes.
     * @param type - The type of the service to bind.
     * @param mockService - The mock service instance to bind.
     * @return A promise that resolves when the service is successfully bound.
     *
     * @example
     * ```typescript
     * import ContainerBinder from "@/lib/test-utils/ContainerBinder";
     * import TYPES from "@/lib/di/types";
     * import {mockedExperienceGetter} from "@/app/api/experience/__tests__/ExperienceGetter.mocks";
     *
     * beforeAll(async () => {
     *     await ContainerBinder.bindMockService(TYPES.ExperienceGetter, mockedExperienceGetter);
     * });
     * ```
     *
     */
    static async bindMockService<T>(type: symbol, mockService: T): Promise<void> {
        vi.spyOn(container, 'get').mockImplementation((serviceIdentifier) => {
            if (serviceIdentifier === type) {
                return mockService;
            }
            throw new Error(`Unexpected service requested: ${String(type)}`);
        });

        await container.unbind(type);
        container.bind<T>(type).toConstantValue(mockService);
    }
}