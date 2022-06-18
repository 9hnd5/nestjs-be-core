import { BusinessException } from '../../../exceptions';
import { AddCommand, AddCommandHandler } from './add.command'

describe('Example module, command tests', () => {
    beforeEach(async () => {
        jest.restoreAllMocks()
    });

    describe('root', () => {
        it('should return correctly', async () => {

            const exmapleRepository = {
                add: jest.fn().mockImplementation((data: any) => {
                    return data
                })
            } as any;

            const handler = new AddCommandHandler(exmapleRepository)
            const command = new AddCommand({
                id: 1,
                name: 'name'
            } as any)
            command.session = {
                userId: 1
            } as any

            const data = await handler.apply(command);
            expect(exmapleRepository.add).toBeCalledTimes(1)
            expect(data).toBeDefined()
            expect(data.id).toBe(1)
            expect(data.name).toBe('name')
            expect(data.isDeleted).toBe(false)
            expect(data.createdBy).toBe(1)
            expect(data.createdDate).toBeDefined()

        });

        it('input is null, should throw exception', async () => {

            const exmapleRepository = {
                add: jest.fn()
            } as any;

            const handler = new AddCommandHandler(exmapleRepository)
            const command = new AddCommand(null)

            try
            {
                await handler.apply(command);

                expect(exmapleRepository.add).toBeCalledTimes(0)
            }
            catch(err) {
                expect(err).toBeDefined()
                expect(err).toEqual(new BusinessException('Dữ liệu không được bỏ trống'))
            }
        });
    });
});
