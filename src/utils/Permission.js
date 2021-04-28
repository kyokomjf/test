import { useAuth } from './hooks';

const checkPermit = (auth, roles) => {
  if (Array.isArray(roles)) {
    return roles.some((role) => auth[role]);
  }
  return auth[roles];
};

const Permission = ({ allowAccess, fallback = null, children }) => {
  const auth = useAuth();

  const hasPermission = checkPermit(auth, allowAccess);

  return hasPermission ? children : fallback;
};

export default Permission;
