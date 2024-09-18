import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class IsOwnerGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userIdFromToken = user.sub;
        const { id } = request.params;
    
        if (String(userIdFromToken) !== String(id)) {
          throw new UnauthorizedException('Você não tem permissão para alterar este usuário.');
        }
    
        return true;
      }
}