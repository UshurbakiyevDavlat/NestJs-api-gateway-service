import { Env } from 'src/core/utils/env';
import { JWT_TOKEN_TTL } from './constants';

export function security() {
  return {
    secret: Env.readString('SEC_SEED'),
    signOptions: { expiresIn: JWT_TOKEN_TTL },
  };
}
