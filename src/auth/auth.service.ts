import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { User } from '../user/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }


  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createUserDto: CreateUserDto) {
    const exists = await this.userService.findByUsername(createUserDto.username)
    if (exists) {
      throw new BadRequestException('User already exists')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    })

    return this.login(user)
  }
}
