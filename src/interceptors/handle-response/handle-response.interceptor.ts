import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs'
import { PaginatedResultDto } from './paginated-result.dto'

@Injectable()
export class HandleResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if(data instanceof PaginatedResultDto)
          return data
        return {data}
      })
    )
  }
}
