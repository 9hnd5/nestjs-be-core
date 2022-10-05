import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from '~/models/common.model';
import { OrderEntity } from '~/modules/order/entities/order.entity';

@Entity('order-item')
export class OrderItemEntity extends AuditEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: Number })
    quantity: number;

    @Column({ name: 'total_price', type: Number })
    totalPrice: number;

    @Column({ type: String })
    description: string;

    @JoinColumn({ name: 'order_id' })
    @ManyToOne(() => OrderEntity, (order) => order.items, { orphanedRowAction: 'delete' })
    order: OrderEntity;
}
