import type { IncomingHttpHeaders } from 'http2';
import { Metadata } from '@grpc/grpc-js';
import type { IMetadata } from '../interface/metadata.interface';

export const createGrpcMetadata = (headers?: IncomingHttpHeaders): Metadata => {
  const metadata = new Metadata();
  if (headers?.authorization) {
    metadata.add('Authorization', headers.authorization);
  }
  return metadata;
};

export const parseGrpcMetadata = (metadata: Metadata): IMetadata => {
  return {
    authorization: metadata.get('Authorization').pop() as string,
  };
};
