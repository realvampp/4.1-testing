import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'
import { People } from '../../people/entities/people.entity'
import { Film } from '../../films/entities/film.entity'
import { Image } from '../../images/entities/image.entity'

@Entity()
export class Vehicle {
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
  vehicle_class: string

  @OneToMany(() => Image, (image) => image.vehicles)
  'images': Image[]

  @ManyToMany(() => People, (people) => people.vehicles, {onDelete: 'CASCADE'})
  pilots: People[] //people
  @ManyToMany(()=> Film, (film) => film.vehicles, {onDelete: 'CASCADE'})
  films: Film[] //films

  @Column()
  created: string
  @Column()
  edited: string
}
