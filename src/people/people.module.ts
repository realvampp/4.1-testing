import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PeopleService } from './people.service'
import { PeopleController } from './people.controller'
import { People } from './entities/people.entity'
import { Film } from '../films/entities/film.entity'
import { Specie } from '../species/entities/specie.entity'
import { Starship } from '../starships/entities/starship.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { Image } from '../images/entities/image.entity'

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  imports: [TypeOrmModule.forFeature([People, Film, Specie, Starship, Vehicle, Image])],
})
export class PeopleModule {}
