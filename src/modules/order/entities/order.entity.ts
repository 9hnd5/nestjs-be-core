import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from '~/models/common.model';
import { OrderItemEntity } from '~/modules/order/entities/order-item.entity';

@Entity('order')
export class OrderEntity extends AuditEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String })
    description: string;

    @Column({ type: Number })
    totalDiscount: number;

    @Column({ type: String })
    note: string;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { eager: true, cascade: true })
    items: OrderItemEntity[];
}
