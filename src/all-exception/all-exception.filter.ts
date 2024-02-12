import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core'

@Catch()
export class AllExceptionFilter<T> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log('in custom filter\n', exception)
    super.catch(exception, host)
  }
}
