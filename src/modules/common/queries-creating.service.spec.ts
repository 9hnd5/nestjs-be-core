import { ExampleModel, QueriesCreatingService } from "../../modules";

describe('QueriesCreatingService', () => {

    let queriesCreatingService: QueriesCreatingService;
    beforeEach(async () => {
        jest.restoreAllMocks()
        const data = {
            scopeVariable: {
                accessToken: 'abcd',
                refreshToken: 'dcba',
                appName : 'comatic',
                requestId: '123',
                tenantCode: 'comatic',
                tenantId: 0}
        }
        queriesCreatingService = new QueriesCreatingService(data);
    });
    
    describe('root', () => {

        it('should return correctly', async () => {
            
            expect(queriesCreatingService.getSQLValue(false)).toBe('0');

            const data = new ExampleModel();
            data.id = 1;
            data.name = 'Chi Chi'
            const query = [
                `INSERT INTO icc_example (is_deleted,created_date,created_by,modified_date,modified_by,company_id,id,name) VALUES (NULL,NULL,NULL,NULL,NULL,NULL,1,'Chi Chi');SELECT LAST_INSERT_ID();`,
                `UPDATE icc_example SET is_deleted = NULL,created_date = NULL,created_by = NULL,modified_date = NULL,modified_by = NULL,company_id = NULL,name = 'Chi Chi' WHERE 1 AND id = 1`,
                `UPDATE icc_example SET is_deleted = 1 WHERE 1 = 1 AND id = 1 AND company_id = 0`,
                `SELECT is_deleted AS isDeleted ,created_date AS createdDate ,created_by AS createdBy ,modified_date AS modifiedDate ,modified_by AS modifiedBy ,company_id AS companyId ,id AS id ,name AS name  FROM icc_example WHERE id = 1 AND is_deleted = 0 AND company_id = 0`,
                `SELECT COUNT(*) FROM icc_example WHERE id = 1 AND is_deleted = 0 AND company_id = 0`,
                `SELECT is_deleted AS isDeleted ,created_date AS createdDate ,created_by AS createdBy ,modified_date AS modifiedDate ,modified_by AS modifiedBy ,company_id AS companyId ,id AS id ,name AS name  FROM icc_example WHERE 1 AND is_deleted = 0 AND company_id = 0 ORDER BY CreatedDate LIMIT 1 OFFSET 10;`,
                `UPDATE icc_example SET is_deleted = NULL,created_date = NULL,created_by = NULL,modified_date = NULL,modified_by = NULL,company_id = NULL,id = 1,name = 'Chi Chi' WHERE name = 'Chi'`
            ]

            expect(queriesCreatingService.createQueryInsert(data)).toEqual(query[0]);
           
            expect(queriesCreatingService.createQueryUpdate(data)).toEqual(query[1]);

            expect(queriesCreatingService.createQueryDelete(data,'id = 1')).toEqual(query[2]);

            expect(queriesCreatingService.createQuerySelect(data,'id = 1')).toEqual(query[3]);

            expect(queriesCreatingService.createQuerySelectCount(data,'id = 1')).toEqual(query[4]);

            expect(queriesCreatingService.createQuerySelectTop(data, 1, 10)).toEqual(query[5]);

            expect(queriesCreatingService.createQueryUpdateWithCondition(data,`name = 'Chi'`)).toEqual(query[6]);

        });
        
    });
});
