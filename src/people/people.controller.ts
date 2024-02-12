import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { PeopleService } from './people.service'
import { CreatePeopleDto } from './dto/create-people.dto'
import { UpdatePeopleDto } from './dto/update-people.dto'
import { createUrlByIdAndClass, getPrevNext } from '../utils'
import { PaginatedResultDto } from '../interceptors/handle-response/paginated-result.dto'
import { NeedAdmin } from '../auth/decorators/needAdmin.decorator'


@ApiTags('people')
@ApiBearerAuth()
@NeedAdmin(true)
@Controller('people/')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @NeedAdmin(false)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('in people controller')
    let url = createUrlByIdAndClass('people', id)
    return await this.peopleService.findOne(url)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPeopleDto: CreatePeopleDto) {
    return await this.peopleService.create(createPeopleDto)
  }

  @NeedAdmin(false)
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  async findAll(@Query('page') page: number, @Req() req: Request) {
    page = +page || 1

    let count = await this.peopleService.count()
    if (page > Math.ceil(count / 10)) {
      throw new BadRequestException('Page not found')
    }

    let results = await this.peopleService.find10(page)
    const pages = getPrevNext(req, page, count)

    return new PaginatedResultDto(count, pages.next, pages.prev, results)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updatePeopleDto: UpdatePeopleDto,
  ) {
    let url = createUrlByIdAndClass('people', id)

    return await this.peopleService.update(url, updatePeopleDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let url = createUrlByIdAndClass('people', id)

    return await this.peopleService.remove(url)
  }
}
