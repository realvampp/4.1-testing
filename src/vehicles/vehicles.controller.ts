import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { createUrlByIdAndClass, getPrevNext } from '../utils'
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PaginatedResultDto } from '../interceptors/handle-response/paginated-result.dto'
import { NeedAdmin } from '../auth/decorators/needAdmin.decorator'

@ApiTags('vehicles')
@ApiBearerAuth()
@NeedAdmin(true)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @NeedAdmin(false)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let url = createUrlByIdAndClass('vehicles', id)
    return await this.vehiclesService.findOne(url)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto)
  }

  @NeedAdmin(false)
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  async findAll(@Query('page') page: number, @Req() req: Request) {
    page = +page || 1

    let count = await this.vehiclesService.count()
    if (page > Math.ceil(count / 10)) {
      throw new BadRequestException('Page not found')
    }

    let results = await this.vehiclesService.find10(page)
    const pages = getPrevNext(req, page, count)

    return new PaginatedResultDto(count, pages.next, pages.prev, results)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    let url = createUrlByIdAndClass('vehicles', id)

    return await this.vehiclesService.update(url, updateVehicleDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let url = createUrlByIdAndClass('vehicles', id)

    return await this.vehiclesService.remove(url)
  }
}
