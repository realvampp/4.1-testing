import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { People } from '../../people/entities/people.entity'
import { Film } from '../../films/entities/film.entity'

export class CreatePlanetDto {
  @IsUrl()
  @ApiProperty({ example: 'https://swapi.dev/api/planets/1/' })
  'url': string
  @IsString()
  @ApiProperty({ example: 'Tatooine' })
  'name': string
  @IsString()
  @ApiProperty({ example: '23' })
  'rotation_period': string
  @IsString()
  @ApiProperty({ example: '304' })
  'orbital_period': string
  @IsString()
  @ApiProperty({ example: '10465' })
  'diameter': string
  @IsString()
  @ApiProperty({ example: 'arid' })
  'climate': string
  @IsString()
  @ApiProperty({ example: '1 standard' })
  'gravity': string
  @IsString()
  @ApiProperty({ example: 'desert' })
  'terrain': string
  @IsString()
  @ApiProperty({ example: '1' })
  'surface_water': string
  @IsString()
  @ApiProperty({ example: '200000' })
  'population': string

  @IsOptional()
  @IsArray()
  @IsUrl(undefined, { each: true })
  @ApiProperty({
    example: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
      'https://swapi.dev/api/people/4/',
      'https://swapi.dev/api/people/6/',
    ],
  })
  'residents'?: People[]

  @IsArray()
  @IsUrl(undefined, { each: true })
  @ApiProperty({
    example: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/4/',
    ], })
  'films': Film[]

  @IsString()
  @ApiProperty({ example: '2014-12-09T13:50:49.641000Z' })
  'created': string
  @IsString()
  @ApiProperty({ example: '2014-12-20T20:58:18.411000Z' })
  'edited': string
}
