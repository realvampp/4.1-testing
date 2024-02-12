import { SetMetadata } from '@nestjs/common'

export const NeedAdmin = (admin: boolean) => SetMetadata('needAdmin', admin)