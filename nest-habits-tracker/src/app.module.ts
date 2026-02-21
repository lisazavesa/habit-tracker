import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PrismaModule, HabitsModule, AuthModule],
})

export class AppModule {}
