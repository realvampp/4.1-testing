import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, JoinTable, OneToMany } from 'typeorm'
import { Planet } from '../../planets/entities/planet.entity'
import { Film } from '../../films/entities/film.entity'
import { Specie } from '../../species/entities/specie.entity'
import { Vehicle } from '../../vehicles/entities/vehicle.entity'
import { Starship } from '../../starships/entities/starship.entity'
import { Image } from '../../images/entities/image.entity'


@Entity()
export class People {
  @PrimaryColumn()
  'url': string
  @Column()
  'name': string
  @Column()
  'height': string
  @Column()
  'mass': string
  @Column()
  'hair_color': string
  @Column()
  'skin_color': string
  @Column()
  'eye_color': string
  @Column()
  'birth_year': string
  @Column()
  'gender': string

  @OneToMany(() => Image, (image) => image.people)
  'images': Image[]

  @ManyToOne(() => Planet, (planet) => planet.residents, {onDelete: 'SET NULL'})
  'homeworld': Planet //planet

  @ManyToMany(() => Film, (film) => film.characters, {onDelete: 'CASCADE'})
  films: Film[] //films

  @ManyToMany(() => Specie, (specie) => specie.people, {onDelete: 'CASCADE'})
  @JoinTable({name: 'people_species'})
  'species': Specie[] //species

  @ManyToMany(()=> Vehicle,(vehicle) => vehicle.pilots, {onDelete: 'CASCADE'})
  @JoinTable({name: 'people_vehicles'})
  'vehicles': Vehicle[] //vehicles

  @ManyToMany(()=> Starship,(starship) => starship.pilots, {onDelete: 'CASCADE'})
  @JoinTable({name: 'people_starships'})
  'starships': Starship[] //starships

  @Column()
  'created': string
  @Column()
  'edited': string
}
