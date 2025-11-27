import { forwardRef, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TokenModule } from 'src/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Location } from './entities/location.entity';
import { Character } from 'src/character/entities/character.entity';
import { Token } from 'src/token/entities/token.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    TokenModule,
    TypeOrmModule.forFeature([Location, Character, Token]),
  ],
})
export class LocationModule {}
