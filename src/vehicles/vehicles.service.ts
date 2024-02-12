import { BadRequestException, Injectable } from '@nestjs/common'
import { In, Repository } from 'typeorm'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Vehicle } from './entities/vehicle.entity'
import { People } from '../people/entities/people.entity'
import { Film } from '../films/entities/film.entity'

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    let check = await this.vehicleRepository.findOne({
      where: { url: createVehicleDto.url },
    })
    if (check) throw new BadRequestException('url already exists')

    createVehicleDto.pilots = await this.peopleRepository.findBy({
      url: In(createVehicleDto.pilots),
    })
    createVehicleDto.films = await this.filmRepository.findBy({
      url: In(createVehicleDto.films),
    })

    return await this.vehicleRepository.save(createVehicleDto)
  }

  async findOne(url: string) {
    const result = await this.vehicleRepository.findOne({
      where: { url: url },
      loadRelationIds: true,
    })
    if (!result) {
      throw new BadRequestException('url not found')
    }
    return result
  }

  async find10(page: number) {
    return await this.vehicleRepository.find({
      skip: (page - 1) * 10,
      take: 10,
      loadRelationIds: true,
    })
  }

  async count() {
    return await this.vehicleRepository.count()
  }

  async update(url: string, updateVehicleDto: UpdateVehicleDto) {
    const result = await this.vehicleRepository.update(
      { url: url },
      updateVehicleDto,
    )
    if (result.affected! < 1) {
      throw new BadRequestException('url not found')
    }
    return { success: true }
  }

  async remove(url: string) {
    const removed = await this.findOne(url)
    await this.vehicleRepository.delete({ url: url })

    return removed
  }
}
