import { BusinessException } from '../../../exceptions';
import { ExampleQueries } from '../../../modules/shared/queries/example.queries';
import { UpdateCommand, UpdateCommandHandler } from './update.command'

describe('Example module, command tests', () => {
    beforeEach(async () => {
        jest.restoreAllMocks()
    });

    describe('root', () => {
        it('should return correctly', async () => {

            const exmapleRepository = {
                update: jest.fn().mockImplementation((data: any) => {
                    return data
                })
            } as any;
            const exampleQueries = new ExampleQueries();
            
            const handler = new UpdateCommandHandler(exmapleRepository, exampleQueries)
            const command = new UpdateCommand({
                id: 1,
                name: 'Chi Chi'
            } as any)
            command.session = {
                userId: 1
            } as any

            const data = await handler.apply(command);
            expect(exmapleRepository.update).toBeCalledTimes(1)
            expect(data).toBeDefined()
            expect(data.id).toBe(1)
            expect(data.name).toBe('Chi Chi')
            expect(data.isDeleted).toBe(false)
            expect(data.modifiedBy).toBe(1)
            expect(data.modifiedDate).toBeDefined()
        });

        it('input is null, should throw exception', async () => {

            const exmapleRepository = {
                update: jest.fn()
            } as any;
            const exampleQueries = new ExampleQueries();

            const handler = new UpdateCommandHandler(exmapleRepository, exampleQueries)
            const command = new UpdateCommand(null)

            try
            {
                await handler.apply(command);
                expect(exmapleRepository.update).toBeCalledTimes(0)
            }
            catch(err) {
                expect(err).toBeDefined()
                expect(err).toEqual(new BusinessException('Dữ liệu nhập vào không đúng') || new BusinessException('Dữ liệu không tồn tại'))
            }
        });
    });
});
