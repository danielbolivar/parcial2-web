import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text',
        {
            unique: true
        }
    )
    token: string;

    @Column('bool', {
        default: true
    })
    active: boolean;

    @Column('int')
    reqLeft: number;

    @BeforeInsert()
    initializeReqLeft() {
        this.reqLeft = 3;
    }

}
