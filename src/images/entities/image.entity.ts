import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { People } from '../../people/entities/people.entity'
import { Planet } from '../../planets/entities/planet.entity'
import { Film } from '../../films/entities/film.entity'
import { Specie } from '../../species/entities/specie.entity'
import { Vehicle } from '../../vehicles/entities/vehicle.entity'
import { Starship } from '../../starships/entities/starship.entity'



@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  link: string

  @ManyToOne(() => People, (people)=> people.images,{onDelete: 'CASCADE'})
  @JoinColumn({ name: 'peopleUrl', referencedColumnName: 'url' })
  people: People

  @ManyToOne(() => Planet, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'planetUrl', referencedColumnName: 'url' })
  planets: Planet

  @ManyToOne(() => Film, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'filmUrl', referencedColumnName: 'url' })
  films: Film

  @ManyToOne(() => Specie, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'specieUrl', referencedColumnName: 'url' })
  species: Specie

  @ManyToOne(() => Vehicle, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'vehicleUrl', referencedColumnName: 'url' })
  vehicles: Vehicle

  @ManyToOne(() => Starship, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'starshipUrl', referencedColumnName: 'url' })
  starships: Starship

  constructor(awsUrl: string) {
    this.link = awsUrl
  }
}

