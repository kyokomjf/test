/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, useLocation, Link } from 'umi';
import { Result, Button } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import Authorized from '@/utils/Authorized';
import { getRouteAuthority } from '@/utils/utils';
import logo from '../assets/logo.jpg';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="对不起，您无权访问该页面."
    extra={
      <Button type="primary">
        <Link to="/">返回首页</Link>
      </Button>
    }
  />
);

const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const footerDom = (
  <DefaultFooter copyright={`2019-${new Date().getFullYear()} 上海银行宁波分行`} links={[]} />
);

const BasicLayout = (props) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const { name, account } = useSelector((state) => state.user.currentUser);
  const { waterMark } = useSelector((state) => state.global.appInfo);
  const location = useLocation();

  const { children } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/fetchAppInfo',
      });
      dispatch({
        type: 'global/fetchDict',
      });
      dispatch({
        type: 'user/getPermissionFlags',
      });
    }
  }, []);

  const handleMenuCollapse = (payload) =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  // get children authority
  const authorized = getRouteAuthority(props.route.routes, location.pathname || '/') || undefined;

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuHeaderRender={(appLogo, title) => (
        <Link to="/">
          {appLogo}
          {title}
        </Link>
      )}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => footerDom}
      menuDataRender={menuDataRender}
      rightContentRender={(rightProps) => <RightContent {...rightProps} />}
      waterMarkProps={
        waterMark
          ? {
              content: `${name}(${account})`,
              fontColor: 'rgba(0,0,0,.10)',
            }
          : undefined
      }
      {...props}
      {...settings}
    >
      <Authorized authority={authorized} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default BasicLayout;
