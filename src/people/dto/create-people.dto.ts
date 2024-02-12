import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Planet } from '../../planets/entities/planet.entity'
import { Film } from '../../films/entities/film.entity'
import { Specie } from '../../species/entities/specie.entity'
import { Vehicle } from '../../vehicles/entities/vehicle.entity'
import { Starship } from '../../starships/entities/starship.entity'

export class CreatePeopleDto {
  @IsUrl()
  @ApiProperty({ example: 'https://swapi.dev/api/people/1/' })
  url: string
  @IsString()
  @ApiProperty({ example: 'Luke Skywalker' })
  name: string
  @IsString()
  @ApiProperty({ example: '172' })
  height: string
  @IsString()
  @ApiProperty({ example: '77' })
  mass: string
  @IsString()
  @ApiProperty({ example: 'blond' })
  hair_color: string
  @IsString()
  @ApiProperty({ example: 'fair' })
  skin_color: string
  @IsString()
  @ApiProperty({ example: 'blue' })
  eye_color: string
  @IsString()
  @ApiProperty({ example: '19BBY' })
  birth_year: string
  @IsString()
  @ApiProperty({ example: 'male' })
  gender: string

  @IsOptional()
  @IsUrl()
  @ApiProperty({ example: 'https://swapi.dev/api/planets/1/' })
  homeworld: Planet

  @IsArray()
  @IsUrl(undefined, { each: true })
  @ApiProperty({
    example: [
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/3/',
    ],
  })
  films: Film[]

  @IsArray()
  @IsOptional()
  @IsUrl(undefined, { each: true })
  @ApiProperty({ example: ['https://swapi.dev/api/species/1/'] })
  species: Specie[]

  @IsOptional()
  @IsArray()
  @IsUrl(undefined,{each: true})
  @ApiProperty({ example: ['https://swapi.dev/api/vehicles/1/'] })
  vehicles: Vehicle[]

  @IsOptional()
  @IsArray()
  @IsUrl(undefined,{each: true})
  @ApiProperty({ example: ['https://swapi.dev/api/starships/1/'] })
  starships: Starship[]

  @IsString()
  @ApiProperty({ example: '2014-12-20T21:17:56.891000Z' })
  created: string
  @IsString()
  @ApiProperty({ example: '2014-12-20T21:17:56.891000Z' })
  edited: string
}
