import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'
import { People } from '../../people/entities/people.entity'
import { Film } from '../../films/entities/film.entity'
import { Image } from '../../images/entities/image.entity'

@Entity()
export class Planet {
  @PrimaryColumn()
  url: string
  @Column()
  name: string
  @Column()
  rotation_period: string
  @Column()
  orbital_period: string
  @Column()
  diameter: string
  @Column()
  climate: string
  @Column()
  gravity: string
  @Column()
  terrain: string
  @Column()
  surface_water: string
  @Column()
  population: string

  @OneToMany(() => Image, (image) => image.planets)
  'images': Image[]

  @OneToMany(() => People, (people) => people.homeworld)
  residents: People[] //people

  @ManyToMany(() => Film, (film) => film.planets, {onDelete: 'CASCADE'})
  films: Film[] //films

  @Column()
  created: string
  @Column()
  edited: string
}
