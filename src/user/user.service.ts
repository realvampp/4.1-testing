import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } })
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async create(user: CreateUserDto) {
    return await this.userRepository.save(user)
  }
}
