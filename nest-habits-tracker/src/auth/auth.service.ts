import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    
    async register(email: string, password: string) {
        const existing = await this.usersService.findByEmail(email)

        if (existing) {
            throw new ConflictException('email already exists')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await this.usersService.create(email, passwordHash)

        const payload = { 
            sub: user.id, 
            email: user.email 
        }

        const accessToken = this.jwtService.sign(payload)

        return { accessToken, userId: user.id }
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('invalid credentials')
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash)

        if (!isMatch) {
            throw new UnauthorizedException('invalid credentials')
        }
        
        const payload = { 
            sub: user.id, 
            email: user.email 
        }

        const accessToken = this.jwtService.sign(payload)

        return { accessToken }

        }
}
    