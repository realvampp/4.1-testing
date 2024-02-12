import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Planet } from '../../planets/entities/planet.entity'
import { People } from '../../people/entities/people.entity'
import { Film } from '../../films/entities/film.entity'

export class CreateSpecieDto {
  @IsUrl()
  @ApiProperty({example: 'https://swapi.dev/api/species/1/'})
  url: string
  @IsString()
  @ApiProperty({example: 'Human'})
  name: string
  @IsString()
  @ApiProperty({example: 'Homo sapiens'})
  classification: string
  @IsString()
  @ApiProperty({example: 'sentient'})
  designation: string
  @IsString()
  @ApiProperty({example: '180'})
  average_height: string
  @IsString()
  @ApiProperty({example: 'caucasian, black, asian, hispanic'})
  skin_colors: string
  @IsString()
  @ApiProperty({example: 'blonde, brown, black, red'})
  hair_colors: string
  @IsString()
  @ApiProperty({example: 'brown, blue, green, hazel, grey, amber'})
  eye_colors: string
  @IsString()
  @ApiProperty({example: '120'})
  average_lifespan: string

  @IsUrl()
  @ApiProperty({example: 'https://swapi.dev/api/planets/1/'})
  @IsOptional()
  homeworld: Planet

  @IsString()
  @ApiProperty({example: 'Galactic Basic'})
  language: string

  @IsArray()
  @IsUrl(undefined, {each: true})
  @ApiProperty({example: ['https://swapi.dev/api/people/1/']})
  people: People[]

  @IsArray()
  @IsUrl(undefined, {each: true})
  @ApiProperty({example: ['https://swapi.dev/api/films/1/']})
  films: Film[]

  @IsString()
  @ApiProperty({example: '2014-12-20T20:58:18.411000Z'})
  created: string
  @IsString()
  @ApiProperty({example: '2014-12-20T20:58:18.411000Z'})
  edited: string
}
