import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { People } from '../../people/entities/people.entity'
import { Film } from '../../films/entities/film.entity'

export class CreateStarshipDto {
  @IsUrl()
  @IsString()
  @ApiProperty({example: 'https://swapi.dev/api/starships/1/'})
  url: string
  @IsString()
  @ApiProperty({example: 'CR90 corvette'})
  name: string
  @IsString()
  @ApiProperty({example: 'CR90 corvette'})
  model: string
  @IsString()
  @ApiProperty({example: 'Corellian Engineering Corporation'})
  manufacturer: string
  @IsString()
  @ApiProperty({example: '1000'})
  cost_in_credits: string
  @IsString()
  @ApiProperty({example: '150'})
  length: string
  @IsString()
  @ApiProperty({example: '950'})
  max_atmosphering_speed: string
  @IsString()
  @ApiProperty({example: '30-165'})
  crew: string
  @IsString()
  @ApiProperty({example: '600'})
  passengers: string
  @IsString()
  @ApiProperty({example: '3000000'})
  cargo_capacity: string
  @IsString()
  @ApiProperty({example: '1 year'})
  consumables: string
  @IsString()
  @ApiProperty({example: '2.0'})
  hyperdrive_rating: string
  @IsString()
  @ApiProperty({example: '60'})
  MGLT: string
  @IsString()
  @ApiProperty({example: 'corvette'})
  starship_class: string

  @IsOptional()
  @IsArray()
  @IsUrl(undefined, {each: true})
  @ApiProperty({example: ['https://swapi.dev/api/people/1/']})
  pilots?: People[]

  @IsArray()
  @IsUrl(undefined, {each: true})
  @ApiProperty({example: ['https://swapi.dev/api/films/1/']})
  films: Film[]

  @IsString()
  @ApiProperty({example: '2014-12-10T14:20:33.369000Z'})
  created: string
  @IsString()
  @ApiProperty({example: '2014-12-20T21:23:49.867000Z'})
  edited: string
}
