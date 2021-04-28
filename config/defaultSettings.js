export default {
  navTheme: 'dark',
  primaryColor: '#2f54eb',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  autoHideHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  title: '内部管理系统',
  pwa: false,
  iconfontUrl: '',
  appCode: 'code',
  basePath: '',
  ssoUrl: {
    dev: 'http://localhost:8009/portal/user/login',
    test: 'http://10.240.54.128/portal/user/login',
    pro: 'http://10.232.97.40:8797/portal/user/login',
  },
};
