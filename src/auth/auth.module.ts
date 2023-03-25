import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from './auth.pb';
import { AuthService } from './auth.service';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { HR_PACKAGE_NAME, HR_SERVICE_NAME } from '../grpc/hr.pb';
import { HrController } from './hr/hr.controller';
import { HrService } from './hr/hr.service';
@Global()
@Module({
  controllers: [AuthController, RolesController, HrController],
  providers: [AuthService, RolesService, HrService],
  exports: [AuthService, RolesService, HrService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('grpc.auth_url'),
            package: AUTH_PACKAGE_NAME,
            protoPath: 'proto/auth.proto',
          },
        }),
      },
      {
        name: HR_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('grpc.hr_url'),
            package: HR_PACKAGE_NAME,
            protoPath: 'proto/hr.proto',
          },
        }),
      },
    ]),
  ],
})
export class AuthModule {}
