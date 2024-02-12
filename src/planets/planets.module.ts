import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planet } from './entities/planet.entity'
import { Film } from '../films/entities/film.entity'

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService],
  imports: [TypeOrmModule.forFeature([Planet, Film])],
})
export class PlanetsModule {}
