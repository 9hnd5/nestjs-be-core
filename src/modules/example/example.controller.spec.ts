import { ExampleController } from './example.controller';
import { ExampleQueries } from "../shared/queries/example.queries";
import { Mediator } from "../cqrs";
import { BusinessException } from 'src/exceptions';
import { ExampleModel } from '../shared/models';

describe('ExampleController', () => {
    beforeEach(async () => {
        jest.restoreAllMocks()
    });

    describe('root', () => {
        it('should return correctly', async () => {

            const query = new ExampleQueries()
            const data = query.gets();
            expect(data).toBeDefined();

        });
        it('should return correctly', async (id = 1) => {
            const query = new ExampleQueries()
            const data = await query.get(1);
            expect(data).toBeDefined()
            expect(data.id).toBe(id)
            expect(data.name).toBe(`Example ${id}`)

        });

    });
});
