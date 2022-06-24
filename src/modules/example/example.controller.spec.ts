import { ExampleQueries } from "../shared/queries/example.queries";

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
