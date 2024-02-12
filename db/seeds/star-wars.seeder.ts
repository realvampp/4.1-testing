import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource, Repository } from 'typeorm'
import { FetchSwapi } from '../fetch-swapi'
import { PlanetsService } from '../../src/planets/planets.service'
import { starWarsClasses } from '../../src/constants'
import { FilmsService } from '../../src/films/films.service'
import { PeopleService } from '../../src/people/people.service'
import { SpeciesService } from '../../src/species/species.service'
import { StarshipsService } from '../../src/starships/starships.service'
import { VehiclesService } from '../../src/vehicles/vehicles.service'

export default class StarWarsSeeder implements Seeder {

  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    let services = this.getServices(dataSource)

    for (const className of starWarsClasses) {
      let entities = await FetchSwapi.fetchClass(`${className}s`)
      if (!entities) return

      for (const entity of entities) {
        await services[className].create(entity)
      }
    }
  }

  getServices(dataSource: DataSource) {
    let repos: Record<string, Repository<any>> = {}

    for (let entity of starWarsClasses) {
      repos[entity] = dataSource.getRepository(entity)
    }

    let services: Record<string, any> = {}

    services.planet = new PlanetsService(repos.planet, repos.film)
    services.film = new FilmsService(
      repos.film,
      repos.people,
      repos.planet,
      repos.specie,
      repos.starship,
      repos.vehicle,
    )
    services.people = new PeopleService(
      repos.people,
      repos.film,
      repos.specie,
      repos.starship,
      repos.vehicle,
    )
    services.specie = new SpeciesService(repos.specie, repos.film, repos.people)
    services.starship = new StarshipsService(
      repos.starship,
      repos.people,
      repos.film,
    )
    services.vehicle = new VehiclesService(
      repos.vehicle,
      repos.people,
      repos.film,
    )

    return services
  }
}
