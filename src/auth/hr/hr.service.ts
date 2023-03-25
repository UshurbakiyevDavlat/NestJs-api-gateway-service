import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { HR_SERVICE_NAME, HrServiceClient } from '../../grpc/hr.pb';

@Injectable()
export class HrService {
  private svc: HrServiceClient;

  @Inject(HR_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<HrServiceClient>(HR_SERVICE_NAME);
  }
}
