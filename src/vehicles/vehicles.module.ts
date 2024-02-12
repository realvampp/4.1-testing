import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './entities/vehicle.entity'
import { Film } from '../films/entities/film.entity'
import { People } from '../people/entities/people.entity'

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [TypeOrmModule.forFeature([Vehicle, Film, People])],
})
export class VehiclesModule {}
