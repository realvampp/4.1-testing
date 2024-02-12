import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { PeopleModule } from './people/people.module'
import { dataSourceOptions } from '../db/data-source'
import { PlanetsModule } from './planets/planets.module'
import { StarshipsModule } from './starships/starships.module'
import { VehiclesModule } from './vehicles/vehicles.module'
import { FilmsModule } from './films/films.module'
import { SpeciesModule } from './species/species.module'
import { ImagesModule } from './images/images.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { JwtStrategy } from './auth/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtGuard } from './auth/jwt.guard'

@Module({
  imports: [
    AuthModule,
    ImagesModule,
    PeopleModule,
    PlanetsModule,
    StarshipsModule,
    VehiclesModule,
    FilmsModule,
    SpeciesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
