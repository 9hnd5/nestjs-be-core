import { HealthController } from './health.controller';

describe('HealthController', () => {
    beforeEach(async () => {
        jest.restoreAllMocks()
    });

    describe('root', () => {
        it('should return correctly', async () => {

            const service = {
                get: jest.fn().mockReturnValue({
                    status: 'Ok'
                })
            } as any
            const controller = new HealthController({ requestId: '123' } as any, service)

            const data = await controller.index();
            expect(data).toBeDefined()
            expect(data.status).toBe('Ok')
            expect(service.get).toBeCalledTimes(1)
        });
    });
});
