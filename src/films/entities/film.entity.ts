import { Column, Entity, ManyToMany, PrimaryColumn, JoinTable, OneToMany } from 'typeorm'
import { People } from '../../people/entities/people.entity'
import { Specie } from '../../species/entities/specie.entity'
import { Vehicle } from '../../vehicles/entities/vehicle.entity'
import { Starship } from '../../starships/entities/starship.entity'
import { Planet } from '../../planets/entities/planet.entity'
import { Image } from '../../images/entities/image.entity'

@Entity()
export class Film {
  @PrimaryColumn()
  url: string
  @Column()
  title: string
  @Column()
  episode_id: string
  @Column({type: 'longtext'})
  opening_crawl: string
  @Column()
  director: string
  @Column()
  producer: string
  @Column()
  release_date: string

  @OneToMany(() => Image, (image) => image.films)
  'images': Image[]

  @ManyToMany(() => People, (people) => people.films, {onDelete: 'CASCADE'})
  @JoinTable({ name: 'films_people' })
  characters: People[] //people

  @ManyToMany(() => Planet, (planet) => planet.films, {onDelete: 'CASCADE'})
  @JoinTable({name: 'films_planets'})
  planets: Planet[] //planets

  @ManyToMany(() => Starship, (starship) => starship.films, {onDelete: 'CASCADE'})
  @JoinTable({name: 'films_starships'})
  starships: Starship[] //starships

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films, {onDelete: 'CASCADE'})
  @JoinTable({name: 'films_vehicles'})
  vehicles: Vehicle[] //vehicles

  @ManyToMany(() => Specie, (species) => species.films, {onDelete: 'CASCADE'})
  @JoinTable({name: 'films_species'})
  species: Specie[] //species

  @Column()
  created: string
  @Column()
  edited: string
}
