import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async reduceReqleft(id: number) {

    const token = await this.tokenRepository.findOneBy({id});

    if (!token) {
      throw new Error('Token not found');
    }

    if (token.reqLeft > 0) {
      token.reqLeft -= 1;
      await this.tokenRepository.save(token);
    } else {
      throw new Error('No requests left for this token');
    }

    return token;

  }

  async create(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto);
    return await this.tokenRepository.save(token);
  }

  async findOne(id: number) {
    const token = await this.tokenRepository.findOneBy({id});

    if (!token) {
      throw new Error('Token not found');
    }

    if (!token.active || token.reqLeft <= 0) {
      return false;
    }

    return true;

  }

}
