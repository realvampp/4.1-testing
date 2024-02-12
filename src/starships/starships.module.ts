import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { Starship } from './entities/starship.entity'
import { Film } from '../films/entities/film.entity'
import { People } from '../people/entities/people.entity'

@Module({
  controllers: [StarshipsController],
  providers: [StarshipsService],
  imports: [TypeOrmModule.forFeature([Starship, Film, People])],
})
export class StarshipsModule {}
