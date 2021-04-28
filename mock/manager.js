import { parse } from 'url';

const tableListDataSource = [
  {
    id: 1,
    name: '宁波分行',
    abbr: '宁波分行',
    type: 10,
    typeName: '分行',
    code: 'fenhang',
    sort: 'B01',
  },
  {
    id: 2,
    name: '行长室',
    abbr: '行长室',
    type: 20,
    typeName: '分行行长室',
    parentId: 1,
    parentName: '宁波分行',
    code: 'hangzhangshi',
    sort: 'D01',
  },
  {
    id: 3,
    name: '办公室',
    abbr: '办公室',
    type: 21,
    typeName: '分行管理部室',
    parentId: 1,
    parentName: '宁波分行',
    code: 'bangongshi',
    sort: 'D02',
  },
  {
    id: 4,
    name: '人力资源部',
    abbr: '人力部',
    type: 21,
    typeName: '分行管理部室',
    parentId: 1,
    parentName: '宁波分行',
    code: 'renlibu',
    sort: 'D03',
  },
  {
    id: 5,
    name: '审计部',
    abbr: '审计部',
    type: 21,
    typeName: '分行管理部室',
    parentId: 1,
    parentName: '宁波分行',
    code: 'shenjibu',
    sort: 'D04',
  },
  {
    id: 6,
    name: '计划财务部',
    abbr: '计财部',
    type: 21,
    typeName: '分行管理部室',
    parentId: 1,
    parentName: '宁波分行',
    code: 'jicaibu',
    sort: 'D05',
  },
  {
    id: 7,
    name: '风险管理（法律合规部）部',
    abbr: '风管部',
    type: 21,
    typeName: '分行管理部室',
    parentId: 1,
    parentName: '宁波分行',
    code: 'fengguanbu',
    sort: 'D06',
  },
  {
    id: 8,
    name: '授信审核部',
    abbr: '授信审核部',
    type: 30,
    typeName: '分行二级部',
    parentId: 7,
    parentName: '风险管理（法律合规部）部',
    code: 'shenhebu',
    sort: 'D0601',
  },
  {
    id: 9,
    name: '放款中心',
    abbr: '放款中心',
    type: 30,
    typeName: '分行二级部',
    parentId: 7,
    parentName: '风险管理（法律合规部）部',
    code: 'fangkuanzhongxin',
    sort: 'D0602',
  },
  {
    id: 10,
    name: '授信管理部',
    abbr: '授管部',
    type: 21,
    typeName: '分行管理部室',
    parentId: 1,
    parentName: '宁波分行',
    code: 'shouguanbu',
    sort: 'D07',
  },
];

const tableTreeDataSource = [
  {
    id: 1,
    name: '宁波分行',
    abbr: '宁波分行',
    type: 10,
    typeName: '分行',
    code: 'fenhang',
    sort: 'B01',
    departments: [
      {
        id: 2,
        name: '行长室',
        abbr: '行长室',
        type: 20,
        typeName: '分行行长室',
        parentId: 1,
        parentName: '宁波分行',
        code: 'hangzhangshi',
        sort: 'D01',
      },
      {
        id: 3,
        name: '办公室',
        abbr: '办公室',
        type: 21,
        typeName: '分行管理部室',
        parentId: 1,
        parentName: '宁波分行',
        code: 'bangongshi',
        sort: 'D02',
      },
      {
        id: 4,
        name: '人力资源部',
        abbr: '人力部',
        type: 21,
        typeName: '分行管理部室',
        parentId: 1,
        parentName: '宁波分行',
        code: 'renlibu',
        sort: 'D03',
      },
      {
        id: 5,
        name: '审计部',
        abbr: '审计部',
        type: 21,
        typeName: '分行管理部室',
        parentId: 1,
        parentName: '宁波分行',
        code: 'shenjibu',
        sort: 'D04',
      },
      {
        id: 6,
        name: '计划财务部',
        abbr: '计财部',
        type: 21,
        typeName: '分行管理部室',
        parentId: 1,
        parentName: '宁波分行',
        code: 'jicaibu',
        sort: 'D05',
      },
      {
        id: 7,
        name: '风险管理（法律合规部）部',
        abbr: '风管部',
        type: 21,
        typeName: '分行管理部室',
        parentId: 1,
        parentName: '宁波分行',
        code: 'fengguanbu',
        sort: 'D06',
        departments: [
          {
            id: 8,
            name: '授信审核部',
            abbr: '授信审核部',
            type: 30,
            typeName: '分行二级部',
            parentId: 7,
            parentName: '风险管理（法律合规部）部',
            code: 'shenhebu',
            sort: 'D0601',
          },
          {
            id: 9,
            name: '放款中心',
            abbr: '放款中心',
            type: 30,
            typeName: '分行二级部',
            parentId: 7,
            parentName: '风险管理（法律合规部）部',
            code: 'fangkuanzhongxin',
            sort: 'D0602',
          },
        ],
      },
      {
        id: 10,
        name: '授信管理部',
        abbr: '授管部',
        type: 21,
        typeName: '分行管理部室',
        parentId: 1,
        parentName: '宁波分行',
        code: 'shouguanbu',
        sort: 'D07',
      },
    ],
  },
];

const userList = [
  {
    id: 1,
    account: 'admin',
    name: '系统管理员',
    departmentId: 1,
    departmentType: 10,
    departmentCode: 'fenhang',
    departmentName: '宁波分行',
    departmentNameAbbr: '宁波分行',
    postId: 20,
    postName: '其他',
    postFlag: 'O',
    email: null,
    mobile: null,
    status: 0,
    dummy: 1,
    loginCount: 2,
    lastLoginTime: '2020-04-14 09:58:26',
    lastLoginIp: '0:0:0:0:0:0:0:1',
    groups: [
      {
        id: 1,
        lineId: 1,
        lineName: '管理员条线',
        lineFlag: 'ADMIN',
        name: '系统管理员',
        flag: 'ADMIN_SYSADMIN',
      },
    ],
  },
  {
    id: 2,
    account: 'test',
    name: '测试用户',
    departmentId: 8,
    departmentType: 30,
    departmentCode: 'shenhebu',
    departmentName: '授信审核部',
    departmentNameAbbr: '授信审核部',
    postId: 5,
    postName: '副总经理',
    postFlag: 'VGM',
    email: 'test',
    mobile: '176',
    status: 0,
    dummy: 0,
    loginCount: 0,
    lastLoginTime: null,
    lastLoginIp: null,
    groups: [
      {
        id: 1,
        lineId: 1,
        lineName: '管理员条线',
        lineFlag: 'ADMIN',
        name: '系统管理员',
        flag: 'ADMIN_SYSADMIN',
      },
    ],
  },
];

function getDepartments(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  if (!params.current) {
    return res.json(tableTreeDataSource);
  }

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.indexOf(params.name) > -1);
  }

  if (params.type) {
    dataSource = dataSource.filter((data) => data.appId === parseInt(params.appId, 10));
  }

  if (params.parentId) {
    dataSource = dataSource.filter(
      (data) =>
        data.parentId === parseInt(params.parentId, 10) ||
        data.id === parseInt(params.parentId, 10),
    );
  }

  const current = parseInt(params.current, 10) || 1;

  if (params.pageSize) {
    const pageSize = params.pageSize * 1;
    const result = {
      data: dataSource.slice((current - 1) * pageSize, current * pageSize),
      page: current,
      total: dataSource.length,
    };
    return res.json(result);
  }
  return res.json(dataSource);
}

function getAccounts(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = userList;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.account) {
    dataSource = dataSource.filter((data) => data.account === params.account);
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.indexOf(params.name) > -1);
  }

  if (params.departmentId) {
    dataSource = dataSource.filter(
      (data) => data.departmentId === parseInt(params.departmentId, 10),
    );
  }

  if (params.postId) {
    dataSource = dataSource.filter((data) => data.postId === parseInt(params.postId, 10));
  }

  if (params.email) {
    dataSource = dataSource.filter((data) => data.email.indexOf(params.email) > -1);
  }

  if (params.mobile) {
    dataSource = dataSource.filter((data) => data.mobile.indexOf(params.mobile) > -1);
  }

  if (params.status) {
    dataSource = dataSource.filter((data) => data.status === parseInt(params.status, 10));
  }

  if (params.dummy) {
    dataSource = dataSource.filter((data) => data.dummy === parseInt(params.dummy, 10));
  }

  const current = parseInt(params.current, 10) || 1;

  if (params.pageSize) {
    const pageSize = params.pageSize * 1;
    const result = {
      data: dataSource.slice((current - 1) * pageSize, current * pageSize),
      page: current,
      total: dataSource.length,
    };
    return res.json(result);
  }
  return res.json(dataSource);
}
export default {
  'GET /api/manager/departments': getDepartments,
  'GET /api/manager/users': getAccounts,
};
