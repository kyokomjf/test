import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useLocation } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { getQueryPath, getPageQuery } from '@/utils/utils';
import { getToken, saveToken } from '@/utils/token';
import defaultSettings from '@/../config/defaultSettings';

const { ssoUrl } = defaultSettings;

const SecurityLayout = (props) => {
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const loginStatus = useSelector((state) => state.login.status);
  const loading = useSelector((state) => state.loading.models.login);

  const { children } = props;

  useEffect(() => {
    setIsReady(true);
    const token = getToken();
    if (token) {
      dispatch({ type: 'login/validate', payload: { token, scope: 'login' } });
    } else if (REACT_APP_ENV === 'dev') {
      dispatch({ type: 'login/validate', payload: { token: 'dev', scope: 'login' } });
    }
  }, []);

  const params = getPageQuery();
  const { token } = params;
  if (token) {
    delete params.token;
    saveToken(token);
    const { basePath = '' } = defaultSettings;
    window.location.href = getQueryPath(basePath + location.pathname, params);
    return null;
  }

  const isLogin = REACT_APP_ENV === 'dev' ? true : loginStatus === 'ok';

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }
  if (!isLogin) {
    const redirect = window.location.href;
    window.location.href = getQueryPath(ssoUrl[REACT_APP_ENV], { redirect });
    return null;
  }
  return children;
};

export default SecurityLayout;
