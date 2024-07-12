import { Loan } from "src/loans/entities/loan.entity"
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "text"
    })
    name: string

    @Column({
        type: "text"
    })
    lastName: string

    @Column({
        type: "text",
        unique: true
    })
    ci: string

    @Column({
        type: "text",
        unique: true
    })
    email: string

    @Column({
        type: "text",
        unique: true
    })
    phone: string

    @Column({
        type: "bool",
        default: true
    })
    isActive: boolean

    @Column({
        type: 'text',
        nullable: true
    })
    address: string

    @Column({
        type: 'text',
        nullable: true
    })
    lat: string
    @Column({
        type: 'text',
        nullable: true
    })
    lng: string

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

    @OneToMany(
        () => Loan,
        (loan) => loan.client,
        { cascade: true }
    )
    loans?: Loan[]
    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}
