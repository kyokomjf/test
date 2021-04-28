import { queryAppInfo, queryDict } from '@/services/global';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    appInfo: {},
    dict: {},
  },
  effects: {
    *fetchAppInfo(_, { call, put }) {
      const data = yield call(queryAppInfo);
      yield put({
        type: 'saveAppInfo',
        payload: data,
      });
    },
    *fetchDict(_, { call, put }) {
      const data = yield call(queryDict);
      yield put({
        type: 'saveDict',
        payload: data,
      });
    },
  },
  reducers: {
    saveAppInfo(state, { payload }) {
      state.appInfo = payload;
    },
    saveDict(state, { payload }) {
      state.dict = { ...state.dict, ...payload };
    },
    changeLayoutCollapsed(state, { payload }) {
      state.collapsed = payload;
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
