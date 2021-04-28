import { useState } from 'react';
import { useSelector } from 'umi';

export const useRequest = (func) => {
  const [loading, setLoading] = useState(false);
  const handleRequest = async (...args) => {
    setLoading(true);
    try {
      const response = await func(...args);
      return [response, null];
    } catch (error) {
      return [null, error];
    } finally {
      setLoading(false);
    }
  };
  return [handleRequest, loading];
};

export const useAuth = () => {
  const { roles } = useSelector((state) => state.user.currentUser);
  const { permissions } = useSelector((state) => state.user) || [];
  if (!roles) {
    return {};
  }

  const result = {};
  permissions.forEach((flag) => {
    result[flag] = true;
  });

  const isSysAdmin = roles.includes('ROLE_SYS_ADMIN');

  return {
    ...result,
    isSysAdmin,
  };
};
