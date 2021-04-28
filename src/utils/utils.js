import React from 'react';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { parse, stringify } from 'querystring';
import pathRegexp from 'path-to-regexp';
import uuid from 'uuid/v4';
import XLSX from 'xlsx';
import { getToken } from './token';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return path.includes('?') ? `${path}&${search}` : `${path}?${search}`;
  }
  return path;
}

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getRouteAuthority = (routeData, path) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(route.routes, path) || authorities;
      }
    }
  });
  return authorities;
};

/**
 * 简单的异步service模版
 *
 * @param {返回Promise的函数} func
 * @param {提示信息} msg
 * @param {是否需要确认} needConfirm
 */
export const st = (func, msg = '提交', needConfirm = true, confirmProps = {}) => {
  return async (...args) => {
    if (needConfirm) {
      try {
        await new Promise((resolve, reject) => {
          Modal.confirm({
            title: '是否确认提交?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk: () => resolve(),
            onCancel: () => reject(),
            ...confirmProps,
          });
        });
      } catch {
        return null;
      }
    }
    const key = uuid();
    message.loading({ content: `${msg}中`, key });
    try {
      const response = await func(...args);
      if (response && response.code && response.message && response.code !== 0) {
        message.warning({
          content: `${msg}失败：${response.message}`,
          key,
        });
      } else {
        message.success({ content: `${msg}成功`, key });
      }
      return response;
    } catch (error) {
      message.error({ content: `${msg}失败`, key });
      return false;
    }
  };
};

/**
 * 获取字典selector
 *
 * @param {字典名称} name
 */
export const es = (name) => {
  return (state) => {
    const e = state.global.dict[name];
    return e
      ? e.reduce((m, n) => {
          m.set(n.value, { text: n.label });
          return m;
        }, new Map())
      : {};
  };
};

export const exportXlsx = (path = '', params = {}) => {
  const a = document.createElement('a');
  a.style = 'display:none;';
  a.download = true;
  a.href = getQueryPath(path, {
    ...params,
    export: 'xlsx',
    token: getToken(),
  });
  document.getElementsByTagName('body')[0].appendChild(a);
  a.click();
  a.remove();
};

export const clientExportXlsx = (data, filename = 'download.xlsx', sheetName) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
};
