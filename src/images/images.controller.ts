import {
  Controller,
  Get,
  Post,
  Body,

  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  Query,
  Req,
} from '@nestjs/common'
import { ImagesService } from './images.service'
import { CreateImageDto } from './dto/create-image.dto'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger'
import { createUrlByIdAndClass, getPrevNext } from '../utils'
import { Imagable } from '../types/imagable.type'
import { Request } from 'express'
import { PaginatedResultDto } from '../interceptors/handle-response/paginated-result.dto'
import { S3Service } from '../s3/s3.service'
import { NeedAdmin } from '../auth/decorators/needAdmin.decorator'

@Controller('images')
@ApiBearerAuth()
@NeedAdmin(true)
@ApiTags('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly s3Service: S3Service,
  ) {}

  @NeedAdmin(false)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let image = await this.imagesService.findOne(+id)
    let buffer = await this.s3Service.getFile(image.link)
    console.log(buffer)
    return { image, /*buffer*/ }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.imagesService.remove(+id)
    await this.s3Service.deleteFile(removed.link)
    return removed
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe())
  @ApiBody({
    description: 'images',
    type: CreateImageDto,
  })
  async upload(
    @Body('id') id: string,
    @Body('className') className: Imagable,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files.length === 0) {
      throw new BadRequestException('No files uploaded')
    }

    let entityUrl = createUrlByIdAndClass(className, id)

    for (const file of files) {
      let awsName = await this.s3Service.uploadFile(file)

      await this.imagesService.create(className, entityUrl, awsName)
    }

    return { success: true }
  }

  @NeedAdmin(false)
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  async findAll(@Query('page') page: number, @Req() req: Request) {
    page = +page || 1

    let count = await this.imagesService.count()
    if (page > Math.ceil(count / 10)) {
      throw new BadRequestException('Page not found')
    }

    let results = await this.imagesService.find10(page)
    const pages = getPrevNext(req, page, count)

    return new PaginatedResultDto(count, pages.next, pages.prev, results)
  }
}
