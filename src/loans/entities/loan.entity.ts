import { Client } from "src/client/entities/client.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Loan {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'decimal',
    })
    amount: number

    @Column({
        type: 'decimal',
    })
    interestRate: number

    @Column({
        type: 'decimal',
    })
    totalAmount: number

    @Column({
        type: "bool",
        default: true
    })
    isActive: boolean

    @Column({
        type: 'text',
    })
    clientId: string

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

    @ManyToOne(
        () => Client,
        (client) => client.loans
    )
    client: Client

    @OneToMany(
        () => Payment,
        (payment) => payment.loan
    )
    payment: Payment
}
