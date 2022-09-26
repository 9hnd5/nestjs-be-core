import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '~/models/common.model';

@Entity('order-item')
export class OrderItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: Number })
    quantity: number;

    @Column({ name: 'total_price', type: Number })
    totalPrice: number;

    @Column({ type: String })
    description: string;
}
