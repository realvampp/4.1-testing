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
import { SpeciesService } from './species.service';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import { createUrlByIdAndClass, getPrevNext } from '../utils'
import { PaginatedResultDto } from '../interceptors/handle-response/paginated-result.dto'
import { NeedAdmin } from '../auth/decorators/needAdmin.decorator'

@ApiTags('species')
@ApiBearerAuth()
@NeedAdmin(true)
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @NeedAdmin(false)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let url = createUrlByIdAndClass('species', id)
    return await this.speciesService.findOne(url)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createSpecieDto: CreateSpecieDto) {
    return await this.speciesService.create(createSpecieDto)
  }

  @NeedAdmin(false)
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  // @UseInterceptors(FileInterceptor('file'))
  async findAll(@Query('page') page: number, @Req() req: Request) {
    page = +page || 1

    let count = await this.speciesService.count()
    if (page > Math.ceil(count / 10)) {
      throw new BadRequestException('Page not found')
    }

    let results = await this.speciesService.find10(page)
    const pages = getPrevNext(req, page, count)

    return new PaginatedResultDto(count, pages.next, pages.prev, results)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateSpecieDto: UpdateSpecieDto) {
    let url = createUrlByIdAndClass('species', id)

    return await this.speciesService.update(url, updateSpecieDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let url = createUrlByIdAndClass('species', id)

    return await this.speciesService.remove(url)
  }
}
