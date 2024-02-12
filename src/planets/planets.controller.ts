import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common'
import { PlanetsService } from './planets.service'
import { CreatePlanetDto } from './dto/create-planet.dto'
import { UpdatePlanetDto } from './dto/update-planet.dto'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { createUrlByIdAndClass, getPrevNext } from '../utils'
import { PaginatedResultDto } from '../interceptors/handle-response/paginated-result.dto'
import { NeedAdmin } from '../auth/decorators/needAdmin.decorator'

@ApiTags('planets')
@ApiBearerAuth()
@NeedAdmin(true)
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @NeedAdmin(false)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let url = createUrlByIdAndClass('planets', id)

    return await this.planetsService.findOne(url)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPlanetDto: CreatePlanetDto) {
    return await this.planetsService.create(createPlanetDto)
  }

  @NeedAdmin(false)
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  async findAll(@Query('page') page: number, @Req() req: Request) {
    page = +page || 1

    let count = await this.planetsService.count()
    if (page > Math.ceil(count / 10)) {
      throw new BadRequestException('Page not found')
    }

    let results = await this.planetsService.find10(page)
    const pages = getPrevNext(req, page, count)

    return new PaginatedResultDto(count, pages.next, pages.prev, results)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updatePlanetDto: UpdatePlanetDto,
  ) {
    let url = createUrlByIdAndClass('planets', id)

    return await this.planetsService.update(url, updatePlanetDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let url = createUrlByIdAndClass('planets', id)

    return await this.planetsService.remove(url)
  }
}
