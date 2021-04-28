import request from '@/utils/request';
import defaultSettings from '@/../config/defaultSettings';

const { appCode } = defaultSettings;

export async function queryCurrent() {
  return request('/api/manager/user');
}

export async function getRoutes() {
  return request(`/api/manager/user/routes/${appCode}`);
}

export async function getPermissions() {
  return request(`/api/manager/user/permissions/${appCode}`);
}