import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreatePeopleDto } from './dto/create-people.dto'
import { UpdatePeopleDto } from './dto/update-people.dto'
import { People } from './entities/people.entity'
import { Film } from '../films/entities/film.entity'
import { Specie } from '../species/entities/specie.entity'
import { Starship } from '../starships/entities/starship.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Specie)
    private readonly specieRepository: Repository<Specie>,
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createPeopleDto: CreatePeopleDto) {
    let check = await this.peopleRepository.findBy({ url: createPeopleDto.url })

    if (check.length > 0) {
      throw new BadRequestException('url already exists')
    }

    createPeopleDto.films = await this.filmRepository.findBy({
      url: In(createPeopleDto.films),
    })
    createPeopleDto.species = await this.specieRepository.findBy({
      url: In(createPeopleDto.species),
    })
    createPeopleDto.starships = await this.starshipRepository.findBy({
      url: In(createPeopleDto.starships),
    })
    createPeopleDto.vehicles = await this.vehicleRepository.findBy({
      url: In(createPeopleDto.vehicles),
    })

    return await this.peopleRepository.save(createPeopleDto)
  }

  async findOne(url: string) {
    const result = await this.peopleRepository.findOne({
      where: { url: url },
      loadRelationIds: true,
    })
    if (!result) {
      throw new BadRequestException('url not found')
    }
    return result
  }

  async find10(page: number) {
    return await this.peopleRepository.find({
      skip: (page - 1) * 10,
      take: 10,
      loadRelationIds: true,
    })
  }

  async count() {
    return await this.peopleRepository.count()
  }

  async update(url: string, updatePeopleDto: UpdatePeopleDto) {
    const result = await this.peopleRepository.update(
      { url: url },
      updatePeopleDto,
    )
    if (result.affected! < 1) {
      throw new BadRequestException('url not found')
    }
    return { success: true }
  }

  async remove(url: string) {
    const removed = await this.findOne(url)
    await this.peopleRepository.delete({ url: url })

    return removed
  }
}
