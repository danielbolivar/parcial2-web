import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenGuard } from './guards/TokenGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';

@Module({
  controllers: [TokenController],
  providers: [TokenService, TokenGuard],
  exports: [TokenGuard],
  imports: [
    TypeOrmModule.forFeature([Token]),
  ],
})
export class TokenModule {}
