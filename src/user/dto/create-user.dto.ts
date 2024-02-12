import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'testuser1' })
  username: string
  @IsString()
  @ApiProperty({ example: 'aasdf123 ' })
  password: string
}