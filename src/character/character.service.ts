import { Inject, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async calculateTaxes(id: number) {

    const character = await this.characterRepository.findOneBy({id: id});

    if (!character) {
      throw new Error('Character not found');
    }

    const coef = (character.employee) ? 0.08 : 0.03;
    const location = character.location;

    if (!location) {
      return {
        'taxDebt': 0
      }
    }

    const taxDebt = location.cost * ( 1 + coef);

    return {
      'taxDebt': taxDebt
    };

  }

  async addFavoriteLocation(idChar: number, idLocation: number) {

    const location = await this.locationRepository.findOneBy({id: idLocation});
    const character = await this.characterRepository.findOneBy({id: idChar});

    if (!location || !character) {
      throw new Error('Character or Location not found');
    }

    character.favPlaces.push(location);
    location.favCharacters.push(character);

    await this.locationRepository.save(location);
    return this.characterRepository.save(character);

  }

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    return this.characterRepository.save(character);
  }

}
