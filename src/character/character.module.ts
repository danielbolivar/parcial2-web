import { forwardRef, Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TokenModule } from 'src/token/token.module';
import { Character } from './entities/character.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Location } from 'src/location/entities/location.entity';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    TokenModule,
    TypeOrmModule.forFeature([Character, Location]),
  ],
})
export class CharacterModule {}
