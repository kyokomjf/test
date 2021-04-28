import defaultSettings from '../config/defaultSettings';

const { appCode } = defaultSettings;

const appInfo = {
  id: 1,
  name: '内部管理系统',
  code: appCode,
  appUrl: 'http://localhost:8000',
  icon: null,
  help: 1,
  description: null,
  enable: 1,
  waterMark: 0,
};

const dict = {
  TrueOrFalse: [
    {
      value: 1,
      label: '是',
    },
    {
      value: 0,
      label: '否',
    },
  ],
};

export default {
  [`GET /api/manager/apps/${appCode}`]: appInfo,
  [`GET /api/manager/apps/${appCode}/help`]: { message: 'download help document' },
  [`GET /api/${appCode}/dict`]: dict,
};
