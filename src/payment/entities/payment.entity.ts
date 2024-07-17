import { Collection } from "src/collections/entities/collection.entity"
import { Loan } from "src/loans/entities/loan.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'decimal',
    })
    amount: number

    @Column({
        type: 'decimal',
        default: 0.00
    })
    paid: number

    @Column({
        type: 'date',
        default: () => 'CURRENT_DATE'
    })
    dueDate: Date

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt: Date
    @Column(
        {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
        }
    )
    updateAt: Date

    @Column({ type: 'text' })
    loanId: string

    @ManyToOne(
        () => Loan,
        (loan) => loan.payment
    )
    loan: Loan

    @OneToMany(
        () => Collection,
        (collection) => collection.payment
    )
    collection: Collection
}
