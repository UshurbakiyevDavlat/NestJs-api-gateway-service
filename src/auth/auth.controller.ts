import { IncomingHttpHeaders } from 'http2';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Headers,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AuthServiceClient,
  RegisterResponse,
  RegisterRequest,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  ResetRequest,
  ResetResponse,
} from './auth.pb';
import { createGrpcMetadata } from 'src/core/utils/metadata.util';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }

  @Get('profile')
  private async profile(
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Observable<ProfileResponse>> {
    return this.svc.profile({}, createGrpcMetadata(headers));
  }

  @Post('reset')
  private async reset(
    @Body() body: ResetRequest,
  ): Promise<Observable<ResetResponse>> {
    return this.svc.reset(body);
  }
}
