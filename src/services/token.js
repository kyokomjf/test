import request from 'umi-request';

export async function validateToken(params) {
  return request.put('/api/sso/token', { data: params });
}
