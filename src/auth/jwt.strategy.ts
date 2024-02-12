import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../constants'
import { UserService } from '../user/user.service'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: LoginUserDto) {
    console.log('in jwt strategy', payload)
    let user = await this.userService.findById(payload.id)
    if (!user || user.username !== payload.username) {
      throw new UnauthorizedException()
    }
    return user
  }
}