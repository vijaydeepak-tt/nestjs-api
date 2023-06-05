import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Validate request
    // const request = context.switchToHttp().getRequest();
    // console.log(request.body);
    // console.log(request.header('User-Agent'));
    return false;
  }
}
