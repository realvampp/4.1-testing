import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { ImagesService } from './images.service'
import { ImagesController } from './images.controller'
import { Image } from './entities/image.entity'
import { People } from '../people/entities/people.entity'
import { Film } from '../films/entities/film.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { Planet } from '../planets/entities/planet.entity'
import { Starship } from '../starships/entities/starship.entity'
import { Specie } from '../species/entities/specie.entity'
import { S3Service } from '../s3/s3.service'

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, S3Service],
  imports: [
    TypeOrmModule.forFeature([
      Image,
      People,
      Film,
      Vehicle,
      Planet,
      Starship,
      Specie,
    ]),
    MulterModule.register({ storage: memoryStorage() }),
  ],
})
export class ImagesModule {}
