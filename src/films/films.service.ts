import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'
import { UpdateFilmDto } from './dto/update-film.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { Film } from './entities/film.entity'
import { People } from '../people/entities/people.entity'
import { Planet } from '../planets/entities/planet.entity'
import { Specie } from '../species/entities/specie.entity'
import { Starship } from '../starships/entities/starship.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Specie)
    private readonly specieRepository: Repository<Specie>,
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    let check = await this.filmRepository.findBy({ url: createFilmDto.url })
    if (check.length > 0) {
      throw new BadRequestException('url already exists')
    }

    createFilmDto.characters = await this.peopleRepository.findBy({
      url: In(createFilmDto.characters),
    })
    createFilmDto.planets = await this.planetRepository.findBy({
      url: In(createFilmDto.planets),
    })
    createFilmDto.species = await this.specieRepository.findBy({
      url: In(createFilmDto.species),
    })
    createFilmDto.starships = await this.starshipRepository.findBy({
      url: In(createFilmDto.starships),
    })
    createFilmDto.vehicles = await this.vehicleRepository.findBy({
      url: In(createFilmDto.vehicles),
    })

    return await this.filmRepository.save(createFilmDto)
  }

  async findOne(url: string) {
    const result = await this.filmRepository.findOne({
      where: { url: url },
      loadRelationIds: true,
    })
    if (!result) {
      throw new BadRequestException('url not found')
    }
    return result
  }

  async find10(page: number) {
    return await this.filmRepository.find({
      skip: (page - 1) * 10,
      take: 10,
      loadRelationIds: true,
    })
  }

  async count() {
    return await this.filmRepository.count()
  }

  async update(url: string, updateFilmDto: UpdateFilmDto) {
    const result = await this.filmRepository.update({ url: url }, updateFilmDto)

    if (result.affected! < 1) {
      throw new BadRequestException('url not found')
    }
    return { success: true }
  }

  async remove(url: string) {
    const removed = await this.findOne(url)
    await this.filmRepository.delete({ url: url })

    return removed
  }
}
