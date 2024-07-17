import { Collection } from "src/collections/entities/collection.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
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
        select: false
    })
    password: string
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

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];
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
        () => Collection,
        (collection) => collection.user
    )
    collection: Collection

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}
