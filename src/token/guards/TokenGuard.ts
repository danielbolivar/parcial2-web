import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "../entities/token.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";

@Injectable()
export class TokenGuard implements CanActivate {

    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token> ,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const tokenHeader = request.headers['token'];

        const token = await this.tokenRepository.findOneBy({token: tokenHeader});

        if (!token) {
            return false;
        }

        if (!token.active && token.reqLeft <= 0) {
            return false;
        }

        return true;


    }
}
