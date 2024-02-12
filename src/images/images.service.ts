import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Image } from './entities/image.entity'
import { Repository } from 'typeorm'
import { People } from '../people/entities/people.entity'
import { Imagable } from '../types/imagable.type'
import { Film } from '../films/entities/film.entity'
import { Planet } from '../planets/entities/planet.entity'
import { Specie } from '../species/entities/specie.entity'
import { Starship } from '../starships/entities/starship.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Planet)
    private readonly planetsRepository: Repository<Planet>,
    @InjectRepository(Specie)
    private readonly speciesRepository: Repository<Specie>,
    @InjectRepository(Starship)
    private readonly starshipsRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
  ) {}

  async create(className: Imagable, entityUrl: string, awsUrl: string) {
    const image = new Image(awsUrl)

    let entity = await this[`${className}Repository`].findOneBy({ url: entityUrl })
    if (!entity) {
      throw new BadRequestException(`Entity with url ${entityUrl} not found`)
    }

    // @ts-ignore
    image[className] = entityUrl

    return await this.imageRepository.save(image)
  }

  async find10(page: number) {
    return await this.imageRepository.find({
      skip: (page - 1) * 10,
      take: 10,
      loadRelationIds: true,
    })
  }

  async count() {
    return await this.imageRepository.count()
  }

  async findOne(id: number) {
    let image = await this.imageRepository.findOne({ where: { id }, loadRelationIds: true} )
    if (!image) {
      throw new BadRequestException('Image not found')
    }
    return image
  }

  async remove(id: number) {
    const removed = await this.findOne(id)
    await this.imageRepository.remove(removed)

    return removed
  }
}
