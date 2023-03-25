import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  ListRolesResponse,
} from 'src/grpc/auth.pb';

@ApiTags('Роли')
@Controller('roles')
export class RolesController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Get('/getRoles')
  private async getRoles(): Promise<Observable<ListRolesResponse>> {
    return this.svc.listRoles({});
  }
}
