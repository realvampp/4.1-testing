import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'
import { People } from '../../people/entities/people.entity'
import { Film } from '../../films/entities/film.entity'
import { Image } from '../../images/entities/image.entity'

@Entity()
export class Starship {
  @PrimaryColumn()
  url: string
  @Column()
  name: string
  @Column()
  model: string
  @Column()
  manufacturer: string
  @Column()
  cost_in_credits: string
  @Column()
  length: string
  @Column()
  max_atmosphering_speed: string
  @Column()
  crew: string
  @Column()
  passengers: string
  @Column()
  cargo_capacity: string
  @Column()
  consumables: string
  @Column()
  hyperdrive_rating: string
  @Column()
  MGLT: string
  @Column()
  starship_class: string

  @OneToMany(() => Image, (image) => image.starships)
  'images': Image[]

  @ManyToMany(() => People, (people) => people.starships, {onDelete: 'CASCADE'})
  pilots: People[] //people
  @ManyToMany(() => Film, (film) => film.starships, {onDelete: 'CASCADE'})
  films: Film[] //films

  @Column()
  created: string
  @Column()
  edited: string
}
