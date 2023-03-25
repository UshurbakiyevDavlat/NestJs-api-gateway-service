import { Env } from 'src/core/utils/env';

export interface GrpcOptions {
  auth_url: string;
  hr_url: string;
}

export const grpc = (): GrpcOptions => ({
  auth_url: Env.readString('AUTH_SERVICE_URL') as string,
  hr_url: Env.readString('HR_SERVICE_URL') as string,
});
