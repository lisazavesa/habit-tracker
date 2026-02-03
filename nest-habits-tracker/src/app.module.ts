import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { HabitsModule } from './habits/habits.module';


@Module({
  imports: [PrismaModule, HabitsModule],
})

export class AppModule {}
