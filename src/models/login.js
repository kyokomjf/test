import { setAuthority } from '@/utils/authority';
import { removeToken } from '@/utils/token';
import { getQueryPath } from '@/utils/utils';
import defaultSettings from '@/../config/defaultSettings';
import { validateToken } from '@/services/token';

const { ssoUrl } = defaultSettings;

const LoginModel = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *validate({ payload }, { call, put }) {
      try {
        const res = yield call(validateToken, payload);
        const { account } = res;
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            currentAuthority: account === 'admin' ? 'admin' : 'user',
          },
        });
        yield put({
          type: 'user/saveCurrentUser',
          payload: res,
        });
      } catch {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { status, currentAuthority } = payload;
      setAuthority(currentAuthority);
      state.status = status;
    },

    expire() {
      removeToken();
      window.location.href = getQueryPath(ssoUrl[REACT_APP_ENV], {
        redirect: window.location.href,
      });
    },

    logout() {
      const currentUrl = window.location.href;
      const redirectUrl = ssoUrl[REACT_APP_ENV];

      const urlParams = new URL(currentUrl);
      const redirectUrlParams = new URL(redirectUrl);
      if (redirectUrlParams.origin !== urlParams.origin) {
        removeToken();
      }

      window.location.href = getQueryPath(redirectUrl, {
        redirect: currentUrl,
        flag: 'logout',
      });
    },
  },
};
export default LoginModel;
