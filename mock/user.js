import defaultSettings from '../config/defaultSettings';

const { appCode } = defaultSettings;

const currentUser = {
  id: 1,
  account: 'admin',
  name: '系统管理员',
  departmentId: 1,
  departmentType: 10,
  departmentCode: 'CN0015101',
  departmentName: '宁波分行',
  departmentNameAbbr: '宁波分行',
  networkId: 1,
  networkType: 10,
  networkCode: 'CN0015101',
  networkName: '宁波分行',
  networkNameAbbr: '宁波分行',
  departments: [
    {
      id: 1,
      name: '宁波分行',
      abbr: '宁波分行',
      type: 10,
      code: 'fenhang',
      sort: 'B01',
    },
  ],
  postId: 20,
  postName: '其他',
  postFlag: 'O',
  email: null,
  mobile: null,
  status: 1,
  dummy: 1,
  loginCount: 51,
  lastLoginTime: '2020-04-07 16:28:30',
  lastLoginIp: '0:0:0:0:0:0:0:1',
  groups: [
    {
      id: 1,
      lineId: 1,
      name: '系统管理员',
      flag: 'ADMIN_SYSADMIN',
    },
  ],
  allowLocalLogin: true,
};

const permissions = [];

export default {
  'GET /api/manager/user': currentUser,
  'PUT /api/sso/token': currentUser,
  [`GET /api/manager/user/routes/${appCode}`]: [
    {
      path: '/welcome',
      name: '欢迎',
      hideInMenu: 0,
    },
  ],
  [`GET /api/manager/user/permissions/${appCode}`]: permissions,
};
