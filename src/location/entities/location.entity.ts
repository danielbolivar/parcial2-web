import { Character } from "src/character/entities/character.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    type: string;

    @Column('int')
    cost: number;

    @OneToOne(() => Character, character => character.location)
    owner: Character

    @ManyToOne(() => Character, character => character.favPlaces)
    favCharacters: Character[];

}
