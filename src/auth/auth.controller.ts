import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common'
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { Public } from './decorators/public.decorator'

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Req() req: Request) {
    // @ts-ignore
    let user = req.user
    return await this.authService.login(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
