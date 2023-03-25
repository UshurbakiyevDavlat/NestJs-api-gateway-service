import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  CreateEmployeeAdditionResponse,
  CreateEmployeeResponse,
  GetEmployeeAdditionResponse,
  GetEmployeeAdditionsResponse,
  GetEmployeeResponse,
  GetEmployeesResponse,
} from 'src/grpc/hr.pb';
import { HR_SERVICE_NAME, HrServiceClient } from '../../grpc/hr.pb';
import { IncomingHttpHeaders } from 'http2';
import { createGrpcMetadata } from '../../core/utils/metadata.util';
import { CreateEmployeeDto } from './dto/create-employee-dto';
import { CreateEmployeeAdditionsDto } from './dto/create-employee-additions-dto';

@ApiTags('HR')
@Controller('hr')
export class HrController implements OnModuleInit {
  private svc: HrServiceClient;

  @Inject(HR_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<HrServiceClient>(HR_SERVICE_NAME);
  }

  @Get('/employee/get/:id')
  private async getEmployee(
    @Param('id') id: number,
  ): Promise<Observable<GetEmployeeResponse>> {
    return this.svc.getEmployee({ id: id });
  }

  @ApiOperation({ summary: 'Список юзеров' })
  @Get('/employee/get-all')
  // @ApiBearerAuth('JWT-auth')
  private async getEmployees(): Promise<Observable<GetEmployeesResponse>> {
    return this.svc.getEmployees({});
  }

  @ApiOperation({ summary: 'Создание юзера' })
  @Post('/employee/create')
  // @ApiBearerAuth('JWT-auth')
  private async createEmployee(
    @Body() dto: CreateEmployeeDto,
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Observable<CreateEmployeeResponse>> {
    return this.svc.createEmployee(dto, createGrpcMetadata(headers));
  }

  @ApiOperation({ summary: 'Заполнение доп инфы' })
  @Post('/employee/additional/create')
  private async createEmployeeAdditions(
    @Body() dto: CreateEmployeeAdditionsDto,
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Observable<CreateEmployeeAdditionResponse>> {
    return this.svc.createEmployeeAddition(dto, createGrpcMetadata(headers));
  }

  @ApiOperation({ summary: 'Получение доп инфы' })
  @Get('/employee/additional/get/:id')
  private async getEmployeeAdditions(
    @Param('id') id: number,
  ): Promise<Observable<GetEmployeeAdditionsResponse>> {
    return this.svc.getEmployeeAdditions({ id: id });
  }
}
