import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import * as process from 'process'

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
  }

  async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Body: file.buffer,
      Key: +new Date() + '-' + file.originalname,
    }

    const { Location } = await this.s3.upload(params).promise()
    if(!Location) throw new InternalServerErrorException('AWS failed to upload file')
    return params.Key
  }

  async getFile(key: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    }

    const { Body } = await this.s3.getObject(params).promise()
    if (!Body) throw new InternalServerErrorException('AWS failed to get file')

    return Body
  }

  async deleteFile(key: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    }

    let res = await this.s3.deleteObject(params).promise()
    if (!res) throw new InternalServerErrorException('AWS failed to delete file')
  }
}
