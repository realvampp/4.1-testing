import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreatePlanetDto } from './dto/create-planet.dto'
import { UpdatePlanetDto } from './dto/update-planet.dto'
import { Planet } from './entities/planet.entity'
import { Film } from '../films/entities/film.entity'

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetsRepository: Repository<Planet>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async create(createPlanetDto: CreatePlanetDto) {
    let check = await this.planetsRepository.findBy({ url: createPlanetDto.url })
    if (check.length > 0) {
      throw new BadRequestException('url already exists')
    }

    createPlanetDto.films = await this.filmRepository.findBy({
      url: In(createPlanetDto.films),
    })

    return await this.planetsRepository.save(createPlanetDto)
  }

  async findOne(url: string) {
    const result = await this.planetsRepository.findOne({
      where: { url: url },
      loadRelationIds: true,
    })
    if (!result) {
      throw new BadRequestException('url not found')
    }
    return result
  }

  async find10(page: number) {
    return await this.planetsRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    })
  }

  async count() {
    return await this.planetsRepository.count()
  }

  async update(url: string, updatePlanetDto: UpdatePlanetDto) {
    const result = await this.planetsRepository.update(
      { url: url },
      updatePlanetDto,
    )
    if (result.affected! < 1) {
      throw new BadRequestException('url not found')
    }
    return { success: true }
  }

  async remove(url: string) {
    const removed = await this.findOne(url)
    await this.planetsRepository.delete({ url: url })

    return removed
  }

}
