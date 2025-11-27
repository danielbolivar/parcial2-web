import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { Repository } from 'typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,

  ) {}

  async create(createLocationDto: CreateLocationDto) {

    const char = await this.characterRepository.findOneBy({id: createLocationDto.ownerId});

    if (!char) {
      throw new Error('Character doesnt exist');
    }

    if (char.location) {
      throw new Error('Character already owns a location');
    }

    const location = await this.locationRepository.create({
      name: createLocationDto.name,
      type: createLocationDto.type,
      cost: createLocationDto.cost,
      owner: char,
      favCharacters: []
    });

    return this.locationRepository.save(location);

  }

  async findAll() {

    const locations = await this.locationRepository.find();

    for (const loc of locations) {
      loc.favCharacters = await this.characterRepository
        .createQueryBuilder('character')
        .innerJoin('character.favPlaces', 'location', 'location.id = :locId', { locId: loc.id })
        .getMany();
    }

    return locations;

  }

  async findOne(id: number) {
    return this.locationRepository.findOneBy({id});
  }

  async save(location: Location) {
    return this.locationRepository.save(location);
  }

}
