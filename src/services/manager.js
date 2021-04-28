import request from '@/utils/request';

export async function queryDepartments(params) {
  return request('/api/manager/departments', {
    params,
  });
}

export async function queryUsers(params) {
  return request('/api/manager/users', {
    params,
  });
}
