import { Collection } from "src/collections/entities/collection.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delivery {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'date',
        default: () => 'CURRENT_DATE',
    })
    deliveryDate: Date;

    @Column({
        type: 'decimal',
        default: 0.0,
    })
    amount: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    note: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    @Column({ type: 'text' })
    collectionId: string;

    @ManyToOne(() => Collection, (collection) => collection.delivery)
    collection: Collection;
}
