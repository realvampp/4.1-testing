import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateSpecieDto } from './dto/create-specie.dto'
import { UpdateSpecieDto } from './dto/update-specie.dto'
import { Specie } from './entities/specie.entity'
import { Film } from '../films/entities/film.entity'
import { People } from '../people/entities/people.entity'

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie)
    private readonly specieRepository: Repository<Specie>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
  ) {}

  async create(createSpecieDto: CreateSpecieDto) {
    let check = await this.specieRepository.find({
      where: { url: createSpecieDto.url },
    })
    if (check.length > 0) {
      throw new BadRequestException('url already exists')
    }

    createSpecieDto.films = await this.filmRepository.findBy({
      url: In(createSpecieDto.films),
    })
    createSpecieDto.people = await this.peopleRepository.findBy({
      url: In(createSpecieDto.people),
    })

    return await this.specieRepository.save(createSpecieDto)
  }

  async findOne(url: string) {
    const result = await this.specieRepository.findOne({
      where: { url: url },
      loadRelationIds: true,
    })
    if (!result) {
      throw new BadRequestException('url not found')
    }
    return result
  }

  async find10(page: number) {
    return await this.specieRepository.find({
      skip: (page - 1) * 10,
      take: 10,
      loadRelationIds: true,
    })
  }

  async count() {
    return await this.specieRepository.count()
  }

  async update(url: string, updateSpecieDto: UpdateSpecieDto) {
    const result = await this.specieRepository.update(
      { url: url },
      updateSpecieDto,
    )
    if (result.affected! < 1) {
      throw new BadRequestException('url not found')
    }
    return { success: true }
  }

  async remove(url: string) {
    const removed = await this.findOne(url)
    await this.specieRepository.delete({ url: url })

    return removed
  }
}
