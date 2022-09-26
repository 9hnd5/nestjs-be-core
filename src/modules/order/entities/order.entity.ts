import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from '~/models/common.model';

@Entity('order')
export class OrderEntity extends AuditEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String })
    description: string;

    @Column({ type: Number })
    totalDiscount: number;
}
