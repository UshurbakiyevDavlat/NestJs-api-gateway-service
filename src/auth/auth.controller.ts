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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  AuthServiceClient,
  RegisterResponse,
  AUTH_SERVICE_NAME,
  LoginResponse,
  ProfileResponse,
  ResetRequest,
  ResetResponse,
} from './auth.pb';
import { createGrpcMetadata } from 'src/core/utils/metadata.util';
import { JwtResponseDto } from './dto/jwt-response-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@ApiTags('Авторизация')
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
    @Body() body: CreateUserDto,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @ApiOperation({ summary: 'Логин юзера' })
  @ApiResponse({ status: 201, type: JwtResponseDto })
  @Post('login')
  private async login(
    @Body() body: LoginUserDto,
  ): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }

  @ApiOperation({ summary: 'Профайл юзера' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth('JWT-auth')
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
