import React, { useMemo } from 'react';
import { TreeSelect } from 'antd';

const convertDepartment = (department) => {
  const key = department.id;
  const value = department.id;
  const title = department.name;
  const treeData = { key, value, title };
  const children = department.departments;
  if (children) {
    treeData.children = children.map(convertDepartment);
  }
  return treeData;
};

const toTree = (departments, users) => {
  return departments.map((department) => {
    const { key, children } = department;
    const treeData = { ...department, checkable: false, selectable: false };
    if (children) {
      treeData.children = toTree(children, users);
    }
    if (users[key]) {
      treeData.children = treeData.children ? [...treeData.children, ...users[key]] : users[key];
    }
    return treeData;
  });
};

/**
 * 人员选择控件
 *
 * @param {控件值} userKey string | (user)=>string
 * @param {显示title} title string | (user)=>string
 * @param {机构列表} departments [{ id, name, departments:[] }]
 * @param {用户列表} users [{ [id], [name], departmentId, ... }]
 */
const UserSelector = ({
  userKey = 'id',
  title = 'name',
  departments = [],
  users = [],
  ...rest
}) => {
  const getDepartmentTreeData = useMemo(
    () => () => {
      return departments.map(convertDepartment);
    },
    [departments],
  );

  const convertUsers = () => {
    const result = {};

    users
      .map((user) => {
        const { departmentId } = user;
        const key = typeof userKey === 'function' ? userKey(user) : user[userKey];
        const label = typeof title === 'function' ? title(user) : user[title];
        return { key, title: label, departmentId };
      })
      .forEach((user) => {
        const { departmentId } = user;
        if (!result[departmentId]) {
          result[departmentId] = [];
        }
        result[departmentId].push(user);
      });
    return result;
  };

  return (
    <TreeSelect treeData={toTree(getDepartmentTreeData(departments), convertUsers())} {...rest} />
  );
};

export default UserSelector;
