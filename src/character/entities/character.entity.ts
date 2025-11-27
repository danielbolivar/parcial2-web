import { Location } from "src/location/entities/location.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        'text',
        {
            unique: false
        }
    )
    name: string;

    @Column('int')
    salary: number;

    @Column('boolean',
        {
            default: true
        }
    )
    employee: boolean;

    @OneToOne(() => Location, location => location.owner, {
        cascade: true,
        eager: true
    })
    location: Location;

    @OneToMany(() => Location, location => location.favCharacters, {
        cascade: true,
        eager: true,
    })
    favPlaces: Location[];

}
