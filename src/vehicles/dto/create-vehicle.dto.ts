import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { People } from '../../people/entities/people.entity'
import { Film } from '../../films/entities/film.entity'

export class CreateVehicleDto {
  @IsUrl()
  @ApiProperty({example: 'https://swapi.dev/api/vehicles/1/'})
  url: string
  @IsString()
  @ApiProperty({example: 'Sand Crawler'})
  name: string
  @IsString()
  @ApiProperty({example: 'Digger Crawler'})
  model: string
  @IsString()
  @ApiProperty({example: 'Corellia Mining Corporation'})
  manufacturer: string
  @IsString()
  @ApiProperty({example: '150000'})
  cost_in_credits: string
  @IsString()
  @ApiProperty({example: '36.8'})
  length: string
  @IsString()
  @ApiProperty({example: '30'})
  max_atmosphering_speed: string
  @IsString()
  @ApiProperty({example: '46'})
  crew: string
  @IsString()
  @ApiProperty({example: '30'})
  passengers: string
  @IsString()
  @ApiProperty({example: '50000'})
  cargo_capacity: string
  @IsString()
  @ApiProperty({example: '2 months'})
  consumables: string
  @IsString()
  @ApiProperty({example: 'wheeled'})
  vehicle_class: string

  @IsArray()
  @IsUrl(undefined, {each: true})
  @ApiProperty({example: ['https://swapi.dev/api/people/1/']})
  @IsOptional()
  pilots: People[]

  @IsArray()
  @IsUrl(undefined, {each: true})
  @ApiProperty({example: ['https://swapi.dev/api/films/1/']})
  films: Film[]

  @IsString()
  @ApiProperty({example: '2014-12-10T15:36:25.724000Z'})
  created: string
  @IsString()
  @ApiProperty({example: '2014-12-20T21:30:21.661000Z'})
  edited: string
}
