import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { People } from '../../people/entities/people.entity'
import { Planet } from '../../planets/entities/planet.entity'
import { Film } from '../../films/entities/film.entity'
import { Image } from '../../images/entities/image.entity'

@Entity()
export class Specie {
  @PrimaryColumn()
  url: string
  @Column()
  name: string
  @Column()
  classification: string
  @Column()
  designation: string
  @Column()
  average_height: string
  @Column()
  skin_colors: string
  @Column()
  hair_colors: string
  @Column()
  eye_colors: string
  @Column()
  average_lifespan: string

  @OneToMany(() => Image, (image) => image.species)
  'images': Image[]

  @ManyToOne(() => Planet, {onDelete: 'SET NULL'})
  homeworld: Planet //planet

  @Column()
  language: string

  @ManyToMany(() => People, (people) => people.species, {onDelete: 'CASCADE'})
  people: People[] //people
  @ManyToMany(() => Film, (film) => film.species, {onDelete: 'CASCADE'})
  films: Film[] //films

  @Column()
  created: string
  @Column()
  edited: string
}
