import { queryCurrent, getRoutes, getPermissions } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    menuData: [],
    permissions: [],
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *getMenuData(_, { call, put }) {
      const response = yield call(getRoutes);
      yield put({
        type: 'saveMenuData',
        payload: response,
      });
    },
    *getPermissionFlags(_, { call, put }) {
      const response = yield call(getPermissions);
      yield put({
        type: 'savePermissionFlags',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      state.currentUser = action.payload || {};
    },
    saveMenuData(state, action) {
      state.menuData = action.payload || [];
    },
    savePermissionFlags(state, action) {
      state.permissions = action.payload || [];
    },
  },
};
export default UserModel;
