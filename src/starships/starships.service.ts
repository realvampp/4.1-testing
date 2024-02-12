import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Starship } from './entities/starship.entity'
import { CreateStarshipDto } from './dto/create-starship.dto'
import { UpdateStarshipDto } from './dto/update-starship.dto'
import { People } from '../people/entities/people.entity'
import { Film } from '../films/entities/film.entity'

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,

  ) {}

  async create(createStarshipDto: CreateStarshipDto) {
    let check = await this.starshipRepository.findBy({
      url: createStarshipDto.url,
    })
    if (check.length > 0) {
      throw new BadRequestException('url already exists')
    }

    createStarshipDto.pilots = await this.peopleRepository.findBy({
      url: In(createStarshipDto.pilots || []),
    })
    createStarshipDto.films = await this.filmRepository.findBy({
      url: In(createStarshipDto.films),
    })

    return await this.starshipRepository.save(createStarshipDto)
  }

  async findOne(url: string) {
    const result = await this.starshipRepository.findOne({
      where: { url: url },
      loadRelationIds: true,
    })
    if (!result) {
      throw new BadRequestException('url not found')
    }
    return result
  }

  async find10(page: number) {
    return await this.starshipRepository.find({
      skip: (page - 1) * 10,
      take: 10,
      loadRelationIds: true,
    })
  }

  async count() {
    return await this.starshipRepository.count()
  }

  async update(url: string, updateStarshipDto: UpdateStarshipDto) {
    const result = await this.starshipRepository.update(
      { url: url },
      updateStarshipDto,
    )
    if (result.affected! < 1) {
      throw new BadRequestException('url not found')
    }
    return { success: true }
  }

  async remove(url: string) {
    const removed = await this.findOne(url)
    await this.starshipRepository.delete({ url: url })

    return removed
  }
}
