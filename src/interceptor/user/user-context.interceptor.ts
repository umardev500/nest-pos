import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { CLS_USER_KEY } from 'src/constants/cls.constants';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const userData = {
      id: 1,
      email: 'F7oZ6@example.com',
      merchant_id: 1,
    };

    this.cls.set(CLS_USER_KEY, userData);

    return next.handle();
  }
}
