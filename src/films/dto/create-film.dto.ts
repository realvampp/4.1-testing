import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { People } from '../../people/entities/people.entity'
import { Planet } from '../../planets/entities/planet.entity'
import { Starship } from '../../starships/entities/starship.entity'
import { Vehicle } from '../../vehicles/entities/vehicle.entity'
import { Specie } from '../../species/entities/specie.entity'

export class CreateFilmDto {
  @ApiProperty({ example: 'https://swapi.dev/api/films/1/' })
  @IsUrl()
  url: string
  @ApiProperty({ example: 'A New Hope' })
  @IsString()
  title: string
  @ApiProperty({ example: '4' })
  @IsString()
  episode_id: string
  @ApiProperty({ example: 'It is a period of civil war.' })
  @IsString()
  opening_crawl: string
  @ApiProperty({ example: 'George Lucas' })
  @IsString()
  director: string
  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  producer: string
  @ApiProperty({ example: '1977-05-25' })
  @IsString()
  release_date: string

  @ApiProperty({
    example: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
  })
  @IsArray()
  @IsUrl(undefined, { each: true })
  @IsOptional()
  characters: People[]

  @IsArray()
  @ApiProperty({
    example: [
      'https://swapi.dev/api/planets/1/',
      'https://swapi.dev/api/planets/2/',
      'https://swapi.dev/api/planets/3/',
    ],
  })
  @IsUrl(undefined, { each: true })
  planets: Planet[]

  @IsArray()
  @ApiProperty({example: ['https://swapi.dev/api/starships/1/'] })
  @IsUrl(undefined, { each: true })
  starships: Starship[]

  @IsArray()
  @ApiProperty({example: ['https://swapi.dev/api/vehicles/1/'] })
  @IsUrl(undefined, { each: true })
  vehicles: Vehicle[]

  @IsArray()
  @ApiProperty({
    example: [
      'https://swapi.dev/api/species/1/',
      'https://swapi.dev/api/species/2/',
      'https://swapi.dev/api/species/3/',
    ],
  })
  @IsUrl(undefined, { each: true })
  species: Specie[]

  @IsString()
  @ApiProperty({ example: '2014-12-10T14:23:31.880000Z' })
  created: string
  @IsString()
  @ApiProperty({ example: '2014-12-20T19:49:45.256000Z' })
  edited: string
}
