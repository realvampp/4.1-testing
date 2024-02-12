import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNumber} from 'class-validator'

export class CreateImageDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: Array<Express.Multer.File>

  @ApiProperty({ enumName: 'className', enum: ['people', 'planets', 'films', 'species', 'vehicles', 'starships'] })
  @IsIn(['people', 'planets', 'films', 'species', 'vehicles', 'starships'])
  className: string

  @ApiProperty()
  @IsNumber()
  id: number
}
