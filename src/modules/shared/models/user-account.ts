
import { BaseModel } from "src/bases";
import { Column, Key, Table, TableColumns } from "src/decorators";
import { TenantBaseModel } from "src/models";


@TableColumns(['id', 'username','password', 'email', 'displayName', 'phoneNumber','securityPassword'
,'passwordResetCode','isExternalUser','isSuperAdmin','isActived','isUsed','employeeId','customerId'])
@Table('icc_user_account')
export class UserAccount extends BaseModel {
    @Key()
    @Column('id')
    public id: number;

    @Column('username')
    public username: string;

    @Column('password')
    public password: string;

    @Column('email')
    public email: string;

    @Column('display_name')
    public displayName: string;

    @Column('phone_number')
    public phoneNumber: string;

    @Column('security_password')
    public securityPassword: string;

    @Column('password_reset_code')
    public passwordResetCode: string;

    @Column('is_external_user')
    public isExternalUser: boolean;

    @Column('is_super_admin')
    public isSuperAdmin: boolean;

    @Column('is_actived')
    public isActived: boolean;

    @Column('is_used')
    public isUsed: boolean;

    @Column('employee_id')
    public employeeId: number;
    
    @Column('customer_id')
    public customerId: number;
}