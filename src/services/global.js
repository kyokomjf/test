import request from '@/utils/request';
import defaultSettings from '@/../config/defaultSettings';

const { appCode } = defaultSettings;

export async function queryAppInfo() {
  return request(`/api/manager/apps/${appCode}`);
}

export async function queryDict() {
  return request(`/api/${appCode}/dict`);
}
