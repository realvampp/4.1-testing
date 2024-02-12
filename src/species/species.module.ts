import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Specie } from './entities/specie.entity'
import { People } from '../people/entities/people.entity'
import { Film } from '../films/entities/film.entity'

@Module({
  controllers: [SpeciesController],
  providers: [SpeciesService],
  imports: [TypeOrmModule.forFeature([Specie, People, Film])],
})
export class SpeciesModule {}
