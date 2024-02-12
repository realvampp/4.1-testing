import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film } from './entities/film.entity'
import { People } from '../people/entities/people.entity'
import { Planet } from '../planets/entities/planet.entity'
import { Specie } from '../species/entities/specie.entity'
import { Starship } from '../starships/entities/starship.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [TypeOrmModule.forFeature([Film, People, Planet, Specie, Starship, Vehicle])],
})
export class FilmsModule {}
